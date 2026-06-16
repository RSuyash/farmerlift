import { Product, FertilizerSpecs, PesticideSpecs, SeedSpecs, MachinerySpecs } from "@/types/product";

export interface SearchFilters {
    query?: string;
    category?: string[];
    priceRange?: [number, number];
    brands?: string[];

    // Dynamic Specs
    fertilizerType?: FertilizerSpecs["type"][];
    pestTarget?: string[];
    cropTarget?: string[];
}

export function searchProducts(products: Product[], filters: SearchFilters): Product[] {
    return products.filter((product) => {
        // 1. Text Search (Name, Brand, Description, Features)
        if (filters.query) {
            const q = filters.query.toLowerCase();
            const matchesText =
                product.name.toLowerCase().includes(q) ||
                product.brand.toLowerCase().includes(q) ||
                product.description.toLowerCase().includes(q) ||
                product.features.some(f => f.toLowerCase().includes(q));

            if (!matchesText) return false;
        }

        // 2. Category Filter
        if (filters.category && filters.category.length > 0) {
            if (!filters.category.includes(product.category)) return false;
        }

        // 3. Price Range
        if (filters.priceRange) {
            const currentPrice = typeof product.price === 'string' ? parseFloat(product.price) || 0 : product.price;
            if (currentPrice < filters.priceRange[0] || currentPrice > filters.priceRange[1]) return false;
        }

        // 4. Brands
        if (filters.brands && filters.brands.length > 0) {
            if (!filters.brands.includes(product.brand)) return false;
        }

        // 5. Special Technical Filters

        // Fertilizer Type
        if (filters.fertilizerType && filters.fertilizerType.length > 0 && product.category === 'fertilizer') {
            const specs = product.specifications as FertilizerSpecs;
            if (!filters.fertilizerType.includes(specs.type)) return false;
        }

        // Crop Target (Checks if *any* of the product's target crops match the filter)
        if (filters.cropTarget && filters.cropTarget.length > 0) {
            let hasTargetCrop = false;
            
            // Build a list of all crops associated with this product
            const productCrops: string[] = [];
            
            if (product.recommendedCrops) {
                product.recommendedCrops.forEach(c => {
                    if (c.name) productCrops.push(c.name.trim());
                });
            }
            
            if (product.targetCropsDescription) {
                const parts = product.targetCropsDescription.split(',');
                parts.forEach(p => {
                    if (p.trim()) productCrops.push(p.trim());
                });
            }
            
            if (productCrops.length > 0) {
                const normalizedTargets = productCrops.map(c => c.toLowerCase());
                const normalizedFilters = filters.cropTarget.map(c => c.toLowerCase());
                
                // Scrub spaces for slug-safe comparison (e.g. "sugar cane" -> "sugarcane")
                const scrubbedTargets = normalizedTargets.map(t => t.replace(/\s+/g, ''));
                const scrubbedFilters = normalizedFilters.map(f => f.replace(/\s+/g, ''));

                if (scrubbedTargets.some(t => scrubbedFilters.some(f => t.includes(f)))) {
                    hasTargetCrop = true;
                }
            }

            // Machinery might not have target crops, so ignore or strict check? 
            // Logic: If filter is applied, and product doesn't have crop info, usually exclude it.
            // But for broad search, let's include if generic. For now, strict.
            if (product.category === 'machinery') hasTargetCrop = true; // Machinery fits all usually

            if (!hasTargetCrop) return false;
        }

        return true;
    });
}

// Utility to extract dynamic facets from a product list
export function getFacets(products: Product[]) {
    const brands = new Set<string>();
    const categories = new Set<string>();
    const crops = new Set<string>();

    products.forEach(p => {
        brands.add(p.brand);
        categories.add(p.category);
        
        if (p.recommendedCrops) {
            p.recommendedCrops.forEach(c => {
                if (c.name && c.name !== 'Crop') crops.add(c.name.trim());
            });
        }
        
        if (p.targetCropsDescription) {
            const parts = p.targetCropsDescription.split(',');
            parts.forEach(part => {
                const trimmed = part.trim();
                if (trimmed) crops.add(trimmed);
            });
        }
    });

    return {
        brands: Array.from(brands).sort(),
        categories: Array.from(categories).sort(),
        crops: Array.from(crops).sort()
    };
}

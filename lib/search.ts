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
            if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) return false;
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
            // Check fertilizer/pesticide/seed target crops (normalize to array)
            const pTargetCrops = (product.specifications as any).targetCrops; // duck typing
            if (Array.isArray(pTargetCrops)) {
                const normalizedTargets = pTargetCrops.map(c => c.toLowerCase());
                const normalizedFilters = filters.cropTarget.map(c => c.toLowerCase());
                if (normalizedTargets.some(t => normalizedFilters.some(f => t.includes(f)))) {
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
        const specs = p.specifications as any;
        if (specs.targetCrops && Array.isArray(specs.targetCrops)) {
            specs.targetCrops.forEach((c: string) => crops.add(c));
        }
    });

    return {
        brands: Array.from(brands).sort(),
        categories: Array.from(categories).sort(),
        crops: Array.from(crops).sort()
    };
}

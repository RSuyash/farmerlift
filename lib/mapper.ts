import { Product, FertilizerSpecs, SeedSpecs, PesticideSpecs, MachinerySpecs, ProductCategory } from '@/types/product';

// Helper to safely get the image URL
const getImageUrl = (wpPost: any) => {
    if (wpPost._embedded && wpPost._embedded['wp:featuredmedia'] && wpPost._embedded['wp:featuredmedia'][0]) {
        return wpPost._embedded['wp:featuredmedia'][0].source_url;
    }
    return '/images/placeholder.png'; // Fallback
};

export function mapWpProductToApp(wpPost: any): Product {
    const acf = wpPost.acf || {};
    const type: ProductCategory = (acf.spec_type as ProductCategory) || 'fertilizer';

    // --- 1. BUILD SPECS BASED ON TYPE ---
    let specs: any = {};

    if (type === 'fertilizer') {
        specs = {
            type: 'chemical',
            form: acf.form || 'granule',
            npkRatio: acf.npk_ratio || 'N/A',
            dosePerAcre: 'Refer to packaging',
            targetCrops: [],
            applicationMethod: acf.application_method || [],
            composition: {
                n: Number(acf.n_content) || 0,
                p: Number(acf.p_content) || 0,
                k: Number(acf.k_content) || 0
            },
            solubility: acf.solubility || 'medium'
        } as FertilizerSpecs;
    }
    else if (type === 'seed') {
        specs = {
            type: 'hybrid',
            crop: acf.seed_crop || 'Generic',
            variety: acf.seed_variety || 'Generic',
            germinationPercentage: Number(acf.germination_percentage) || 70,
            duration: acf.duration || 'N/A',
            season: [],
            purityPercentage: 98,
            sowingMethod: 'broadcasting',
            sowingDistance: acf.sowing_distance || 'Standard'
        } as SeedSpecs;
    }
    else if (type === 'pesticide') {
        specs = {
            type: 'insecticide',
            chemicalGroup: acf.chemical_group || 'Generic',
            toxicityLabel: acf.toxicity_label || 'green',
            activeIngredients: [{
                name: acf.active_ingredients || 'Generic',
                concentration: 'N/A',
                formulation: 'EC'
            }],
            phi: Number(acf.phi_days) || 0,
            targetPests: [],
            targetCrops: [],
            applicationMethod: 'spray',
            dosage: 'Refer to label'
        } as PesticideSpecs;
    }

    // --- 2. RETURN FINAL PRODUCT ---
    return {
        id: wpPost.slug,
        name: wpPost.title.rendered,
        category: type,
        price: Number(acf.selling_price) || 0,  // MATCHES "Selling Price" field
        mrp: Number(acf.mrp) || 0,
        stock: Number(acf.stock_qty) || 0,      // MATCHES "Stock Qty" field
        isOrganic: acf.is_organic || false,
        description: wpPost.content.rendered,
        sku: acf.sku || 'N/A',
        images: [getImageUrl(wpPost)],
        features: acf.features_list ? acf.features_list.split('\n') : [],
        manufacturer: acf.brand_manufacturer || 'Generic',
        countryOfOrigin: 'India',
        specifications: specs,
        brand: acf.brand_manufacturer || 'Generic',
    } as Product;
}
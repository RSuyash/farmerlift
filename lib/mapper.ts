import { Product, FertilizerSpecs, SeedSpecs, PesticideSpecs, MachinerySpecs, ProductCategory } from '@/types/product';
import { BlogPost } from '@/types/blog';

// Helper to safely get the image URL
const getImageUrl = (wpPost: any) => {
    if (wpPost._embedded && wpPost._embedded['wp:featuredmedia'] && wpPost._embedded['wp:featuredmedia'][0]) {
        return wpPost._embedded['wp:featuredmedia'][0].source_url;
    }
    return '/images/placeholder.png'; // Fallback
};

export function mapWpProductToApp(wpPost: any): Product {
    const acf = wpPost.acf || {};

    // Extract Category from WP Taxonomy (inserted via _embed)
    // wp:term[0] is usually 'category' taxonomy
    const terms = wpPost._embedded?.['wp:term']?.[0];
    const categorySlug = (Array.isArray(terms) && terms.length > 0) ? terms[0].slug : null;

    // Fallback to spec_type if no category found, though spec_type is usually broader
    const type: ProductCategory = (categorySlug || acf.spec_type || 'fertilizer') as ProductCategory;

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
    const sellingPrice = Number(acf.selling_price) || 0;
    const priceDisplay = sellingPrice > 0 ? sellingPrice : "Enquire for Price";

    // Strip HTML tags from description for cleaner display in cards/meta
    const rawDescription = wpPost.content.rendered || "";
    const cleanDescription = rawDescription.replace(/<[^>]+>/g, '');

    // --- IMAGES (Featured + Gallery) ---
    const images: string[] = [];

    // 1. Featured Image
    if (wpPost._embedded && wpPost._embedded['wp:featuredmedia'] && wpPost._embedded['wp:featuredmedia'][0]) {
        images.push(wpPost._embedded['wp:featuredmedia'][0].source_url);
    } else {
        // Fallback if no featured image
        images.push('/images/placeholder.png');
    }

    // 2. Extra Gallery Images (1-8)
    // PRIORITY: Check for server-side resolved gallery from our custom REST field
    if (Array.isArray(wpPost.farmerlift_gallery) && wpPost.farmerlift_gallery.length > 0) {
        images.push(...wpPost.farmerlift_gallery);
    }
    // FALLBACK: Manual ACF check (if custom field missing or empty)
    else {
        for (let i = 1; i <= 8; i++) {
            const val = acf[`gallery_image_${i}`];
            // Handle both Return Format: URL (string) and Image Array (object)
            if (typeof val === 'string' && val.trim() !== '') {
                images.push(val);
            } else if (typeof val === 'object' && val?.url) {
                images.push(val.url);
            }
        }
    }

    // If completely empty (shouldn't happen due to fallback above, but safety)
    if (images.length === 0) {
        images.push('/images/placeholder.png');
    }

    return {
        id: wpPost.slug,
        name: wpPost.title.rendered,
        category: type,
        price: priceDisplay,  // MATCHES "Selling Price" field or Text
        mrp: Number(acf.mrp) || 0,
        stock: Number(acf.stock_qty) || 0,      // MATCHES "Stock Qty" field
        isOrganic: acf.is_organic || false,
        description: cleanDescription, // Clean text without p tags
        sku: acf.sku || 'N/A',
        images: images,
        features: acf.features_list ? acf.features_list.split('\n') : [],
        manufacturer: acf.brand_manufacturer || 'FarmerLift', // Default to FarmerLift
        countryOfOrigin: 'India',

        // New Mappings: Aggregate all packaging inputs (Liquid + Solid + Custom)
        availablePackSizes: [
            ...(Array.isArray(acf.pack_sizes_liquid) ? acf.pack_sizes_liquid : []),
            ...(Array.isArray(acf.pack_sizes_solid) ? acf.pack_sizes_solid : []),
            ...(acf.custom_pack_sizes ? acf.custom_pack_sizes.split(',').map((s: string) => s.trim()) : [])
        ],
        qrCodeImage: acf.qr_code_image || null,
        batchDetails: acf.batch_details || '',
        applicationDescription: acf.application_method || '',
        dosageDescription: acf.dosage_info || '',
        targetCropsDescription: acf.target_crops_list || '',

        specifications: specs,
        brand: acf.brand_manufacturer || 'FarmerLift', // Default to FarmerLift
    } as Product;
}

export function mapWpPostToBlog(wpPost: any): BlogPost {
    const acf = wpPost.acf || {};

    // Feature Media
    const image = getImageUrl(wpPost);

    // Calculate Read Time if not provided in ACF (fallback)
    let readTime = acf.read_time;
    if (!readTime) {
        const wordCount = (wpPost.content.rendered || "").split(/\s+/).length;
        const minutes = Math.ceil(wordCount / 200);
        readTime = `${minutes} min read`;
    }

    // Author
    // Fallback to WP User Display Name if ACF is empty
    const author = acf.author_name || wpPost._embedded?.author?.[0]?.name || 'FarmerLift Team';

    // Tags/Categories
    const tags = wpPost._embedded?.['wp:term']?.[0]?.map((t: any) => t.name) || [];

    return {
        id: wpPost.slug,
        title: wpPost.title.rendered,
        excerpt: (wpPost.excerpt.rendered || "").replace(/<[^>]+>/g, '').slice(0, 160) + '...',
        content: wpPost.content.rendered,
        author: author,
        date: new Date(wpPost.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        image: image,
        tags: tags,
        readTime: readTime
    };
}
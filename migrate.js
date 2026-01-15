const fs = require('fs');
const path = require('path');
const axios = require('axios');

// ============================================================
// CONFIGURATION
// ============================================================
const WP_URL = 'https://admin.farmerlift.in/wp-json/wp/v2';
const WP_USER = 'farmerliftmanagement@gmail.com';
const WP_APP_PASSWORD = 'eMBZ A3TF BrVc fWaI Smfa ZQ3s';
// ============================================================

const authHeader = {
    Authorization: 'Basic ' + Buffer.from(WP_USER + ':' + WP_APP_PASSWORD).toString('base64'),
    'Content-Type': 'application/json'
};

// 1. MASTER CATEGORY LIST
const MASTER_CATEGORIES = [
    { id: "water-soluble-npk", name: "Water Soluble NPK Fertilizer", spec_type: "fertilizer" },
    { id: "water-soluble-special", name: "Water Soluble Special Grades", spec_type: "fertilizer" },
    { id: "organic-bio-fertilizers", name: "Organic and Bio fertilizers", spec_type: "fertilizer" },
    { id: "straight-micronutrients", name: "Straight Micronutrients", spec_type: "fertilizer" },
    { id: "micronutrients-mixtures", name: "Micronutrients Mixtures", spec_type: "fertilizer" },
    { id: "biostimulants-pgrs", name: "Biostimulants / PGRs", spec_type: "growth_promoter" },
    { id: "chelated-micronutrients", name: "Chelated Micronutrients", spec_type: "fertilizer" },
    { id: "secondary-nutrients", name: "Secondary Nutrients", spec_type: "fertilizer" },
    { id: "other-products", name: "Other Products", spec_type: "fertilizer" }
];

// Cache for WP Category IDs
let categoryIdMap = {};

// Helper configs for strict ACF Enums (Kept from previous successful run)
const VALID_FORMS = ['liquid', 'granule', 'powder', 'water_soluble'];
const VALID_LABELS = ['green', 'blue', 'yellow', 'red'];
const VALID_TYPES = ['fertilizer', 'pesticide', 'seed', 'machinery', 'growth_promoter'];

function getValidEnum(value, validList, fallback = '') {
    if (!value) return fallback;
    const lower = value.toLowerCase().replace(/ /g, '_');
    if (validList === VALID_FORMS && lower.includes('water-soluble')) return 'water_soluble';
    if (validList === VALID_FORMS && lower.includes('water soluble')) return 'water_soluble';
    return validList.includes(lower) ? lower : fallback;
}

// --- HELPER 1: CREATE CATEGORIES IN WORDPRESS ---
async function setupCategories() {
    console.log('\n📂 Setting up Catalogue Categories...');

    for (const cat of MASTER_CATEGORIES) {
        try {
            // Check if exists
            let res = await axios.get(`${WP_URL}/categories?slug=${cat.id}`, { headers: authHeader }); // FIXED: Added headers

            if (res.data.length > 0) {
                categoryIdMap[cat.id] = res.data[0].id;
                console.log(`   🔹 Exists: ${cat.name} (ID: ${res.data[0].id})`);
            } else {
                // Create it
                res = await axios.post(`${WP_URL}/categories`, {
                    name: cat.name,
                    slug: cat.id,
                    description: cat.description || ''
                }, { headers: authHeader });

                categoryIdMap[cat.id] = res.data.id;
                console.log(`   ✅ Created: ${cat.name} (ID: ${res.data.id})`);
            }
        } catch (e) {
            console.error(`   ❌ Error checking category ${cat.name}: ${e.message}`);
        }
    }
}

// --- HELPER 2: UPLOAD IMAGE ---
async function uploadImage(imagePath) {
    try {
        const normalizedPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
        const localFile = path.join(__dirname, 'public', normalizedPath);
        if (!fs.existsSync(localFile)) {
            // console.warn(`   ⚠️ Image not found locally: ${localFile}`);
            return null;
        }

        const fileData = fs.readFileSync(localFile);
        const fileName = path.basename(localFile);

        // Simple check: In a real scenario we might check if image exists in WP, but strictly uploading matches previous "overwrite/create" behavior
        const res = await axios.post(`${WP_URL}/media`, fileData, {
            headers: {
                ...authHeader,
                'Content-Type': 'image/jpeg',
                'Content-Disposition': `attachment; filename="${fileName}"`
            }
        });
        return res.data.id;
    } catch (error) {
        console.error('   ❌ Image Upload Failed:', error.response?.data?.message || error.message);
        return null;
    }
}

// --- HELPER 4: CHECK IF PRODUCT EXISTS ---
async function findProductBySlug(slug) {
    try {
        const res = await axios.get(`${WP_URL}/product?slug=${slug}&status=any`, { headers: authHeader });
        if (res.data.length > 0) return res.data[0].id;
    } catch (e) { /* ignore */ }
    return null;
}

// --- HELPER 3: CREATE OR UPDATE PRODUCT ---
async function createProduct(filePath) {
    const raw = fs.readFileSync(filePath, 'utf8');
    let data;
    try {
        data = JSON.parse(raw);
    } catch (e) { console.error(`Failed to parse ${filePath}`); return; }

    const slug = path.basename(filePath, '.json');

    console.log(`\n📦 Processing: ${data.name}...`);

    // A. Determine WP Category & ACF Type
    const catSlug = data.category || 'other-products';
    // Check if catSlug corresponds to a known master category, else default
    const masterDef = MASTER_CATEGORIES.find(c => c.id === catSlug) || MASTER_CATEGORIES.find(c => c.id === 'other-products');

    const wpCatId = categoryIdMap[catSlug] || categoryIdMap['other-products'];
    const acfSpecType = masterDef ? masterDef.spec_type : 'fertilizer';

    // B. Upload Image (Only if creating or forced? For now always try, could optimize)
    let mediaId = null;
    if (data.images && data.images.length > 0) {
        mediaId = await uploadImage(data.images[0]);
    }

    // C. Prepare ACF Data
    const acf = {
        spec_type: acfSpecType,
        sku: data.sku || '',
        mrp: Number(data.mrp) || 0,
        selling_price: Number(data.price) || 0,
        stock_qty: Number(data.stock) || 0,
        is_organic: data.isOrganic || false,
        brand_manufacturer: data.manufacturer || data.brand || '',
        features_list: data.features ? data.features.join('\n') : '',
    };

    const specs = data.specifications || {};

    // Map Specs based on the DECIDED type (not just the JSON category)
    if (acfSpecType === 'fertilizer' || acfSpecType === 'growth_promoter') {
        acf.form = getValidEnum(specs.form, VALID_FORMS, 'granule'); // Use Helper
        acf.n_content = Number(specs.composition?.n) || 0;
        acf.p_content = Number(specs.composition?.p) || 0;
        acf.k_content = Number(specs.composition?.k) || 0;
        acf.npk_ratio = specs.npkRatio || '';
        acf.solubility = specs.solubility || '';
    }
    else if (acfSpecType === 'seed') {
        acf.seed_crop = specs.crop || '';
        acf.seed_variety = specs.variety || '';
        acf.germination_percentage = Number(specs.germinationPercentage) || 0;
        acf.duration = specs.duration || '';
    }
    else if (acfSpecType === 'pesticide') {
        acf.chemical_group = specs.chemicalGroup || '';
        acf.toxicity_label = getValidEnum(specs.toxicityLabel, VALID_LABELS, 'green'); // Use Helper
        acf.phi_days = Number(specs.phi) || 0;
    }

    // D. Send to WordPress (Sync Logic)
    try {
        const existingId = await findProductBySlug(slug);

        // Prepare Base Payload
        const payload = {
            title: data.name,
            content: data.description,
            status: 'publish',
            type: 'product',
            slug: slug,
            categories: wpCatId ? [wpCatId] : [],
            acf: acf
        };

        if (mediaId) payload.featured_media = mediaId;

        if (existingId) {
            // UPDATE
            await axios.post(`${WP_URL}/product/${existingId}`, payload, { headers: authHeader });
            console.log(`   🔄 Updated: ${data.name} (ID: ${existingId})`);
        } else {
            // CREATE
            const res = await axios.post(`${WP_URL}/product`, payload, { headers: authHeader });
            console.log(`   ✅ Created: ${data.name} (ID: ${res.data.id})`);
        }

    } catch (error) {
        console.error(`   ❌ Failed: ${slug}`, error.response?.data?.message || error.message);
        if (error.response?.data?.data?.params) console.error(JSON.stringify(error.response.data.data.params, null, 2));
    }
}

// --- MAIN RUNNER ---
async function run() {
    await setupCategories(); // Create categories first

    const folders = [
        // path.join(__dirname, 'data/products/_archive'), // EXCLUDED 
        path.join(__dirname, 'data/products')
    ];

    for (const folder of folders) {
        if (!fs.existsSync(folder)) continue;
        const files = fs.readdirSync(folder).filter(f => f.endsWith('.json'));

        for (const file of files) {
            // Logic to SKIP if it is exactly the _archive folder just in case (though file extension filter handles it)
            if (file.includes('_archive')) continue;

            await createProduct(path.join(folder, file));
            // await new Promise(r => setTimeout(r, 200)); // Faster sync
        }
    }
}

run();

const https = require('https');

const targetList = [
    // 1. Water Soluble NPK
    "FarmerLift 19:19:19", "FarmerLift 12:61:00", "FarmerLift 13:40:13", "FarmerLift 13:00:45", "FarmerLift 00:52:34", "FarmerLift 00:00:50",
    // 2. Special Grades
    "FarmerLift 00:60:20", "FarmerLift 00:47:48", "FarmerLift 17:44:00 (urea phosphate)", "Farmerlift Potassium Schoenite",
    // 3. Organic/Bio
    "ConsoLift", "RhizoLift", "AzotoLift", "PhosphoLift", "PotashLift", "ZnLift", "Sampurnam NPK Kit", "MycoLift", "AcetoLift",
    // 4. Straight Micronutrients
    "MicroLift Zinc Sulphate", "MicroLift manganese sulphate", "MicroLift Ferrous sulphate", "MicroLift Boric Acid", "MicroLift Borate", "MicroLift Copper Sulphate",
    // 5. Micronutrients Mixtures
    "MicroLift Grade I", "MicroLift Grade II",
    // 6. Biostimulants / PGRs
    "Sugarcane Special", "Cotton Special", "Termeric Special", "Soybean/Tur Special", "Growth Booster", "HumiLift", "AscoLIft", "Vansh", "Nakshtra", "AminoLift",
    // 7. Chelated Micronutrients
    "MicroLift Cu -EDTA", "MicroLift FE -EDTA", "MicroLift Zn-EDTA", "MicroLift Mn-EDTA",
    // 8. Secondary Nutrients
    "FarmerLIft Magnesium Sulphate", "Farmerlift Sulphur Powder 90%",
    // 9. Other Products
    "MicroLift zinc polyphosphate", "PDR Vigor", "FarmerLift OSA", "Farmerlift Potassium thiosulphate", "Farmerlift Silicon", "Farmerlift Calcium Nitrate", "Farmerlift Calcium Nitrate with Boron", "Spread+"
];

const WP_API = 'https://admin.farmerlift.in/wp-json/wp/v2/product?per_page=100';

function fetchProducts(page = 1, allProducts = []) {
    return new Promise((resolve, reject) => {
        https.get(`${WP_API}&page=${page}`, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode !== 200) {
                    console.error('Failed to fetch:', res.statusCode);
                    resolve(allProducts); // Return what we have
                    return;
                }

                try {
                    const products = JSON.parse(data);
                    if (products.length === 0) {
                        resolve(allProducts);
                        return;
                    }

                    const titles = products.map(p => p.title.rendered);
                    allProducts = allProducts.concat(titles);

                    // If full page, try next page
                    if (products.length === 100) {
                        fetchProducts(page + 1, allProducts).then(resolve).catch(reject);
                    } else {
                        resolve(allProducts);
                    }
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

function normalize(str) {
    if (!str) return '';
    return str.toLowerCase()
        .replace(/farmerlift/g, '')
        .replace(/microlift/g, '')
        .replace(/[^\w\s]/g, '') // Remove punctuation
        .replace(/\s+/g, ' ')
        .trim();
}

async function run() {
    console.log("Fetching products from WordPress...");
    const existingProducts = await fetchProducts();
    console.log(`Found ${existingProducts.length} products in WP.`);

    const existingNormalized = existingProducts.map(normalize);
    const missing = [];
    const found = [];

    targetList.forEach(target => {
        const normTarget = normalize(target);
        // Fuzzy match: check if normTarget is contained in any existing product or vice versa
        // or just strict normalized equality
        const match = existingNormalized.find(e => e === normTarget || e.includes(normTarget) || normTarget.includes(e));

        if (match) {
            found.push(target);
        } else {
            missing.push(target);
        }
    });

    console.log("\n--- FOUND PRODUCTS (" + found.length + ") ---");
    // console.log(found.join('\n'));

    console.log("\n--- MISSING PRODUCTS (" + missing.length + ") ---");
    console.log(missing.join('\n'));
}

run();

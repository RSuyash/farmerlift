const axios = require('axios');

async function debugProduct() {
    try {
        // Fetch products to find the one the user is looking at (or just the first one)
        const response = await axios.get('https://admin.farmerlift.in/wp-json/wp/v2/product?per_page=100');
        const products = response.data;

        console.log(`Found ${products.length} products.`);

        // Find a product that has "rec_crop" fields populated
        const product = products.find(p => p.acf && (p.acf.rec_crop_1_name || p.acf.rec_crop_1_img));

        if (product) {
            console.log(`Analyzing Product: ${product.title.rendered} (ID: ${product.id})`);
            console.log('--- ACF Raw Data for Crops ---');
            for (let i = 1; i <= 3; i++) { // Check first 3 slots
                console.log(`Slot ${i} Name:`, product.acf[`rec_crop_${i}_name`]);
                console.log(`Slot ${i} Img Value:`, product.acf[`rec_crop_${i}_img`]);
                console.log(`Slot ${i} Img Type:`, typeof product.acf[`rec_crop_${i}_img`]);
            }
        } else {
            console.log("No products found with Crop data populated.");
            // Dump the first product's keys to see what IS there
            if (products.length > 0) {
                console.log("Sample ACF Keys:", Object.keys(products[0].acf));
            }
        }

    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

debugProduct();

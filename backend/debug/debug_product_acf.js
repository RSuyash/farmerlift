const https = require('https');

const url = 'https://admin.farmerlift.in/wp-json/wp/v2/product?per_page=5&_embed';

https.get(url, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            const products = JSON.parse(data);
            console.log(`Fetched ${products.length} products to scan for gallery images...`);

            let found = false;
            products.forEach(p => {
                const acf = p.acf || {};
                // Check if any gallery image is present
                if (acf.gallery_image_1 || acf.gallery_image_2) {
                    found = true;
                    console.log(`\n[FOUND] Product: ${p.title.rendered} (ID: ${p.id})`);
                    console.log('Gallery Image 1:', acf.gallery_image_1, 'Type:', typeof acf.gallery_image_1);
                    console.log('Gallery Image 2:', acf.gallery_image_2, 'Type:', typeof acf.gallery_image_2);

                    if (typeof acf.gallery_image_1 === 'object') {
                        console.log('  Keys:', Object.keys(acf.gallery_image_1 || {}));
                    }
                }
            });

            if (!found) {
                console.log("\n[RESULT] No gallery images found in any of the fetched products.");
                console.log("This indicates the data is not saved in WordPress or not exposed in the API.");
            }

        } catch (e) {
            console.error('Error parsing JSON:', e.message);
        }
    });

}).on('error', (err) => {
    console.error('Error fetching data:', err.message);
});

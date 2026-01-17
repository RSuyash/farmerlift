const https = require('https');

// Searching for "19:19:19" to find "FarmerLift 19:19:19"
const url = 'https://admin.farmerlift.in/wp-json/wp/v2/product?search=19:19:19&_embed';

https.get(url, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            const products = JSON.parse(data);
            console.log(`Fetched ${products.length} products matching search "19:19:19".`);

            products.forEach(p => {
                console.log(`\n[TARGET FOUND] Product: ${p.title.rendered} (ID: ${p.id})`);
                const acf = p.acf || {};

                // Inspect Gallery Fields
                for (let i = 1; i <= 8; i++) {
                    const key = `gallery_image_${i}`;
                    const val = acf[key];

                    if (val) {
                        console.log(`${key}:`, val);
                        console.log(`  Type: ${typeof val}`);
                        if (typeof val === 'object') {
                            console.log(`  Keys: ${Object.keys(val)}`);
                            console.log(`  URL: ${val.url}`);
                        }
                    } else {
                        console.log(`${key}: [NULL/EMPTY]`);
                    }
                }
            });

            if (products.length === 0) {
                console.log("No product found with that name.");
            }

        } catch (e) {
            console.error('Error parsing JSON:', e.message);
        }
    });

}).on('error', (err) => {
    console.error('Error fetching data:', err.message);
});

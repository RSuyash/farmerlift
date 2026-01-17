const { Client } = require('ssh2');
const https = require('https');

// Fetch from public API to see what Next.js sees
const url = 'https://admin.farmerlift.in/wp-json/wp/v2/certification?per_page=10';

https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            console.log("Count:", json.length);
            json.forEach(p => {
                console.log(`[${p.id}] ${p.title.rendered}`);
                console.log('  ACF:', JSON.stringify(p.acf, null, 2));
            });
        } catch (e) {
            console.error("Parse Error", e);
        }
    });
}).on('error', (err) => {
    console.error("Error: " + err.message);
});

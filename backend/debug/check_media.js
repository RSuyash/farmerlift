const https = require('https');

const url = 'https://admin.farmerlift.in/wp-json/wp/v2/media/417';

console.log(`Fetching ${url}...`);

https.get(url, (res) => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => {
        if (res.statusCode !== 200) {
            console.error(`Status Code: ${res.statusCode}`);
            console.log(data);
            return;
        }
        try {
            const json = JSON.parse(data);
            console.log("Source URL:", json.source_url);
        } catch (e) {
            console.error("JSON Error", e);
        }
    });
}).on('error', e => console.error(e));

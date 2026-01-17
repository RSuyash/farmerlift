
// Mock Dependencies
const WP_API = 'https://admin.farmerlift.in/wp-json/wp/v2';

async function mockFetch(url) {
    console.log("Fetching:", url);
    if (url.includes('/product?slug=npk-19-19-19')) {
        return {
            json: async () => ([{
                id: 318,
                slug: 'npk-19-19-19',
                title: { rendered: 'Test Product' },
                content: { rendered: 'Desc' },
                _embedded: {},
                acf: {
                    rec_crop_1_name: 'Tomato',
                    rec_crop_1_img: 101, // ID to resolve
                    rec_crop_2_name: 'Brinjal',
                    rec_crop_2_img: 'https://example.com/brinjal.png', // URL already
                    rec_crop_3_name: 'Potato',
                    rec_crop_3_img: 102 // Another ID
                }
            }])
        };
    }
    if (url.includes('/media?include=')) {
        // Extract IDs from URL for dynamic response
        // url like .../media?include=101,102&...
        const match = url.match(/include=([^&]+)/);
        const ids = match ? match[1].split(',') : [];

        return {
            json: async () => (ids.map(id => ({
                id: parseInt(id),
                source_url: `https://resolved.com/img-${id}.png`
            })))
        };
    }
    return { json: async () => [] };
}

// SIMULATE mapWpProductToApp (Partial Logic for Crops)
function mapWpProductToApp(wpPost, mediaMap = {}) {
    const acf = wpPost.acf || {};

    // ... (omitted other parts)

    return {
        id: wpPost.slug,
        recommendedCrops: (() => {
            const crops = [];
            for (let i = 1; i <= 12; i++) {
                const name = acf[`rec_crop_${i}_name`];
                const rawImg = acf[`rec_crop_${i}_img`];

                let finalImg = '/images/farmerlift_icon_transparent.png'; // Default Fallback

                if (typeof rawImg === 'string' && rawImg.trim() !== '') {
                    finalImg = rawImg;
                } else if (typeof rawImg === 'object' && rawImg?.url) {
                    finalImg = rawImg.url;
                } else if (typeof rawImg === 'number') {
                    // Try to resolve from mediaMap if available
                    if (mediaMap[rawImg]) {
                        finalImg = mediaMap[rawImg];
                    }
                }

                if (name) {
                    crops.push({
                        name: name,
                        image: finalImg
                    });
                }
            }
            return crops;
        })()
    };
}

// SIMULATE getProductById
async function getProductById(slug) {
    const res = await mockFetch(`${WP_API}/product?slug=${slug}&_embed`);
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return null;

    const post = data[0];
    const acf = post.acf || {};
    const mediaIds = [];

    // Collect all crop image IDs
    for (let i = 1; i <= 12; i++) {
        const val = acf[`rec_crop_${i}_img`];
        if (typeof val === 'number') {
            mediaIds.push(val);
        }
    }

    // Batch Fetch media if we found IDs
    const mediaMap = {};
    if (mediaIds.length > 0) {
        try {
            const uniqueIds = Array.from(new Set(mediaIds));
            const mediaRes = await mockFetch(`${WP_API}/media?include=${uniqueIds.join(',')}&per_page=100&_fields=id,source_url`);
            const mediaData = await mediaRes.json();

            if (Array.isArray(mediaData)) {
                mediaData.forEach((m) => {
                    if (m.id && m.source_url) {
                        mediaMap[m.id] = m.source_url;
                    }
                });
            }
        } catch (e) {
            console.error("Failed to resolve crop images", e);
        }
    }

    return mapWpProductToApp(post, mediaMap);
}

// RUN TEST
getProductById('npk-19-19-19').then(product => {
    console.log("Recommended Crops Result:");
    console.log(JSON.stringify(product.recommendedCrops, null, 2));

    // Assertion
    const crop1 = product.recommendedCrops.find(c => c.name === 'Tomato');
    const crop2 = product.recommendedCrops.find(c => c.name === 'Brinjal');
    const crop3 = product.recommendedCrops.find(c => c.name === 'Potato');

    if (crop1.image === 'https://resolved.com/img-101.png' &&
        crop2.image === 'https://example.com/brinjal.png' &&
        crop3.image === 'https://resolved.com/img-102.png') {
        console.log("SUCCESS: All images resolved correctly.");
    } else {
        console.error("FAILURE: Images not resolved as expected.");
    }
});

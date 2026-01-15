const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const path = require('path');

// --- CONFIGURATION ---
const WP_URL = 'https://admin.farmerlift.in/wp-json/wp/v2';
const WP_USER = 'farmerliftmanagement@gmail.com';
const WP_APP_PASS = 'eMBZ A3TF BrVc fWaI Smfa ZQ3s';

const authHeader = {
    'Authorization': 'Basic ' + Buffer.from(`${WP_USER}:${WP_APP_PASS}`).toString('base64')
};

// --- HELPER: Upload Media if not exists ---
async function uploadMedia(filePath, title) {
    try {
        const fileName = path.basename(filePath);

        // Check if media exists by title
        const existing = await axios.get(`${WP_URL}/media?search=${encodeURIComponent(title)}`, { headers: authHeader });
        if (existing.data.length > 0) {
            console.log(`   🔄 Image exists: ${title} (ID: ${existing.data[0].id})`);
            return existing.data[0].id;
        }

        // Upload
        const form = new FormData();
        form.append('file', fs.createReadStream(filePath));
        form.append('title', title);
        form.append('alt_text', title);

        const res = await axios.post(`${WP_URL}/media`, form, {
            headers: {
                ...authHeader,
                ...form.getHeaders()
            }
        });

        console.log(`   ✅ Uploaded: ${title} (ID: ${res.data.id})`);
        return res.data.id;
    } catch (e) {
        console.error(`   ❌ Failed to upload ${title}:`, e.message);
        return null;
    }
}

// --- 1. SETTINGS MIGRATION (Global Config) ---
async function migrateSettings() {
    console.log('\n🚀 Migrating Global Settings...');
    try {
        // Check if config exists
        const res = await axios.get(`${WP_URL}/site_config`, { headers: authHeader });
        let configId = res.data.length > 0 ? res.data[0].id : null;

        const payload = {
            title: 'Global Configuration',
            status: 'publish',
            acf: {
                hq_address: "Plot No. A2, MIDC Industrial Area,\nKandhar, Dist. Nanded, Maharashtra – 431714",
                contact_email: "farmerliftmanagement@gmail.com",
                contact_phone: "+91 87881 13105",
                whatsapp_number: "+918788113105",
                footer_text: "Empowering farmers with world-class agricultural inputs and technology.",
                // Attempting to save business_hours even if field def missing in WP UI yet
                business_hours: "Mon - Sat: 9AM - 7PM"
            }
        };

        if (configId) {
            await axios.post(`${WP_URL}/site_config/${configId}`, payload, { headers: authHeader });
            console.log(`   ✅ Updated Settings (ID: ${configId})`);
        } else {
            const createRes = await axios.post(`${WP_URL}/site_config`, payload, { headers: authHeader });
            console.log(`   ✅ Created Settings (ID: ${createRes.data.id})`);
        }

    } catch (e) {
        console.error('   ❌ Settings Migration Failed:', e.message);
        if (e.response) console.error(e.response.data);
    }
}

// --- 2. HERO SLIDES MIGRATION ---
async function migrateHero() {
    console.log('\n🚀 Migrating Home Banners...');

    // User requested specific slides
    const slides = [
        {
            file: 'public/images/hero/slide-1.png',
            head: 'FarmerLift',
            sub: 'By The Farmer, For The Farmers',
            btnText: 'About Us',
            btnUrl: '/about'
        },
        {
            file: 'public/images/hero/slide-2.png',
            head: 'Quality Inputs for Better Harvests',
            sub: 'Premium Seeds & Fertilizers',
            btnText: 'View Products',
            btnUrl: '/products'
        },
        {
            file: 'public/images/hero/slide-3.png',
            head: 'Your Partner in Agriculture',
            sub: 'Expert Guidance & Support',
            btnText: 'Contact Us',
            btnUrl: '/contact'
        }
    ];

    for (const slide of slides) {
        try {
            // Check duplicate by title
            const search = await axios.get(`${WP_URL}/hero_slide?search=${encodeURIComponent(slide.head)}`, { headers: authHeader });
            if (search.data.length > 0) {
                console.log(`   🔄 Slide exists: ${slide.head} (ID: ${search.data[0].id}) - Skipping`);
                continue;
            }

            // Upload Image
            const mediaId = await uploadMedia(slide.file, slide.head + ' Banner');

            // Create Post
            const payload = {
                title: slide.head,
                status: 'publish',
                featured_media: mediaId,
                acf: {
                    heading: slide.head,
                    subtext: slide.sub,
                    button_text: slide.btnText,
                    button_url: slide.btnUrl
                }
            };

            const createRes = await axios.post(`${WP_URL}/hero_slide`, payload, { headers: authHeader });
            console.log(`   ✅ Created Slide: ${slide.head} (ID: ${createRes.data.id})`);

        } catch (e) {
            console.error(`   ❌ Failed slide ${slide.head}:`, e.message);
        }
    }
}

// --- 3. PAGE MIGRATION (About, Contact) ---
async function migratePages() {
    console.log('\n🚀 Migrating Pages...');

    const pages = [
        {
            title: 'About Us',
            slug: 'about-us',
            imageFile: 'public/images/hero/slide-1.png', // Reuse hero image 1
            acf: {
                banner_heading: 'About FarmerLift',
                banner_subtext: 'We bridge the gap between traditional farming and modern technology.',
                mission_text: '<p>Our mission is to provide high-quality agricultural inputs...</p>',
                // banner_image and about_image handled via media upload
            }
        },
        {
            title: 'Contact',
            slug: 'contact',
            imageFile: 'public/images/hero/slide-3.png', // Reuse hero image 3 (Partnership)
            acf: {
                banner_heading: 'Contact Support',
                banner_subtext: 'By The Farmer, For The Farmers. Reach out for any inquiries.',
            }
        }
    ];

    for (const p of pages) {
        try {
            // Check if page exists
            const search = await axios.get(`${WP_URL}/pages?slug=${p.slug}`, { headers: authHeader });
            let pageId = search.data.length > 0 ? search.data[0].id : null;

            // Upload Banner Image
            const mediaId = await uploadMedia(p.imageFile, p.title + ' Banner');

            // Prepare Payload
            const payload = {
                title: p.title,
                status: 'publish',
                acf: {
                    ...p.acf,
                    // Use URL for ACF Image fields as per user request/functions.php return_format='url'
                    // BUT my code handles ID fallback? No, existing code in cms.ts expects URL or ID.
                    // Wait, functions.php says return_format='url'.
                    // If return_format is 'url', ACF REST API returns URL string.
                    // BUT when WRITING to ACF via REST API, we normally send attachment ID.
                    // Let's send ID. ACF is smart enough to return URL if configured.
                    banner_image: mediaId,
                    about_image: mediaId // Reusing for simplicity
                }
            };

            if (pageId) {
                // Update
                await axios.post(`${WP_URL}/pages/${pageId}`, payload, { headers: authHeader });
                console.log(`   ✅ Updated Page: ${p.title} (ID: ${pageId})`);
            } else {
                // Create
                await axios.post(`${WP_URL}/pages`, payload, { headers: authHeader });
                console.log(`   ✅ Created Page: ${p.title}`);
            }

        } catch (e) {
            console.error(`   ❌ Failed Page ${p.title}:`, e.message);
            if (e.response) console.error(e.response.data);
        }
    }
}

// --- MAIN ---
(async () => {
    console.log('--- STARTING CMS MIGRATION & SYNC ---');
    await migrateSettings();
    await migrateHero();
    await migratePages();
    console.log('\n✨ Migration Complete!');
})();

// lib/cms.ts
const WP_API = 'https://admin.farmerlift.in/wp-json/wp/v2';
import { mapWpProductToApp } from './mapper';

// 1. GET HOME BANNERS (Carousel)
export async function getHomeBanners() {
    const res = await fetch(`${WP_API}/hero_slide?_embed&per_page=5`, { next: { revalidate: 60 } });
    const data = await res.json();
    if (!Array.isArray(data)) return [];

    return data.map((item: any) => ({
        id: item.id,
        image: item._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
        heading: item.acf?.heading || item.title.rendered,
        subtext: item.acf?.subtext || '',
        buttonText: item.acf?.button_text || 'Explore',
        buttonUrl: item.acf?.button_url || '/products' // Default to products if missing
    }));
}

// 2. GET PAGE SPECIFIC BANNER (For Product, Blog, About pages)
export async function getPageBanner(slug: string) {
    // Fetches a WP Page by its slug to get banner data
    const res = await fetch(`${WP_API}/pages?slug=${slug}&_embed`, { next: { revalidate: 60 } });
    const data = await res.json();

    if (!data || data.length === 0) return null;
    const page = data[0];

    return {
        heading: page.acf?.banner_heading || page.title.rendered,
        subtext: page.acf?.banner_subtext || '',
        // Validate image is a URL string (ACF might return ID)
        image: typeof page.acf?.banner_image === 'string' ? page.acf.banner_image : null,
        // Extra About Us Content (Only exists on About Page)
        aboutContent: {
            mission: page.acf?.mission_text || '',
            image: typeof page.acf?.about_image === 'string' ? page.acf.about_image : null
        }
    };
}

// 3. GET GLOBAL SETTINGS (Footer, Contact, Channels)
export async function getSiteConfig() {
    const res = await fetch(`${WP_API}/site_config?per_page=1`, { next: { revalidate: 60 } });
    const data = await res.json();

    if (!data || data.length === 0) return null;
    const s = data[0].acf;

    return {
        hqAddress: s.hq_address || '',
        email: s.contact_email || '', // Corrected key to match ACF definition in functions.php
        phone: s.contact_phone || '', // Corrected key to match ACF definition in functions.php
        channels: s.direct_channels ? s.direct_channels.split('\n') : [],
        businessHours: s.business_hours || 'Mon - Sat: 9AM - 7PM', // Added field with default
        footerText: s.footer_text || '' // Corrected key to match ACF definition
    };
}

// 4. GET GALLERIES
export async function getPhotoGallery() {
    const res = await fetch(`${WP_API}/photo_resource?_embed&per_page=50`, { next: { revalidate: 60 } });
    const data = await res.json();
    return Array.isArray(data) ? data.map((item: any) => ({
        id: item.id,
        title: item.title.rendered,
        image: item._embedded?.['wp:featuredmedia']?.[0]?.source_url || ''
    })) : [];
}

export async function getVideoGallery() {
    const res = await fetch(`${WP_API}/video_resource?_embed&per_page=50`, { next: { revalidate: 60 } });
    const data = await res.json();
    return Array.isArray(data) ? data.map((item: any) => ({
        id: item.id,
        title: item.title.rendered,
        thumbnail: item._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
        videoUrl: item.acf?.video_url || ''
    })) : [];
}

// 5. GET ALL PRODUCTS
export async function getAllProducts() {
    // 100 per page to catch most, loop if needed later
    const res = await fetch(`${WP_API}/product?_embed&per_page=100`, { next: { revalidate: 60 } });
    const data = await res.json();
    return Array.isArray(data) ? data.map(mapWpProductToApp) : [];
}

export async function getProductsByCategory(categoryId: string) {
    const all = await getAllProducts();
    return all.filter(p => p.category === categoryId);
}

export async function getProductById(slug: string) {
    const res = await fetch(`${WP_API}/product?slug=${slug}&_embed`, { next: { revalidate: 60 } });
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return null;
    return mapWpProductToApp(data[0]);
}
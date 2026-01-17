// lib/cms.ts
const WP_API = 'https://admin.farmerlift.in/wp-json/wp/v2';
import { Product, ProductCategory } from '@/types/product';
import { BlogPost } from '@/types/blog';
import { mapWpProductToApp, mapWpPostToBlog } from './mapper';

// 1. GET HOME BANNERS (Carousel)
export async function getHomeBanners() {
    const res = await fetch(`${WP_API}/hero_slide?_embed&per_page=5`, { next: { revalidate: 60 } });
    const data = await res.json();
    if (!Array.isArray(data)) return [];

    return data.map((item: any) => {
        // Strip HTML p tags from content for the subtext, if content.rendered is used
        const rawSubtext = item.acf?.subtext || item.content?.rendered || '';
        const cleanSubtext = rawSubtext.replace(/<[^>]+>/g, '');

        return {
            id: item.id,
            image: item._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
            heading: item.acf?.heading || item.title.rendered,
            subtext: cleanSubtext, // Use the cleaned subtext
            buttonText: item.acf?.button_text || 'Explore',
            buttonUrl: item.acf?.button_url || '/products' // Default to products if missing
        };
    });
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
        footerText: s.footer_text || '', // Corrected key to match ACF definition
        social: {
            facebook: s.facebook_url || '',
            twitter: s.twitter_url || '',
            instagram: s.instagram_url || '',
            youtube: s.youtube_url || '',
            linkedin: s.linkedin_url || ''
        }
    };
}

// 4. GET GALLERIES


// 5. GET ALL PRODUCTS
export async function getAllProducts() {
    // 100 per page to catch most, loop if needed later
    const res = await fetch(`${WP_API}/product?_embed&per_page=100`, { next: { revalidate: 60 } });
    const data = await res.json();
    return Array.isArray(data) ? data.map(p => mapWpProductToApp(p)) : [];
}

export async function getProductsByCategory(categoryId: string) {
    const all = await getAllProducts();
    return all.filter(p => p.category === categoryId);
}

export async function getProductById(slug: string) {
    const res = await fetch(`${WP_API}/product?slug=${slug}&_embed`, { next: { revalidate: 60 } });
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return null;

    const post = data[0];
    const acf = post.acf || {};
    const mediaIds: number[] = [];

    // Collect all crop image IDs
    for (let i = 1; i <= 12; i++) {
        const val = acf[`rec_crop_${i}_img`];
        if (typeof val === 'number') {
            mediaIds.push(val);
        }
    }

    // Batch Fetch media if we found IDs
    const mediaMap: Record<number, string> = {};
    if (mediaIds.length > 0) {
        try {
            // Uniq IDs
            const uniqueIds = Array.from(new Set(mediaIds));
            // Max 100 per request, we likely have < 12, so one request is fine.
            const mediaRes = await fetch(`${WP_API}/media?include=${uniqueIds.join(',')}&per_page=100&_fields=id,source_url`, { next: { revalidate: 3600 } }); // Cache longer
            const mediaData = await mediaRes.json();

            if (Array.isArray(mediaData)) {
                mediaData.forEach((m: any) => {
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

export async function getAllPosts(limit?: number) {
    const perPage = limit ? `&per_page=${limit}` : '&per_page=100';
    const res = await fetch(`${WP_API}/posts?_embed${perPage}`, { next: { revalidate: 60 } });
    const data = await res.json();
    return Array.isArray(data) ? data.map(mapWpPostToBlog) : [];
}

export async function getPostBySlug(slug: string) {
    const res = await fetch(`${WP_API}/posts?slug=${slug}&_embed`, { next: { revalidate: 60 } });
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return null;
    return mapWpPostToBlog(data[0]);
}

// 5. GET GALLERIES (Photo & Video)
export async function getPhotoGallery() {
    const res = await fetch(`${WP_API}/photo_resource?_embed&per_page=100`, { next: { revalidate: 60 } });
    const data = await res.json();
    if (!Array.isArray(data)) return [];

    return data.map((item: any) => ({
        id: item.id,
        title: item.title.rendered,
        image: item._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/images/placeholder.jpg'
    }));
}

export async function getVideoGallery() {
    const res = await fetch(`${WP_API}/video_resource?_embed&per_page=100`, { next: { revalidate: 60 } });
    const data = await res.json();
    if (!Array.isArray(data)) return [];

    return data.map((item: any) => ({
        id: item.id,
        title: item.title.rendered,
        thumbnail: item._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/images/video-placeholder.jpg',
        videoUrl: item.acf?.video_url || '',
        date: item.acf?.event_date || item.date
    }));
}
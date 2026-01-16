import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    const WP_API = 'https://admin.farmerlift.in/wp-json/wp/v2';

    // 1. Fetch the PRODUCT by ID to find its current slug
    // We only need the 'slug' field to perform the redirect
    try {
        const res = await fetch(`${WP_API}/product/${id}?_fields=slug`, {
            next: { revalidate: 0 } // Never cache this lookup, always get latest slug
        });

        if (!res.ok) {
            // If ID not found (404), redirect to main catalog
            console.error(`QR Redirect Error: Product ID ${id} not found.`);
            return NextResponse.redirect(new URL('/products', request.url));
        }

        const data = await res.json();
        const slug = data.slug;

        if (slug) {
            // 2. SUCCESS: Redirect to the actual product page
            // Use 307 (Temporary Redirect) so browsers always check for new slugs
            return NextResponse.redirect(new URL(`/products/${slug}`, request.url));
        }

    } catch (error) {
        console.error("QR Redirect Network Error:", error);
    }

    // Fallback for any other errors -> Go to Catalog
    return NextResponse.redirect(new URL('/products', request.url));
}

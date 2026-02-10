import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const WP_API = 'https://admin.farmerlift.in/wp-json';
    const SITE_URL = 'https://farmerlift.in';

    try {
        // 1. Try SKU lookup first (handles both current SKU and SKU history)
        const skuRes = await fetch(`${WP_API}/farmerlift/v1/product-by-sku/${id}`, {
            next: { revalidate: 0 }
        });

        if (skuRes.ok) {
            const skuData = await skuRes.json();
            if (skuData.found && skuData.slug) {
                return NextResponse.redirect(`${SITE_URL}/products/${skuData.slug}?tab=qr-details`, 307);
            }
        }

        // 2. Fallback: Try WordPress post ID lookup (backward compatibility)
        const idRes = await fetch(`${WP_API}/wp/v2/product/${id}?_fields=slug`, {
            next: { revalidate: 0 }
        });

        if (idRes.ok) {
            const data = await idRes.json();
            if (data.slug) {
                return NextResponse.redirect(`${SITE_URL}/products/${data.slug}?tab=qr-details`, 307);
            }
        }

    } catch (error) {
        console.error("QR Redirect Error:", error);
    }

    // 3. Fallback: Redirect to catalogue
    return NextResponse.redirect(`${SITE_URL}/products`, 307);
}

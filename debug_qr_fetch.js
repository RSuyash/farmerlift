// Native fetch is available in Node 18+
// CONNECTIVITY TEST SCRIPT
async function testRedirect(id) {
    console.log(`Testing Redirect for ID: ${id}`);
    const WP_API = 'https://admin.farmerlift.in/wp-json/wp/v2';

    // NOTE: The endpoint is singular 'products' usually, but WP V2 is 'product' ONLY if custom post type REST base is 'product'.
    // Standard WP Post Type 'product' (WooCommerce) -> /wc/v3 or /wp/v2/product
    // If it's a CPT, it defaults to the slug. 
    // In our register_post_type, we set 'rest_base' => 'product'. So it should be /wp/v2/product

    const url = `${WP_API}/product/${id}?_fields=slug`;
    console.log(`Fetching: ${url}`);

    try {
        const res = await fetch(url);
        console.log(`Status: ${res.status}`);

        if (!res.ok) {
            console.error("❌ API Error (Not Found or Server Error)");
            console.log(await res.text()); // Print error body
            return;
        }

        const data = await res.json();
        console.log("Response Data:", data);

        if (data.slug) {
            console.log(`✅ SUCCESS! Should redirect to: /products/${data.slug}`);
        } else {
            console.error("❌ FAILURE: Slug not found in response.");
        }

    } catch (error) {
        console.error("❌ Network Error:", error);
    }
}

// Test with the known Product ID 318 (FarmerLift 19:19:19)
testRedirect(318);

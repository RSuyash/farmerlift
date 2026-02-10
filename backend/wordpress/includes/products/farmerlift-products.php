<?php
/**
 * FarmerLift Product Management Module
 * 
 * Purpose: Provides a Product Manager admin page for managing Product SKU codes.
 * Features:
 *  - Custom SKU assignment (e.g., WSN-001, OBF-003)
 *  - SKU History tracking (old SKUs are preserved and still resolve)
 *  - Bulk SKU auto-generation by category
 *  - Inline SKU editing via AJAX
 * 
 * Included by: functions.php
 */

if ( ! defined( 'ABSPATH' ) ) exit;

// --- Category Prefix Map ---
define('FARMERLIFT_SKU_PREFIXES', array(
    'water-soluble-npk'        => 'WSN',
    'water-soluble-special'    => 'WSS',
    'organic-bio-fertilizers'  => 'OBF',
    'straight-micronutrients'  => 'SMN',
    'micronutrients-mixtures'  => 'MMX',
    'biostimulants-pgrs'       => 'BPG',
    'chelated-micronutrients'  => 'CMN',
    'secondary-nutrients'      => 'SCN',
    'other-products'           => 'OTH',
));

// 1. REGISTER ADMIN MENU
add_action('admin_menu', 'farmerlift_register_products_menu');
function farmerlift_register_products_menu() {
    add_menu_page(
        'Product Manager',
        'Product Manager',
        'manage_options',
        'farmerlift-products',
        'farmerlift_render_products_page',
        'dashicons-tag',
        24
    );
}

// 2. RENDER PAGE (loads view)
function farmerlift_render_products_page() {
    include __DIR__ . '/views/dashboard.php';
}

// 3. INCLUDE AJAX HANDLERS
require_once __DIR__ . '/ajax/actions.php';

// 4. SKU LOOKUP API ENDPOINT
add_action('rest_api_init', function() {
    register_rest_route('farmerlift/v1', '/product-by-sku/(?P<sku>[a-zA-Z0-9\-]+)', array(
        'methods'  => 'GET',
        'callback' => 'farmerlift_product_by_sku',
        'permission_callback' => '__return_true',
    ));
});

function farmerlift_product_by_sku( WP_REST_Request $request ) {
    $sku = sanitize_text_field( $request->get_param('sku') );
    
    // 1. Search by current SKU
    $args = array(
        'post_type'      => 'product',
        'posts_per_page' => 1,
        'post_status'    => 'publish',
        'meta_query'     => array(
            array(
                'key'   => 'product_sku',
                'value' => $sku,
            )
        )
    );
    $posts = get_posts($args);
    
    if (!empty($posts)) {
        return new WP_REST_Response(array(
            'found'    => true,
            'match'    => 'current_sku',
            'slug'     => $posts[0]->post_name,
            'id'       => $posts[0]->ID,
            'title'    => $posts[0]->post_title,
        ), 200);
    }
    
    // 2. Search in SKU history across all products
    $all_products = get_posts(array(
        'post_type'      => 'product',
        'posts_per_page' => -1,
        'post_status'    => 'publish',
    ));
    
    foreach ($all_products as $product) {
        $history = get_post_meta($product->ID, 'product_sku_history', true);
        if (is_array($history) && in_array($sku, $history)) {
            return new WP_REST_Response(array(
                'found'    => true,
                'match'    => 'sku_history',
                'slug'     => $product->post_name,
                'id'       => $product->ID,
                'title'    => $product->post_title,
            ), 200);
        }
    }
    
    // 3. Not found
    return new WP_REST_Response(array(
        'found' => false,
    ), 404);
}
?>

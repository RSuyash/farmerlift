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
    register_rest_route('farmerlift/v1', '/product-by-sku/(?P<sku>[\w-]+)', array(
        'methods'  => 'GET',
        'callback' => 'farmerlift_product_by_sku',
        'permission_callback' => '__return_true',
    ));
});

function farmerlift_product_by_sku( WP_REST_Request $request ) {
    global $wpdb;
    $sku = sanitize_text_field( $request->get_param('sku') );
    
    // 0. Search by Permanent Token
    $token_product = $wpdb->get_var($wpdb->prepare(
        "SELECT post_id FROM {$wpdb->postmeta} WHERE meta_key = 'qr_permanent_token' AND meta_value = %s",
        $sku
    ));
    if ($token_product) {
        $p = get_post($token_product);
        if ($p && $p->post_status === 'publish') {
            return new WP_REST_Response(array(
                'found'    => true,
                'match'    => 'permanent_token',
                'slug'     => $p->post_name,
                'id'       => $p->ID,
                'title'    => $p->post_title,
            ), 200);
        }
    }

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
    
    // 2. Optimized O(1) Search in SKU history
    $like_sku = '%' . $wpdb->esc_like( '"' . $sku . '"' ) . '%';
    $history_post_id = $wpdb->get_var($wpdb->prepare(
        "SELECT post_id FROM {$wpdb->postmeta} WHERE meta_key = 'product_sku_history' AND meta_value LIKE %s LIMIT 1",
        $like_sku
    ));
    
    if ($history_post_id) {
        $p = get_post($history_post_id);
        if ($p && $p->post_status === 'publish') {
            return new WP_REST_Response(array(
                'found'    => true,
                'match'    => 'sku_history',
                'slug'     => $p->post_name,
                'id'       => $p->ID,
                'title'    => $p->post_title,
            ), 200);
        }
    }
    
    // 3. Not found
    return new WP_REST_Response(array(
        'found' => false,
    ), 404);
}
?>

<?php
/**
 * FarmerLift Product Manager - AJAX Handlers
 * 
 * Handles:
 *  - farmerlift_update_sku: Update a product's SKU (pushes old to history)
 *  - farmerlift_bulk_generate_skus: Auto-assign SKUs for all products based on category
 */

if ( ! defined( 'ABSPATH' ) ) exit;

// ─── UPDATE SINGLE SKU ───────────────────────────────────────────
add_action('wp_ajax_farmerlift_update_sku', 'farmerlift_ajax_update_sku');
function farmerlift_ajax_update_sku() {
    if (!current_user_can('manage_options')) {
        wp_send_json_error('Unauthorized');
    }
    
    $post_id = intval($_POST['post_id'] ?? 0);
    $new_sku = strtoupper(sanitize_text_field($_POST['new_sku'] ?? ''));
    
    if (!$post_id || empty($new_sku)) {
        wp_send_json_error('Product ID and SKU are required.');
    }
    
    // Check if locked
    $is_locked = get_post_meta($post_id, 'product_sku_locked', true);
    if ($is_locked == '1' || $is_locked === 'true') {
        wp_send_json_error('This SKU is locked for printing. You must unlock it first.');
    }
    
    // Validate SKU format (LETTERS-DIGITS, e.g., WSN-001)
    if (!preg_match('/^[A-Z]{2,4}-\d{3,4}$/', $new_sku)) {
        wp_send_json_error('Invalid SKU format. Use format like WSN-001 or OBF-0012.');
    }
    
    // Check uniqueness: no other product should have this as current SKU
    $existing = get_posts(array(
        'post_type'      => 'product',
        'posts_per_page' => 1,
        'post_status'    => 'publish',
        'meta_query'     => array(
            array(
                'key'   => 'product_sku',
                'value' => $new_sku,
            )
        ),
        'exclude'        => array($post_id),
    ));
    
    if (!empty($existing)) {
        wp_send_json_error('SKU "' . $new_sku . '" is already assigned to "' . $existing[0]->post_title . '" (ID: ' . $existing[0]->ID . ').');
    }
    
    // Also check SKU history across all products
    $all_products = get_posts(array(
        'post_type'      => 'product',
        'posts_per_page' => -1,
        'post_status'    => 'publish',
        'exclude'        => array($post_id),
    ));
    
    foreach ($all_products as $product) {
        $history = get_post_meta($product->ID, 'product_sku_history', true);
        if (is_array($history) && in_array($new_sku, $history)) {
            wp_send_json_error('SKU "' . $new_sku . '" exists in history of "' . $product->post_title . '" (ID: ' . $product->ID . '). Cannot reuse.');
        }
    }
    
    // Get old SKU and push to history
    $old_sku = get_post_meta($post_id, 'product_sku', true);
    if (!empty($old_sku) && $old_sku !== $new_sku) {
        $history = get_post_meta($post_id, 'product_sku_history', true);
        if (!is_array($history)) {
            $history = array();
        }
        if (!in_array($old_sku, $history)) {
            $history[] = $old_sku;
        }
        update_post_meta($post_id, 'product_sku_history', $history);
    }
    
    // Save new SKU
    update_post_meta($post_id, 'product_sku', $new_sku);
    
    // Return updated data
    $history = get_post_meta($post_id, 'product_sku_history', true);
    
    // Purge LiteSpeed REST API cache so redirects update instantly
    do_action('litespeed_purge_all');
    
    wp_send_json_success(array(
        'sku'     => $new_sku,
        'history' => is_array($history) ? $history : array(),
    ));
}

// ─── BULK GENERATE SKUs ──────────────────────────────────────────
add_action('wp_ajax_farmerlift_bulk_generate_skus', 'farmerlift_ajax_bulk_generate');
function farmerlift_ajax_bulk_generate() {
    if (!current_user_can('manage_options')) {
        wp_send_json_error('Unauthorized');
    }
    
    $prefixes = FARMERLIFT_SKU_PREFIXES;
    $skip_existing = isset($_POST['skip_existing']) && $_POST['skip_existing'] === 'true';
    
    $products = get_posts(array(
        'post_type'      => 'product',
        'posts_per_page' => -1,
        'post_status'    => 'publish',
        'orderby'        => 'title',
        'order'          => 'ASC',
    ));
    
    $counters = array(); // Track next number per prefix
    $updated = 0;
    $skipped = 0;
    
    // First pass: find existing max numbers per prefix
    foreach ($products as $product) {
        $existing_sku = get_post_meta($product->ID, 'product_sku', true);
        if (!empty($existing_sku) && preg_match('/^([A-Z]{2,4})-(\d{3,4})$/', $existing_sku, $matches)) {
            $prefix = $matches[1];
            $num = intval($matches[2]);
            if (!isset($counters[$prefix]) || $num >= $counters[$prefix]) {
                $counters[$prefix] = $num + 1;
            }
        }
    }
    
    // Second pass: assign SKUs
    foreach ($products as $product) {
        $existing_sku = get_post_meta($product->ID, 'product_sku', true);
        
        // Skip if locked
        $is_locked = get_post_meta($product->ID, 'product_sku_locked', true);
        if ($is_locked == '1' || $is_locked === 'true') {
            $skipped++;
            continue;
        }

        // Skip if already has SKU and skip_existing is true
        if ($skip_existing && !empty($existing_sku)) {
            $skipped++;
            continue;
        }
        
        // Get category
        $terms = get_the_terms($product->ID, 'category');
        $prefix = 'OTH'; // Default
        
        if ($terms && !is_wp_error($terms)) {
            foreach ($terms as $term) {
                if (isset($prefixes[$term->slug])) {
                    $prefix = $prefixes[$term->slug];
                    break;
                }
            }
        }
        
        // Get next number
        if (!isset($counters[$prefix])) {
            $counters[$prefix] = 1;
        }
        $num = $counters[$prefix];
        $new_sku = $prefix . '-' . str_pad($num, 3, '0', STR_PAD_LEFT);
        $counters[$prefix] = $num + 1;
        
        // Push old SKU to history if exists
        if (!empty($existing_sku) && $existing_sku !== $new_sku) {
            $history = get_post_meta($product->ID, 'product_sku_history', true);
            if (!is_array($history)) $history = array();
            if (!in_array($existing_sku, $history)) {
                $history[] = $existing_sku;
            }
            update_post_meta($product->ID, 'product_sku_history', $history);
        }
        
        update_post_meta($product->ID, 'product_sku', $new_sku);
        $updated++;
    }

    // Purge LiteSpeed REST API cache so bulk updates reflect instantly
    do_action('litespeed_purge_all');
    
    wp_send_json_success(array(
        'updated' => $updated,
        'skipped' => $skipped,
        'total'   => count($products),
    ));
}

// ─── TOGGLE SKU LOCK ───────────────────────────────────────────
add_action('wp_ajax_farmerlift_toggle_sku_lock', 'farmerlift_ajax_toggle_sku_lock');
function farmerlift_ajax_toggle_sku_lock() {
    if (!current_user_can('manage_options')) {
        wp_send_json_error('Unauthorized');
    }
    
    $post_id = intval($_POST['post_id'] ?? 0);
    $do_lock = isset($_POST['lock']) && $_POST['lock'] === 'true';
    
    if (!$post_id) wp_send_json_error('Post ID required');
    
    if ($do_lock) {
        update_post_meta($post_id, 'product_sku_locked', '1');
    } else {
        delete_post_meta($post_id, 'product_sku_locked');
    }
    
    wp_send_json_success(array('locked' => $do_lock));
}
?>

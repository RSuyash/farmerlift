<?php
/**
 * FarmerLift Product Manager - History AJAX Handlers
 */

if ( ! defined( 'ABSPATH' ) ) exit;

// ─── REMOVE INDIVIDUAL SKU FROM HISTORY ──────────────────────────
add_action('wp_ajax_farmerlift_remove_history_sku', 'farmerlift_ajax_remove_history_sku');
function farmerlift_ajax_remove_history_sku() {
    if (!current_user_can('manage_options')) {
        wp_send_json_error('Unauthorized');
    }
    
    $post_id = intval($_POST['post_id'] ?? 0);
    $sku_to_remove = sanitize_text_field($_POST['sku_to_remove'] ?? '');
    
    if (!$post_id || empty($sku_to_remove)) {
        wp_send_json_error('Product ID and SKU to remove are required.');
    }

    $history = get_post_meta($post_id, 'product_sku_history', true);
    if (!is_array($history)) {
        wp_send_json_error('No history found for this product.');
    }

    // Find and remove the exact SKU
    $index = array_search($sku_to_remove, $history);
    if ($index !== false) {
        unset($history[$index]);
        $history = array_values($history); // Re-index array alphabetically
        
        if (empty($history)) {
            delete_post_meta($post_id, 'product_sku_history'); // Just clear it if empty
        } else {
            update_post_meta($post_id, 'product_sku_history', $history);
        }
        
        wp_send_json_success(array(
            'history' => $history,
            'message' => 'SKU removed from history.'
        ));
    } else {
        wp_send_json_error('SKU not found in history.');
    }
}

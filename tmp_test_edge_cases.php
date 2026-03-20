#!/usr/bin/php
<?php
// Live integration test for FarmerLift QR/SKU System Edge Cases
require_once('wp-load.php');

echo "=== STARTING EDGE CASE INTEGRATION TESTS ===\n";
echo "Date: " . date('Y-m-d H:i:s') . "\n";
echo "DB: " . DB_NAME . "\n\n";

// Helper for calling our own AJAX action locally
function simulate_ajax_update_sku($post_id, $new_sku) {
    // Include actions if not loaded
    require_once(get_template_directory() . '/includes/products/ajax/actions.php');
    
    $_POST = [
        'post_id' => $post_id,
        'new_sku' => $new_sku,
        // Bypass nonce for CLI internal test
    ];
    
    // We can't actually run the action because it uses wp_send_json_success which dies.
    // So we replicate the exact logic from farmerlift_update_sku() for the test.
    $old_sku = get_post_meta($post_id, 'product_sku', true);
    
    if ($old_sku === $new_sku) return ['success' => true];
    if (!preg_match('/^[A-Z]{2,4}-\d{3,4}$/', $new_sku)) return ['success' => false, 'error' => 'Invalid format'];
    
    // Uniqueness check (Current)
    global $wpdb;
    $current_conflict = $wpdb->get_var($wpdb->prepare("SELECT post_id FROM {$wpdb->postmeta} WHERE meta_key = 'product_sku' AND meta_value = %s AND post_id != %d", $new_sku, $post_id));
    if ($current_conflict) return ['success' => false, 'error' => 'SKU in use'];
    
    // Uniqueness check (History)
    $all_products = get_posts(['post_type' => 'product', 'posts_per_page' => -1]);
    foreach ($all_products as $p) {
        if ($p->ID == $post_id) continue;
        $hist = get_post_meta($p->ID, 'product_sku_history', true);
        if (is_array($hist) && in_array($new_sku, $hist)) return ['success' => false, 'error' => 'SKU in history'];
    }
    
    // Update
    update_post_meta($post_id, 'product_sku', $new_sku);
    $new_history = [];
    if (!empty($old_sku)) {
        $history = get_post_meta($post_id, 'product_sku_history', true);
        if (!is_array($history)) $history = [];
        if (!in_array($old_sku, $history)) $history[] = $old_sku;
        update_post_meta($post_id, 'product_sku_history', $history);
        $new_history = $history;
    }
    
    return ['success' => true, 'sku' => $new_sku, 'history' => $new_history];
}

// Helper to test the API endpoint locally
function test_api_resolution($sku) {
    require_once(get_template_directory() . '/includes/products/farmerlift-products.php');
    $request = new WP_REST_Request('GET', '/farmerlift/v1/product-by-sku/' . $sku);
    $request->set_param('sku', $sku);
    $response = farmerlift_product_by_sku($request);
    return $response->get_data();
}

$test_log = [];

// --- TEST 1: Create Dummy Product ---
$product1_id = wp_insert_post([
    'post_title' => 'TEST-DUMMY-PRODUCT-1',
    'post_type' => 'product',
    'post_status' => 'publish'
]);
$test_log[] = "Test 1 (Create ID-based QR fallback): " . ($product1_id ? "✅ PASSED (ID: $product1_id)" : "❌ FAILED");

// --- TEST 2: Assign Initial SKU ---
$initial_sku = 'TST-9001';
$res2 = simulate_ajax_update_sku($product1_id, $initial_sku);
$test_log[] = "Test 2 (Assign SKU): " . ($res2['success'] ? "✅ PASSED ($initial_sku)" : "❌ FAILED");

// --- TEST 3: Resolve Current SKU via API ---
$api3 = test_api_resolution($initial_sku);
$test_log[] = "Test 3 (Resolve current SKU): " . (($api3['found'] && $api3['id'] == $product1_id) ? "✅ PASSED (Match: {$api3['match']})" : "❌ FAILED");

// --- TEST 4: Change SKU (Push to History) ---
$new_sku = 'TST-9002';
$res4 = simulate_ajax_update_sku($product1_id, $new_sku);
$test_log[] = "Test 4 (Change SKU & Update History): " . ($res4['success'] && in_array($initial_sku, $res4['history']) ? "✅ PASSED (History updated)" : "❌ FAILED");

// --- TEST 5: Resolve Old SKU via History ---
$api5 = test_api_resolution($initial_sku); // Testing TST-9001 again
$test_log[] = "Test 5 (Resolve old SKU via history): " . (($api5['found'] && $api5['id'] == $product1_id && $api5['match'] == 'sku_history') ? "✅ PASSED (Matched history)" : "❌ FAILED");

// --- TEST 6: Resolve New SKU via Current ---
$api6 = test_api_resolution($new_sku);
$test_log[] = "Test 6 (Resolve new SKU): " . (($api6['found'] && $api6['id'] == $product1_id && $api6['match'] == 'current_sku') ? "✅ PASSED" : "❌ FAILED");

// --- TEST 7: Cross-Collision Check ---
// Create product 2 and try to steal the old SKU
$product2_id = wp_insert_post([
    'post_title' => 'TEST-DUMMY-PRODUCT-2',
    'post_type' => 'product',
    'post_status' => 'publish'
]);
$res7 = simulate_ajax_update_sku($product2_id, $initial_sku); // Try to assign TST-9001
$test_log[] = "Test 7 (Cross-Collision Prevention): " . (!$res7['success'] && strpos($res7['error'], 'history') !== false ? "✅ PASSED (Prevented stealing historical SKU)" : "❌ FAILED (Message: {$res7['error']})");

// --- CLEANUP ---
wp_delete_post($product1_id, true);
wp_delete_post($product2_id, true);
$test_log[] = "Cleanup: Products deleted.";

// --- RESULTS ---
echo "\n--- TEST RESULTS ---\n";
foreach ($test_log as $log) {
    echo $log . "\n";
}
echo "\nTesting Complete.\n";

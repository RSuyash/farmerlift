#!/usr/bin/php
<?php
require_once('wp-load.php');

// Get ALL products (any status)
$products = get_posts([
    'post_type' => 'product',
    'posts_per_page' => -1,
    'post_status' => 'any',
    'orderby' => 'title',
    'order' => 'ASC',
]);

echo "TOTAL PRODUCTS (all statuses): " . count($products) . "\n\n";
echo str_pad("ID", 6) . " | " . str_pad("STATUS", 10) . " | " . str_pad("SKU", 12) . " | " . str_pad("HISTORY", 30) . " | TITLE\n";
echo str_repeat("-", 100) . "\n";

foreach ($products as $p) {
    $sku = get_post_meta($p->ID, 'product_sku', true);
    $history = get_post_meta($p->ID, 'product_sku_history', true);
    $h = is_array($history) ? implode(', ', $history) : '';
    echo str_pad($p->ID, 6) . " | " . str_pad($p->post_status, 10) . " | " . str_pad($sku ?: '(none)', 12) . " | " . str_pad($h ?: '-', 30) . " | " . $p->post_title . "\n";
}

// Test SKU API with a known product
echo "\n--- API TESTS ---\n";
// Test by WP ID for the first product
if (!empty($products)) {
    $test_id = $products[0]->ID;
    $url = home_url("/wp-json/wp/v2/product/$test_id?_fields=id,slug,title");
    $response = wp_remote_get($url);
    $code = wp_remote_retrieve_response_code($response);
    $body = wp_remote_retrieve_body($response);
    echo "GET /wp/v2/product/$test_id => HTTP $code | " . substr($body, 0, 200) . "\n";
}

// List all product meta keys for first product
echo "\n--- META KEYS (first product) ---\n";
if (!empty($products)) {
    $meta = get_post_meta($products[0]->ID);
    foreach ($meta as $key => $val) {
        if (strpos($key, '_') === 0) continue; // skip internal
        echo "  $key => " . (is_array($val[0]) ? json_encode($val[0]) : substr($val[0], 0, 80)) . "\n";
    }
}

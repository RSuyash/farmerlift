#!/usr/bin/php
<?php
// Temporary audit script - run from wp root
require_once('wp-load.php');

echo "=== FarmerLift SKU/QR Audit ===\n";
echo "Date: " . date('Y-m-d H:i:s') . "\n\n";

$products = get_posts([
    'post_type' => 'product',
    'posts_per_page' => -1,
    'post_status' => 'publish',
    'orderby' => 'title',
    'order' => 'ASC',
]);

echo "TOTAL PRODUCTS: " . count($products) . "\n\n";

// Category counts
$cats = get_terms(['taxonomy' => 'category', 'hide_empty' => true]);
echo "--- CATEGORY COUNTS ---\n";
foreach ($cats as $cat) {
    $count = get_posts([
        'post_type' => 'product',
        'posts_per_page' => -1,
        'post_status' => 'publish',
        'tax_query' => [['taxonomy' => 'category', 'field' => 'term_id', 'terms' => $cat->term_id]],
    ]);
    echo str_pad($cat->name, 30) . " | Slug: " . str_pad($cat->slug, 28) . " | Count: " . count($count) . "\n";
}

echo "\n--- ALL PRODUCTS: SKU + HISTORY ---\n";
echo str_pad("WP_ID", 6) . " | " . str_pad("SKU", 10) . " | " . str_pad("HISTORY", 30) . " | " . str_pad("SLUG", 40) . " | TITLE\n";
echo str_repeat("-", 120) . "\n";

$no_sku = 0;
$has_history = 0;
$all_skus = [];
$all_history_skus = [];

foreach ($products as $p) {
    $sku = get_post_meta($p->ID, 'product_sku', true);
    $history = get_post_meta($p->ID, 'product_sku_history', true);
    $h = is_array($history) ? implode(', ', $history) : '';
    
    if (empty($sku)) $no_sku++;
    if (!empty($h)) $has_history++;
    if (!empty($sku)) $all_skus[] = $sku;
    if (is_array($history)) $all_history_skus = array_merge($all_history_skus, $history);
    
    echo str_pad($p->ID, 6) . " | " . str_pad($sku ?: '(none)', 10) . " | " . str_pad($h ?: '-', 30) . " | " . str_pad($p->post_name, 40) . " | " . $p->post_title . "\n";
}

echo "\n--- SUMMARY ---\n";
echo "Products with SKU:      " . count($all_skus) . "/" . count($products) . "\n";
echo "Products WITHOUT SKU:   " . $no_sku . "\n";
echo "Products with history:  " . $has_history . "\n";
echo "Total SKUs in history:  " . count($all_history_skus) . "\n";

// Check for duplicates
$sku_counts = array_count_values($all_skus);
$dups = array_filter($sku_counts, function($c) { return $c > 1; });
if (!empty($dups)) {
    echo "\n⚠️ DUPLICATE CURRENT SKUS FOUND:\n";
    foreach ($dups as $sku => $count) {
        echo "  $sku appears $count times!\n";
    }
} else {
    echo "✅ No duplicate current SKUs.\n";
}

// Check if any current SKU appears in another product's history
echo "\n--- CROSS-COLLISION CHECK ---\n";
$collisions = 0;
foreach ($products as $p) {
    $sku = get_post_meta($p->ID, 'product_sku', true);
    if (empty($sku)) continue;
    
    foreach ($products as $other) {
        if ($other->ID === $p->ID) continue;
        $other_history = get_post_meta($other->ID, 'product_sku_history', true);
        if (is_array($other_history) && in_array($sku, $other_history)) {
            echo "⚠️ SKU '$sku' (product #$p->ID) also in history of product #$other->ID!\n";
            $collisions++;
        }
    }
}
if ($collisions === 0) {
    echo "✅ No cross-collisions between current SKUs and history.\n";
}

// Test the QR redirect API
echo "\n--- QR API TESTS ---\n";
$test_skus = array_slice($all_skus, 0, 3);
foreach ($test_skus as $sku) {
    $url = home_url("/wp-json/farmerlift/v1/product-by-sku/$sku");
    $response = wp_remote_get($url);
    $body = wp_remote_retrieve_body($response);
    $data = json_decode($body, true);
    echo "GET /product-by-sku/$sku => " . ($data['found'] ? "✅ Found: {$data['slug']} (match: {$data['match']})" : "❌ NOT FOUND") . "\n";
}

echo "\nAudit complete.\n";

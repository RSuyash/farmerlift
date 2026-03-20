#!/usr/bin/php
<?php
// Direct DB query audit - bypass post type registration issues
require_once('wp-load.php');
global $wpdb;

// 1. Find ALL post types in the DB
echo "=== ALL POST TYPES IN DATABASE ===\n";
$types = $wpdb->get_results("SELECT post_type, COUNT(*) as cnt FROM {$wpdb->posts} WHERE post_status IN ('publish','draft','private') GROUP BY post_type ORDER BY cnt DESC");
foreach ($types as $t) {
    echo "  " . str_pad($t->post_type, 25) . " => " . $t->cnt . " posts\n";
}

// 2. Get all 'product' posts directly from DB
echo "\n=== ALL 'product' POSTS (direct DB) ===\n";
$products = $wpdb->get_results("SELECT ID, post_title, post_name, post_status FROM {$wpdb->posts} WHERE post_type = 'product' ORDER BY post_title ASC");
echo "Found: " . count($products) . " product posts\n\n";

echo str_pad("ID", 6) . " | " . str_pad("STATUS", 10) . " | " . str_pad("SKU", 12) . " | " . str_pad("HISTORY", 35) . " | " . str_pad("SLUG", 35) . " | TITLE\n";
echo str_repeat("-", 140) . "\n";

$skus = [];
$no_sku = 0;
$has_history = 0;

foreach ($products as $p) {
    $sku = get_post_meta($p->ID, 'product_sku', true);
    $history = get_post_meta($p->ID, 'product_sku_history', true);
    $h = is_array($history) ? implode(', ', $history) : '';
    
    if (empty($sku)) $no_sku++;
    else $skus[] = $sku;
    if (!empty($h)) $has_history++;
    
    echo str_pad($p->ID, 6) . " | " . str_pad($p->post_status, 10) . " | " . str_pad($sku ?: '(none)', 12) . " | " . str_pad($h ?: '-', 35) . " | " . str_pad($p->post_name, 35) . " | " . $p->post_title . "\n";
}

echo "\nWith SKU: " . count($skus) . " | Without SKU: $no_sku | With History: $has_history\n";

// 3. Check product_sku meta directly
echo "\n=== ALL product_sku META ENTRIES (raw DB) ===\n";
$sku_meta = $wpdb->get_results("SELECT pm.post_id, pm.meta_value, p.post_title FROM {$wpdb->postmeta} pm JOIN {$wpdb->posts} p ON pm.post_id = p.ID WHERE pm.meta_key = 'product_sku' AND pm.meta_value != '' ORDER BY pm.meta_value ASC");
echo "Found: " . count($sku_meta) . " SKU entries\n";
foreach ($sku_meta as $m) {
    echo "  Product #" . $m->post_id . " => SKU: " . $m->meta_value . " (" . $m->post_title . ")\n";
}

// 4. Check product_sku_history meta
echo "\n=== ALL product_sku_history META ENTRIES (raw DB) ===\n";
$hist_meta = $wpdb->get_results("SELECT pm.post_id, pm.meta_value, p.post_title FROM {$wpdb->postmeta} pm JOIN {$wpdb->posts} p ON pm.post_id = p.ID WHERE pm.meta_key = 'product_sku_history' ORDER BY pm.post_id ASC");
echo "Found: " . count($hist_meta) . " history entries\n";
foreach ($hist_meta as $m) {
    $val = maybe_unserialize($m->meta_value);
    $display = is_array($val) ? implode(', ', $val) : $m->meta_value;
    echo "  Product #" . $m->post_id . " => History: [" . $display . "] (" . $m->post_title . ")\n";
}

// 5. Category breakdown
echo "\n=== CATEGORY PRODUCT COUNTS ===\n";
$cats = $wpdb->get_results("
    SELECT t.name, t.slug, tt.count 
    FROM {$wpdb->terms} t 
    JOIN {$wpdb->term_taxonomy} tt ON t.term_id = tt.term_id 
    WHERE tt.taxonomy = 'category' AND tt.count > 0
    ORDER BY t.name ASC
");
foreach ($cats as $c) {
    echo "  " . str_pad($c->name, 30) . " | " . str_pad($c->slug, 30) . " | Count: " . $c->count . "\n";
}

echo "\nDone.\n";

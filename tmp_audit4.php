#!/usr/bin/php
<?php
// Direct MySQL query to bypass any WordPress loading issues
require_once('wp-load.php');
global $wpdb;

echo "=== DATABASE: " . DB_NAME . " ===\n";
echo "=== TABLE PREFIX: " . $wpdb->prefix . " ===\n";
echo "Date: " . date('Y-m-d H:i:s') . "\n\n";

// Raw SQL count of product posts
$count = $wpdb->get_var("SELECT COUNT(*) FROM {$wpdb->prefix}posts WHERE post_type = 'product' AND post_status = 'publish'");
echo "TOTAL PUBLISHED PRODUCTS: $count\n\n";

// Get all products with SKU via JOIN
$results = $wpdb->get_results("
    SELECT 
        p.ID,
        p.post_title,
        p.post_name as slug,
        p.post_status,
        MAX(CASE WHEN pm.meta_key = 'product_sku' THEN pm.meta_value END) as sku,
        MAX(CASE WHEN pm.meta_key = 'product_sku_history' THEN pm.meta_value END) as sku_history
    FROM {$wpdb->prefix}posts p
    LEFT JOIN {$wpdb->prefix}postmeta pm ON p.ID = pm.post_id AND pm.meta_key IN ('product_sku', 'product_sku_history')
    WHERE p.post_type = 'product' AND p.post_status = 'publish'
    GROUP BY p.ID
    ORDER BY p.post_title ASC
");

echo str_pad("ID", 6) . " | " . str_pad("SKU", 10) . " | " . str_pad("HISTORY", 30) . " | " . str_pad("SLUG", 40) . " | TITLE\n";
echo str_repeat("-", 130) . "\n";

$with_sku = 0;
$no_sku = 0;
$with_history = 0;
$all_skus = [];

foreach ($results as $r) {
    $history_raw = $r->sku_history;
    $history_arr = @unserialize($history_raw);
    $history_display = is_array($history_arr) ? implode(', ', $history_arr) : '-';
    
    if (!empty($r->sku)) {
        $with_sku++;
        $all_skus[] = $r->sku;
    } else {
        $no_sku++;
    }
    if (is_array($history_arr) && count($history_arr) > 0) $with_history++;
    
    echo str_pad($r->ID, 6) . " | " . str_pad($r->sku ?: '(none)', 10) . " | " . str_pad($history_display, 30) . " | " . str_pad($r->slug, 40) . " | " . $r->post_title . "\n";
}

echo "\n--- SUMMARY ---\n";
echo "With SKU: $with_sku | Without SKU: $no_sku | With History: $with_history\n";

// Check for duplicate SKUs
$sku_counts = array_count_values($all_skus);
$dups = array_filter($sku_counts, function($c) { return $c > 1; });
if (!empty($dups)) {
    echo "\n⚠️ DUPLICATE SKUs:\n";
    foreach ($dups as $sku => $cnt) echo "  $sku => $cnt occurrences!\n";
} else {
    echo "✅ No duplicate SKUs\n";
}

// Category breakdown with counts
echo "\n--- CATEGORIES ---\n";
$cats = $wpdb->get_results("
    SELECT t.name, t.slug, COUNT(DISTINCT tr.object_id) as product_count
    FROM {$wpdb->prefix}terms t
    JOIN {$wpdb->prefix}term_taxonomy tt ON t.term_id = tt.term_id
    JOIN {$wpdb->prefix}term_relationships tr ON tt.term_taxonomy_id = tr.term_taxonomy_id
    JOIN {$wpdb->prefix}posts p ON tr.object_id = p.ID AND p.post_type = 'product' AND p.post_status = 'publish'
    WHERE tt.taxonomy = 'category'
    GROUP BY t.term_id
    ORDER BY t.name ASC
");
foreach ($cats as $c) {
    echo "  " . str_pad($c->name, 30) . " | " . str_pad($c->slug, 30) . " | Products: " . $c->product_count . "\n";
}

echo "\nDone.\n";

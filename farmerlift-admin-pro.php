<?php
/**
 * FarmerLift Admin Pro Module (PRO Features)
 * 
 * Purpose:
 * 1. API Modifications (Fixing Gallery Images).
 * 2. Admin Interface Enhancements (Custom Columns for Products).
 * 
 * Included by: functions.php
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

// =================================================================
// 1. REST API ENHANCEMENTS (Fixing Data for Frontend)
// =================================================================
add_action( 'rest_api_init', function () {
    register_rest_field( 'product', 'farmerlift_gallery', array(
        'get_callback' => function( $object ) {
            $images = array();
            $post_id = $object['id'];
            
            for ($i = 1; $i <= 8; $i++) {
                // Get raw value from ACF
                $key = "gallery_image_$i";
                $val = get_post_meta($post_id, $key, true);
                
                if ( ! empty($val) ) {
                    // Fix: Handle Numeric IDs returning from ACF
                    if ( is_numeric($val) ) {
                        $url = wp_get_attachment_url( (int)$val );
                        if ($url) $images[] = $url;
                    }
                    // Handle String URLs
                    else if ( is_string($val) && filter_var($val, FILTER_VALIDATE_URL) ) {
                        $images[] = $val;
                    }
                }
            }
            return $images;
        },
        'schema' => null,
    ));
});

// Security: Enable App Passwords for Auto-Migration scripts
add_filter( 'wp_is_application_passwords_available', '__return_true' );


// =================================================================
// 2. ADMIN LIST COLUMNS (PRO) - Better "All Products" View
// =================================================================

// A. Add New Columns
add_filter('manage_product_posts_columns', 'farmerlift_add_product_columns');
function farmerlift_add_product_columns($columns) {
    // Insert Image Column first
    $new_columns = array();
    $new_columns['cb'] = $columns['cb']; // Checkbox
    $new_columns['product_thumb'] = 'Image'; // NEW
    $new_columns['product_id'] = 'ID'; // NEW
    
    // Merge existing (Title, Date, etc.)
    foreach($columns as $key => $title) {
        if ($key !== 'cb') $new_columns[$key] = $title;
    }

    // Add Price & Cat at the end
    $new_columns['product_price'] = 'Price (₹)'; // NEW
    return $new_columns;
}

// B. Populate New Columns
add_action('manage_product_posts_custom_column', 'farmerlift_populate_product_columns', 10, 2);
function farmerlift_populate_product_columns($column, $post_id) {
    switch ($column) {
        case 'product_thumb':
            if (has_post_thumbnail($post_id)) {
                echo get_the_post_thumbnail($post_id, array(50, 50), array('style' => 'width:50px;height:50px;object-fit:cover;border-radius:4px;'));
            } else {
                echo '<span style="color:#ccc;">No Img</span>';
            }
            break;

        case 'product_id':
            echo '<strong style="background:#eee;padding:2px 6px;border-radius:3px;font-family:monospace;">' . $post_id . '</strong>';
            break;

        case 'product_price':
            // Try to get MRP or Selling Price from ACF
            $mrp = get_post_meta($post_id, 'mrp', true);
            $selling = get_post_meta($post_id, 'selling_price', true);
            
            if ($selling) {
                echo '<strong>₹' . esc_html($selling) . '</strong>';
                if ($mrp) echo '<br><del style="color:#888;font-size:11px;">₹' . esc_html($mrp) . '</del>';
            } elseif ($mrp) {
                echo '₹' . esc_html($mrp);
            } else {
                 echo '—';
            }
            break;
    }
}

// C. Make Columns Sortable (Optional Polish)
add_filter('manage_edit-product_sortable_columns', 'farmerlift_sortable_products');
function farmerlift_sortable_products($columns) {
    $columns['product_id'] = 'ID';
    return $columns;
}
?>

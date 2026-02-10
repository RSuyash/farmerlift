<?php
/**
 * FarmerLift Core CMS Module
 * 
 * Purpose: Registers all Custom Post Types (Products, Banners, Galleries) and Taxonomies.
 * Included by: functions.php
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

add_action( 'init', 'farmerlift_register_cms' );
function farmerlift_register_cms() {

    // 1. HOME BANNER (Client can Add/Remove/Update Slides)
    register_post_type( 'hero_slide', array(
        'labels' => array( 'name' => 'Home Banners', 'singular_name' => 'Banner Slide' ),
        'public' => true,
        'show_in_rest' => true, // Important for React Frontend
        'menu_icon' => 'dashicons-images-alt2',
        'supports' => array( 'title', 'thumbnail' ) 
    ));

    // 2. GLOBAL SETTINGS (Footer, Contact, Channels)
    register_post_type( 'site_config', array(
        'labels' => array( 'name' => 'Global Settings', 'singular_name' => 'Config' ),
        'public' => true,
        'show_in_rest' => true,
        'menu_icon' => 'dashicons-admin-gears',
        'supports' => array( 'title' ) 
    ));

    // 3. GALLERIES (Client: Add/Edit/Remove Pics & Videos)
    register_post_type( 'photo_resource', array(
        'labels' => array( 'name' => 'Photo Gallery', 'singular_name' => 'Photo' ),
        'public' => true,
        'show_in_rest' => true,
        'menu_icon' => 'dashicons-camera',
        'supports' => array( 'title', 'thumbnail' ) 
    ));
    register_post_type( 'video_resource', array(
        'labels' => array( 'name' => 'Video Gallery', 'singular_name' => 'Video' ),
        'public' => true,
        'show_in_rest' => true,
        'menu_icon' => 'dashicons-video-alt3',
        'supports' => array( 'title', 'thumbnail' ) 
    ));
    
    // Media Categories (To organize Gallery)
    register_taxonomy( 'media_category', array('photo_resource', 'video_resource'), array(
        'hierarchical' => true,
        'labels' => array( 'name' => 'Media Categories', 'singular_name' => 'Category' ),
        'show_in_rest' => true,
        'public' => true,
    ));

    // 4. PRODUCTS (The Catalog)
    register_post_type( 'product', array(
        'labels' => array( 'name' => 'Products', 'singular_name' => 'Product' ),
        'public' => true,
        'show_in_rest' => true,
        'rest_base' => 'product', // Endpoint: /wp-json/wp/v2/product
        'menu_icon' => 'dashicons-cart',
        'supports' => array( 'title', 'editor', 'thumbnail', 'excerpt' ),
        'taxonomies' => array( 'category' ),
        'has_archive' => true
    ));

    // 5. CROP GUIDES (Knowledge / SOPs)
    register_post_type( 'crop_guide', array(
        'labels' => array( 'name' => 'Crop Guides', 'singular_name' => 'Crop Guide' ),
        'public' => true,
        'show_in_rest' => true,
        'rest_base' => 'crop_guide', // Endpoint: /wp-json/wp/v2/crop_guide
        'menu_icon' => 'dashicons-book',
        'supports' => array( 'title', 'editor', 'thumbnail', 'excerpt' ), // editor for Body Text
        'has_archive' => true
    ));

    // 6. CERTIFICATIONS (Trust Elements)
    register_post_type( 'certification', array(
        'labels' => array( 'name' => 'Certifications', 'singular_name' => 'Certification' ),
        'public' => true,
        'show_in_rest' => true,
        'rest_base' => 'certification',
        'menu_icon' => 'dashicons-awards',
        'supports' => array( 'title', 'thumbnail', 'editor' ), 
        'has_archive' => false
    ));

    // 7. WEB LEADS (Internal CRM - Private)
    register_post_type( 'web_lead', array(
        'labels' => array( 'name' => 'Web Leads', 'singular_name' => 'Lead' ),
        'public' => false,  // Internal only
        'show_ui' => true,  // Show in Admin
        'show_in_menu' => true,
        'menu_icon' => 'dashicons-groups', // People icon
        'supports' => array( 'title', 'editor', 'custom-fields' ), // Title=Name, Editor=Message
        'capabilities' => array(
            'create_posts' => false, // Ideally auto-generated, but admins can create if needed (default is OK)
        ),
        'map_meta_cap' => true,
    ));
}

// --- CUSTOM ADMIN COLUMNS FOR LEADS ---

// 1. Define Columns
add_filter( 'manage_web_lead_posts_columns', function($columns) {
    $new = array();
    $new['cb'] = $columns['cb'];
    $new['title'] = 'Name';
    $new['lead_phone'] = 'Phone';
    $new['lead_type'] = 'Role';
    $new['lead_location'] = 'Location';
    $new['date'] = 'Date';
    return $new;
});

// 2. Populate Columns
add_action( 'manage_web_lead_posts_custom_column', function($column, $post_id) {
    switch ( $column ) {
        case 'lead_phone':
            $phone = get_post_meta( $post_id, 'lead_phone', true );
            $email = get_post_meta( $post_id, 'lead_email', true );
            echo '<strong>' . esc_html($phone) . '</strong>';
            if($email) echo '<br><a href="mailto:'.$email.'">' . esc_html($email) . '</a>';
            break;

        case 'lead_type':
            $type = get_post_meta( $post_id, 'lead_type', true );
            echo '<span style="background:#e5e7eb; padding:2px 6px; border-radius:4px; font-weight:600; font-size:11px; text-transform:uppercase;">' . esc_html($type) . '</span>';
            break;

        case 'lead_location':
            $city = get_post_meta( $post_id, 'lead_city', true );
            $state = get_post_meta( $post_id, 'lead_state', true );
            echo esc_html( $city );
            if($state) echo ', ' . esc_html($state);
            break;
    }
}, 10, 2 );

// 3. Make Phone Sortable (Optional but nice)
add_filter( 'manage_edit-web_lead_sortable_columns', function( $columns ) {
    $columns['lead_type'] = 'lead_type';
    return $columns;
});
?>

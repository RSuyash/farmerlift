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
}
?>

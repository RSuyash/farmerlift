<?php
/**
 * FarmerLift ACF Fields Module
 * 
 * Purpose: Defines all Advanced Custom Fields (ACF) local field groups.
 * Included by: functions.php
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

if( function_exists('acf_add_local_field_group') ):

    // A. HOME BANNER TEXT
    acf_add_local_field_group(array(
        'key' => 'group_home_banner',
        'title' => 'Banner Text Details',
        'fields' => array(
            array( 'key' => 'field_slide_heading', 'label' => 'Banner Heading', 'name' => 'heading', 'type' => 'text' ),
            array( 'key' => 'field_slide_sub', 'label' => 'Banner Subtext', 'name' => 'subtext', 'type' => 'textarea', 'rows' => 2 ),
            array( 'key' => 'field_btn_text', 'label' => 'Button Text', 'name' => 'button_text', 'type' => 'text', 'default_value' => 'Explore' ),
            array( 'key' => 'field_btn_url', 'label' => 'Button URL', 'name' => 'button_url', 'type' => 'text', 'default_value' => 'products' ),
        ),
        'location' => array(
            array( array( 'param' => 'post_type', 'operator' => '==', 'value' => 'hero_slide' ) ),
        ),
        'show_in_rest' => true,
    ));

    // B. UNIVERSAL PAGE BANNERS
    acf_add_local_field_group(array(
        'key' => 'group_page_banners',
        'title' => 'Page Banner Settings',
        'fields' => array(
            array( 'key' => 'field_pg_banner_img', 'label' => 'Banner Image', 'name' => 'banner_image', 'type' => 'image', 'return_format' => 'url' ),
            array( 'key' => 'field_pg_banner_head', 'label' => 'Banner Heading', 'name' => 'banner_heading', 'type' => 'text' ),
            array( 'key' => 'field_pg_banner_sub', 'label' => 'Banner Description', 'name' => 'banner_subtext', 'type' => 'textarea' ),
        ),
        'location' => array(
            array( array( 'param' => 'post_type', 'operator' => '==', 'value' => 'page' ) ),    
            array( array( 'param' => 'post_type', 'operator' => '==', 'value' => 'post' ) ),    
            array( array( 'param' => 'post_type', 'operator' => '==', 'value' => 'product' ) ), 
        ),
        'show_in_rest' => true,
    ));

    // C. ABOUT US SPECIAL CONTENT
    acf_add_local_field_group(array(
        'key' => 'group_about_content',
        'title' => 'About Us Details',
        'fields' => array(
            array( 'key' => 'field_about_img', 'label' => 'About Section Image', 'name' => 'about_image', 'type' => 'image', 'return_format' => 'url' ),
            array( 'key' => 'field_mission', 'label' => 'Our Mission Text', 'name' => 'mission_text', 'type' => 'textarea' ),
            array( 'key' => 'field_vision', 'label' => 'Our Vision Text', 'name' => 'vision_text', 'type' => 'textarea' ),
        ),
        'location' => array(
            array( array( 'param' => 'page_template', 'operator' => '==', 'value' => 'default' ) ), 
        ),
        'show_in_rest' => true,
    ));

    // D. GLOBAL SETTINGS
    acf_add_local_field_group(array(
        'key' => 'group_global_config',
        'title' => 'Headquarters & Footer',
        'fields' => array(
            array( 'key' => 'field_hq', 'label' => 'Headquarters Address', 'name' => 'hq_address', 'type' => 'textarea' ),
            array( 'key' => 'field_email', 'label' => 'Official Email', 'name' => 'contact_email', 'type' => 'text' ),
            array( 'key' => 'field_phone', 'label' => 'Phone Number', 'name' => 'contact_phone', 'type' => 'text' ),
            array( 'key' => 'field_whatsapp', 'label' => 'WhatsApp', 'name' => 'whatsapp_number', 'type' => 'text' ),
            array( 'key' => 'field_fb', 'label' => 'Facebook URL', 'name' => 'facebook_url', 'type' => 'url' ),
            array( 'key' => 'field_tw', 'label' => 'Twitter/X URL', 'name' => 'twitter_url', 'type' => 'url' ),
            array( 'key' => 'field_in', 'label' => 'Instagram URL', 'name' => 'instagram_url', 'type' => 'url' ),
            array( 'key' => 'field_yt', 'label' => 'YouTube URL', 'name' => 'youtube_url', 'type' => 'url' ),
            array( 'key' => 'field_li', 'label' => 'LinkedIn URL', 'name' => 'linkedin_url', 'type' => 'url' ),
            array( 'key' => 'field_channels', 'label' => 'Direct Channels', 'name' => 'direct_channels', 'type' => 'textarea' ),
            array( 'key' => 'field_footer', 'label' => 'Footer "Reach Us" Text', 'name' => 'footer_text', 'type' => 'textarea' ),
            array( 'key' => 'field_hours', 'label' => 'Business Hours', 'name' => 'business_hours', 'type' => 'text' ),
            
            // PACKAGING MASTER LIST
            array( 
                'key' => 'field_master_packs_v3', 
                'label' => 'Master Packaging List', 
                'name' => 'standard_pack_sizes', 
                'type' => 'textarea',
                'instructions' => 'Enter standard pack sizes separated by commas (e.g., 1L, 500ml, 1kg).',
                'default_value' => '1L, 500ml, 250ml, 100ml, 1kg, 5kg, 25kg, 50kg',
                'rows' => 4,
            ),
        ),
        'location' => array(
            array( array( 'param' => 'post_type', 'operator' => '==', 'value' => 'site_config' ) ),
        ),
        'show_in_rest' => true,
    ));

    // E. VIDEO URL
    acf_add_local_field_group(array(
        'key' => 'group_video_link',
        'title' => 'Video Link',
        'fields' => array(
            array( 'key' => 'field_vid_url', 'label' => 'YouTube URL', 'name' => 'video_url', 'type' => 'url' ),
            array( 'key' => 'field_event_date', 'label' => 'Event Date', 'name' => 'event_date', 'type' => 'date_picker' ),
        ),
        'location' => array(
            array( array( 'param' => 'post_type', 'operator' => '==', 'value' => 'video_resource' ) ),
        ),
        'show_in_rest' => true,
    ));

    // ========================================================
    // PRODUCT SPECS & TABS
    // ========================================================

    // 00. Classification
    acf_add_local_field_group(array(
        'key' => 'group_classification',
        'title' => '00. Product Classification',
        'fields' => array(
            array(
                'key' => 'field_spec_type',
                'label' => 'Specification Type',
                'name' => 'spec_type',
                'type' => 'select',
                'choices' => array('fertilizer'=>'Fertilizer', 'pesticide'=>'Pesticide', 'seed'=>'Seed', 'machinery'=>'Machinery', 'growth_promoter'=>'Growth Promoter'),
                'default_value' => 'fertilizer',
            ),
            
            
            // DETAILED SPECS (Fixed Fields for ACF Free - 10 Slots)
            array( 'key' => 'field_spec_tab', 'label' => 'Detailed Specifications (Table)', 'type' => 'tab' ),
            array( 'key' => 'field_sk_1', 'label' => 'Spec 1: Parameter', 'name' => 'spec_1_key', 'type' => 'text', 'wrapper' => array('width' => '50') ),
            array( 'key' => 'field_sv_1', 'label' => 'Spec 1: Value', 'name' => 'spec_1_val', 'type' => 'text', 'wrapper' => array('width' => '50') ),
            
            array( 'key' => 'field_sk_2', 'label' => 'Spec 2: Parameter', 'name' => 'spec_2_key', 'type' => 'text', 'wrapper' => array('width' => '50') ),
            array( 'key' => 'field_sv_2', 'label' => 'Spec 2: Value', 'name' => 'spec_2_val', 'type' => 'text', 'wrapper' => array('width' => '50') ),

            array( 'key' => 'field_sk_3', 'label' => 'Spec 3: Parameter', 'name' => 'spec_3_key', 'type' => 'text', 'wrapper' => array('width' => '50') ),
            array( 'key' => 'field_sv_3', 'label' => 'Spec 3: Value', 'name' => 'spec_3_val', 'type' => 'text', 'wrapper' => array('width' => '50') ),

            array( 'key' => 'field_sk_4', 'label' => 'Spec 4: Parameter', 'name' => 'spec_4_key', 'type' => 'text', 'wrapper' => array('width' => '50') ),
            array( 'key' => 'field_sv_4', 'label' => 'Spec 4: Value', 'name' => 'spec_4_val', 'type' => 'text', 'wrapper' => array('width' => '50') ),

            array( 'key' => 'field_sk_5', 'label' => 'Spec 5: Parameter', 'name' => 'spec_5_key', 'type' => 'text', 'wrapper' => array('width' => '50') ),
            array( 'key' => 'field_sv_5', 'label' => 'Spec 5: Value', 'name' => 'spec_5_val', 'type' => 'text', 'wrapper' => array('width' => '50') ),

            array( 'key' => 'field_sk_6', 'label' => 'Spec 6: Parameter', 'name' => 'spec_6_key', 'type' => 'text', 'wrapper' => array('width' => '50') ),
            array( 'key' => 'field_sv_6', 'label' => 'Spec 6: Value', 'name' => 'spec_6_val', 'type' => 'text', 'wrapper' => array('width' => '50') ),

            array( 'key' => 'field_sk_7', 'label' => 'Spec 7: Parameter', 'name' => 'spec_7_key', 'type' => 'text', 'wrapper' => array('width' => '50') ),
            array( 'key' => 'field_sv_7', 'label' => 'Spec 7: Value', 'name' => 'spec_7_val', 'type' => 'text', 'wrapper' => array('width' => '50') ),

            array( 'key' => 'field_sk_8', 'label' => 'Spec 8: Parameter', 'name' => 'spec_8_key', 'type' => 'text', 'wrapper' => array('width' => '50') ),
            array( 'key' => 'field_sv_8', 'label' => 'Spec 8: Value', 'name' => 'spec_8_val', 'type' => 'text', 'wrapper' => array('width' => '50') ),

            array( 'key' => 'field_sk_9', 'label' => 'Spec 9: Parameter', 'name' => 'spec_9_key', 'type' => 'text', 'wrapper' => array('width' => '50') ),
            array( 'key' => 'field_sv_9', 'label' => 'Spec 9: Value', 'name' => 'spec_9_val', 'type' => 'text', 'wrapper' => array('width' => '50') ),

            array( 'key' => 'field_sk_10', 'label' => 'Spec 10: Parameter', 'name' => 'spec_10_key', 'type' => 'text', 'wrapper' => array('width' => '50') ),
            array( 'key' => 'field_sv_10', 'label' => 'Spec 10: Value', 'name' => 'spec_10_val', 'type' => 'text', 'wrapper' => array('width' => '50') ),
        ),
        'location' => array( array( array( 'param' => 'post_type', 'operator' => '==', 'value' => 'product' ) ) ),
        'show_in_rest' => true,
    ));

    // 01. Basic Info & Benefits
    acf_add_local_field_group(array(
        'key' => 'group_commercial',
        'title' => '01. Details & Benefits',
        'fields' => array(
            array( 'key' => 'field_sku', 'label' => 'SKU', 'name' => 'sku', 'type' => 'text' ),
            array( 'key' => 'field_hsn', 'label' => 'HSN Code', 'name' => 'hsn_code', 'type' => 'text' ),
            array( 'key' => 'field_mrp', 'label' => 'MRP', 'name' => 'mrp', 'type' => 'number' ),
            array( 'key' => 'field_price', 'label' => 'Selling Price', 'name' => 'selling_price', 'type' => 'number' ),
            array( 'key' => 'field_stock', 'label' => 'Stock Qty', 'name' => 'stock_qty', 'type' => 'number' ),
            array( 'key' => 'field_is_organic', 'label' => 'Is Organic?', 'name' => 'is_organic', 'type' => 'true_false' ),
            array( 'key' => 'field_brand', 'label' => 'Brand / Manufacturer', 'name' => 'brand_manufacturer', 'type' => 'text' ),
            
            // BADGES
            array( 'key' => 'field_badge_del', 'label' => 'Show "Fast Delivery" Badge', 'name' => 'show_delivery_badge', 'type' => 'true_false', 'default_value' => 1, 'ui' => 1 ),
            array( 'key' => 'field_badge_ver', 'label' => 'Show "Verified Authentic" Badge', 'name' => 'show_verified_badge', 'type' => 'true_false', 'default_value' => 1, 'ui' => 1 ),
            
            // KEY BENEFITS TAB
            array( 'key' => 'field_features', 'label' => 'Key Benefits (Features List)', 'name' => 'features_list', 'type' => 'textarea', 'instructions' => 'Enter each benefit on a new line.' ),

             // PACKAGING SETTINGS
            array( 
                'key' => 'field_pack_type_v2', 
                'label' => 'Packaging Type', 
                'name' => 'packaging_type', 
                'type' => 'select',
                'choices' => array( 'liquid' => 'Liquid (ml / L)', 'solid' => 'Solid / Powder (g / kg)' ),
                'default_value' => 'liquid',
                'ui' => 0, 
            ),
            
            // Liquid Sizes
            array( 
                'key' => 'field_liq_sizes', 
                'label' => 'Standard Liquid Packs', 
                'name' => 'pack_sizes_liquid', 
                'type' => 'checkbox',
                'choices' => array(
                    '100 ml' => '100 ml', '250 ml' => '250 ml', '500 ml' => '500 ml',
                    '1 L' => '1 L', '5 L' => '5 L', '10 L' => '10 L', '20 L' => '20 L', '200 L' => '200 L (Barrel)',
                ),
                'layout' => 'horizontal',
                'conditional_logic' => array( array( array( 'field' => 'field_pack_type_v2', 'operator' => '==', 'value' => 'liquid', ), ), ),
            ),

            // Solid Sizes
            array( 
                'key' => 'field_sol_sizes', 
                'label' => 'Standard Solid Packs', 
                'name' => 'pack_sizes_solid', 
                'type' => 'checkbox',
                'choices' => array(
                    '10 g' => '10 g', '50 g' => '50 g', '100 g' => '100 g', '250 g' => '250 g', '500 g' => '500 g',
                    '1 kg' => '1 kg', '5 kg' => '5 kg', '10 kg' => '10 kg', '25 kg' => '25 kg', '50 kg' => '50 kg',
                ),
                'layout' => 'horizontal',
                'conditional_logic' => array( array( array( 'field' => 'field_pack_type_v2', 'operator' => '==', 'value' => 'solid', ), ), ),
            ),

            // Custom / Other
            array( 
                'key' => 'field_custom_pack', 
                'label' => 'Other / Custom Sizes', 
                'name' => 'custom_pack_sizes', 
                'type' => 'text',
                'instructions' => 'Enter any other sizes separated by comma (e.g. 30kg, 2.5L)',
                'placeholder' => '30kg, 2.5L',
            ),
        ),
        'location' => array( array( array( 'param' => 'post_type', 'operator' => '==', 'value' => 'product' ) ) ),
        'show_in_rest' => true,
    ));

    // XX. PRODUCT GALLERY (Extra Images for Slider)
    acf_add_local_field_group(array(
        'key' => 'group_product_gallery',
        'title' => 'Product Gallery (Slider Images)',
        'fields' => array(
            array( 'key' => 'field_gal_1', 'label' => 'Gallery Image 1', 'name' => 'gallery_image_1', 'type' => 'image', 'return_format' => 'url' ),
            array( 'key' => 'field_gal_2', 'label' => 'Gallery Image 2', 'name' => 'gallery_image_2', 'type' => 'image', 'return_format' => 'url' ),
            array( 'key' => 'field_gal_3', 'label' => 'Gallery Image 3', 'name' => 'gallery_image_3', 'type' => 'image', 'return_format' => 'url' ),
            array( 'key' => 'field_gal_4', 'label' => 'Gallery Image 4', 'name' => 'gallery_image_4', 'type' => 'image', 'return_format' => 'url' ),
            array( 'key' => 'field_gal_5', 'label' => 'Gallery Image 5', 'name' => 'gallery_image_5', 'type' => 'image', 'return_format' => 'url' ),
            array( 'key' => 'field_gal_6', 'label' => 'Gallery Image 6', 'name' => 'gallery_image_6', 'type' => 'image', 'return_format' => 'url' ),
            array( 'key' => 'field_gal_7', 'label' => 'Gallery Image 7', 'name' => 'gallery_image_7', 'type' => 'image', 'return_format' => 'url' ),
            array( 'key' => 'field_gal_8', 'label' => 'Gallery Image 8', 'name' => 'gallery_image_8', 'type' => 'image', 'return_format' => 'url' ),
        ),
        'location' => array( array( array( 'param' => 'post_type', 'operator' => '==', 'value' => 'product' ) ) ),
        'show_in_rest' => true,
    ));

    // 02. Method of Application
    acf_add_local_field_group(array(
        'key' => 'group_application',
        'title' => '02. Method of Application',
        'fields' => array(
            array( 'key' => 'field_app_method', 'label' => 'Application Method Text', 'name' => 'application_method', 'type' => 'textarea', 'instructions' => 'e.g., Foliar Spray details, Drip instruction' ),
            array( 'key' => 'field_dose', 'label' => 'Dosage Instructions', 'name' => 'dosage_info', 'type' => 'text', 'instructions' => 'e.g., 2-3ml per liter' ),
            array( 'key' => 'field_target_crops', 'label' => 'Target Crops', 'name' => 'target_crops_list', 'type' => 'text' ),
            
            // Recommended Crops (Visual) - Fixed Fields for ACF Free Compatibility
            // Slot 1
            array( 'key' => 'field_rc_1_n', 'label' => 'Crop 1 Name', 'name' => 'rec_crop_1_name', 'type' => 'text', 'placeholder' => 'e.g. Tomato' ),
            array( 'key' => 'field_rc_1_i', 'label' => 'Crop 1 Image', 'name' => 'rec_crop_1_img', 'type' => 'image', 'return_format' => 'url' ),
            
            // Slot 2
            array( 'key' => 'field_rc_2_n', 'label' => 'Crop 2 Name', 'name' => 'rec_crop_2_name', 'type' => 'text' ),
            array( 'key' => 'field_rc_2_i', 'label' => 'Crop 2 Image', 'name' => 'rec_crop_2_img', 'type' => 'image', 'return_format' => 'url' ),

            // Slot 3
            array( 'key' => 'field_rc_3_n', 'label' => 'Crop 3 Name', 'name' => 'rec_crop_3_name', 'type' => 'text' ),
            array( 'key' => 'field_rc_3_i', 'label' => 'Crop 3 Image', 'name' => 'rec_crop_3_img', 'type' => 'image', 'return_format' => 'url' ),

            // Slot 4
            array( 'key' => 'field_rc_4_n', 'label' => 'Crop 4 Name', 'name' => 'rec_crop_4_name', 'type' => 'text' ),
            array( 'key' => 'field_rc_4_i', 'label' => 'Crop 4 Image', 'name' => 'rec_crop_4_img', 'type' => 'image', 'return_format' => 'url' ),

            // Slot 5
            array( 'key' => 'field_rc_5_n', 'label' => 'Crop 5 Name', 'name' => 'rec_crop_5_name', 'type' => 'text' ),
            array( 'key' => 'field_rc_5_i', 'label' => 'Crop 5 Image', 'name' => 'rec_crop_5_img', 'type' => 'image', 'return_format' => 'url' ),

            // Slot 6
            array( 'key' => 'field_rc_6_n', 'label' => 'Crop 6 Name', 'name' => 'rec_crop_6_name', 'type' => 'text' ),
            array( 'key' => 'field_rc_6_i', 'label' => 'Crop 6 Image', 'name' => 'rec_crop_6_img', 'type' => 'image', 'return_format' => 'url' ),

            // Slot 7
            array( 'key' => 'field_rc_7_n', 'label' => 'Crop 7 Name', 'name' => 'rec_crop_7_name', 'type' => 'text' ),
            array( 'key' => 'field_rc_7_i', 'label' => 'Crop 7 Image', 'name' => 'rec_crop_7_img', 'type' => 'image', 'return_format' => 'url' ),

            // Slot 8
            array( 'key' => 'field_rc_8_n', 'label' => 'Crop 8 Name', 'name' => 'rec_crop_8_name', 'type' => 'text' ),
            array( 'key' => 'field_rc_8_i', 'label' => 'Crop 8 Image', 'name' => 'rec_crop_8_img', 'type' => 'image', 'return_format' => 'url' ),

            // Slot 9
            array( 'key' => 'field_rc_9_n', 'label' => 'Crop 9 Name', 'name' => 'rec_crop_9_name', 'type' => 'text' ),
            array( 'key' => 'field_rc_9_i', 'label' => 'Crop 9 Image', 'name' => 'rec_crop_9_img', 'type' => 'image', 'return_format' => 'url' ),

            // Slot 10
            array( 'key' => 'field_rc_10_n', 'label' => 'Crop 10 Name', 'name' => 'rec_crop_10_name', 'type' => 'text' ),
            array( 'key' => 'field_rc_10_i', 'label' => 'Crop 10 Image', 'name' => 'rec_crop_10_img', 'type' => 'image', 'return_format' => 'url' ),

            // Slot 11
            array( 'key' => 'field_rc_11_n', 'label' => 'Crop 11 Name', 'name' => 'rec_crop_11_name', 'type' => 'text' ),
            array( 'key' => 'field_rc_11_i', 'label' => 'Crop 11 Image', 'name' => 'rec_crop_11_img', 'type' => 'image', 'return_format' => 'url' ),

            // Slot 12
            array( 'key' => 'field_rc_12_n', 'label' => 'Crop 12 Name', 'name' => 'rec_crop_12_name', 'type' => 'text' ),
            array( 'key' => 'field_rc_12_i', 'label' => 'Crop 12 Image', 'name' => 'rec_crop_12_img', 'type' => 'image', 'return_format' => 'url' ),
        ),
        'location' => array( array( array( 'param' => 'post_type', 'operator' => '==', 'value' => 'product' ) ) ),
        'show_in_rest' => true,
    ));

    // 03. QR Details
    acf_add_local_field_group(array(
        'key' => 'group_qr',
        'title' => '03. Authenticity & QR',
        'fields' => array(
            array( 'key' => 'field_qr_code', 'label' => 'QR Code Image', 'name' => 'qr_code_image', 'type' => 'image', 'return_format' => 'url' ),
            array( 'key' => 'field_batch_info', 'label' => 'Batch / Auth Details', 'name' => 'batch_details', 'type' => 'textarea' ),
            
            // SPECIFIC QR DATA FIELDS
            array( 'key' => 'field_qr_gazette', 'label' => 'Gazette Number', 'name' => 'gazette_number', 'type' => 'text' ),
            array( 'key' => 'field_qr_title', 'label' => 'QR Title / Heading', 'name' => 'qr_title', 'type' => 'text', 'placeholder' => 'e.g. CIB Registration Details' ),
            array( 'key' => 'field_qr_comp', 'label' => 'QR Composition', 'name' => 'qr_composition', 'type' => 'textarea', 'rows' => 3 ),
            array( 'key' => 'field_qr_crops', 'label' => 'QR Target Crops', 'name' => 'qr_crops', 'type' => 'textarea', 'rows' => 2 ),
            array( 'key' => 'field_qr_dose', 'label' => 'QR Dosage Info', 'name' => 'qr_dosage', 'type' => 'textarea', 'rows' => 2 ),
        ),
        'location' => array( array( array( 'param' => 'post_type', 'operator' => '==', 'value' => 'product' ) ) ),
        'show_in_rest' => true,
    ));

    // 04. Fertilizer Specs
    acf_add_local_field_group(array(
        'key' => 'group_fertilizer',
        'title' => '04. Fertilizer Specs',
        'fields' => array(
            array( 'key' => 'field_form', 'label' => 'Form', 'name' => 'form', 'type' => 'select', 'choices' => array('liquid'=>'Liquid', 'granule'=>'Granule', 'powder'=>'Powder') ),
            array( 'key' => 'field_npk', 'label' => 'NPK Ratio', 'name' => 'npk_ratio', 'type' => 'text' ),
            array( 'key' => 'field_n', 'label' => 'Nitrogen (%)', 'name' => 'n_content', 'type' => 'number' ),
            array( 'key' => 'field_p', 'label' => 'Phosphorus (%)', 'name' => 'p_content', 'type' => 'number' ),
            array( 'key' => 'field_k', 'label' => 'Potassium (%)', 'name' => 'k_content', 'type' => 'number' ),
            array( 'key' => 'field_solubility', 'label' => 'Solubility', 'name' => 'solubility', 'type' => 'text' ),
        ),
        'location' => array( array( array( 'param' => 'post_type', 'operator' => '==', 'value' => 'product' ) ) ),
        'show_in_rest' => true,
    ));

    // 05. Seed Specs
    acf_add_local_field_group(array(
        'key' => 'group_seed',
        'title' => '05. Seed Specs',
        'fields' => array(
            array( 'key' => 'field_crop', 'label' => 'Crop Type', 'name' => 'seed_crop', 'type' => 'text' ),
            array( 'key' => 'field_variety', 'label' => 'Variety Name', 'name' => 'seed_variety', 'type' => 'text' ),
            array( 'key' => 'field_germination', 'label' => 'Germination %', 'name' => 'germination_percentage', 'type' => 'number' ),
            array( 'key' => 'field_duration', 'label' => 'Duration', 'name' => 'duration', 'type' => 'text' ),
        ),
        'location' => array( array( array( 'param' => 'post_type', 'operator' => '==', 'value' => 'product' ) ) ),
        'show_in_rest' => true,
    ));

    // 06. Pesticide Specs
    acf_add_local_field_group(array(
        'key' => 'group_pesticide',
        'title' => '06. Pesticide Specs',
        'fields' => array(
            array( 'key' => 'field_chem_group', 'label' => 'Chemical Group', 'name' => 'chemical_group', 'type' => 'text' ),
            array( 'key' => 'field_active_ingredients', 'label' => 'Active Ingredients', 'name' => 'active_ingredients', 'type' => 'textarea' ),
            array( 'key' => 'field_toxicity', 'label' => 'Toxicity Label', 'name' => 'toxicity_label', 'type' => 'select', 'choices' => array('green'=>'Green', 'blue'=>'Blue', 'yellow'=>'Yellow', 'red'=>'Red') ),
            array( 'key' => 'field_phi', 'label' => 'PHI (Days)', 'name' => 'phi_days', 'type' => 'number' ),
        ),
        'location' => array( array( array( 'param' => 'post_type', 'operator' => '==', 'value' => 'product' ) ) ),
        'show_in_rest' => true,
    ));

    // 07. Crop Guide Details
    acf_add_local_field_group(array(
        'key' => 'group_crop_guide',
        'title' => 'Crop Guide Details',
        'fields' => array(
            array( 'key' => 'field_sci_name', 'label' => 'Scientific Name', 'name' => 'scientific_name', 'type' => 'text' ),
            array( 'key' => 'field_cg_duration', 'label' => 'Duration (Days)', 'name' => 'duration', 'type' => 'text', 'placeholder' => '120-150 Days' ),
            array( 'key' => 'field_cg_season', 'label' => 'Season', 'name' => 'season', 'type' => 'checkbox', 'choices' => array('kharif'=>'Kharif', 'rabi'=>'Rabi', 'summer'=>'Summer', 'all_season'=>'All Season') ),
            array( 'key' => 'field_cg_video', 'label' => 'Video Guide URL', 'name' => 'video_url', 'type' => 'url' ),

            // STAGE 1
            array( 'key' => 'field_s1_tab', 'label' => 'Stage 1', 'type' => 'tab' ),
            array( 'key' => 'field_s1_name', 'label' => 'Stage Name', 'name' => 'stage_1_name', 'type' => 'text', 'placeholder' => 'e.g. Sowing (0-15 Days)' ),
            array( 'key' => 'field_s1_desc', 'label' => 'Description', 'name' => 'stage_1_desc', 'type' => 'textarea' ),
            array( 'key' => 'field_s1_prod', 'label' => 'Recommended Products', 'name' => 'stage_1_products', 'type' => 'relationship', 'post_type' => array('product'), 'max' => 4, 'return_format' => 'id' ),

            // STAGE 2
            array( 'key' => 'field_s2_tab', 'label' => 'Stage 2', 'type' => 'tab' ),
            array( 'key' => 'field_s2_name', 'label' => 'Stage Name', 'name' => 'stage_2_name', 'type' => 'text' ),
            array( 'key' => 'field_s2_desc', 'label' => 'Description', 'name' => 'stage_2_desc', 'type' => 'textarea' ),
            array( 'key' => 'field_s2_prod', 'label' => 'Recommended Products', 'name' => 'stage_2_products', 'type' => 'relationship', 'post_type' => array('product'), 'max' => 4, 'return_format' => 'id' ),

            // STAGE 3
            array( 'key' => 'field_s3_tab', 'label' => 'Stage 3', 'type' => 'tab' ),
            array( 'key' => 'field_s3_name', 'label' => 'Stage Name', 'name' => 'stage_3_name', 'type' => 'text' ),
            array( 'key' => 'field_s3_desc', 'label' => 'Description', 'name' => 'stage_3_desc', 'type' => 'textarea' ),
            array( 'key' => 'field_s3_prod', 'label' => 'Recommended Products', 'name' => 'stage_3_products', 'type' => 'relationship', 'post_type' => array('product'), 'max' => 4, 'return_format' => 'id' ),

             // STAGE 4
            array( 'key' => 'field_s4_tab', 'label' => 'Stage 4', 'type' => 'tab' ),
            array( 'key' => 'field_s4_name', 'label' => 'Stage Name', 'name' => 'stage_4_name', 'type' => 'text' ),
            array( 'key' => 'field_s4_desc', 'label' => 'Description', 'name' => 'stage_4_desc', 'type' => 'textarea' ),
            array( 'key' => 'field_s4_prod', 'label' => 'Recommended Products', 'name' => 'stage_4_products', 'type' => 'relationship', 'post_type' => array('product'), 'max' => 4, 'return_format' => 'id' ),

             // STAGE 5
            array( 'key' => 'field_s5_tab', 'label' => 'Stage 5', 'type' => 'tab' ),
            array( 'key' => 'field_s5_name', 'label' => 'Stage Name', 'name' => 'stage_5_name', 'type' => 'text' ),
            array( 'key' => 'field_s5_desc', 'label' => 'Description', 'name' => 'stage_5_desc', 'type' => 'textarea' ),
            array( 'key' => 'field_s5_prod', 'label' => 'Recommended Products', 'name' => 'stage_5_products', 'type' => 'relationship', 'post_type' => array('product'), 'max' => 4, 'return_format' => 'id' ),

             // STAGE 6
            array( 'key' => 'field_s6_tab', 'label' => 'Stage 6', 'type' => 'tab' ),
            array( 'key' => 'field_s6_name', 'label' => 'Stage Name', 'name' => 'stage_6_name', 'type' => 'text' ),
            array( 'key' => 'field_s6_desc', 'label' => 'Description', 'name' => 'stage_6_desc', 'type' => 'textarea' ),
            array( 'key' => 'field_s6_prod', 'label' => 'Recommended Products', 'name' => 'stage_6_products', 'type' => 'relationship', 'post_type' => array('product'), 'max' => 4, 'return_format' => 'id' ),
        ),
        'location' => array( array( array( 'param' => 'post_type', 'operator' => '==', 'value' => 'crop_guide' ) ) ),
        'show_in_rest' => true,
    ));

    // 08. Certification Details (Trust Page)
    acf_add_local_field_group(array(
        'key' => 'group_cert_details',
        'title' => 'Certification Details',
        'fields' => array(
            // Basic ID & Authority
            array( 'key' => 'field_cert_id', 'label' => 'License / Registration No.', 'name' => 'cert_number', 'type' => 'text' ),
            array( 'key' => 'field_cert_auth', 'label' => 'Issuing Authority', 'name' => 'cert_authority', 'type' => 'text', 'placeholder' => 'e.g. Govt of India, ISO, NABL' ),
            
            // Files & Validity
            array( 'key' => 'field_cert_file', 'label' => 'Certificate File (PDF/Image)', 'name' => 'cert_file', 'type' => 'file', 'return_format' => 'url' ),
            array( 'key' => 'field_valid_until', 'label' => 'Valid Until', 'name' => 'valid_until', 'type' => 'date_picker' ),
            
            // Classification
            array( 
                'key' => 'field_cert_type', 
                'label' => 'Certificate Type', 
                'name' => 'cert_type', 
                'type' => 'select',
                'choices' => array(
                    'iso' => 'ISO Certification',
                    'fco' => 'FCO License (Fertilizer)',
                    'cib' => 'CIB Registration (Pesticide)',
                    'lab' => 'Lab Analysis Report',
                    'other' => 'Other / Award'
                )
            ),

            // [NEW] Enhanced Details
            array( 'key' => 'field_cert_std', 'label' => 'Standard / Grade', 'name' => 'cert_standard', 'type' => 'text', 'instructions' => 'e.g. ISO 9001:2015, Grade A' ),
            array( 'key' => 'field_cert_scope', 'label' => 'Scope of Certification', 'name' => 'cert_scope', 'type' => 'textarea', 'rows' => 3, 'instructions' => 'Brief description of what is certified.' ),
            
            // [NEW] Lab Report Specific
            array( 
                'key' => 'field_rel_prod', 
                'label' => 'Related Product (For Lab Reports)', 
                'name' => 'related_product', 
                'type' => 'relationship', 
                'post_type' => array('product'),
                'max' => 1,
                'return_format' => 'object', 
                'conditional_logic' => array( array( array( 'field' => 'field_cert_type', 'operator' => '==', 'value' => 'lab' ) ) )
            ),
        ),
        'location' => array( array( array( 'param' => 'post_type', 'operator' => '==', 'value' => 'certification' ) ) ),
        'show_in_rest' => true,
    ));

endif;
?>
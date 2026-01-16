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

endif;
?>

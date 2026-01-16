<?php
/**
 * Twenty Twenty-Five functions and definitions.
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package WordPress
 * @subpackage Twenty_Twenty_Five
 * @since Twenty Twenty-Five 1.0
 */

// =================================================================
// 1. THEME STANDARD SETUP (Do not touch)
// =================================================================

if ( ! function_exists( 'twentytwentyfive_post_format_setup' ) ) :
	function twentytwentyfive_post_format_setup() {
		add_theme_support( 'post-formats', array( 'aside', 'audio', 'chat', 'gallery', 'image', 'link', 'quote', 'status', 'video' ) );
	}
endif;
add_action( 'after_setup_theme', 'twentytwentyfive_post_format_setup' );

if ( ! function_exists( 'twentytwentyfive_editor_style' ) ) :
	function twentytwentyfive_editor_style() {
		add_editor_style( 'assets/css/editor-style.css' );
	}
endif;
add_action( 'after_setup_theme', 'twentytwentyfive_editor_style' );

if ( ! function_exists( 'twentytwentyfive_enqueue_styles' ) ) :
	function twentytwentyfive_enqueue_styles() {
		$suffix = SCRIPT_DEBUG ? '' : '.min';
		$src    = 'style' . $suffix . '.css';
		wp_enqueue_style( 'twentytwentyfive-style', get_parent_theme_file_uri( $src ), array(), wp_get_theme()->get( 'Version' ) );
		wp_style_add_data( 'twentytwentyfive-style', 'path', get_parent_theme_file_path( $src ) );
	}
endif;
add_action( 'wp_enqueue_scripts', 'twentytwentyfive_enqueue_styles' );

if ( ! function_exists( 'twentytwentyfive_block_styles' ) ) :
	function twentytwentyfive_block_styles() {
		register_block_style( 'core/list', array(
			'name'         => 'checkmark-list',
			'label'        => __( 'Checkmark', 'twentytwentyfive' ),
			'inline_style' => 'ul.is-style-checkmark-list { list-style-type: "\2713"; } ul.is-style-checkmark-list li { padding-inline-start: 1ch; }',
		) );
	}
endif;
add_action( 'init', 'twentytwentyfive_block_styles' );

if ( ! function_exists( 'twentytwentyfive_pattern_categories' ) ) :
	function twentytwentyfive_pattern_categories() {
		register_block_pattern_category( 'twentytwentyfive_page', array( 'label' => __( 'Pages', 'twentytwentyfive' ), 'description' => __( 'A collection of full page layouts.', 'twentytwentyfive' ) ) );
		register_block_pattern_category( 'twentytwentyfive_post-format', array( 'label' => __( 'Post formats', 'twentytwentyfive' ), 'description' => __( 'A collection of post format patterns.', 'twentytwentyfive' ) ) );
	}
endif;
add_action( 'init', 'twentytwentyfive_pattern_categories' );

if ( ! function_exists( 'twentytwentyfive_register_block_bindings' ) ) :
	function twentytwentyfive_register_block_bindings() {
		register_block_bindings_source( 'twentytwentyfive/format', array( 'label' => _x( 'Post format name', 'Label for the block binding placeholder in the editor', 'twentytwentyfive' ), 'get_value_callback' => 'twentytwentyfive_format_binding' ) );
	}
endif;
add_action( 'init', 'twentytwentyfive_register_block_bindings' );

if ( ! function_exists( 'twentytwentyfive_format_binding' ) ) :
	function twentytwentyfive_format_binding() {
		$post_format_slug = get_post_format();
		if ( $post_format_slug && 'standard' !== $post_format_slug ) {
			return get_post_format_string( $post_format_slug );
		}
	}
endif;

// =================================================================
// 2. FARMERLIFT CMS (CLIENT REQUIREMENTS)
// =================================================================

add_action( 'init', 'farmerlift_register_cms' );
function farmerlift_register_cms() {

    // 1. HOME BANNER (Client can Add/Remove/Update Slides)
    register_post_type( 'hero_slide', array(
        'labels' => array( 'name' => 'Home Banners', 'singular_name' => 'Banner Slide' ),
        'public' => true,
        'show_in_rest' => true,
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
        'rest_base' => 'product',
        'menu_icon' => 'dashicons-cart',
        'supports' => array( 'title', 'editor', 'thumbnail', 'excerpt' ),
        'taxonomies' => array( 'category' ),
        'has_archive' => true
    ));
}

// =================================================================
// 3. ACF FIELD DEFINITIONS (The Data Entry Forms)
// =================================================================

if( function_exists('acf_add_local_field_group') ):

    // A. HOME BANNER TEXT
    acf_add_local_field_group(array(
        'key' => 'group_home_banner',
        'title' => 'Banner Text Details',
        'fields' => array(
            array( 'key' => 'field_slide_heading', 'label' => 'Banner Heading', 'name' => 'heading', 'type' => 'text' ),
            array( 'key' => 'field_slide_sub', 'label' => 'Banner Subtext', 'name' => 'subtext', 'type' => 'textarea', 'rows' => 2 ),
            array( 'key' => 'field_btn_text', 'label' => 'Button Text', 'name' => 'button_text', 'type' => 'text', 'default_value' => 'Explore' ),
            array( 'key' => 'field_btn_url', 'label' => 'Button URL', 'name' => 'button_url', 'type' => 'text', 'default_value' => '/products' ),
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
            
            // PACKAGING MASTER LIST (Settings) - CSV Text Area (Safe for Free ACF)
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

             // PACKAGING SETTINGS (Direct & Complex)
            array( 
                'key' => 'field_pack_type_v2', 
                'label' => 'Packaging Type', 
                'name' => 'packaging_type', 
                'type' => 'select',
                'choices' => array( 'liquid' => 'Liquid (ml / L)', 'solid' => 'Solid / Powder (g / kg)' ),
                'default_value' => 'liquid',
                'ui' => 0, // simple select
            ),
            
            // Liquid Sizes (Conditional)
            array( 
                'key' => 'field_liq_sizes', 
                'label' => 'Standard Liquid Packs', 
                'name' => 'pack_sizes_liquid', 
                'type' => 'checkbox',
                'choices' => array(
                    '100 ml' => '100 ml',
                    '250 ml' => '250 ml',
                    '500 ml' => '500 ml',
                    '1 L' => '1 L',
                    '5 L' => '5 L',
                    '10 L' => '10 L',
                    '20 L' => '20 L',
                    '200 L' => '200 L (Barrel)',
                ),
                'layout' => 'horizontal',
                'conditional_logic' => array(
                    array(
                        array(
                            'field' => 'field_pack_type_v2',
                            'operator' => '==', 
                            'value' => 'liquid',
                        ),
                    ),
                ),
            ),

            // Solid Sizes (Conditional)
            array( 
                'key' => 'field_sol_sizes', 
                'label' => 'Standard Solid Packs', 
                'name' => 'pack_sizes_solid', 
                'type' => 'checkbox',
                'choices' => array(
                    '10 g' => '10 g',
                    '50 g' => '50 g',
                    '100 g' => '100 g',
                    '250 g' => '250 g',
                    '500 g' => '500 g',
                    '1 kg' => '1 kg',
                    '5 kg' => '5 kg',
                    '10 kg' => '10 kg',
                    '25 kg' => '25 kg',
                    '50 kg' => '50 kg',
                ),
                'layout' => 'horizontal',
                'conditional_logic' => array(
                    array(
                        array(
                            'field' => 'field_pack_type_v2',
                            'operator' => '==', 
                            'value' => 'solid',
                        ),
                    ),
                ),
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

    // ACF Filter to dynamically populate choices for 'field_prod_packs'
    add_filter('acf/load_field/key=field_prod_packs', 'farmerlift_populate_pack_sizes');
    function farmerlift_populate_pack_sizes( $field ) {
        // Reset choices
        $field['choices'] = array();

        // 1. Find the Site Config Post ID safely
        $config_posts = get_posts(array(
            'post_type' => 'site_config',
            'posts_per_page' => 1,
            'post_status' => 'any', // Include drafts/published
            'fields' => 'ids' // Just get ID
        ));

        if( !empty($config_posts) ) {
            $config_id = $config_posts[0];
            
            // 2. Get the field from that specific ID
            // Note: Using get_post_meta is sometimes safer if ACF get_field context is weird, 
            // but get_field is usually fine if ID is passed.
            $raw_sizes = get_field('standard_pack_sizes', $config_id);

            if( !empty($raw_sizes) ) {
                $sizes_array = explode( ',', $raw_sizes );
                foreach( $sizes_array as $size ) {
                    $clean = trim($size);
                    if( !empty($clean) ) {
                        $field['choices'][ $clean ] = $clean;
                    }
                }
            }
        }

        // Fallback / Debugging
        if( empty($field['choices']) ) {
            $field['choices']['0'] = 'Please add sizes in Global Settings -> Master Packaging List';
        }

        return $field;
    }

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

// Security: Enable App Passwords for Auto-Migration scripts
add_filter( 'wp_is_application_passwords_available', '__return_true' );
?>

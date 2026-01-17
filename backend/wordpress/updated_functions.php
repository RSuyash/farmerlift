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

// Modular Include: Core Content Types (Products, Banners, Galleries)
// Safe include: Only load if the file exists in the same directory
$core_cms_path = dirname(__FILE__) . '/farmerlift-core-cms.php';
if ( file_exists( $core_cms_path ) ) {
    require_once $core_cms_path;
}

// =================================================================
// 3. ACF FIELD DEFINITIONS (The Data Entry Forms)
// =================================================================

// Modular Include: ACF Field Definitions (Data Model)
// Safe include: Only load if the file exists in the same directory
$acf_fields_path = dirname(__FILE__) . '/farmerlift-acf-fields.php';
if ( file_exists( $acf_fields_path ) ) {
    require_once $acf_fields_path;
}

// =================================================================
// 4. REST FIELD REGISTRATION (Force URLs cleanly via API)
// =================================================================
// Modular Include: Admin Pro Features (Image Fixes + Better Lists)
// Safe include: Only load if the file exists in the same directory
$admin_pro_path = dirname(__FILE__) . '/farmerlift-admin-pro.php';
if ( file_exists( $admin_pro_path ) ) {
    require_once $admin_pro_path;
}

// =================================================================
// 5. INCLUDE QR CODE STUDIO (Modular)
// =================================================================
// Safe include: Only load if the file exists in the same directory
$qr_system_path = dirname(__FILE__) . '/qr-code-system.php';
if ( file_exists( $qr_system_path ) ) {
    require_once $qr_system_path;
}
?>

<?php
/**
 * FarmerLift CRM Lite
 * 
 * Provides a custom Dashboard interface for managing Web Leads.
 */

if ( ! defined( 'ABSPATH' ) ) exit;

// 1. Add "CRM" Menu (Top Level)
add_action('admin_menu', function() {
    add_menu_page(
        'FarmerLift CRM', 
        'FarmerLift CRM', 
        'manage_options', 
        'farmerlift-crm', 
        'farmerlift_crm_render_dashboard', 
        'dashicons-groups', 
        6 
    );
});

// 2. Render Dashboard (View)
function farmerlift_crm_render_dashboard() {
    require_once plugin_dir_path(__FILE__) . 'views/dashboard.php';
}

// 3. Register AJAX Actions
require_once plugin_dir_path(__FILE__) . 'ajax/actions.php';
// 4. Handle CSV Export
add_action('admin_post_export_web_leads', function() {
    if (!current_user_can('manage_options')) wp_die('Unauthorized');

    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename=farmerlift-leads-' . date('Y-m-d') . '.csv');

    $output = fopen('php://output', 'w');
    fputcsv($output, array('ID', 'Date', 'Name', 'Phone', 'Email', 'Role', 'City', 'State', 'GST', 'Message'));

    $leads = get_posts(array(
        'post_type' => 'web_lead',
        'numberposts' => -1,
        'post_status' => 'publish',
        'orderby' => 'date',
        'order' => 'DESC'
    ));

    foreach ($leads as $lead) {
        $meta = get_post_meta($lead->ID);
        fputcsv($output, array(
            $lead->ID,
            $lead->post_date,
            $lead->post_title, // Name is in Title
            $meta['lead_phone'][0] ?? '',
            $meta['lead_email'][0] ?? '',
            $meta['lead_type'][0] ?? '',
            $meta['lead_city'][0] ?? '',
            $meta['lead_state'][0] ?? '',
            $meta['lead_gst'][0] ?? '',
            $meta['lead_raw_msg'][0] ?? $lead->post_content
        ));
    }

    fclose($output);
    exit;
});
?>

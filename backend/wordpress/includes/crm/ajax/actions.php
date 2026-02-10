<?php
if ( ! defined( 'ABSPATH' ) ) exit;

// 1. Update Lead Status
add_action('wp_ajax_farmerlift_update_status', function() {
    if (!current_user_can('manage_options')) wp_send_json_error('Unauthorized');
    
    $post_id = intval($_POST['post_id']);
    $status = sanitize_text_field($_POST['status']);
    
    if (!$post_id || !$status) wp_send_json_error('Missing data');
    
    update_post_meta($post_id, 'lead_status', $status);
    
    wp_send_json_success('Status updated');
});

// 2. Add Lead Note
add_action('wp_ajax_farmerlift_add_note', function() {
    if (!current_user_can('manage_options')) wp_send_json_error('Unauthorized');
    
    $post_id = intval($_POST['post_id']);
    $note = sanitize_textarea_field($_POST['note']);
    
    if (!$post_id || !$note) wp_send_json_error('Missing data');
    
    $user = wp_get_current_user();
    $new_note = array(
        'text' => $note,
        'author' => $user->display_name,
        'time' => current_time('mysql')
    );
    
    // Append to existing notes array
    $current_notes = get_post_meta($post_id, 'lead_notes_log', true);
    if (!is_array($current_notes)) $current_notes = array();
    
    array_unshift($current_notes, $new_note); // Newest first
    
    update_post_meta($post_id, 'lead_notes_log', $current_notes);
    
    wp_send_json_success(['note' => $new_note]);
});
// 3. Delete Lead
add_action('wp_ajax_farmerlift_delete_lead', function() {
    if (!current_user_can('delete_posts')) wp_send_json_error('Unauthorized');
    
    $post_id = intval($_POST['post_id']);
    if (!$post_id) wp_send_json_error('Missing data');
    
    // Move to Trash (safety)
    $deleted = wp_trash_post($post_id);
    
    if($deleted) wp_send_json_success();
    else wp_send_json_error('Could not trash post');
});
?>

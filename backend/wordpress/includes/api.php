<?php
/**
 * FarmerLift Custom API Endpoints
 * 
 * Handles custom REST API routes for the frontend application.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}

add_action( 'rest_api_init', function () {
    register_rest_route( 'farmerlift/v1', '/submit-registration', array(
        'methods' => 'POST',
        'callback' => 'farmerlift_handle_registration',
        'permission_callback' => '__return_true', // Open endpoint, allow public registration
    ) );
} );

function farmerlift_handle_registration( WP_REST_Request $request ) {
    // 1. Sanitize Input
    $params = $request->get_json_params();
    
    $name = sanitize_text_field( $params['name'] ?? '' );
    $phone = sanitize_text_field( $params['phone'] ?? '' );
    $email = sanitize_email( $params['email'] ?? '' );
    $type = sanitize_text_field( $params['type'] ?? '' );
    $dob = sanitize_text_field( $params['dob'] ?? '' );
    $gst = sanitize_text_field( $params['gstNumber'] ?? $params['gst'] ?? '' );
    $city = sanitize_text_field( $params['city'] ?? '' );
    $state = sanitize_text_field( $params['state'] ?? '' );
    $address = sanitize_textarea_field( $params['address'] ?? '' );
    $message = sanitize_textarea_field( $params['message'] ?? '' );

    // Basic Validation
    if ( empty($name) || empty($phone) ) {
        return new WP_Error( 'missing_fields', 'Name and Phone are required.', array( 'status' => 400 ) );
    }

    // 2. SAVE TO DATABASE (Web Lead CPT)
    $post_id = wp_insert_post( array(
        'post_title'    => $name . ' (' . ucfirst($type) . ')',
        'post_content'  => "Message:\n" . $message . "\n\nAddress:\n" . $address . "\n\nDOB: " . $dob . "\nGST: " . $gst,
        'post_status'   => 'publish',
        'post_type'     => 'web_lead',
        'meta_input'    => array(
            'lead_phone'    => $phone,
            'lead_email'    => $email,
            'lead_type'     => $type,
            'lead_dob'      => $dob,
            'lead_gst'      => $gst,
            'lead_city'     => $city,
            'lead_state'    => $state,
            'lead_address'  => $address,
            'lead_raw_msg'  => $message
        )
    ));

    // 3. Prepare Emails

    // A. User Auto-Response
    $user_subject = "Welcome to FarmerLift - Registration Received";
    $user_message = "Dear $name,\n\n";
    $user_message .= "Thank you for registering with FarmerLift as a " . ucfirst($type) . ".\n\n";
    $user_message .= "We have received your details safely. Our team is currently reviewing your application and will contact you at $phone within 24-48 hours.\n\n";
    $user_message .= "Here is a summary of what you submitted:\n";
    $user_message .= "Name: $name\n";
    $user_message .= "Location: $city, $state\n";
    $user_message .= "Role: $type\n\n";
    $user_message .= "Best Regards,\nTeam FarmerLift\nhttps://farmerlift.in";

    $headers = array('Content-Type: text/plain; charset=UTF-8');
    
    // Send to User (only if email provided)
    if ( ! empty($email) ) {
        wp_mail( $email, $user_subject, $user_message, $headers );
    }

    // B. Admin Notification
    $admin_email = get_option( 'admin_email' );
    $admin_subject = "[New Lead] $name - $type - $city";
    $admin_message = "New Registration from Website:\n\n";
    $admin_message .= "Name: $name\n";
    $admin_message .= "Phone: $phone\n";
    $admin_message .= "Email: $email\n";
    $admin_message .= "Type: $type\n";
    $admin_message .= "DOB: $dob\n";
    $admin_message .= "GST: $gst\n";
    $admin_message .= "City: $city\n";
    $admin_message .= "State: $state\n";
    $admin_message .= "Address: $address\n";
    $admin_message .= "Message/Crops: $message\n";
    
    wp_mail( $admin_email, $admin_subject, $admin_message, $headers );

    // 3. Return Success
    return new WP_REST_Response( array(
        'success' => true,
        'message' => 'Registration handled successfully.',
        'data' => array( 'name' => $name )
    ), 200 );
}

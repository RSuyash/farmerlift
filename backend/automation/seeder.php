<?php
/**
 * FarmerLift Certification Seeder
 * Run via SSH: php seeder.php
 */

// 1. Load WordPress
// Adjust path if needed. Assuming we run this from theme root or similar depth.
// If uploaded to theme root: ../../../wp-load.php
// But we will upload to theme folder.
// Let's try to detect or hardcode based on known path.
$wp_load = __DIR__ . '/../../../wp-load.php'; 

if (!file_exists($wp_load)) {
    // Try absolute path if relative fails
    $wp_load = '/home/u146189558/domains/admin.farmerlift.in/public_html/wp-load.php';
}

if (!file_exists($wp_load)) {
    die("Error: Could not find wp-load.php at $wp_load\n");
}

require_once($wp_load);

echo "WordPress Loaded. Seeding Certifications...\n";

// 2. Define Dummy Data
$dummy_certs = [
    [
        'title' => 'ISO 9001:2015 Quality Management',
        'content' => 'Certified for Quality Management Systems in production and supply of agricultural inputs.',
        'acf' => [
            'cert_number' => 'ISO/QM/9001/2025/4582',
            'cert_authority' => 'TUV SUD South Asia',
            'cert_type' => 'iso',
            'cert_standard' => 'ISO 9001:2015',
            'cert_scope' => 'Manufacturing, trading and supply of Organic Fertilizers, Bio-Stimulants and Micronutrients.',
            'valid_until' => '2028-12-31',
            'cert_file' => 'https://pdfobject.com/pdf/sample.pdf' // Dummy PDF for verification
        ]
    ],
    [
        'title' => 'FCO Manufacturing License',
        'content' => 'Official license to manufacture and sell organic fertilizers under the Fertilizer Control Order 1985.',
        'acf' => [
            'cert_number' => 'MFG/FCO/MH/PUNE/102',
            'cert_authority' => 'Dept of Agriculture, Govt of Maharashtra',
            'cert_type' => 'fco',
            'cert_standard' => 'Clause 8 of FCO 1985',
            'cert_scope' => 'Permission to manufacture Organic Manure, City Compost, and NPK mixtures.',
            'valid_until' => '2027-06-30',
            'cert_file' => 'https://pdfobject.com/pdf/sample.pdf'
        ]
    ],
    [
        'title' => 'CIB Registration Certificate',
        'content' => 'Registration for manufacture of Bio-Pesticides approved by Central Insecticides Board.',
        'acf' => [
            'cert_number' => 'CIB-120482/2024/Bio-Pesticide',
            'cert_authority' => 'Central Insecticides Board & Registration Committee (CIB&RC)',
            'cert_type' => 'cib',
            'cert_standard' => 'Insecticides Act, 1968',
            'cert_scope' => 'Bio-Pesticide: Trichoderma Viride 1% WP',
            'valid_until' => '2029-03-15',
            'cert_file' => 'https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg' // Dummy Image
        ]
    ],
    [
        'title' => 'Soil Analysis Report: Batch #402',
        'content' => 'Lab analysis confirming NPK content and absence of heavy metals for Batch 402.',
        'acf' => [
            'cert_number' => 'LAB/REP/2026/JAN/042',
            'cert_authority' => 'Regional Soil Testing Laboratory (NABL Accredited)',
            'cert_type' => 'lab',
            'cert_standard' => 'NABL / IS 10158',
            'cert_scope' => 'Chemical Analysis of Organic Carbon and NPK ratios.',
            'valid_until' => '', // Reports don't expire usually
            'cert_file' => 'https://pdfobject.com/pdf/sample.pdf'
        ]
    ]
];

// 3. Insert Posts
foreach ($dummy_certs as $data) {
    // Check if exists
    $existing = get_page_by_title($data['title'], OBJECT, 'certification');
    $post_id = 0;

    if ($existing) {
        echo "Updating existing: " . $data['title'] . "\n";
        $post_id = $existing->ID;
    } else {
        $post_id = wp_insert_post([
            'post_title' => $data['title'],
            'post_content' => $data['content'],
            'post_status' => 'publish',
            'post_type' => 'certification'
        ]);
        echo "Created Post [$post_id]: " . $data['title'] . "\n";
    }

    if ($post_id) {
        // Update ACF Fields
        foreach ($data['acf'] as $key => $value) {
            update_field($key, $value, $post_id);
        }
    }
}

echo "Seeding Complete.\n";
?>

<?php
/**
 * FarmerLift QR Code System
 * 
 * Purpose: Adds a "QR Studio" menu to WordPress Admin.
 * Features: 
 *  - Lists all products with their Permanent ID.
 *  - Generates "Link-Rot Proof" QR Codes pointing to https://farmerlift.in/qr/[ID]
 *  - Client-side High-Res PNG Generation.
 *  - Search & Filter by Category.
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

// 1. ADD MENU ITEM
add_action('admin_menu', 'farmerlift_register_qr_menu');
function farmerlift_register_qr_menu() {
    add_menu_page(
        'QR Studio',            // Page Title
        'QR Studio',            // Menu Title
        'edit_posts',           // Capability
        'farmerlift-qr',        // Menu Slug
        'farmerlift_render_qr_page', // Callback
        'dashicons-qr',         // Icon
        25                      // Position (below Products)
    );
}

// 2. RENDER THE ADMIN PAGE
function farmerlift_render_qr_page() {
    // Handle Inputs
    $search_query = isset($_GET['s']) ? sanitize_text_field($_GET['s']) : '';
    $cat_filter   = isset($_GET['cat_id']) ? intval($_GET['cat_id']) : 0;

    // Fetch Categories for Dropdown
    $categories = get_terms( array(
        'taxonomy'   => 'category',
        'hide_empty' => true,
    ) );

    // Build Query
    $args = array(
        'post_type'      => 'product',
        'posts_per_page' => -1,
        'post_status'    => 'publish',
        'orderby'        => 'title',
        'order'          => 'ASC',
        's'              => $search_query
    );

    if ($cat_filter > 0) {
        $args['tax_query'] = array(
            array(
                'taxonomy' => 'category',
                'field'    => 'term_id',
                'terms'    => $cat_filter,
            ),
        );
    }

    $products = get_posts($args);
    
    // Base URL for the Stable Redirector (CORRECTED: using /qr/ directly)
    $base_redirect_url = 'https://farmerlift.in/qr/'; 

    ?>
    <div class="wrap">
        <h1 class="wp-heading-inline">FarmerLift QR Studio 🚀</h1>
        <p class="description">
            Generate <strong>High-Resolution, Permanent QR Codes</strong> for your product packaging.<br>
            These codes use the <strong>Product ID</strong>, so they will <u>never break</u> even if you rename the product later.
        </p>
        <hr class="wp-header-end">

        <!-- FILTER BAR -->
        <div style="background: #fff; padding: 15px; border: 1px solid #ccd0d4; margin: 20px 0; display: flex; align-items: center; gap: 15px; box-shadow: 0 1px 1px rgba(0,0,0,0.04);">
            <form method="get" action="">
                <input type="hidden" name="page" value="farmerlift-qr" />
                
                <!-- Category Dropdown -->
                <select name="cat_id" style="min-width: 150px;">
                    <option value="0">All Categories</option>
                    <?php foreach ($categories as $cat): ?>
                        <option value="<?php echo $cat->term_id; ?>" <?php selected($cat_filter, $cat->term_id); ?>>
                            <?php echo esc_html($cat->name); ?>
                        </option>
                    <?php endforeach; ?>
                </select>

                <!-- Search Box -->
                <input type="text" name="s" placeholder="Search products..." value="<?php echo esc_attr($search_query); ?>" />

                <button type="submit" class="button button-secondary">Filter & Search</button>
                
                <?php if($search_query || $cat_filter): ?>
                    <a href="?page=farmerlift-qr" class="button">Reset</a>
                <?php endif; ?>
            </form>
            <div style="margin-left: auto;">
                <strong>Found:</strong> <?php echo count($products); ?> Products
            </div>
        </div>

        <!-- QR GENERATION LIBRARY (QRCode.js) -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>

        <style>
            .qr-table { width: 100%; border-collapse: collapse; background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
            .qr-table th, .qr-table td { text-align: left; padding: 15px; border-bottom: 1px solid #eee; vertical-align: middle; }
            .qr-table th { background: #f9f9f9; font-weight: 600; color: #444; }
            .qr-table tr:hover { background: #f0f0f1; }
            .qr-preview-box { 
                width: 128px; height: 128px; background: #fff; border: 1px dashed #ccc; 
                display: flex; align-items: center; justify-content: center;
            }
            .qr-preview-box img { max-width: 100%; }
            .btn-download { 
                background: #007cba; color: #fff; text-decoration: none; padding: 8px 12px; border-radius: 4px; border: none; cursor: pointer; display: inline-block;
            }
            .btn-download:hover { background: #005a87; color: #fff; }
            .pill-id { background: #e5e5e5; padding: 4px 8px; border-radius: 4px; font-family: monospace; font-weight: bold; }
            .cat-pill { background: #e6f7ff; color: #007cba; padding: 2px 6px; border-radius: 3px; font-size: 11px; margin-right: 4px; border: 1px solid #b3e0ff; }
        </style>

        <table class="qr-table">
            <thead>
                <tr>
                    <th style="width: 80px;">ID</th>
                    <th>Product Name & Category</th>
                    <th>Permanent Link (Broken-Link Proof)</th>
                    <th style="width: 150px;">QR Preview</th>
                    <th style="width: 150px;">Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php if ( empty($products) ): ?>
                    <tr><td colspan="5" style="text-align:center; padding: 30px; color: #666;">No products found matching your filters.</td></tr>
                <?php else: ?>
                    <?php foreach ($products as $post): 
                        $stable_url = $base_redirect_url . $post->ID; 
                        $safe_filename = sanitize_title($post->post_title) . '-qr.png';
                        
                        // Get Terms for display
                        $terms = get_the_terms($post->ID, 'category');
                        $term_list = '';
                        if ($terms && !is_wp_error($terms)) {
                            foreach ($terms as $t) {
                                $term_list .= '<span class="cat-pill">' . esc_html($t->name) . '</span>';
                            }
                        }
                    ?>
                        <tr>
                            <td><span class="pill-id">#<?php echo $post->ID; ?></span></td>
                            <td>
                                <strong style="font-size: 14px;"><?php echo esc_html($post->post_title); ?></strong><br>
                                <div style="margin-top: 5px;"><?php echo $term_list; ?></div>
                            </td>
                            <td>
                                <a href="<?php echo $stable_url; ?>" target="_blank" style="color: #00aa00; font-family: monospace;">
                                    <?php echo $stable_url; ?>
                                </a>
                            </td>
                            <td>
                                <!-- Container for QR -->
                                <div id="qr-container-<?php echo $post->ID; ?>" class="qr-preview-box"></div>
                            </td>
                            <td>
                                <button class="btn-download" onclick="downloadQR(<?php echo $post->ID; ?>, '<?php echo $stable_url; ?>', '<?php echo $safe_filename; ?>')">
                                    ⬇ Download HQ
                                </button>
                            </td>
                        </tr>
                        
                        <!-- Auto-Generate Preview on Load -->
                        <script>
                            setTimeout(() => {
                                var el = document.getElementById("qr-container-<?php echo $post->ID; ?>");
                                if(el) {
                                    el.innerHTML = ""; // Clear
                                    new QRCode(el, {
                                        text: "<?php echo $stable_url; ?>",
                                        width: 110,
                                        height: 110,
                                        colorDark : "#000000",
                                        colorLight : "#ffffff",
                                        correctLevel : QRCode.CorrectLevel.H
                                    });
                                }
                            }, 300); 
                        </script>

                    <?php endforeach; ?>
                <?php endif; ?>
            </tbody>
        </table>
    </div>

    <!-- CLIENT-SIDE DOWNLOAD SCRIPT -->
    <script>
        function downloadQR(id, url, filename) {
            // Create a temporary container off-screen to generate a HUGE QR
            const div = document.createElement('div');
            // 2000x2000 px for High Quality Print
            
            new QRCode(div, {
                text: url,
                width: 2000,
                height: 2000,
                correctLevel : QRCode.CorrectLevel.H // High Error Correction
            });

            // Wait for canvas to be drawn
            setTimeout(() => {
                const canvas = div.querySelector('canvas');
                if (!canvas) {
                     // Fallback if library uses img tag directly (older browsers)
                    const img = div.querySelector('img');
                    if (img) {
                        const link = document.createElement('a');
                        link.href = img.src;
                        link.download = filename;
                        link.click();
                        return;
                    }
                    alert("Error generating QR. Please try again.");
                    return;
                }

                // Create Download Link
                const dataUrl = canvas.toDataURL("image/png");
                const link = document.createElement('a');
                link.href = dataUrl;
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }, 100);
        }
    </script>
    <?php
}
?>

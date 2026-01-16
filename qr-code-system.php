<?php
/**
 * FarmerLift QR Code System
 * 
 * Purpose: Adds a "QR Studio" menu to WordPress Admin.
 * Features: 
 *  - Lists all products with their Permanent ID.
 *  - Generates "Link-Rot Proof" QR Codes pointing to https://farmerlift.in/qr/[ID]
 *  - Client-side High-Res PNG Generation.
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
    // Fetch all published products
    $args = array(
        'post_type'      => 'product',
        'posts_per_page' => -1,
        'post_status'    => 'publish',
        'orderby'        => 'title',
        'order'          => 'ASC'
    );
    $products = get_posts($args);
    
    // Base URL for the Stable Redirector
    // CHANGE THIS DOMAIN IF DEPLOYING TO A DIFFERENT DOMAIN
    $base_redirect_url = 'https://farmerlift.in/app/qr/'; 

    ?>
    <div class="wrap">
        <h1 class="wp-heading-inline">FarmerLift QR Studio 🚀</h1>
        <p class="description">
            Generate <strong>High-Resolution, Permanent QR Codes</strong> for your product packaging.<br>
            These codes use the <strong>Product ID</strong>, so they will <u>never break</u> even if you rename the product later.
        </p>
        <hr class="wp-header-end">

        <!-- QR GENERATION LIBRARY (QRCode.js) -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>

        <style>
            .qr-table { width: 100%; border-collapse: collapse; background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-top: 20px; }
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
        </style>

        <table class="qr-table">
            <thead>
                <tr>
                    <th style="width: 80px;">ID</th>
                    <th>Product Name</th>
                    <th>Permanent Link (Stable)</th>
                    <th style="width: 150px;">QR Preview</th>
                    <th style="width: 150px;">Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php if ( empty($products) ): ?>
                    <tr><td colspan="5">No products found.</td></tr>
                <?php else: ?>
                    <?php foreach ($products as $post): 
                        $stable_url = $base_redirect_url . $post->ID; 
                        $safe_filename = sanitize_title($post->post_title) . '-qr.png';
                    ?>
                        <tr>
                            <td><span class="pill-id">#<?php echo $post->ID; ?></span></td>
                            <td><strong><?php echo esc_html($post->post_title); ?></strong></td>
                            <td>
                                <a href="<?php echo $stable_url; ?>" target="_blank" style="color: #00aa00;">
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
                                new QRCode(document.getElementById("qr-container-<?php echo $post->ID; ?>"), {
                                    text: "<?php echo $stable_url; ?>",
                                    width: 110,
                                    height: 110,
                                    colorDark : "#000000",
                                    colorLight : "#ffffff",
                                    correctLevel : QRCode.CorrectLevel.H
                                });
                            }, 500); // Small delay to ensure render
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
            // Note: QRCode.js is canvas based.
            
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

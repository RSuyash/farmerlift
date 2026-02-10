<?php
/**
 * FarmerLift QR Code System (PRO Version)
 * 
 * Purpose: Adds a "QR Studio" menu to WordPress Admin.
 * Features: 
 *  - Lists all products with their Permanent ID.
 *  - Generates "Link-Rot Proof" QR Codes pointing to /qr/[ID]
 *  - Client-side High-Res PNG Generation.
 *  - Search & Filter by Category.
 *  - Localhost / Production Toggle for Testing.
 *  - Product Thumbnails.
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
    // A. Handle Inputs
    $search_query = isset($_GET['s']) ? sanitize_text_field($_GET['s']) : '';
    $cat_filter   = isset($_GET['cat_id']) ? intval($_GET['cat_id']) : 0;

    // B. Fetch Data
    $categories = get_terms( array('taxonomy' => 'category', 'hide_empty' => true) );

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
    
    // C. Default Base URL (Production)
    $prod_url = 'https://farmerlift.in/qr/';
    $local_url = 'http://localhost:3000/qr/';

    ?>
    <div class="wrap">
        <h1 class="wp-heading-inline">FarmerLift QR Studio 🚀</h1>
        <p class="description">
            Generate <strong>Permanent QR Codes</strong> that never break, even if you rename products.
        </p>
        <hr class="wp-header-end">

        <!-- CONTROLS CONTAINER -->
        <div class="qr-controls">
            
            <!-- Filter Form -->
            <form method="get" action="" class="qr-filter-form">
                <input type="hidden" name="page" value="farmerlift-qr" />
                
                <select name="cat_id">
                    <option value="0">All Categories</option>
                    <?php foreach ($categories as $cat): ?>
                        <option value="<?php echo $cat->term_id; ?>" <?php selected($cat_filter, $cat->term_id); ?>>
                            <?php echo esc_html($cat->name); ?>
                        </option>
                    <?php endforeach; ?>
                </select>

                <input type="text" name="s" placeholder="Search products..." value="<?php echo esc_attr($search_query); ?>" />
                <button type="submit" class="button button-secondary">Filter</button>
                <?php if($search_query || $cat_filter): ?>
                    <a href="?page=farmerlift-qr" class="button">Reset</a>
                <?php endif; ?>
            </form>

            <!-- Environment Toggle -->
            <div class="qr-toggle-group">
                <span>QR Destination:</span>
                <label><input type="radio" name="env_target" value="<?php echo $prod_url; ?>" checked onclick="updateQRs(this.value)"> Production</label>
                <label><input type="radio" name="env_target" value="<?php echo $local_url; ?>" onclick="updateQRs(this.value)"> Localhost</label>
            </div>
            
            <div class="qr-stats">Found: <strong><?php echo count($products); ?></strong></div>
        </div>

        <!-- TABLE -->
        <table class="qr-table">
            <thead>
                <tr>
                    <th style="width: 50px;">ID</th>
                    <th style="width: 60px;">Image</th>
                    <th>Product Details</th>
                    <th>Smart Link</th>
                    <th style="width: 140px;">QR Preview</th>
                    <th style="width: 140px;">Action</th>
                </tr>
            </thead>
            <tbody>
                <?php if ( empty($products) ): ?>
                    <tr><td colspan="6" style="text-align:center; padding: 40px; color: #666;">No products found.</td></tr>
                <?php else: ?>
                    <?php foreach ($products as $post): 
                        // Data Prep
                        $thumb = get_the_post_thumbnail_url($post->ID, 'thumbnail');
                        if(!$thumb) $thumb = 'https://via.placeholder.com/50?text=No+Img';
                        
                        $terms = get_the_terms($post->ID, 'category');
                        $term_list = ($terms && !is_wp_error($terms)) ? join(', ', wp_list_pluck($terms, 'name')) : '';
                        
                        $safe_filename = sanitize_title($post->post_title) . '-qr.png';
                    ?>
                        <tr class="product-row" data-id="<?php echo $post->ID; ?>">
                            <td><span class="pill-id">#<?php echo $post->ID; ?></span></td>
                            <td><img src="<?php echo $thumb; ?>" class="row-thumb"></td>
                            <td>
                                <strong><?php echo esc_html($post->post_title); ?></strong><br>
                                <span class="term-pill"><?php echo $term_list; ?></span>
                            </td>
                            <td>
                                <a href="#" target="_blank" class="magic-link" id="link-<?php echo $post->ID; ?>">...</a>
                            </td>
                            <td>
                                <div id="qr-<?php echo $post->ID; ?>" class="qr-box"></div>
                            </td>
                            <td>
                                <button class="btn-dl" onclick="downloadHQ(<?php echo $post->ID; ?>, '<?php echo $safe_filename; ?>')">Download PNG</button>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                <?php endif; ?>
            </tbody>
        </table>
    </div>

    <!-- STYLES -->
    <style>
        .qr-controls { 
            background: #fff; padding: 15px; border: 1px solid #ccd0d4; margin: 20px 0; 
            display: flex; align-items: center; gap: 20px; box-shadow: 0 1px 2px rgba(0,0,0,0.05); 
        }
        .qr-filter-form { display: flex; gap: 10px; align-items: center; flex: 1; }
        .qr-toggle-group { 
            display: flex; gap: 10px; align-items: center; background: #f0f0f1; padding: 5px 15px; border-radius: 20px; border: 1px solid #ddd;
        }
        .qr-table { width: 100%; border-collapse: collapse; background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-radius: 4px; overflow: hidden; }
        .qr-table th { background: #f8f9fa; text-align: left; padding: 12px 15px; border-bottom: 2px solid #eee; color: #444; }
        .qr-table td { padding: 10px 15px; border-bottom: 1px solid #eee; vertical-align: middle; }
        .qr-table tr:last-child td { border-bottom: none; }
        .qr-table tr:hover { background: #fafafa; }
        
        .row-thumb { width: 48px; height: 48px; object-fit: cover; border-radius: 4px; border: 1px solid #ddd; }
        .pill-id { background: #e5eff5; padding: 3px 6px; border-radius: 4px; font-family: monospace; font-size: 11px; color: #0073aa; }
        .term-pill { font-size: 11px; color: #666; background: #f0f0f1; padding: 2px 6px; border-radius: 3px; display: inline-block; margin-top: 4px; }
        
        .magic-link { font-family: monospace; color: #2271b1; text-decoration: none; font-size: 12px; }
        .magic-link:hover { text-decoration: underline; }
        
        .qr-box { width: 80px; height: 80px; display: flex; justify-content: center; align-items: center; }
        .qr-box img { max-width: 100%; }
        
        .btn-dl { 
            background: #2271b1; color: #fff; border: none; padding: 6px 12px; border-radius: 3px; cursor: pointer; font-size: 12px; transition: all 0.2s;
        }
        .btn-dl:hover { background: #135e96; }
    </style>

    <!-- SCRIPTS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
    <script>
        let currentBaseUrl = '<?php echo $prod_url; ?>';

        // 1. Initialize on Load
        document.addEventListener('DOMContentLoaded', () => {
             renderAllQRs();
        });

        // 2. Toggle Environment
        function updateQRs(newUrl) {
            currentBaseUrl = newUrl;
            renderAllQRs();
        }

        // 3. Render Loop
        function renderAllQRs() {
            const rows = document.querySelectorAll('.product-row');
            rows.forEach(row => {
                const id = row.getAttribute('data-id');
                const fullUrl = currentBaseUrl + id;
                
                // Update Link Text
                const linkEl = document.getElementById('link-' + id);
                if(linkEl) {
                    linkEl.href = fullUrl;
                    linkEl.textContent = fullUrl;
                }

                // Update QR
                const box = document.getElementById('qr-' + id);
                if(box) {
                    box.innerHTML = ''; // Clear old
                    new QRCode(box, {
                        text: fullUrl,
                        width: 80,
                        height: 80,
                        colorDark : "#000000",
                        colorLight : "#ffffff",
                        correctLevel : QRCode.CorrectLevel.H
                    });
                }
            });
        }

        // 4. Download Handler
        function downloadHQ(id, filename) {
            const fullUrl = currentBaseUrl + id;
            
            // Create temp container
            const div = document.createElement('div');
            new QRCode(div, {
                text: fullUrl,
                width: 2000,
                height: 2000,
                correctLevel : QRCode.CorrectLevel.H
            });

            setTimeout(() => {
                const canvas = div.querySelector('canvas');
                if(canvas) {
                    const link = document.createElement('a');
                    link.download = filename;
                    link.href = canvas.toDataURL("image/png");
                    link.click();
                } else {
                    const img = div.querySelector('img');
                    if(img) {
                        const link = document.createElement('a');
                        link.download = filename;
                        link.href = img.src;
                        link.click();
                    }
                }
            }, 200);
        }
    </script>
    <?php
}
?>

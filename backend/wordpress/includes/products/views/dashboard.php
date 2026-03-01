<?php
/**
 * FarmerLift Product Manager - Dashboard View
 * 
 * Interactive product management UI with inline SKU editing,
 * bulk generation, and SKU history viewer.
 */

if ( ! defined( 'ABSPATH' ) ) exit;

// Fetch products
$search_query = isset($_GET['s']) ? sanitize_text_field($_GET['s']) : '';
$cat_filter   = isset($_GET['cat_slug']) ? sanitize_text_field($_GET['cat_slug']) : '';

$args = array(
    'post_type'      => 'product',
    'posts_per_page' => -1,
    'post_status'    => 'publish',
    'orderby'        => 'title',
    'order'          => 'ASC',
    's'              => $search_query,
);

if (!empty($cat_filter)) {
    $args['tax_query'] = array(
        array(
            'taxonomy' => 'category',
            'field'    => 'slug',
            'terms'    => $cat_filter,
        ),
    );
}

$products = get_posts($args);
$categories = get_terms(array('taxonomy' => 'category', 'hide_empty' => true));
$prefixes = FARMERLIFT_SKU_PREFIXES;

// Stats
$total = count($products);
$with_sku = 0;
$without_sku = 0;
foreach ($products as $p) {
    $sku = get_post_meta($p->ID, 'product_sku', true);
    if (!empty($sku)) $with_sku++;
    else $without_sku++;
}
?>

<div class="wrap">
    <h1 class="wp-heading-inline">🏷️ FarmerLift Product Manager</h1>
    <p class="description">
        Manage <strong>Product SKU codes</strong> for QR generation. SKU history ensures old QR codes never break.
    </p>
    <hr class="wp-header-end">

    <!-- STATS -->
    <div class="pm-stats">
        <div class="pm-stat-card">
            <div class="pm-stat-number"><?php echo $total; ?></div>
            <div class="pm-stat-label">Total Products</div>
        </div>
        <div class="pm-stat-card pm-stat-green">
            <div class="pm-stat-number"><?php echo $with_sku; ?></div>
            <div class="pm-stat-label">With SKU</div>
        </div>
        <div class="pm-stat-card pm-stat-red">
            <div class="pm-stat-number"><?php echo $without_sku; ?></div>
            <div class="pm-stat-label">Missing SKU</div>
        </div>
    </div>

    <!-- CONTROLS -->
    <div class="pm-controls">
        <!-- Filter -->
        <form method="get" class="pm-filter-form">
            <input type="hidden" name="page" value="farmerlift-products" />
            <select name="cat_slug">
                <option value="">All Categories</option>
                <?php foreach ($categories as $cat): ?>
                    <option value="<?php echo esc_attr($cat->slug); ?>" <?php selected($cat_filter, $cat->slug); ?>>
                        <?php echo esc_html($cat->name); ?>
                        <?php if(isset($prefixes[$cat->slug])): ?>
                            (<?php echo $prefixes[$cat->slug]; ?>)
                        <?php endif; ?>
                    </option>
                <?php endforeach; ?>
            </select>
            <input type="text" name="s" placeholder="Search products..." value="<?php echo esc_attr($search_query); ?>" />
            <button type="submit" class="button">Filter</button>
            <?php if($search_query || $cat_filter): ?>
                <a href="?page=farmerlift-products" class="button">Reset</a>
            <?php endif; ?>
        </form>

        <!-- Bulk Actions -->
        <!-- Bulk Actions -->
        <div class="pm-bulk-actions" style="position: relative;">
            <button id="btn-bulk-missing" class="button button-primary" onclick="bulkGenerateSKUs(true)">
                ⚡ Auto-Fill Missing SKUs
            </button>
            <details style="margin-left: 10px; display: inline-block; position: relative;">
                <summary style="cursor: pointer; color: #d63638; font-weight: 600; padding-top: 5px;">⚠️ Advanced Options</summary>
                <div style="position: absolute; right: 0; background: #fffcfc; border: 1px solid #d63638; padding: 12px; margin-top: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); border-radius: 4px; z-index: 99; min-width: 280px;">
                    <p style="margin: 0 0 10px 0; font-size: 12px; color: #666;">This will reassign EVERY unlocked product with a brand new SKU and push existing ones to history. Use with caution.</p>
                    <button id="btn-bulk-generate" class="button" onclick="bulkGenerateSKUs(false)" style="color: #d63638; border-color: #d63638;">
                        Overwrite All Unlocked SKUs
                    </button>
                </div>
            </details>
        </div>
    </div>

    <!-- TABLE -->
    <table class="pm-table">
        <thead>
            <tr>
                <th style="width:55px">WP ID</th>
                <th style="width:55px">Image</th>
                <th>Product Name</th>
                <th>Category</th>
                <th style="width:160px">Current SKU</th>
                <th style="width:110px; text-align:center;">Print Lock</th>
                <th style="width:200px">SKU History</th>
                <th style="width:100px">Actions</th>
            </tr>
        </thead>
        <tbody>
            <?php if (empty($products)): ?>
                <tr><td colspan="7" style="text-align:center; padding:40px; color:#666;">No products found.</td></tr>
            <?php else: ?>
                <?php foreach ($products as $post):
                    $thumb = get_the_post_thumbnail_url($post->ID, 'thumbnail');
                    if(!$thumb) $thumb = 'https://via.placeholder.com/40?text=No';
                    
                    $terms = get_the_terms($post->ID, 'category');
                    $term_name = ($terms && !is_wp_error($terms)) ? $terms[0]->name : '—';
                    $term_slug = ($terms && !is_wp_error($terms)) ? $terms[0]->slug : '';
                    $prefix = isset($prefixes[$term_slug]) ? $prefixes[$term_slug] : 'OTH';
                    
                    $sku = get_post_meta($post->ID, 'product_sku', true);
                    $history = get_post_meta($post->ID, 'product_sku_history', true);
                    $is_locked = get_post_meta($post->ID, 'product_sku_locked', true) == '1';
                    if (!is_array($history)) $history = array();
                ?>
                    <tr class="pm-row" data-id="<?php echo $post->ID; ?>" data-prefix="<?php echo $prefix; ?>">
                        <td><span class="pill-id">#<?php echo $post->ID; ?></span></td>
                        <td><img src="<?php echo $thumb; ?>" class="pm-thumb"></td>
                        <td>
                            <strong><?php echo esc_html($post->post_title); ?></strong>
                        </td>
                        <td>
                            <span class="pm-cat-pill"><?php echo esc_html($term_name); ?></span>
                            <span class="pm-prefix-badge"><?php echo $prefix; ?></span>
                        </td>
                        <td>
                            <div class="pm-sku-cell" id="sku-cell-<?php echo $post->ID; ?>">
                                <?php if (!empty($sku)): ?>
                                    <span class="pm-sku-value <?php echo $is_locked ? 'pm-sku-locked' : ''; ?>" id="sku-val-<?php echo $post->ID; ?>"><?php echo esc_html($sku); ?></span>
                                    <?php if (!$is_locked): ?>
                                        <button class="pm-btn-edit" onclick="editSKU(<?php echo $post->ID; ?>, '<?php echo esc_js($sku); ?>')" title="Edit SKU">✏️</button>
                                    <?php endif; ?>
                                <?php else: ?>
                                    <span class="pm-sku-empty">No SKU</span>
                                    <button class="pm-btn-edit pm-btn-assign" onclick="editSKU(<?php echo $post->ID; ?>, '')" title="Assign SKU">+ Assign</button>
                                <?php endif; ?>
                            </div>
                            <!-- Inline Edit (hidden by default) -->
                            <div class="pm-sku-edit" id="sku-edit-<?php echo $post->ID; ?>" style="display:none;">
                                <input type="text" id="sku-input-<?php echo $post->ID; ?>" 
                                       placeholder="<?php echo $prefix; ?>-001" 
                                       class="pm-sku-input"
                                       maxlength="10" />
                                <button class="button button-small button-primary" onclick="saveSKU(<?php echo $post->ID; ?>)">Save</button>
                                <button class="button button-small" onclick="cancelEdit(<?php echo $post->ID; ?>)">✕</button>
                        </td>
                        <td style="text-align:center;">
                            <div class="pm-lock-cell" id="lock-cell-<?php echo $post->ID; ?>">
                                <?php if (empty($sku)): ?>
                                    —
                                <?php elseif ($is_locked): ?>
                                    <button class="button button-small" onclick="togglePrintLock(<?php echo $post->ID; ?>, false)" title="Unlock for editing" style="color: #d63638; border-color: #d63638;">🔒 Locked</button>
                                <?php else: ?>
                                    <button class="button button-small" onclick="togglePrintLock(<?php echo $post->ID; ?>, true)" title="Protect printed SKU">🔓 Protect</button>
                                <?php endif; ?>
                            </div>
                        </td>
                        <td>
                            <div class="pm-history" id="history-<?php echo $post->ID; ?>">
                                <?php if (!empty($history)): ?>
                                    <?php foreach ($history as $old_sku): ?>
                                        <span class="pm-history-pill"><?php echo esc_html($old_sku); ?></span>
                                    <?php endforeach; ?>
                                <?php else: ?>
                                    <span class="pm-no-history">—</span>
                                <?php endif; ?>
                            </div>
                        </td>
                        <td>
                            <a href="<?php echo get_edit_post_link($post->ID); ?>" class="button button-small" title="Edit in WP">Edit</a>
                        </td>
                    </tr>
                <?php endforeach; ?>
            <?php endif; ?>
        </tbody>
    </table>

    <!-- PREFIX LEGEND -->
    <div class="pm-legend">
        <h4>Category Prefix Legend</h4>
        <div class="pm-legend-grid">
            <?php foreach ($prefixes as $slug => $pfx): ?>
                <div class="pm-legend-item">
                    <span class="pm-prefix-badge"><?php echo $pfx; ?></span>
                    <span><?php echo esc_html($slug); ?></span>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</div>

<!-- STYLES -->
<style>
    .pm-stats {
        display: flex; gap: 15px; margin: 20px 0;
    }
    .pm-stat-card {
        background: #fff; border: 1px solid #ddd; border-radius: 8px; padding: 15px 25px;
        text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.06); min-width: 120px;
    }
    .pm-stat-green { border-left: 4px solid #22c55e; }
    .pm-stat-red { border-left: 4px solid #ef4444; }
    .pm-stat-number { font-size: 28px; font-weight: 700; color: #1e293b; }
    .pm-stat-label { font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 4px; }

    .pm-controls {
        background: #fff; padding: 15px; border: 1px solid #ccd0d4; margin: 15px 0;
        display: flex; align-items: center; gap: 15px; box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        flex-wrap: wrap;
    }
    .pm-filter-form { display: flex; gap: 8px; align-items: center; flex: 1; }
    .pm-bulk-actions { display: flex; gap: 8px; }

    .pm-table {
        width: 100%; border-collapse: collapse; background: #fff;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-radius: 4px; overflow: hidden;
    }
    .pm-table th {
        background: #f8f9fa; text-align: left; padding: 10px 12px;
        border-bottom: 2px solid #eee; color: #444; font-size: 12px;
        text-transform: uppercase; letter-spacing: 0.5px;
    }
    .pm-table td { padding: 8px 12px; border-bottom: 1px solid #eee; vertical-align: middle; }
    .pm-table tr:hover { background: #fafbfc; }

    .pm-thumb {
        width: 40px; height: 40px; object-fit: cover; border-radius: 4px; border: 1px solid #ddd;
    }
    .pill-id {
        background: #e5eff5; padding: 2px 6px; border-radius: 4px;
        font-family: monospace; font-size: 11px; color: #0073aa;
    }
    .pm-cat-pill {
        font-size: 11px; color: #666; background: #f0f0f1; padding: 2px 6px;
        border-radius: 3px; display: inline-block;
    }
    .pm-prefix-badge {
        background: #2271b1; color: #fff; padding: 2px 6px; border-radius: 3px;
        font-family: monospace; font-size: 11px; font-weight: 600; display: inline-block; margin-left: 4px;
    }

    .pm-sku-cell { display: flex; align-items: center; gap: 6px; }
    .pm-sku-value {
        background: #dcfce7; color: #166534; padding: 4px 10px; border-radius: 4px;
        font-family: monospace; font-weight: 600; font-size: 13px;
    }
    .pm-sku-empty {
        color: #9ca3af; font-style: italic; font-size: 12px;
    }
    .pm-sku-locked {
        background: #f1f5f9; color: #475569; border: 1px dashed #cbd5e1;
    }
    .pm-btn-edit {
        background: none; border: 1px solid #ddd; border-radius: 3px; cursor: pointer;
        font-size: 12px; padding: 2px 6px; transition: all 0.2s;
    }
    .pm-btn-edit:hover { background: #f0f0f1; border-color: #999; }
    .pm-btn-assign {
        background: #fff7ed; color: #c2410c; border-color: #fed7aa;
    }
    .pm-btn-assign:hover { background: #ffedd5; }

    .pm-sku-edit { display: flex; align-items: center; gap: 4px; }
    .pm-sku-input {
        width: 100px; font-family: monospace; font-size: 13px; padding: 3px 6px;
        border: 2px solid #2271b1; border-radius: 3px; text-transform: uppercase;
    }

    .pm-history-pill {
        background: #fef3c7; color: #92400e; padding: 2px 6px; border-radius: 3px;
        font-family: monospace; font-size: 11px; display: inline-block; margin: 1px 2px;
    }
    .pm-no-history { color: #d1d5db; font-size: 12px; }

    .pm-legend {
        margin-top: 30px; background: #fff; border: 1px solid #ddd; border-radius: 8px; padding: 15px 20px;
    }
    .pm-legend h4 { margin: 0 0 10px 0; color: #374151; }
    .pm-legend-grid { display: flex; flex-wrap: wrap; gap: 10px; }
    .pm-legend-item { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #666; }

    /* Notifications */
    .pm-toast {
        position: fixed; top: 40px; right: 20px; z-index: 99999;
        padding: 12px 20px; border-radius: 6px; color: #fff; font-weight: 500;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15); animation: slideIn 0.3s ease;
    }
    .pm-toast-success { background: #22c55e; }
    .pm-toast-error { background: #ef4444; }
    @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
</style>

<!-- SCRIPTS -->
<script>
    const ajaxUrl = '<?php echo admin_url("admin-ajax.php"); ?>';
    const nonce = '<?php echo wp_create_nonce("farmerlift_products_nonce"); ?>';

    // ─── TOGGLE LOCK ─────────────────────────────────
    function togglePrintLock(postId, lock) {
        if (!lock && !confirm("WARNING: Unlocking this SKU allows it to be changed. If this SKU is already printed on physical bags, broken links may occur if you change it. Are you absolutely sure?")) {
            return;
        }

        const fd = new FormData();
        fd.append('action', 'farmerlift_toggle_sku_lock');
        fd.append('post_id', postId);
        fd.append('lock', lock ? 'true' : 'false');
        fd.append('_ajax_nonce', nonce);

        fetch(ajaxUrl, { method: 'POST', body: fd })
            .then(r => r.json())
            .then(resp => {
                if (resp.success) {
                    showToast(lock ? 'SKU is now locked' : 'SKU is unlocked', 'success');
                    // Easiest UI update is a quick transparent reload, but we can do it inline
                    setTimeout(() => location.reload(), 800);
                } else {
                    showToast(resp.data || 'Error updating lock', 'error');
                }
            });
    }

    // ─── INLINE EDIT ─────────────────────────────────
    function editSKU(postId, currentSku) {
        document.getElementById('sku-cell-' + postId).style.display = 'none';
        const editDiv = document.getElementById('sku-edit-' + postId);
        editDiv.style.display = 'flex';
        const input = document.getElementById('sku-input-' + postId);
        input.value = currentSku;
        input.focus();
        input.select();
    }

    function cancelEdit(postId) {
        document.getElementById('sku-edit-' + postId).style.display = 'none';
        document.getElementById('sku-cell-' + postId).style.display = 'flex';
    }

    function saveSKU(postId) {
        const input = document.getElementById('sku-input-' + postId);
        const newSku = input.value.trim().toUpperCase();

        if (!newSku) {
            showToast('SKU cannot be empty', 'error');
            return;
        }

        if (!/^[A-Z]{2,4}-\d{3,4}$/.test(newSku)) {
            showToast('Invalid format. Use: WSN-001', 'error');
            return;
        }

        const fd = new FormData();
        fd.append('action', 'farmerlift_update_sku');
        fd.append('post_id', postId);
        fd.append('new_sku', newSku);
        fd.append('_ajax_nonce', nonce);

        fetch(ajaxUrl, { method: 'POST', body: fd })
            .then(r => r.json())
            .then(resp => {
                if (resp.success) {
                    // Update display
                    const cell = document.getElementById('sku-cell-' + postId);
                    cell.innerHTML = `
                        <span class="pm-sku-value" id="sku-val-${postId}">${resp.data.sku}</span>
                        <button class="pm-btn-edit" onclick="editSKU(${postId}, '${resp.data.sku}')" title="Edit SKU">✏️</button>
                    `;
                    cell.style.display = 'flex';
                    document.getElementById('sku-edit-' + postId).style.display = 'none';

                    // Update history
                    if (resp.data.history && resp.data.history.length > 0) {
                        const histDiv = document.getElementById('history-' + postId);
                        histDiv.innerHTML = resp.data.history.map(h =>
                            `<span class="pm-history-pill">${h}</span>`
                        ).join('');
                    }

                    showToast('SKU updated: ' + resp.data.sku, 'success');
                } else {
                    showToast(resp.data || 'Error updating SKU', 'error');
                }
            })
            .catch(err => {
                showToast('Network error', 'error');
            });
    }

    // ─── BULK GENERATE ───────────────────────────────
    function bulkGenerateSKUs(skipExisting) {
        const msg = skipExisting
            ? 'This will assign SKUs to products that DON\'T have one yet. Products with existing SKUs will be SKIPPED. Continue?'
            : '⚠️ This will REASSIGN SKUs for ALL products. Old SKUs will be saved to history. Continue?';
        
        if (!confirm(msg)) return;

        const fd = new FormData();
        fd.append('action', 'farmerlift_bulk_generate_skus');
        fd.append('skip_existing', skipExisting ? 'true' : 'false');
        fd.append('_ajax_nonce', nonce);

        document.getElementById('btn-bulk-generate').disabled = true;
        document.getElementById('btn-bulk-missing').disabled = true;

        fetch(ajaxUrl, { method: 'POST', body: fd })
            .then(r => r.json())
            .then(resp => {
                if (resp.success) {
                    showToast(`Done! Updated: ${resp.data.updated}, Skipped: ${resp.data.skipped}`, 'success');
                    setTimeout(() => location.reload(), 1500);
                } else {
                    showToast(resp.data || 'Bulk generation failed', 'error');
                }
            })
            .catch(err => {
                showToast('Network error', 'error');
            })
            .finally(() => {
                document.getElementById('btn-bulk-generate').disabled = false;
                document.getElementById('btn-bulk-missing').disabled = false;
            });
    }

    // ─── TOAST NOTIFICATION ──────────────────────────
    function showToast(message, type) {
        const toast = document.createElement('div');
        toast.className = 'pm-toast pm-toast-' + type;
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3500);
    }

    // ─── KEYBOARD SUPPORT ────────────────────────────
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.target.classList.contains('pm-sku-input')) {
            const postId = e.target.id.replace('sku-input-', '');
            saveSKU(parseInt(postId));
        }
        if (e.key === 'Escape' && e.target.classList.contains('pm-sku-input')) {
            const postId = e.target.id.replace('sku-input-', '');
            cancelEdit(parseInt(postId));
        }
    });
</script>
<?php
?>

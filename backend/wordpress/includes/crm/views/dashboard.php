<div class="wrap farmerlift-crm">
    <h1 class="wp-heading-inline">FarmerLift CRM</h1>
    <hr class="wp-header-end">

    <?php
    // Get Stats
    $args = ['post_type'=>'web_lead', 'numberposts'=>-1, 'post_status'=>'publish'];
    $leads = get_posts($args);
    $total = count($leads);
    $new = 0; $contacted = 0; $converted = 0;

    foreach($leads as $l) {
        $s = get_post_meta($l->ID, 'lead_status', true) ?: 'New';
        if($s=='New') $new++;
        if($s=='Contacted') $contacted++;
        if($s=='Converted') $converted++;
    }
    ?>

    <!-- Stats Bar -->
    <div style="display:flex; gap:20px; margin:20px 0; flex-wrap:wrap;">
        <div class="fl-card" style="border-left:4px solid #ef4444;">
            <h3>New / Action Needed</h3>
            <div class="large-num"><?php echo $new; ?></div>
        </div>
        <div class="fl-card" style="border-left:4px solid #f59e0b;">
            <h3>In Progress</h3>
            <div class="large-num"><?php echo $contacted; ?></div>
        </div>
        <div class="fl-card" style="border-left:4px solid #10b981;">
            <h3>Converted</h3>
            <div class="large-num"><?php echo $converted; ?></div>
        </div>
        <div class="fl-card">
            <h3>Total Leads</h3>
            <div class="large-num"><?php echo $total; ?></div>
        </div>
    </div>

    <!-- Interface Toolbar -->
    <div class="fl-toolbar">
        <input type="text" id="fl-search" placeholder="🔍 Search Name, Phone, City..." class="fl-input">
        
        <select id="fl-filter-status" class="fl-select">
            <option value="">All Statuses</option>
            <option value="New">🔴 New</option>
            <option value="Contacted">🟡 Contacted</option>
            <option value="Converted">🟢 Converted</option>
            <option value="Lost">⚪ Lost</option>
        </select>

        <select id="fl-filter-role" class="fl-select">
            <option value="">All Roles</option>
            <option value="Farmer">Farmer</option>
            <option value="Dealer">Dealer</option>
            <option value="Distributor">Distributor</option>
        </select>
        
        <a href="<?php echo admin_url('admin-post.php?action=export_web_leads'); ?>" class="button button-secondary" style="margin-left:auto;">
            <span class="dashicons dashicons-download"></span> Export CSV
        </a>
    </div>

    <!-- Main Table -->
    <div class="fl-table-wrapper">
        <table class="wp-list-table widefat fixed striped" id="fl-leads-table">
            <thead>
                <tr>
                    <th width="140">Status</th>
                    <th width="220">Contact</th>
                    <th width="150">Role & Location</th>
                    <th>Requirement / Message</th>
                    <th width="200">History / Notes</th>
                    <th width="120">Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach($leads as $lead): 
                    $meta = get_post_meta($lead->ID);
                    $status = $meta['lead_status'][0] ?? 'New';
                    $phone = $meta['lead_phone'][0] ?? '';
                    $role = $meta['lead_type'][0] ?? 'Unknown';
                    $notes = get_post_meta($lead->ID, 'lead_notes_log', true) ?: [];
                    $latest_note = !empty($notes) ? $notes[0]['text'] : '';
                    
                    // Clean phone for WhatsApp (remove spaces/dashes)
                    $wa_phone = preg_replace('/[^0-9]/', '', $phone);
                    if(strlen($wa_phone) == 10) $wa_phone = '91' . $wa_phone; // Add India code if missing
                ?>
                <tr id="lead-<?php echo $lead->ID; ?>" data-status="<?php echo esc_attr($status); ?>" data-role="<?php echo esc_attr($role); ?>">
                    <td>
                        <select class="fl-status-select" data-id="<?php echo $lead->ID; ?>" style="width:100%; border-color: #ddd; color:#444; font-weight:600;">
                            <option value="New" <?php selected($status, 'New'); ?>>🔴 New</option>
                            <option value="Contacted" <?php selected($status, 'Contacted'); ?>>🟡 Contacted</option>
                            <option value="Converted" <?php selected($status, 'Converted'); ?>>🟢 Converted</option>
                            <option value="Lost" <?php selected($status, 'Lost'); ?>>⚪ Lost</option>
                        </select>
                    </td>
                    <td>
                        <strong><?php echo esc_html($lead->post_title); ?></strong><br>
                        <div style="display:flex; align-items:center; gap:5px; margin-top:2px;">
                            <a href="tel:<?php echo $phone; ?>" style="font-size:13px; font-weight:600; color:#444;"><?php echo $phone; ?></a>
                            <?php if($wa_phone): ?>
                            <a href="https://wa.me/<?php echo $wa_phone; ?>" target="_blank" title="Chat on WhatsApp" style="text-decoration:none;">
                                <span class="dashicons dashicons-whatsapp" style="color:#25D366; font-size:18px;"></span>
                            </a>
                            <?php endif; ?>
                        </div>
                        <span style="color:#888; font-size:11px;"><?php echo get_the_date('M j, Y', $lead); ?></span>
                    </td>
                    <td>
                        <span class="fl-badge role-<?php echo strtolower($role); ?>"><?php echo $role; ?></span><br>
                        <span style="font-size:12px; color:#666;">
                            <?php echo $meta['lead_city'][0] ?? '-'; ?>, <?php echo $meta['lead_state'][0] ?? ''; ?>
                        </span>
                    </td>
                    <td>
                        <div style="max-height:80px; overflow-y:auto; font-size:12px; color:#555; line-height:1.4;">
                            <?php echo nl2br(esc_html($meta['lead_raw_msg'][0] ?? $lead->post_content)); ?>
                        </div>
                    </td>
                    <td>
                        <div class="fl-notes-area" id="notes-<?php echo $lead->ID; ?>" style="cursor:pointer;" title="Click to add note">
                            <?php if($latest_note): ?>
                                <em style="font-size:11px; color:#333; background:#fff9c4; padding:2px 5px; border-radius:3px;">"<?php echo esc_html(substr($latest_note, 0, 50)) . '...'; ?>"</em>
                            <?php else: ?>
                                <span style="color:#ccc; font-size:11px;">+ Add Note</span>
                            <?php endif; ?>
                        </div>
                    </td>
                    <td>
                        <div style="display:flex; gap:5px;">
                            <button class="button button-small fl-add-note-btn" data-id="<?php echo $lead->ID; ?>" title="Add Note">📝</button>
                            <button class="button button-small fl-delete-btn" data-id="<?php echo $lead->ID; ?>" title="Delete Lead" style="color:#dc2626; border-color:#dc2626;">🗑️</button>
                        </div>
                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
        <?php if(empty($leads)) echo '<p style="padding:20px; text-align:center; color:#666;">No leads found.</p>'; ?>
    </div>

</div>

<style>
.fl-card { background:#fff; padding:15px 25px; border-radius:8px; box-shadow:0 1px 3px rgba(0,0,0,0.1); flex:1; min-width:150px; }
.fl-card h3 { margin:0; font-size:13px; color:#888; text-transform:uppercase; letter-spacing:0.5px; }
.fl-card .large-num { font-size:32px; font-weight:700; color:#333; margin-top:5px; }
.fl-table-wrapper { background:#fff; border-radius:8px; overflow:hidden; box-shadow:0 1px 3px rgba(0,0,0,0.1); }
.fl-toolbar { display:flex; gap:10px; margin-bottom:15px; align-items:center; flex-wrap:wrap; }
.fl-input, .fl-select { padding:6px 10px; border:1px solid #ccc; border-radius:4px; min-width:150px; }
.fl-badge { background:#e5e7eb; padding:2px 8px; border-radius:12px; font-size:10px; font-weight:bold; text-transform:uppercase; display:inline-block; margin-bottom:2px; }
.role-dealer { background:#dbeafe; color:#1e40af; }
.role-farmer { background:#dcfce7; color:#166534; }
.fl-notes-area:hover { background:#f9f9f9; }
</style>

<script>
jQuery(document).ready(function($) {
    // 1. Live Search
    $('#fl-search').on('keyup', function() {
        var value = $(this).val().toLowerCase();
        $('#fl-leads-table tbody tr').filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    // 2. Filter Logic
    function applyFilters() {
        var status = $('#fl-filter-status').val();
        var role = $('#fl-filter-role').val();
        
        $('#fl-leads-table tbody tr').each(function() {
            var rowStatus = $(this).data('status');
            var rowRole = $(this).data('role') || ''; // Handle empty role
            
            var show = true;
            if(status && rowStatus !== status) show = false;
            // Case insensitive role check
            if(role && rowRole.toLowerCase() !== role.toLowerCase()) show = false;
            
            if(show) $(this).show();
            else $(this).hide();
        });
    }
    
    $('#fl-filter-status, #fl-filter-role').change(applyFilters);

    // 3. Status Update
    $('.fl-status-select').change(function() {
        var id = $(this).data('id');
        var val = $(this).val();
        $.post(ajaxurl, { action: 'farmerlift_update_status', post_id: id, status: val });
        // Update data attribute for filter
        $('#lead-'+id).data('status', val); 
    });

    // 4. Add Note
    $(document).on('click', '.fl-add-note-btn, .fl-notes-area', function() {
        // Handle both button and area click, prefer button data-id or area id
        var id = $(this).data('id'); 
        if(!id) id = $(this).attr('id').replace('notes-', '');
        
        var note = prompt("Enter note:");
        if(note) {
            $.post(ajaxurl, { action: 'farmerlift_add_note', post_id: id, note: note }, function(res) {
                if(res.success) {
                    $('#notes-'+id).html('<em style="color:#333; background:#fff9c4; padding:2px 5px;">"'+note.substring(0,50)+'..."</em>');
                }
            });
        }
    });

    // 5. Delete Lead
    $('.fl-delete-btn').click(function() {
        if(!confirm('Are you sure you want to delete this lead?')) return;
        var id = $(this).data('id');
        var row = $('#lead-'+id);
        
        $.post(ajaxurl, { action: 'farmerlift_delete_lead', post_id: id }, function(res) {
            if(res.success) {
                row.fadeOut(300, function(){ $(this).remove(); });
            } else {
                alert('Error deleting');
            }
        });
    });
});
</script>

# Devlog #2: FarmerLift CRM Module
**Date:** February 10, 2026  
**Author:** Development Team  
**Status:** ✅ Complete

---

## Overview

Built a dedicated CRM (Customer Relationship Management) module for managing web leads submitted through the registration form on `farmerlift.in`. This replaces the basic WordPress post list view with a custom, interactive dashboard inside WP Admin.

---

## Problem Statement

Web leads were being stored as a custom post type (`web_lead`) but could only be viewed through the default WordPress admin list — no status tracking, no notes, no quick actions like WhatsApp contact or CSV export.

### Requirements
1. Stats bar showing lead counts by status
2. Filterable, searchable lead table
3. AJAX-powered status updates (no page reloads)
4. Note-taking system for each lead
5. WhatsApp click-to-chat integration
6. CSV export functionality
7. Delete with confirmation

---

## Architecture

```
includes/crm/
├── farmerlift-crm.php     ← Module loader, menu registration, CSV export
├── views/
│   └── dashboard.php      ← Full dashboard UI (HTML/CSS/JS)
└── ajax/
    └── actions.php         ← 3 AJAX handlers
```

### Module Loader (`farmerlift-crm.php`)

Responsibilities:
- Registers top-level admin menu: "FarmerLift CRM"
- Includes sub-modules (`views/dashboard.php`, `ajax/actions.php`)
- Handles CSV export via `admin_post_export_web_leads` hook

### AJAX Handlers (`ajax/actions.php`)

| Handler | Hook | Purpose |
|---------|------|---------|
| `farmerlift_update_status` | `wp_ajax_farmerlift_update_status` | Updates lead status meta without reload |
| `farmerlift_add_note` | `wp_ajax_farmerlift_add_note` | Appends timestamped note to lead's `_notes` meta |
| `farmerlift_delete_lead` | `wp_ajax_farmerlift_delete_lead` | Moves lead to trash with nonce verification |

All handlers implement:
- `current_user_can('manage_options')` permission check
- Nonce verification for CSRF protection
- JSON response with success/error status

### Dashboard UI (`views/dashboard.php`)

Full-featured dashboard with:
- **Stats Bar:** 4 cards showing Total / New / In Progress / Converted counts
- **Lead Table:** Columns for Status, Contact, Role/Location, Requirement, History, Actions
- **Interactive Status Dropdown:** Changes status via AJAX, updates the row color
- **Note System:** Expandable note history + "Add Note" input per lead
- **WhatsApp Integration:** Phone icon that opens `wa.me/{number}` with pre-filled message
- **Search & Filters:** Live search across all fields, dropdown filters for Status and Role
- **Delete Button:** Trash icon with `confirm()` dialog

---

## Key Implementation Details

### Status System

Leads have 4 possible statuses stored in `_lead_status` post meta:

| Status | Color | Meaning |
|--------|-------|---------|
| `new` | 🔵 Blue | Fresh lead, unprocessed |
| `contacted` | 🟡 Yellow | Initial contact made |
| `in_progress` | 🟠 Orange | Active conversation/follow-up |
| `converted` | 🟢 Green | Successfully converted to partner |

### CSV Export

The export includes these fields:
- Name, Email, Phone, GST Number
- Role (Farmer/Dealer/Distributor)
- Location (City, State)
- Message/Requirement
- Status
- Submission Date

### WhatsApp Click-to-Chat

```javascript
// Generates WhatsApp link with pre-filled message
`https://wa.me/91${phone}?text=Hello ${name}, thank you for registering with FarmerLift!`
```

---

## Issues Encountered & Solutions

### Issue #1: GST Number Not Appearing in Export
**Problem:** CSV export showed empty GST column for all leads.  
**Root Cause:** The API endpoint (`farmerlift-api.php`) expected the field as `gstNumber`, but the registration form was sending it as `gst`.  
**Fix:** Updated the API to accept both field names:
```php
$gst = sanitize_text_field($params['gstNumber'] ?? $params['gst'] ?? '');
```

### Issue #2: Duplicate CRM Code
**Problem:** CRM-related functions existed in both `admin.php` and the new `crm/` module.  
**Fix:** Removed lines 146-222 from `admin.php` after confirming the CRM module contained all the functionality.

### Issue #3: Nonce Verification for Delete
**Problem:** Initial delete handler didn't verify nonces, creating a CSRF vulnerability.  
**Fix:** Added `wp_verify_nonce()` check before processing delete requests.

---

## Security Considerations

1. **All AJAX handlers** check `current_user_can('manage_options')` (admin only)
2. **Nonce verification** on all state-changing operations
3. **Input sanitization** using `sanitize_text_field()` and `intval()`
4. **Output escaping** using `esc_html()` and `esc_attr()` in dashboard views
5. **`wp_trash_post()`** used instead of `wp_delete_post()` — leads can be recovered

---

## Testing Checklist
- [ ] Stats bar shows correct counts
- [ ] Status dropdown updates without page reload
- [ ] Notes are saved with timestamp and appear in history
- [ ] WhatsApp link opens with correct phone number
- [ ] CSV export contains all fields including GST
- [ ] Search filters leads in real-time
- [ ] Delete moves lead to trash (recoverable)
- [ ] Only admin users can access the CRM

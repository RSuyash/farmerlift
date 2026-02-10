# Devlog #1: Backend Architecture Refactoring
**Date:** February 10, 2026  
**Author:** Development Team  
**Status:** ✅ Complete

---

## Overview

Refactored the WordPress backend from a flat file structure into a modular, organized architecture. All custom PHP files were consolidated into an `includes/` directory with descriptive naming conventions, and a new CRM module was extracted into its own subdirectory.

---

## Problem Statement

The WordPress theme (`twentytwentyfive`) had accumulated several custom PHP files at the root level with inconsistent naming:

```
themes/twentytwentyfive/
├── farmerlift-core-cms.php
├── farmerlift-api.php
├── farmerlift-admin-pro.php
├── farmerlift-acf-fields.php
├── qr-code-system.php
└── functions.php
```

### Issues
1. **No separation of concerns** — CRM logic, API endpoints, ACF fields, and admin UI were all mixed at the root level.
2. **Naming inconsistency** — Some files used `farmerlift-` prefix, others didn't (`qr-code-system.php`).
3. **Scalability problem** — Adding new features meant more files at root level, making navigation difficult.
4. **Duplicate code** — CRM-related functions (export, dashboard widget) existed in `farmerlift-admin-pro.php` AND were being recreated in a new CRM module, causing potential conflicts.

---

## Solution: Modular Directory Structure

### New Architecture

```
themes/twentytwentyfive/
├── functions.php              ← Main loader (updated)
├── includes/
│   ├── core.php               ← CPT registration, taxonomies (was farmerlift-core-cms.php)
│   ├── api.php                ← REST API endpoints (was farmerlift-api.php)
│   ├── admin.php              ← Admin UI, columns, filters (was farmerlift-admin-pro.php)
│   ├── acf.php                ← ACF field definitions (was farmerlift-acf-fields.php)
│   ├── qr.php                 ← QR code system (was qr-code-system.php)
│   └── crm/
│       ├── farmerlift-crm.php ← CRM module loader + CSV export
│       ├── views/
│       │   └── dashboard.php  ← CRM dashboard UI
│       └── ajax/
│           └── actions.php    ← AJAX handlers (status, notes, delete)
```

### Key Design Decisions

1. **Short, descriptive names** — `core.php`, `api.php`, `admin.php` instead of long prefixed names.
2. **CRM as a sub-module** — Its own directory with `views/` and `ajax/` subdirectories, following MVC-lite pattern.
3. **Single entry point** — `functions.php` loops through `includes/*.php` and loads the CRM module separately.

---

## Implementation Details

### Updated `functions.php`

The main loader was updated to use a clean include loop:

```php
// Load all modules from includes/
$includes_dir = get_template_directory() . '/includes/';
$modules = ['core.php', 'api.php', 'admin.php', 'acf.php', 'qr.php'];

foreach ($modules as $module) {
    $file = $includes_dir . $module;
    if (file_exists($file)) {
        require_once $file;
    }
}

// Load CRM Module
$crm_file = $includes_dir . 'crm/farmerlift-crm.php';
if (file_exists($crm_file)) {
    require_once $crm_file;
}
```

### Deduplication in `admin.php`

Lines 146-222 of the original `farmerlift-admin-pro.php` contained CRM export and dashboard widget code. This was **removed** after being migrated to `crm/farmerlift-crm.php` to prevent:
- Double menu registrations
- Conflicting AJAX handlers
- CSV export generating twice

---

## Verification

- All files were compared with the live server versions via SSH (MATCH confirmed)
- `functions.php` was backed up as `functions.php.bak` before modification
- New `functions.php.new` was created for review before deployment
- API endpoints tested and confirmed working after refactor

---

## Gotchas & Lessons Learned

1. **WordPress path functions** — Always use `get_template_directory()` (not `__DIR__`) for theme file paths in `functions.php`, as the active theme path can differ in child theme setups.
2. **Backup first** — The `functions.php.bak` approach saved time by providing an instant rollback path.
3. **Order matters** — `core.php` (CPT registration) must load before `api.php` (REST endpoints) since the API depends on registered post types.

---

## Files Modified
| File | Action | Notes |
|------|--------|-------|
| `functions.php` | Modified | Updated to load from `includes/` |
| `includes/core.php` | Moved | Was `farmerlift-core-cms.php` |
| `includes/api.php` | Moved | Was `farmerlift-api.php` |
| `includes/admin.php` | Moved + Cleaned | Was `farmerlift-admin-pro.php`, removed duplicate CRM code |
| `includes/acf.php` | Moved | Was `farmerlift-acf-fields.php` |
| `includes/qr.php` | Moved | Was `qr-code-system.php` |
| `includes/crm/*` | New | Entire CRM module (3 files) |

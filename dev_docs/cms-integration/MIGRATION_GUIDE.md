# CMS Migration Guide

**Script:** `migrate-cms.js` (Available in history/repo root)
**Purpose:** One-time or incremental seeding of content from local JSON/Hardcoded files to WordPress.

## Prerequisites
1.  **Node.js Environment**: The project uses `axios` and `form-data` for API requests.
2.  **Credentials**: 
    *   API Endpoint: `https://admin.farmerlift.in/wp-json/wp/v2`
    *   Username: `admin` (or your WP user)
    *   Application Password: Generated via WP Admin > Users > Profile > Application Passwords.

## Migration Scope
The migration script handles the following data types:
1.  **Hero Slides:** Creates/Updates entries in the `hero_slider` custom post type. Checks for duplicates by title.
2.  **Global Settings:** Updates the `site_config` post (usually ID 1 or a specific slug) with:
    *   Business Hours
    *   Contact Email/Phone
    *   Social Links
3.  **Static Pages:** Creates `page` post types for "About Us" and "Contact Us" with ACF fields for Banner Images and Headings.
4.  **Products:** (If implemented) Maps local JSON products to `product` post type, uploading local images to the Media Library and attaching them as Featured Images.

## How to Run
```bash
# 1. ensure .env or script has valid credentials
# 2. Run the script
node migrate-cms.js
```

## Adding New Content
### For Developers
*   To add a new content type (e.g., "Testimonials"), define the Custom Post Type (CPT) in WordPress first (using CPT UI or coding in `functions.php`).
*   Add the ACF field definitions in WP.
*   Update `migrate-cms.js` with a new `migrateTestimonials()` function following the `migrateHero` pattern.

### For Content Managers
*   **No script needed.** Simply log in to the WordPress Admin Panel and add/edit content natively. The frontend will reflect changes within 60 seconds (ISR).

## Troubleshooting
*   **401 Unauthorized:** Check your Application Password.
*   **Duplicate Content:** The script uses "Title" matching to prevent duplicates. Ensure titles are unique.
*   **Image Upload Failures:** Check if the image path exists locally in `public/images/`.

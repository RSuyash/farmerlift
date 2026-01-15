# WordPress Connection & Architecture

**Version:** 1.0  
**Last Updated:** 2026-01-16  
**Reference Codes:** `lib/cms.ts`, `lib/mapper.ts`

## Overview
The FarmerLift frontend connects to a headless WordPress backend via the WP REST API. This decoupling allows the marketing and content teams to manage products, blogs, and site configuration directly in WordPress while the frontend remains a high-performance Next.js application.

## Core Components

### 1. CMS Client (`lib/cms.ts`)
This is the central data fetching utility. It abstracts the fetch calls to the WordPress API.
*   **Base URL:** Hardcoded as `https://admin.farmerlift.in/wp-json/wp/v2` (Should be moved to ENV in production).
*   **Caching:** Uses Next.js `next: { revalidate: 60 }` for ISR (Incremental Static Regeneration), updating content every 60 seconds without rebuilding.

**Key Functions:**
*   `getAllProducts()`: Fetches all products with `_embed` to get featured images and categories.
*   `getProductById(slug)`: Fetches a single product by slug.
*   `getProductsByCategory(categoryId)`: Filters fetched products by category slug.
*   `getSiteConfig()`: Fetches global settings (Business hours, contact info) from the `site_config` custom post type.

### 2. Data Mapper (`lib/mapper.ts`)
Since WordPress data structures (ACF, nested objects) are complex and "messy," this layer transforms them into clean, typed application objects.
*   **Input:** Raw JSON from WP API.
*   **Output:** strictly typed `Product` objects (defined in `types/product.ts`).

**Transformation Logic:**
*   **Category:** Extracted from `_embedded['wp:term']` to get the actual category slug (e.g., `water-soluble-npk`), rather than using the generic `spec_type` ACF field.
*   **Price:** Handles "Enquire for Price" logic. If `selling_price` is 0 or missing, it returns the string "Enquire for Price".
*   **Images:** Extracts the featured image source URL or provides a fallback placeholder.
*   **Safety:** Strips HTML tags (like `<p>`) from descriptions for clean UI rendering.

## Authentication
*   **Public Data:** Products, Posts, and Pages are fetched via public GET endpoints. No authentication is required for read operations.
*   **Admin/Write:** Migration scripts (see `MIGRATION_GUIDE.md`) use **Application Passwords** for authentication to write data to WP.

## API Endpoints Used
*   `/product?_embed&per_page=100` - Fetch Products
*   `/pages` - Fetch Static Pages (About, Contact)
*   `/site_config` - Fetch Global Settings
*   `/media` - Fetch Images (during migration)

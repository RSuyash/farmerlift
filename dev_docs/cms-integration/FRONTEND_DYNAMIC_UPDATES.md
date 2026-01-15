# Frontend Dynamic Integration

This document outlines the changes made to the Next.js application to switch from static local JSON files to dynamic WordPress content.

## Key Changes

### 1. Product Pages
**Path:** `app/products/page.tsx`, `app/products/[id]/page.tsx`, `app/catalogue/[category]/page.tsx`

*   **Before:** Imported `getAllProducts`, `getProductById` from `@/lib/db` (Local JSON).
*   **After:** Imports these functions from `@/lib/cms` (WordPress API).
*   **Impact:** Content is live. Updating a product price or image in WP updates the site automatically.

**Code Example:**
```tsx
// app/products/[id]/page.tsx
import { getProductById } from "@/lib/cms"; // Switched from @/lib/db

export default async function Page({ params }) {
    const { id } = await params;
    const product = await getProductById(id);
    // ...
}
```

### 2. Category Pages
**Path:** `app/catalogue/[category]/page.tsx`

*   **Logic:** Now fetches all products from WP and filters them using the `getProductsByCategory` helper in `lib/cms.ts`.
*   **Image Handling:** Replaced standard `next/image` with a wrapper mechanism (or `ProductImage` component) to handle potential 404s gracefully if a local image fallback is missing.

### 3. Hero Section
**Path:** `components/modules/home/HeroSection.tsx`

*   **Logic:** Fetches slides from the `hero_slider` Custom Post Type.
*   **Features:**
    *   Dynamic Images (Featured Image).
    *   Dynamic Headings/Subheadings (ACF Fields).
    *   Dynamic CTA Buttons (ACF `button_text`, `button_url`).

### 4. Contact & About Pages
**Path:** `app/contact/page.tsx`, `app/about/page.tsx`

*   **Banners:** Page banners are no longer hardcoded assets. They are fetched using `getPageBanner('slug')`.
*   **Contact Info:** Address, Email, and Phone are fetched from global `site_config` settings, allowing you to update business details site-wide from a single WP dashboard.

## UI Components
### ProductCard (`components/modules/products/ProductCard.tsx`)
*   **Price Display:** Updated to support "Enquire for Price" (string) instead of just numbers.
*   **Discount Calculation:** Added type safety checks to prevent `NaN` errors when price is text-based.
*   **Default Brand:** Defaults to "FarmerLift" if no manufacturer is specified.

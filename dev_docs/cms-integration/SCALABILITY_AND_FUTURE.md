# Scalability & Future Roadmap

**Strategy:** Decoupled Architecture (Headless CMS)
**Current Stage:** Phase 0 (Static Site + Headless WP)

## Why This Architecture Scales
We have strictly decoupled the **Frontend** (Next.js) from the **Backend** (WordPress). They interact *only* through a standardized data layer (`lib/cms.ts` + `types/product.ts`).

### 1. Moving Away from WordPress (Future Phase)
If you decide to move to a fast VPS with a custom Database (PostgreSQL/MongoDB) or a scalable SaaS CMS (Contentful/Strapi) in the future:
*   **Zero Frontend Rewrites:** You do NOT need to rewrite the React components (`ProductCard`, `HeroSection`, `CategoryPage`).
*   **Simple Swap:** You only need to update **one file**: `lib/cms.ts`.
    *   Change `fetch(WP_API...)` to `fetch(YOUR_NEW_API...)`.
    *   Update `lib/mapper.ts` to transform the new API's JSON into our existing `Product` type.
*   **Result:** The entire site switches to the new backend instantly without UI breakage.

### 2. High Traffic Handling
*   **Static Generation:** Next.js builds pages as static HTML. This means 99% of user traffic acts like loading a simple text file—extremely fast and efficient.
*   **No Database Load:** Users do not hit the WordPress database on every view. They hit the pre-built HTML. WordPress is only queried during the "Revalidation" window (once every 60s max).
*   **CDN Ready:** This architecture is native to Vercel/Netlify Edge Networks, ensuring low latency globally (or specifically optimized for rural India via caching).

### 3. Adding E-Commerce
*   The `Product` type already includes `price`, `stock`, and `sku`.
*   We can easily integrate a "Cart" and "Checkout" flow by adding a state manager (Zustand/Context) and connecting to a Payment Gateway (Razorpay/Stripe) without changing the display logic.

## Summary
You are currently running a **Pro-grade Headless Architecture**. It combines the ease of WordPress editing with the performance of static code, poised for unlimited scaling without technical debt.

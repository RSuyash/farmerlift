# Devlog #4: Google Analytics 4 Integration
**Date:** February 10, 2026  
**Author:** Development Team  
**Status:** ✅ Frontend Complete | ⏳ Awaiting Netlify Deploy + Site Kit Setup

---

## Overview

Integrated Google Analytics 4 (GA4) to track visitor behavior on `farmerlift.in` and display analytics dashboards inside the WordPress admin panel at `admin.farmerlift.in`.

---

## Architecture

```
┌─────────────────────────┐     ┌──────────────────┐     ┌─────────────────────────┐
│  farmerlift.in          │     │  Google Analytics │     │  admin.farmerlift.in    │
│  (Netlify - Next.js)    │────>│  (GA4 Cloud)      │<────│  (Hostinger - WordPress)│
│                         │     │                   │     │                         │
│  gtag.js tracking code  │     │  Data Processing  │     │  Site Kit Plugin        │
│  sends page views       │     │  & Storage        │     │  displays dashboard     │
└─────────────────────────┘     └──────────────────┘     └─────────────────────────┘
```

**Key insight:** The tracking code runs on the Netlify frontend. Site Kit on WordPress is just a **viewer** — it pulls reports from GA4 to show inside WP Admin. It does NOT do any tracking itself.

---

## Options Evaluated

| Option | Effort | Cost | Data Depth | WP Admin Dashboard |
|--------|--------|------|------------|-------------------|
| **GA4 + Site Kit** ⭐ | 30 min | Free | ●●●●● Deep | ✅ Yes |
| Custom Self-Hosted | 2-3 hrs | Free | ●●○○○ Basic | ✅ Yes (custom) |
| Netlify Analytics | 2 clicks | $9/mo | ●●●○○ Medium | ❌ No |

**Chosen:** GA4 + Site Kit (Option 1) for maximum data depth at zero cost.

---

## Implementation

### Frontend Component

**File:** `components/global/GoogleAnalytics.tsx`

```tsx
"use client";
import Script from "next/script";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
            send_page_view: true
          });
        `}
      </Script>
    </>
  );
}
```

### Design Decisions

1. **Environment variable** (`NEXT_PUBLIC_GA_MEASUREMENT_ID`) — Not hardcoded. Can be different per environment (dev/staging/prod) and is safe in client code (the `NEXT_PUBLIC_` prefix is designed for this).
2. **`afterInteractive` strategy** — Loads after page becomes interactive, not blocking first paint. Critical for the performance targets (2G/3G rural network conditions).
3. **Graceful fallback** — If env var is missing, component returns `null` (no errors, no tracking — safe for development).

### Integration Point

**File:** `app/layout.tsx`

```tsx
import GoogleAnalytics from "@/components/global/GoogleAnalytics";

// In the body:
<GoogleAnalytics />
<ThemeProvider>
  <Navbar />
  ...
</ThemeProvider>
```

Placed **outside** `ThemeProvider` since it doesn't need theme context and should load as early as possible.

---

## Configuration

### Environment Variable

**File:** `.env.local` (gitignored)

```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-CHSLVN2HYR
```

### GA4 Property Details

| Field | Value |
|-------|-------|
| Stream Name | farmerlift |
| Stream ID | 9884180618 |
| Measurement ID | G-CHSLVN2HYR |
| Enhanced Measurement | ✅ Enabled |

---

## Deployment Checklist

### Netlify (Required)
- [ ] Add environment variable in Netlify: `NEXT_PUBLIC_GA_MEASUREMENT_ID` = `G-CHSLVN2HYR`
- [ ] Redeploy the site (Deploys → Trigger Deploy)

### WordPress (Required for WP Admin Dashboard)
- [ ] Install "Site Kit by Google" plugin
- [ ] Activate and connect Google account
- [ ] Select **existing** GA4 property (NOT "Set up new property")
- [ ] Connect to existing web data stream (`G-CHSLVN2HYR`)

> ⚠️ **Important:** When Site Kit setup asks about property, always select the EXISTING property — not a new one. Creating a new property would track `admin.farmerlift.in` instead of `farmerlift.in`.

---

## Verification

After deployment:
1. Visit `farmerlift.in` in a browser
2. Open [GA4 Realtime Report](https://analytics.google.com) → should show 1 active user
3. Check browser Network tab → should see requests to `googletagmanager.com`
4. After 24-48 hours, full reports will appear in both GA4 and Site Kit dashboard

---

## What GA4 Tracks (Automatically)

With Enhanced Measurement enabled:
- Page views (all pages)
- Scroll depth (90% threshold)
- Outbound link clicks
- Site search
- Video engagement (YouTube embeds)
- File downloads
- Form interactions

---

## Files Modified
| File | Action | Notes |
|------|--------|-------|
| `components/global/GoogleAnalytics.tsx` | New | GA4 tracking component |
| `app/layout.tsx` | Modified | Added GoogleAnalytics import + render |
| `.env.local` | New | GA4 measurement ID (gitignored) |

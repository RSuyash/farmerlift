# Devlog #3: Localization — Google Translate Integration
**Date:** February 10, 2026  
**Author:** Development Team  
**Status:** ✅ Complete

---

## Overview

Implemented client-side language translation for the FarmerLift website, primarily targeting **Marathi** (मराठी) for the rural Maharashtra farmer audience. After evaluating a full i18n architecture, we opted for Google Translate as a simpler, faster solution.

---

## Decision: Full i18n vs Google Translate

### Option A: Full i18n Refactor (Rejected)

A comprehensive internationalization approach was initially planned:
- `next-intl` library integration
- Route-based locale switching (`/en/catalogue`, `/mr/catalogue`)
- JSON translation files for every page
- `middleware.ts` for locale detection

**Why rejected:**
- Would require touching **every single page and component** to wrap strings in `t()` calls
- ~200+ translation keys needed across the site
- Ongoing maintenance burden — every new text string needs manual translation
- Overkill for Phase-0 (static site pilot)

### Option B: Google Translate (Chosen)

- Zero structural changes to existing code
- Supports 100+ languages out of the box
- Google handles translation quality
- Can be removed or replaced later without any refactoring

---

## Implementation Journey

### Iteration 1: Default Google Translate Widget
**File:** `components/global/GoogleTranslate.tsx`

Initial implementation used the standard Google Translate widget:

```tsx
<div id="google_translate_element"
     className="fixed bottom-4 left-4 z-50 bg-white p-2 rounded-full shadow-lg" />
<Script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" />
```

**Problems:**
- Widget was positioned at bottom-left (hard to find)
- User wanted it at the **top of the website** for maximum accessibility
- Default Google dropdown didn't match the site's design

### Iteration 2: Moved to Navbar Top Bar
Moved the component from `layout.tsx` to the Navbar's top green bar (next to "Help Center").

**Problems encountered:**
1. **TypeScript Error:** `Property 'className' does not exist on type 'IntrinsicAttributes'`
   - **Cause:** Component didn't accept a `className` prop
   - **Fix:** Added `interface GoogleTranslateProps { className?: string }`

2. **Widget Invisible:** The dropdown text was dark (#333) on a dark green background
   - **Cause:** Default Google styles used dark text colors
   - **Fix:** Added `color: #fff !important` CSS override

3. **Multiple Failed Edits:** The `replace_file_content` tool failed several times due to content mismatch (file wasn't updated from previous iteration)
   - **Fix:** Used `write_to_file` with `Overwrite: true` to force the update

### Iteration 3: Custom Branded Toggle (Final)
**Complete rewrite** — replaced the Google dropdown with a custom button:

```tsx
<button onClick={toggleLanguage}>
  <Globe className="h-3.5 w-3.5" />
  <span>{isMarathi ? "English" : "मराठी"}</span>
</button>
```

**How it works:**
1. Google Translate widget is loaded but **hidden off-screen** (`top: -9999px`)
2. Our custom button programmatically controls the hidden `<select>` element
3. Clicking "मराठी" → sets `.goog-te-combo` value to `"mr"` → dispatches `change` event
4. Clicking "English" → clears `googtrans` cookie → reloads page

**Problems encountered:**
1. **Widget killed by CSS:** `.skiptranslate { display: none !important; }` removed the widget from DOM entirely, so `.goog-te-combo` was `null` when the button tried to find it
   - **Fix:** Removed that CSS rule. Used `position: absolute; top: -9999px` instead
2. **Loading cursor:** `disabled:cursor-wait` class showed loading spinner because `ready` state never became `true`
   - **Fix:** Removed disabled state entirely. Added cookie-based fallback (set `googtrans` cookie + reload if select not found)

---

## Final Architecture

```
components/global/
├── GoogleTranslate.tsx    ← Custom EN/मराठी toggle button
│   ├── Hidden <div id="google_translate_element"> (off-screen)
│   ├── Custom <button> with Globe icon
│   └── CSS overrides to hide Google banners
└── navbar/
    └── Navbar.tsx          ← Imports and renders <GoogleTranslate />
```

### CSS Overrides Applied

```css
.goog-te-banner-frame { display: none !important; }  /* Top banner */
body { top: 0px !important; }                          /* Prevent body shift */
#goog-gt-tt { display: none !important; }              /* Tooltip popup */
.goog-te-balloon-frame { display: none !important; }   /* Balloon popup */
.goog-text-highlight { background: none !important; }  /* Text highlight */
```

---

## Gotchas & Lessons Learned

1. **Google Translate loads async** — The `<select>` element doesn't exist immediately. You must either poll for it or use a callback-based approach.
2. **`display: none` kills Google Translate** — The widget needs to be in the visible DOM to initialize. Use off-screen positioning instead.
3. **English revert requires page reload** — Google Translate doesn't support programmatic revert to the original language. Clearing the `googtrans` cookie and reloading is the only reliable method.
4. **Cookie domain matters** — The `googtrans` cookie must be cleared for both the current domain and the base domain to fully revert.
5. **Next.js `<Script>` component** — The initial approach used `next/script` but this conflicted with conditional rendering. Manual `document.createElement("script")` in `useEffect` was more reliable.

---

## Files Modified
| File | Action | Notes |
|------|--------|-------|
| `components/global/GoogleTranslate.tsx` | Created + Iterated 3x | Custom EN/मराठी toggle |
| `components/global/navbar/Navbar.tsx` | Modified | Added import + render in top bar |
| `app/layout.tsx` | Modified | Removed old floating widget + unused import |

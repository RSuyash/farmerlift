# Devlog #6: Bug Fixes, UI Improvements & Technical Debt
**Date:** February 10, 2026  
**Author:** Development Team  
**Status:** ✅ Complete

---

## Overview

This devlog catalogs all bug fixes, UI improvements, and technical debt identified during this development session. Each entry includes the symptom, root cause, fix, and prevention advice.

---

## Bug Fixes

### Bug #1: GST Number Missing in CSV Export

| Field | Detail |
|-------|--------|
| **Severity** | Medium |
| **Symptom** | CSV export from CRM showed empty GST column for all leads |
| **Root Cause** | Field name mismatch between frontend form (`gst`) and API endpoint (`gstNumber`) |
| **File** | `backend/wordpress/farmerlift-api.php` |
| **Fix** | Accept both field names with fallback: `$params['gstNumber'] ?? $params['gst'] ?? ''` |
| **Prevention** | Maintain a shared field name contract document between frontend and backend |

### Bug #2: Google Translate TypeScript Error

| Field | Detail |
|-------|--------|
| **Severity** | High (build-blocking) |
| **Symptom** | `Type '{ className: string; }' is not assignable to type 'IntrinsicAttributes'` |
| **Root Cause** | `GoogleTranslate` component didn't define a `className` prop in its interface |
| **File** | `components/global/GoogleTranslate.tsx` |
| **Fix** | Added `interface GoogleTranslateProps { className?: string }` and updated function signature |
| **Prevention** | Always define prop interfaces when creating reusable components |

### Bug #3: Google Translate Widget Invisible in Navbar

| Field | Detail |
|-------|--------|
| **Severity** | High (feature broken) |
| **Symptom** | Widget appeared to exist in DOM but was visually invisible |
| **Root Cause** | Two issues: (1) Text color was `#333` on dark green background, (2) `replace_file_content` tool failed silently, so the fix wasn't applied |
| **File** | `components/global/GoogleTranslate.tsx` |
| **Fix** | Used `write_to_file` with `Overwrite: true` to force the update. Added `color: #fff !important` CSS |
| **Prevention** | Always verify file contents after edit tool operations. Use `view_file` to confirm changes were applied |

### Bug #4: Google Translate Toggle Button Not Working

| Field | Detail |
|-------|--------|
| **Severity** | Critical (feature broken) |
| **Symptom** | Clicking the "मराठी" button did nothing. Loading cursor appeared on hover. |
| **Root Cause** | CSS rule `.skiptranslate { display: none !important; }` removed the entire Google Translate widget from the DOM before it could render the `<select>` dropdown. When the button tried to `querySelector(".goog-te-combo")`, it returned `null`. Additionally, `disabled:cursor-wait` class made the button appear broken. |
| **File** | `components/global/GoogleTranslate.tsx` |
| **Fix** | (1) Removed `.skiptranslate { display: none }` rule. (2) Used off-screen positioning (`top: -9999px`) instead of `display: none` to keep widget in DOM. (3) Removed `disabled` state entirely. (4) Added cookie-based fallback to handle case where select hasn't loaded yet. |
| **Prevention** | Never use `display: none` on third-party widgets that inject DOM elements. Test interactive features in the browser, not just with TypeScript compilation. |

---

## UI Improvements

### Improvement #1: Accessibility Attributes in Navbar

Added aria-labels to interactive elements that previously lacked them:

```diff
- <Button variant="ghost" size="icon" className="lg:hidden">
+ <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Search">

- <Button ... onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
+ <Button ... onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle Menu">

- {/* Close Button is handled by the toggle... */}
+ {/* Close Button */}
  <Button
    variant="ghost"
    size="icon"
+   aria-label="Close Menu"
  >
```

**Impact:** Improved screen reader support and Lighthouse accessibility score.

### Improvement #2: CRM Dashboard Tools

Added to the CRM dashboard:
- **WhatsApp Click-to-Chat:** Direct contact button per lead with pre-filled greeting
- **Live Search:** Real-time filtering across all lead fields
- **Status Filter:** Dropdown to filter by lead status (New/Contacted/In Progress/Converted)
- **Role Filter:** Dropdown to filter by role (Farmer/Dealer/Distributor)
- **Delete Button:** Trash leads with confirmation dialog

### Improvement #3: Language Toggle Design

Evolved from generic Google dropdown to branded pill button:
- Globe icon from Lucide React
- "मराठी" / "English" text toggle
- Rounded pill shape with subtle border
- Matches the Navbar's design language

---

## Technical Debt Identified

### Debt #1: Theme-Based Custom Code
**Current:** All backend PHP lives in `themes/twentytwentyfive/includes/`  
**Risk:** Theme updates could overwrite customizations  
**Recommendation:** Migrate to a proper WordPress plugin (`farmerlift-core/`) in Phase-1

### Debt #2: No Automated Tests
**Current:** All verification is manual  
**Recommendation:** Add Jest/Vitest tests for frontend components, PHPUnit for backend API endpoints

### Debt #3: Hardcoded API URL
**Current:** API URL (`admin.farmerlift.in`) may be hardcoded in some frontend files  
**Recommendation:** Ensure all API calls use the `NEXT_PUBLIC_WP_API_URL` environment variable

### Debt #4: Google Translate Persistence
**Current:** Language selection resets on page navigation in some cases  
**Recommendation:** Consider implementing a proper cookie-based persistence mechanism or migrating to a full i18n solution in Phase-1

### Debt #5: CRM Inline Styles
**Current:** CRM dashboard uses inline styles and Tailwind-like utility classes  
**Recommendation:** Extract to a dedicated `crm-dashboard.css` file for maintainability

### Debt #6: No Rate Limiting on API
**Current:** REST API endpoints have no rate limiting  
**Risk:** Potential spam submissions or DDoS vulnerability  
**Recommendation:** Add WordPress-level rate limiting via a plugin or custom middleware

---

## Development Workflow Tips

1. **File Edit Reliability:** When editing files programmatically, always `view_file` after changes to verify they were applied. The `replace_file_content` tool can fail silently if the target string doesn't match exactly (whitespace, line endings).

2. **WordPress Development:** Always maintain a `functions.php.bak` backup. A syntax error in `functions.php` will crash the entire site.

3. **Environment Variables:** Use the `NEXT_PUBLIC_` prefix for any variable that needs to be available in the browser. Variables without this prefix are server-only in Next.js.

4. **Testing on Low Bandwidth:** The target audience uses 2G/3G/4G rural networks. Always test with Chrome DevTools throttling enabled (Slow 3G preset).

5. **Cross-Domain API Calls:** The frontend-backend split architecture requires proper CORS headers. If API calls fail silently, check CORS configuration first.

---

## Summary of All Changes This Session

| Category | Files Created | Files Modified |
|----------|--------------|----------------|
| Backend Refactoring | 3 (CRM module) | 2 (functions.php, admin.php) |
| Localization | 1 (GoogleTranslate.tsx) | 2 (Navbar.tsx, layout.tsx) |
| Analytics | 1 (GoogleAnalytics.tsx) | 1 (layout.tsx) |
| Configuration | 1 (.env.local) | — |
| **Total** | **6 new files** | **5 modified files** |

# Devlog #5: Deployment Architecture & Server Verification
**Date:** February 10, 2026  
**Author:** Development Team  
**Status:** ✅ Complete

---

## Overview

This devlog documents the deployment architecture, SSH setup for server access, and the verification process that ensured all backend WordPress files on the Hostinger server matched the local development copies.

---

## Hosting Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                        FarmerLift Infrastructure                  │
├──────────────────────────┬───────────────────────────────────────┤
│  FRONTEND                │  BACKEND                              │
│  farmerlift.in           │  admin.farmerlift.in                  │
│  Hosted on: Netlify      │  Hosted on: Hostinger (WP Hosting)   │
│  Framework: Next.js      │  Framework: WordPress                │
│  Build: Static Export     │  Theme: twentytwentyfive             │
│  Deployment: Git Push     │  Deployment: FTP/SSH                 │
│                          │  Custom Code: /includes/*.php         │
│  ↕ REST API calls        │  ↕ Serves API endpoints              │
└──────────────────────────┴───────────────────────────────────────┘
```

### Domain Configuration
- `farmerlift.in` → Netlify (DNS managed by Netlify)
- `admin.farmerlift.in` → Hostinger WordPress Hosting (subdomain)

### API Communication
The Next.js frontend communicates with WordPress via REST API:
```
GET/POST https://admin.farmerlift.in/wp-json/farmerlift/v1/...
```

---

## SSH Access Setup

### Problem
Hostinger WordPress hosting requires SSH access for file verification and deployment. The setup involved generating keys, configuring the local SSH client, and establishing a persistent connection profile.

### SSH Configuration

**File:** `~/.ssh/config`

```
Host farmerlift-hostinger
    HostName <hostinger-ip>
    User <username>
    Port 65002
    IdentityFile ~/.ssh/farmerlift_hostinger_rsa
    StrictHostKeyChecking no
```

> **Note:** Hostinger uses port `65002` for SSH, not the standard `22`. This is a common source of connection failures.

### Key Setup Steps
1. Generated RSA key pair: `ssh-keygen -t rsa -b 4096 -f ~/.ssh/farmerlift_hostinger_rsa`
2. Added public key to Hostinger panel: Security → SSH Access → Manage SSH Keys
3. Configured local SSH config file
4. Verified connection: `ssh farmerlift-hostinger`

---

## Backend File Verification

A systematic comparison was performed between local development files and server versions to ensure consistency.

### Files Verified

| Local File | Server Path | Result |
|-----------|-------------|--------|
| `farmerlift-core-cms.php` | `/themes/twentytwentyfive/farmerlift-core-cms.php` | ✅ MATCH |
| `farmerlift-acf-fields.php` | `/themes/twentytwentyfive/farmerlift-acf-fields.php` | ✅ MATCH |
| `farmerlift-admin-pro.php` | `/themes/twentytwentyfive/farmerlift-admin-pro.php` | ✅ MATCH |
| `qr-code-system.php` | `/themes/twentytwentyfive/qr-code-system.php` | ✅ MATCH |
| `functions.php` | `/themes/twentytwentyfive/functions.php` | ✅ MATCH |
| `farmerlift-api.php` | `/themes/twentytwentyfive/farmerlift-api.php` | ✅ MATCH |

### Verification Method
Files were downloaded via SSH and compared using diff tools. Key areas checked:
- CPT registrations (product, web_lead)
- ACF field definitions
- REST API endpoint registrations
- QR code generation logic
- Admin dashboard customizations

---

## Deployment Workflow

### Frontend (Netlify)
```
Local Development → git push → Netlify Auto-Deploy → Live at farmerlift.in
```

**Environment Variables to set in Netlify:**
- `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-CHSLVN2HYR`
- `NEXT_PUBLIC_WP_API_URL=https://admin.farmerlift.in/wp-json`

### Backend (Hostinger)
```
Local Development → Upload via SSH/FTP → Live at admin.farmerlift.in
```

**Files to upload after refactoring:**
1. Updated `functions.php` (from `functions.php.new`, rename on server)
2. New `includes/` directory (entire folder)
3. Remove old root-level PHP files (after confirming includes work)

---

## Deployment Safety Checklist

1. **Always backup `functions.php`** before modifying — a broken functions.php takes down the entire WP site
2. **Test API endpoints** after deployment: `curl https://admin.farmerlift.in/wp-json/farmerlift/v1/products`
3. **Check WP Admin access** — ensure you can still log in at `admin.farmerlift.in/wp-admin`
4. **Verify CRM** — navigate to FarmerLift CRM menu item and confirm lead data appears

---

## Gotchas & Lessons Learned

1. **Hostinger SSH port** is `65002`, not `22`. This tripped up initial connection attempts.
2. **WordPress theme path** — All custom code lives in `/themes/twentytwentyfive/`, not in a custom plugin. This is a deliberate Phase-0 choice for simplicity, but should be migrated to a proper plugin in Phase-1.
3. **`functions.php` is critical** — Any syntax error in this file will white-screen the entire WordPress site. Always:
   - Create a `.bak` backup first
   - Test changes in a `.new` file
   - Swap files on the server
4. **CORS headers** — The API includes CORS headers to allow requests from `farmerlift.in` to `admin.farmerlift.in`. If these are removed, the frontend will break silently.
5. **SSL certificates** — Both domains must have valid SSL certificates. Hostinger provides free SSL, Netlify provides automatic Let's Encrypt certificates.

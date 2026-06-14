# Farmerlift WordPress Backend SOP

Use this for WordPress custom PHP, ACF/custom fields, product/SKU/QR backend behavior, CRM/admin backend behavior, and registration REST endpoint behavior.

Do not use this for normal frontend UI changes.

## Important Separation

`ssh nivi` is the Naya VPS for the public Next.js frontend.

`ssh farmerlift` is the Hostinger account for the WordPress backend at `admin.farmerlift.in`.

These are different servers and different access levels.

## Preferred Access Model

Do not give Hostinger SSH to every intern.

Normal backend workflow:

1. Intern edits `backend/wordpress/**`.
2. Intern commits and pushes a branch.
3. CTO reviews/merges to `master`.
4. GitHub Actions `Deploy WordPress Backend` deploys to Hostinger using repo secrets.

This gives version control, audit history, backup, and rollback without giving broad Hostinger shell access.

## Hostinger SSH

The CTO machine has:

```text
Host farmerlift
    HostName 91.108.107.13
    User u146189558
    Port 65002
    IdentityFile ~/.ssh/id_farmerlift
```

This account can access the hosting files, so treat it as sensitive.

Connection check:

```bash
ssh farmerlift 'hostname; whoami; test -f ~/domains/admin.farmerlift.in/public_html/wp-config.php && echo "admin WordPress OK"'
```

Expected: Hostinger hostname, user `u146189558`, and `admin WordPress OK`.

## Important Paths

```text
~/domains/admin.farmerlift.in/public_html
~/domains/admin.farmerlift.in/public_html/wp-content/themes/twentytwentyfive
~/domains/admin.farmerlift.in/backups/wordpress_*
~/domains/farmerlift.in/public_html
```

The last path is the legacy public WordPress install. Do not confuse it with the active Next.js frontend.

## Read-Only Checks

```bash
ssh farmerlift 'cd ~/domains/admin.farmerlift.in/public_html && php ~/wp-cli.phar core version && php ~/wp-cli.phar option get siteurl && php ~/wp-cli.phar option get home'
ssh farmerlift 'cd ~/domains/admin.farmerlift.in/public_html && php ~/wp-cli.phar plugin list --status=active --field=name'
ssh farmerlift 'cd ~/domains/admin.farmerlift.in/public_html && php ~/wp-cli.phar theme list --status=active --field=name'
curl -I https://admin.farmerlift.in/wp-json/
```

Expected public API status: `200`.

## GitHub Backend Deploy

Workflow: `.github/workflows/deploy-wordpress.yml`

It runs when `backend/wordpress/**` changes on `master`, or manually from GitHub Actions.

It does:

1. PHP syntax check
2. remote backup
3. upload `functions.php` and `includes/*`
4. WP cache flush if available
5. API smoke test

## Manual Backend Deploy

Manual backend deploy is CTO-approved only.

```bash
Get-ChildItem backend\wordpress -Recurse -Filter *.php | ForEach-Object { php -l $_.FullName }
ssh farmerlift 'set -e; ts=$(date +%Y%m%d_%H%M%S); backup=domains/admin.farmerlift.in/backups/wordpress_$ts; base=domains/admin.farmerlift.in/public_html/wp-content/themes/twentytwentyfive; mkdir -p "$backup"; cp "$base/functions.php" "$backup/functions.php" 2>/dev/null || true; cp -r "$base/includes" "$backup/includes" 2>/dev/null || true; echo "$backup"'
scp -P 65002 backend/wordpress/functions.php farmerlift:domains/admin.farmerlift.in/public_html/wp-content/themes/twentytwentyfive/functions.php
scp -P 65002 -r backend/wordpress/includes/* farmerlift:domains/admin.farmerlift.in/public_html/wp-content/themes/twentytwentyfive/includes/
ssh farmerlift 'cd ~/domains/admin.farmerlift.in/public_html && php ~/wp-cli.phar cache flush || true'
curl -I https://admin.farmerlift.in/wp-json/
```

## Strict Don'ts

- Do not edit `wp-config.php`.
- Do not paste database credentials.
- Do not delete `wp-content/uploads`.
- Do not update WordPress core/plugins/themes without CTO approval.
- Do not change DNS.
- Do not deploy backend code if PHP lint fails.

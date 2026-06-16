# Farmerlift Intern SOP Pack

Audience: intern or junior developer working under CTO approval.

Never share private keys, `.env` files, `wp-config.php`, API tokens, database credentials, WordPress application passwords, or hosting panel access.

## Current Truth

As of 2026-06-14:

| Surface           | Purpose                                                   | Production location                                       |
| ----------------- | --------------------------------------------------------- | --------------------------------------------------------- |
| Frontend          | Public website at `farmerlift.in` and `www.farmerlift.in` | Naya VPS, Docker service `farmerlift-web`                 |
| WordPress backend | CMS/API at `admin.farmerlift.in/wp-json`                  | Hostinger SSH alias `farmerlift`                          |
| Legacy WordPress  | Old public WP install                                     | Hostinger `farmerlift.in`, not the active public frontend |

Branch rule:

- The repo uses `master`, not `main`.
- The live VPS does not run a Git branch directly. It runs a packaged release under `/home/farmerlift/apps/FarmerLift/releases`.
- The current frontend deploy paths write `/farmerlift-deploy.json`, so production can be traced to a Git commit.

## Deployment Paths

| Path                                       | Use for                                                                               | Who should run it                            |
| ------------------------------------------ | ------------------------------------------------------------------------------------- | -------------------------------------------- |
| GitHub Actions: `Deploy Frontend`          | Versioned frontend deploy from `master`                                               | CTO or approved intern                       |
| `npm run deploy:webdev`                    | Fallback frontend deploy from a clean synced local `master`                           | Approved intern with `webdev` key            |
| GitHub Actions: `Deploy WordPress Backend` | Backend PHP/theme code under `backend/wordpress/**` through restricted `webdev` proxy | CTO or trusted intern                        |
| `npm run deploy:wordpress:webdev`          | Fallback backend deploy from a clean synced local `master`                            | CTO-approved intern with `webdev` key        |
| Hostinger SSH `farmerlift`                 | Emergency backend inspection/rollback                                                 | CTO/operator only unless explicitly approved |

Frontend and backend GitHub Actions must use the restricted `webdev` deploy key through `WEBDEV_*` repo secrets. Do not store full `nivi` SSH access in this repo. Do not give broad Hostinger SSH to interns unless the CTO explicitly approves it.

## SOP Files

1. [Frontend Deploy SOP](./frontend-deploy.md)
2. [WordPress Backend SOP](./wordpress-backend.md)
3. [Intern Change Workflow](./intern-workflow.md)

Simple rule: frontend UI/copy/assets/pages use the frontend SOP. WordPress API/custom fields/SKU/CRM/PHP use the WordPress backend SOP.

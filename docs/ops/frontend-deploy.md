# Farmerlift Frontend Deploy SOP

Use this for the public Next.js frontend at `farmerlift.in` and `www.farmerlift.in`.

Do not use it for WordPress backend PHP changes.

## Golden Rule

Production must come from Git.

```bash
cd D:\Projects\farmerlift
git switch master
git pull --ff-only
git status --short --branch
```

Expected:

```text
## master...origin/master
```

There must be no changed files listed below it. If files are listed, commit and push them first or stop and ask the CTO.

## Webdev SSH Setup

Create a deploy key:

```bash
ssh-keygen -t ed25519 -f ~/.ssh/webdev_ed25519 -N "" -C "intern-name-webdev"
cat ~/.ssh/webdev_ed25519.pub
```

Send only the public key to the CTO.

After access is confirmed, add:

```text
Host webdev
  HostName 93.127.199.24
  User webdev
  Port 22
  IdentityFile ~/.ssh/webdev_ed25519
  IdentitiesOnly yes
  RequestTTY no
```

Connection check:

```bash
ssh -T webdev farmerlift
```

Expected: it must not open a shell. This is acceptable:

```text
No deploy archive received. Run npm run deploy:webdev from the Farmerlift repo.
```

## VPS Load Check

The CTO/operator can check load before deploy:

```bash
ssh nivi 'printf "load: "; cat /proc/loadavg; printf "cpu: "; top -bn1 | grep "%Cpu" || true; printf "memory:\n"; free -h'
```

Do not deploy if CPU steal is above `25%`, load is high for several minutes, or memory is low.

## Path A: GitHub Actions

CTO-only setup: the workflow must use the restricted `webdev` deploy account, not full `nivi` SSH.

Required GitHub secrets:

```text
WEBDEV_HOST
WEBDEV_USER
WEBDEV_SSH_PORT
WEBDEV_SSH_KEY
```

`WEBDEV_USER` should be `webdev`. The key should be authorized only for the server-side deploy router.

1. Open GitHub.
2. Go to `Actions`.
3. Select `Deploy Frontend`.
4. Click `Run workflow`.
5. Choose `master`.
6. Wait for the job to pass.

The frontend workflow is manual-only. It does not auto-deploy every push.

## Path B: Manual Webdev Deploy

```bash
cd D:\Projects\farmerlift
git switch master
git pull --ff-only
npm run audit:seo-smoke
npm run deploy:webdev
```

The script refuses deploy if the branch is not `master`, files are uncommitted, or local `master` is not synced with `origin/master`.

## Verify

```bash
curl -I https://farmerlift.in/
curl -I https://www.farmerlift.in/
curl -I https://farmerlift.in/products
curl -I https://admin.farmerlift.in/wp-json/
curl https://farmerlift.in/farmerlift-deploy.json
```

Expected: frontend and API URLs return `200`, and `farmerlift-deploy.json` shows the deployed Git SHA.

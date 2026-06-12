# Farmerlift Website Deploy SOP

Use this only from the `farmerlift` repo.

## First-time setup

1. Install Node.js 20 or 22.
2. Generate your deploy key:

```bash
ssh-keygen -t ed25519 -f ~/.ssh/webdev_ed25519 -N "" -C "your-name-webdev"
```

3. Send only the public key to Suyash:

```bash
cat ~/.ssh/webdev_ed25519.pub
```

4. After Suyash confirms the key is added, put this in `~/.ssh/config`:

```text
Host webdev
  HostName 93.127.199.24
  User webdev
  Port 22
  IdentityFile ~/.ssh/webdev_ed25519
  IdentitiesOnly yes
  RequestTTY no
```

5. Confirm the connection:

```bash
ssh -T webdev farmerlift
```

It should not open a shell. It may print `No deploy archive received`.

## Make Farmerlift Live

1. Open a terminal in the repo.
2. Pull the latest code:

```bash
git pull
```

3. Deploy:

```bash
npm run deploy:webdev
```

The script installs dependencies, builds the Next standalone app, uploads the release, switches the live release, restarts only the Farmerlift container, and smoke-checks the server.

## After Deploy

Open these URLs:

- https://farmerlift.in/
- https://www.farmerlift.in/
- https://farmerlift.in/products

If the command fails, stop and send the full terminal output to Suyash. Do not keep retrying with random changes.

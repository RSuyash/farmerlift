# Farmerlift Intern Workflow

## Start Work

```bash
cd D:\Projects\farmerlift
git switch master
git pull --ff-only
git switch -c intern/farmerlift-short-change-name
```

Make the change.

## Check

Frontend:

```bash
npm run build
```

Backend PHP:

```bash
Get-ChildItem backend\wordpress -Recurse -Filter *.php | ForEach-Object { php -l $_.FullName }
```

Review:

```bash
git status --short
git diff
```

## Commit And Push

```bash
git add <only-your-files>
git commit -m "clear short message"
git push -u origin intern/farmerlift-short-change-name
```

Send the CTO:

```text
Branch:
What changed:
Files changed:
Checks passed:
Deploy needed: yes/no
```

## Preserve Existing Local Work

If you already changed files:

```bash
git switch -c intern/farmerlift-wip
git add <only-your-files>
git commit -m "wip: preserve farmerlift changes"
git push -u origin intern/farmerlift-wip
```

Do not use `git reset --hard`.

## Deploy Rule

Do not deploy from a dirty laptop.

Manual frontend deploy is allowed only after:

- change is committed
- commit is pushed to GitHub
- approved change is on `master`
- local `master` matches `origin/master`
- CTO approves production deploy

Then use either `Deploy Frontend` in GitHub Actions or `npm run deploy:webdev`.

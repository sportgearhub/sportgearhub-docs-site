# Setup Checklist for GitHub Pages Deployment

## One-time Repository Setup

Complete these steps in the GitHub repository settings:

### 1. GitHub Pages Configuration
- [ ] Go to Settings → Pages
- [ ] Source: Select "Deploy from a branch"
- [ ] Branch: Select `gh-pages` and `/(root)`
- [ ] Custom domain: Enter `docs.sportgearhub.ru`
- [ ] Wait for DNS check to complete (may take a few minutes)
- [ ] Enable "Enforce HTTPS"

### 2. DNS Configuration
At your DNS provider (where you manage sportgearhub.ru):

- [ ] Create CNAME record:
  - Name: `docs`
  - Type: `CNAME`
  - Value: `sportgearhub.github.io`
  - TTL: 3600 (or default)

- [ ] Wait for DNS propagation (typically 5 minutes - 24 hours)

### 3. Repository Secrets (if content repo is private)

If `sportgearhub-docs` is a private repository, add:

- [ ] Go to Settings → Secrets and variables → Actions
- [ ] Create secret `DOCS_REPO_TOKEN`:
  - Personal access token with `repo` scope
  - Can be your own PAT or a dedicated service account

### 4. Content Repository Setup

In the `sportgearhub-docs` repository:

- [ ] Create `.github/workflows/trigger.yml` (see README for template)
- [ ] Add secret `REPO_TOKEN`:
  - Must have permission to trigger `repository_dispatch` in this repo
  - Create with `repo` and `workflow` scopes

## Deploy on Demand

After setup, deployments happen automatically on:
- Push to `production` branch
- Changes to `sportgearhub-docs` repo (via trigger workflow)
- Manual workflow dispatch from Actions tab

## Development Workflow

### Local Development
```bash
npm install
npm start
```
Visit http://localhost:3000

### Production Build
```bash
npm run build
npm run serve  # Test build locally
```

### Update Docs
Push changes to `sportgearhub-docs` repository → automatic rebuild triggers

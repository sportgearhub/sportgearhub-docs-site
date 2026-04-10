<p align="center">
  <h1 align="center">SportGearHub Docs Site</h1>
  <p align="center"><b>Docusaurus engine for SportGearHub documentation</b></p>
  <p align="center">
    External docs content in, static site out, auto-deployed to GitHub Pages.
  </p>
  <p align="center">
    <img src="https://img.shields.io/badge/framework-Docusaurus-2ea44f" alt="Framework"/>
    <img src="https://img.shields.io/badge/runtime-Node.js-339933" alt="Runtime"/>
    <img src="https://img.shields.io/badge/deploy-GitHub%20Pages-222222" alt="Deploy"/>
    <img src="https://img.shields.io/badge/domain-docs.sportgearhub.ru-0a66c2" alt="Domain"/>
  </p>
  <p align="center">
    <a href="#-quick-start">Quick Start</a> •
    <a href="#-architecture">Architecture</a> •
    <a href="#-cicd-workflow">CI/CD</a> •
    <a href="#-secrets-and-variables">Secrets</a> •
    <a href="#-dns">DNS</a>
  </p>
</p>

---

Production URL: `https://docs.sportgearhub.ru`

This repository (`sportgearhub-docs-site`) is the docs engine.  
During CI, it pulls Markdown docs from `sportgearhub-docs`, builds the static site, and deploys to `gh-pages`.

## Quick Start

Install dependencies:

```bash
npm install
```

Run local dev server:

```bash
npm start
```

Create production build:

```bash
npm run build
```

## Architecture

Two repositories work together:

1. `sportgearhub-docs`
   - Source of truth for Markdown content.
   - Docs live in `/docs` directory.

2. `sportgearhub-docs-site` (this repo)
   - Docusaurus engine and theme.
   - CI clones `sportgearhub-docs` and replaces local `/docs` before build.
   - Deploys output to `gh-pages`.

## CI/CD Workflow

Workflow file: `.github/workflows/deploy.yml`

Triggers:
- Push to `production` branch
- `repository_dispatch` with type `docs-update`
- Manual run (`workflow_dispatch`)

Pipeline steps:
1. Checkout docs site repo
2. Clone `sportgearhub-docs`
3. Replace local `/docs` and `/i18n` with external docs content
4. `npm ci`
5. `npm run build`
6. Deploy to `gh-pages`

## Content Layout (`sportgearhub-docs`)

```text
sportgearhub-docs/
├─ docs/                                # default locale (ru)
│  ├─ _category_.json
│  └─ legal/
│     ├─ _category_.json
│     └─ ...
├─ i18n/
│  └─ en/
│     └─ docusaurus-plugin-content-docs/
│        └─ current/
│           ├─ _category_.json
│           └─ ...
└─ README.md
```

## Required GitHub Pages Settings

In `sportgearhub-docs-site`:
- Settings → Pages → Source: `GitHub Actions`
- Custom domain: `docs.sportgearhub.ru`

## Secrets And Variables

In `sportgearhub-docs-site`:
- Optional secret: `DOCS_REPO_TOKEN` (required if `sportgearhub-docs` is private)

In `sportgearhub-docs`:
- Secret: `REPO_TOKEN` with permission to trigger `repository_dispatch` in `sportgearhub-docs-site`

## Trigger From Content Repo

Create `sportgearhub-docs/.github/workflows/trigger.yml`:

```yaml
name: Trigger Docs Site Rebuild

on:
  push:
    branches: [production]

jobs:
  trigger:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger rebuild in docs site repo
        run: |
          curl -X POST \
          -H "Accept: application/vnd.github+json" \
          -H "Authorization: Bearer ${{ secrets.REPO_TOKEN }}" \
          https://api.github.com/repos/sportgearhub/sportgearhub-docs-site/dispatches \
          -d '{"event_type":"docs-update"}'
```

## DNS

At your DNS provider:
- Type: `CNAME`
- Name: `docs`
- Value: `sportgearhub.github.io`

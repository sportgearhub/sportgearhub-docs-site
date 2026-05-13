<p align="center">
  <h1 align="center">SportGearHub Docs Site</h1>
  <p align="center"><b>Docusaurus engine for SportGearHub documentation</b></p>
  <p align="center">
    External docs content in, static site out, deployed to a target server with Docker.
  </p>
  <p align="center">
    <img src="https://img.shields.io/badge/framework-Docusaurus-2ea44f" alt="Framework"/>
    <img src="https://img.shields.io/badge/runtime-Node.js-339933" alt="Runtime"/>
    <img src="https://img.shields.io/badge/deploy-Docker%20server-222222" alt="Deploy"/>
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
During CI, it pulls Markdown docs from `sportgearhub-docs`, builds the static site, and deploys it to the configured server as a small Docker container.

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
   - Deploys output to a Docker host.

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
6. Pack `build/` with Docker deployment files
7. Upload the release archive to the target server over SSH
8. Rebuild and restart the Docker Compose service on the server

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

## Required Server Setup

The target server needs Docker with either `docker compose` or `docker-compose`, and the deploy user needs permission to run it.
The docs container joins the shared Docker network `apps-proxy`; the deploy workflow creates that network if it does not already exist.

Create a GitHub Environment named `docs` by default, or another name passed through the manual workflow `target` input.

Environment variables:
- `SERVER_HOST`: target server hostname or IP
- `SERVER_USER`: SSH user on the target server
- `SERVER_PORT`: optional SSH port, defaults to `22`

Environment secrets:
- `SERVER_SSH_KEY`: private SSH key for the deploy user
- `DOCS_REPO_TOKEN`: optional, required if `sportgearhub-docs` is private
- `DOCSEARCH_APP_ID`: optional Algolia DocSearch app ID
- `DOCSEARCH_API_KEY`: optional Algolia DocSearch search API key
- `DOCSEARCH_INDEX_NAME`: optional Algolia DocSearch index name

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
- Type: `A`, `AAAA`, or `CNAME`
- Name: `docs`
- Value: target server address or proxy hostname

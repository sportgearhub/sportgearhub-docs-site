# Setup Checklist for Server Deployment

## One-time Repository Setup

Complete these steps in the GitHub repository settings.

### 1. GitHub Environment
- [ ] Go to Settings -> Environments
- [ ] Create environment `docs`
- [ ] If you need more targets, create one environment per target and pass its name to the manual workflow `target` input

### 2. Environment Variables
- [ ] `SERVER_HOST`: target server hostname or IP
- [ ] `SERVER_USER`: SSH user on the target server
- [ ] `SERVER_PORT`: optional SSH port, defaults to `22`

### 3. Environment Secrets
- [ ] `SERVER_SSH_KEY`: private SSH key for the deploy user
- [ ] `DOCS_REPO_TOKEN`: optional token, required only if `sportgearhub-docs` is private
- [ ] `DOCSEARCH_APP_ID`: optional Algolia DocSearch app ID
- [ ] `DOCSEARCH_API_KEY`: optional Algolia DocSearch search API key
- [ ] `DOCSEARCH_INDEX_NAME`: optional Algolia DocSearch index name

### 4. Target Server
- [ ] Install Docker
- [ ] Install Docker Compose plugin or legacy `docker-compose`
- [ ] Allow `SERVER_USER` to run Docker
- [ ] Use the shared Docker network `apps-proxy` for reverse-proxy routing

### 5. DNS Configuration
At your DNS provider, point `docs.sportgearhub.ru` to the target server or reverse proxy.

## Deploy on Demand

Deployments happen automatically on:
- Push to `production` branch
- Changes to `sportgearhub-docs` repo via `repository_dispatch`
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
```

### Update Docs
Push changes to `sportgearhub-docs` repository -> automatic rebuild triggers.

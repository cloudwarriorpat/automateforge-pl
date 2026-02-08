AutomateForge.pl marketing site (Vite + React + TypeScript).

## Getting Started

Install deps and run the dev server:

```bash
npm ci
npm run dev
```

Build + preview:

```bash
npm run build
npm run preview
```

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`:
- build + push image to GHCR
- `helm upgrade --install` into k3s (namespace `automateforge-pl`)

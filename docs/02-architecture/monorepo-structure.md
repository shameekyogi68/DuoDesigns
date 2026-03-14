---
title: Monorepo Structure
app: All
section: 02-architecture
last-updated: 2025-03-14
maintained-by: Technical Architect
status: Current
---

# Monorepo Structure

Duo Designs uses a monorepo approach to keep the entire platform synchronized. This allows for unified deployments, shared documentation, and easier cross-app auditing.

## Folder Map

```text
duo-designs/
├── duo-designs-customer/     ← Vercel Project 1
│   ├── src/
│   ├── public/
│   └── package.json
├── duo-designs-admin/        ← Vercel Project 2
│   ├── src/
│   └── package.json
├── agency-revenue-tracker/   ← Vercel Project 3
│   ├── src/
│   └── package.json
├── backend/                  ← Render Web Service
│   ├── src/
│   └── package.json
├── docs/                     ← Unified Documentation
├── render.yaml               ← Blueprint for Render
└── README.md                 ← Entry point
```

## Why Monorepo?
1.  **Atomic Commits**: Features requiring backend + frontend changes can be committed together.
2.  **Shared Env Templates**: Visibility into variables required across the stack.
3.  **Simplified Deployment**: Vercel and Render both support "Root Directory" settings, allowing them to point to these subfolders while staying in one Git repo.

## Adding a New Module
1. Create a subfolder at the root.
2. Initialize with `npm init` or a Vite template.
3. Add the folder path to the root `.gitignore` if needed (though `**/node_modules/` handles it).

---
[Related: Deployment Guide](../09-deployment/overview.md) | [Related: Tech Stack](./tech-stack.md)

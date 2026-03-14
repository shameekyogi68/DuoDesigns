---
title: Frontend Deployment (Vercel)
app: Frontends
section: 09-deployment
last-updated: 2025-03-14
maintained-by: Frontend Developer
status: Current
---

# Deploying to Vercel

All three frontend React apps (Customer, Admin, and Revenue Tracker) are deployed as separate Vercel projects.

## ⚙️ Project Setup Pattern

For each app, follow these settings in Vercel:

| Setting | Value (Customer App Example) |
|---------|------------------------------|
| **Framework Preset** | Vite |
| **Root Directory** | `duo-designs-customer` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |

## 🔑 Environment Variables
You must set `VITE_API_URL` to the Production URL of your Render backend for the apps to communicate correctly.

## 🚀 Branching
- **Main**: Auto-deploys to `duo-designs.in` (and subdomains).
- **Other Branches**: Vercel creates "Preview Deployments" for code review.

---
[Related: Tech Stack](../02-architecture/tech-stack.md) | [Related: Go-Live Checklist](./go-live-checklist.md)

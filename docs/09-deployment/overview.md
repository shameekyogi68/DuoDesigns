---
title: Deployment Overview
app: All
section: 09-deployment
last-updated: 2025-03-14
maintained-by: DevOps Engineer
status: Current
---

# Deployment Overview

Duo Designs uses a distributed hosting strategy to balance performance and cost-efficiency.

## 🏗️ The Infrastructure

| Layer | Service | Purpose |
|-------|---------|---------|
| **Backend API** | **Render** | Node.js runtime, Cron jobs, and Web server. |
| **Frontends** | **Vercel** | Static hosting for React (Customer, Admin, Partners). |
| **Database** | **MongoDB Atlas** | Managed NoSQL cloud database. |
| **Media** | **Cloudinary** | Image CDN and storage. |
| **DNS / SSL** | **Cloudflare** | Domain management and security. |

## 🔄 Deployment Logic
Since this is a **Monorepo**, we use "Root Directory" targeting:
- Vercel fetches the repo and points to `duo-designs-customer/` for the main site.
- Render fetches the repo and points to `backend/` for the API.

---
[Next: Prerequisites](./prerequisites.md) | [Next: Go-Live Checklist](./go-live-checklist.md)

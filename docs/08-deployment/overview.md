---
title:        Deployment Overview
section:      08-deployment
last-updated: 2025-03-13
status:       Approved
---

# 🚀 Deployment Overview

The Duo Designs ecosystem is distributed across specialized cloud providers to ensure high performance and zero-downtime deployments.

## 🏗️ The Infrastructure Map

| Component | Provider | URL Pattern | Environment |
| :--- | :--- | :--- | :--- |
| **Frontend (Customer)** | Vercel | `duodesigns.in` | React (Vite) |
| **Frontend (Admin)** | Vercel | `admin.duodesigns.in` | React (Vite) |
| **Backend API** | Render / Railway | `api.duodesigns.in` | Node.js (Express) |
| **Database** | MongoDB Atlas | Cluster (Managed) | NoSQL |
| **Assets/Images** | Cloudinary | `res.cloudinary.com/...` | CDN |

---

## 🔄 Deployment Pipeline (CI/CD)
We use **GitHub Actions** for an automated pipeline:
1. **Push:** Developer pushes to `main`.
2. **Test:** CI run unit tests (`npm run test`).
3. **Build:** Vercel/Render pull the code and run the build command.
4. **Deploy:** New version is served once health checks pass.
5. **Rollback:** Instant rollback is available via the Vercel/Render dashboard in case of failure.

---

## 🛠️ Global Configuration
- **SSL:** Managed automatically by Vercel and Render (Let's Encrypt).
- **Domains:** Managed via Google Domains / Cloudflare.
- **WAF:** Basic DDoS protection enabled by default on Vercel.

## 🧪 Staging Environment
A parallel environment exists at `staging-api.duodesigns.in`. This uses **Razorpay Test Keys** and a separate MongoDB database to allow testing real-world order flows without affecting live revenue data.

---
[Related: 08-deployment/backend.md](./backend.md) | [Home](../README.md)

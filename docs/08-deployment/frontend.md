---
title:        Frontend Deployment (Vercel)
section:      08-deployment
last-updated: 2025-03-13
status:       Approved
---

# 🌐 Frontend Deployment (Vercel)

Both the Customer and Admin React apps are hosted on Vercel for best-in-class loading speeds and global CDN distribution.

## 🛠️ Project Settings

- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

---

## 🔑 Environment Variables
Vercel handles variable injection. Ensure these are set in the dashboard:

| App | Key | Value |
| :--- | :--- | :--- |
| **Both** | `VITE_API_URL` | `https://api.duodesigns.in/api` |
| **Customer** | `VITE_RAZORPAY_KEY` | `rzp_live_xxxxxx` |

---

## 🏗️ Build Workflow
1. **Pull Request:** Vercel generates a **Preview Deployment** for every branch.
2. **Merge:** Merging to `main` triggers a production build.
3. **Cache:** Vercel caches `node_modules` between builds to ensure fast 45-second build times.

## 🔄 Redirects & Rewrites (`vercel.json`)
Since we use React Router, we need to ensure all routes are piped through `index.html`.

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

## 📈 Optimization Checklist
- [ ] **Gzip/Brotli:** Handled automatic by Vercel.
- [ ] **Image Optimization:** Handled by Cloudinary + Vercel's Edge network.
- [ ] **Minification:** Vite (Rollup) handlesJS/CSS minification during the build phase.

---
[Home](../README.md)

---
title: Go-Live Checklist
app: All
section: 09-deployment
last-updated: 2025-03-14
maintained-by: Project Manager
status: Current
---

# Go-Live Checklist 🚀

Follow this list strictly before pointing the production traffic to the new servers.

## 🏗️ Infrastructure
- [ ] MongoDB Atlas Cluster set to production tier (if volume > 500 orders/mo).
- [ ] Render custom domain (`api.duodesigns.in`) verified.
- [ ] Vercel custom domains (`duodesigns.in`, `admin.duodesigns.in`) verified.
- [ ] SSL certificates active for all endpoints.

## ⚙️ Configuration
- [ ] `NODE_ENV` set to `production` in Backend.
- [ ] Razorpay switched to **Live Mode**.
- [ ] Gmail App Password verified by sending a test OTP.
- [ ] Cloudinary production folder cleared of test data.

## 🧪 Testing
- [ ] Place a real order using a personal card (Full Flow).
- [ ] Verify that the **Invoice PDF** contains the correct GSTIN and Office Address.
- [ ] Verify that the **Order Confirmation** email arrives within 30 seconds.
- [ ] Check Sentry dashboard for any silent hydration errors in the frontend.

---
[Related: Manual Test Cases](../12-testing/manual-test-cases.md) | [Related: Overview](./overview.md)

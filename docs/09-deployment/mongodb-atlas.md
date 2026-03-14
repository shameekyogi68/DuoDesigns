---
title: External Services Setup
app: All
section: 09-deployment
last-updated: 2025-03-14
maintained-by: DevOps Engineer
status: Current
---

# External Services Setup

Detailed instructions for configuring the critical third-party integrations.

## 🍃 MongoDB Atlas
1. Create a `Shared` (Free Tier) cluster.
2. **Network Access**: Add `0.0.0.0/0` (Render's dynamic IPs require this or a static IP proxy).
3. **Database Access**: Create a user with `readWriteAnyDatabase` role.
4. **URI**: Copy the connection string into `MONGODB_URI`.

## 💳 Razorpay
1. Switch to **Live Mode** in the Razorpay Dashboard.
2. Generate `Key ID` and `Key Secret`.
3. **Webhooks**: 
   - URL: `https://your-api.render.com/api/webhooks/razorpay`
   - Events: `payment.captured`, `order.paid`.
   - Secret: Create a random string and add to `RAZORPAY_WEBHOOK_SECRET`.

## ☁️ Cloudinary
1. Copy the `API Environment variable` (Starts with `cloudinary://`).
2. Add this as `CLOUDINARY_URL` in the backend. 
3. Create an upload preset named `duo_designs` (Unsigned if allowing direct browser uploads, though we currently use backend relay).

---
[Related: Tech Stack](../02-architecture/tech-stack.md) | [Related: Environment Variables](../02-architecture/environment-variables.md)

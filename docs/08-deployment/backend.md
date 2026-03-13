---
title:        Backend Deployment (Render)
section:      08-deployment
last-updated: 2025-03-13
status:       Approved
---

# ⚙️ Backend Deployment (Render)

The Duo Designs Node.js API is deployed as a **Web Service** on Render.

## 🛠️ Service Configuration

- **Environment:** Node
- **Build Command:** `npm install`
- **Start Command:** `npm start` (Runs `node server.js`)
- **Region:** `Singapore (ap-southeast-1)` or `Mumbai` (to minimize latency for Indian customers).

---

## 🔑 Environment Variables
Critical keys like `MONGODB_URI` and `RAZORPAY_KEY_SECRET` are managed via the Render Dashboard and are never exposed.

## 🔄 Health Checks
Render monitors the service at `GET /api/health`.
- Status `200`: Service is up.
- Failure: Render automatic restarts the instance.

## 📈 Auto-Scaling
Currently, we use a single instance. For peak sale events (Diwali/New Year), the instance can be scaled to **3 concurrent workers** to handle higher load.

## 🕒 Log Management
We use Render's built-in log stream combined with our **Winston** persistent logs for debugging.

---

## ⚠️ Cold Starts
On free tiers, Render spins down the service after 15m of inactivity. In production, we use a **Starter/Pro** plan to ensure the API is always warm for instant OTP delivery and checkout transitions.

---
[Home](../README.md)

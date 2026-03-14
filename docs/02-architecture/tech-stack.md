---
title: Tech Stack
app: All
section: 02-architecture
last-updated: 2025-03-14
maintained-by: Technical Architect
status: Current
---

# Tech Stack

The Duo Designs stack is chosen for developer speed, type safety (via JSDoc), and a generous free tier for production use.

## ⚙️ Backend
- **Runtime**: Node.js (v20+)
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **Security**: 
  - `bcryptjs` for Admin hashing
  - `jsonwebtoken` (JWT) for Customer sessions
  - `helmet`, `hpp`, `xss-clean` for request hardening
- **Payments**: `razorpay` SDK
- **Utilities**: `winston` (Logging), `node-cron` (Jobs), `pdf-lib` (Invoices)

## 🎨 Frontend
- **Framework**: React 19
- **Build Tool**: Vite 7
- **State Management**: Zustand
- **Styling**: Vanilla CSS (Premium modular system)
- **Networking**: Axios with interceptors
- **Icons**: Lucide React & Custom SVG Set

## 🚀 Hosting & Services
- **SPA Hosting**: Vercel
- **API Hosting**: Render (Web Service)
- **Database Hosting**: MongoDB Atlas (Dedicated M0 Cluster)
- **Media Hosting**: Cloudinary
- **Error Tracking**: Sentry
- **DNS/Proxy**: Cloudflare

---
[Related: System Overview](./system-overview.md) | [Related: Environment Variables](./environment-variables.md)

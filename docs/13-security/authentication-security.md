---
title: Authentication & API Security
app: All
section: 13-security
last-updated: 2025-03-14
maintained-by: Lead Architect
status: Current
---

# Authentication & API Security

## 🔑 JWT Implementation
- **Secret**: A 64-character random string stored as an environment variable (`JWT_SECRET`).
- **Storage**: The frontend stores the token in `localStorage` but resets it if any `401` error occurs.
- **Expiry**: Set to 7 days for customers to reduce friction, 12 hours for admins to increase safety.

## 🛡️ API Hardening
We use the following middleware ensemble in `app.js`:
- **Helmet**: Sets secure headers (`X-Content-Type-Options`, `X-Frame-Options`, etc.).
- **CORS**: Strictly allows only our 4 domains + localhost in development.
- **Express Rate Limit**: Blocks IPs that send more than 100 requests every 15 minutes to sensitive routes (`/login`).
- **Mongo-Sanitize**: Prevents NoSQL operators/objects from being injected into queries.

---
[Related: Authentication Flow](../03-backend/authentication.md) | [Related: Tech Stack](../02-architecture/tech-stack.md)

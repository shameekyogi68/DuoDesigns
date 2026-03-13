---
title:        System Overview
section:      02-architecture
last-updated: 2025-03-13
maintained-by:System Architect
status:       Approved
---

# 🏗️ System Overview

The Duo Designs architecture is built for high availability, security, and developer speed. It follows a **stateless, decouple architecture** using React for frontends and Node.js/Express for the core logic layer.

## 📐 Architecture Diagram

```text
       ┌───────────────────┐        ┌───────────────────┐
       │   Customer App    │        │    Admin App      │
       │ (React + Vite)    │        │ (React + Vite)    │
       └─────────┬─────────┘        └─────────┬─────────┘
                 │                            │
                 │      HTTPS / JSON          │
                 └────────────┬───────────────┘
                              ▼
                    ┌───────────────────┐
                    │    Backend API    │
                    │ (Node.js + Express)
                    └─────────┬─────────┘
                              │
          ┌───────────────────┴───────────────────┐
          │                   │                   │
          ▼                   ▼                   ▼
┌───────────────────┐  ┌───────────────────┐  ┌───────────────────┐
│   MongoDB Atlas   │  │    Cloudinary     │  │     Razorpay      │
│     (Database)    │  │  (Image Assets)   │  │ (Payments/Hooks)  │
└───────────────────┘  └───────────────────┘  └───────────────────┘
          │                   │                   │
          ▼                   ▼                   ▼
    ┌──────────┐        ┌───────────┐       ┌─────────────┐
    │ Orders   │        │ User      │       │ Invoice PDF │
    │ Products │        │ Designs   │       │ Generation  │
    └──────────┘        └───────────┘       └─────────────┘
```

## 🔌 Integrated Services

| Service | Primary Purpose | Key Integration Points |
| :--- | :--- | :--- |
| **MongoDB Atlas** | Primary Database | Orders, Products, Pincodes, Users, Coupons |
| **Cloudinary** | Asset Storage | Product images, Customer design uploads |
| **Razorpay** | Payments | Checkout checkout, Webhook capture, Signature verification |
| **Gmail SMTP** | Notifications | OTP delivery, Order confirmation, Dispatch tracking |
| **Vercel** | Frontend Hosting | Hosting for Customer and Admin Apps |
| **Render/Railway** | Backend Hosting | Production-grade Node.js runtime |

## 🔄 Core Request Flow

1. **User Action:** Customer clicks "Pay Now".
2. **API Request:** Frontend calls `/api/payments/create-order`.
3. **External Call:** Backend contacts Razorpay to generate a transaction ID.
4. **Database Log:** A `Payment` record is created in MongoDB with status `pending`.
5. **Checkout UI:** Frontend opens the Razorpay popup.
6. **Payment Confirmation:** 
   - **Frontend:** Receives success signature and hits `/api/payments/verify`.
   - **Backend:** (Async) Receives Webhook from Razorpay for extra security.
7. **Processing:** Backend updates `Order` to `placed`, triggers `invoice.service.js` to create PDF, and finally calls `email.service.js`.

## 🛡️ Security Layers
- **CORS:** Restricts API access only to our known domains (`duodesigns.in` and `admin.duodesigns.in`).
- **Helmet:** Protects against common web vulnerabilities like XSS and clickjacking.
- **JWT Auth:** Stateless session management with 15-minute access tokens.
- **Rate Limiting:** Prevents brute-force on OTP (`auth`) endpoints.

---
[Related: 02-architecture/tech-stack.md](./tech-stack.md) | [Home](../README.md)

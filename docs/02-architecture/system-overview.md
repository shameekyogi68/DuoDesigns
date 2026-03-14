---
title: System Overview
app: All
section: 02-architecture
last-updated: 2025-03-14
maintained-by: Technical Architect
status: Current
---

# System Overview

The Duo Designs platform is a distributed web system designed for high availability and zero-cost scaling during initial growth.

## Architecture Diagram

```text
    ┌──────────────────┐      ┌──────────────────┐      ┌─────────────────────────┐
    │  Customer App    │      │    Admin Panel   │      │ Agency Revenue Tracker  │
    │ (Vercel: .in)    │      │  (Vercel: adm.)  │      │   (Vercel: tracker.)    │
    └─────────┬────────┘      └─────────┬────────┘      └────────────┬────────────┘
              │                         │                            │
              └───────────────┬─────────┴────────────────────────────┘
                              │
                    ┌─────────▼─────────┐        ┌──────────────────┐
                    │      Backend      │        │  MongoDB Atlas   │
                    │  (Render: api.)   │◄───────┤    (Database)    │
                    └─────────┬─────────┘        └──────────────────┘
                              │
              ┌───────────────┴───────────────┐
              │                               │
    ┌─────────▼─────────┐           ┌─────────▼─────────┐
    │     Cloudinary     │           │     Razorpay      │
    │  (Image Storage)   │           │  (Payment Gateway)│
    └───────────────────┘           └───────────────────┘
```

## Core Infrastructure

1.  **Browser Layer**: Handles user interaction across 3 SPAs (Single Page Applications) built with React.
2.  **API Gateway Layer**: A Node.js Express server acting as the central truth.
3.  **Data Layer**: MongoDB Atlas (Primary DB) and Cloudinary (Asset Storage).
4.  **External Integration Layer**: Razorpay for payments and Nodemailer (Gmail) for transactional emails.

## Request Lifecycle
1.  Frontend makes a `fetch/axios` request to the Backend.
2.  Backend runs middleware (Auth, Rate Limiting, CORS).
3.  Controller processes logic (e.g. GST calculation, OTP generation).
4.  Data is fetched/written to MongoDB.
5.  Standard JSON response is returned to the Frontend.

---
[Related: Tech Stack](./tech-stack.md) | [Related: Data Flow](./data-flow.md)

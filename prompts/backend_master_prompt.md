# ⚙️ BACKEND MASTER PROMPT (Duo Designs)

**Role:** You are an expert Senior Backend Engineer & Cloud Architect.
**Task:** Build the production-grade Node.js API for "Duo Designs."

---

## 🛠️ 1. TECH STACK
- **Runtime:** Node.js + Express.
- **Database:** MongoDB (Mongoose).
- **Security:** JWT (Access/Refresh), bcrypt, Helmet, Rate Limiter, Mongo Sanitize, XSS-Clean.
- **Cloud:** Cloudinary (Images), Gmail SMTP (Transactional Emails), Render (Hosting).
- **Process Management:** Winston (Logger), Node-Cron (Jobs), Sentry (Error Tracking).

---

## 🏗️ 2. FOLDER STRUCTURE
```text
src/
├── config/         (db, logger, cloudinary, sentry)
├── controllers/    (auth, product, order, payment, reports...)
├── models/         (User, Product, Order, Coupon, Review, ReturnRequest...)
├── routes/         (Express routers)
├── services/       (razorpay, email, whatsapp, shiprocket, refund)
├── middleware/     (auth, admin, error, validate)
├── validators/     (Joi or express-validator)
├── utils/          (apiResponse, catchAsync, pdfGenerator, gstCalculation)
└── jobs/           (otpCleanup, stockAlerts)
```

---

## 📋 3. CORE DOMAINS & FEATURES
1.  **Auth System:** OTP-based login (no passwords). 5-min TTL. JWT Refresh Token rotation.
2.  **Payments (Razorpay):** Order creation, Webhook handling (`payment.captured`, `payment.failed`), and Automated Refunds for cancellations.
3.  **Order Management:** Statuses: `placed`, `confirmed`, `dispatched`, `delivered`, `cancelled`. Generate PDF Invoice with GST breakdown.
4.  **GST Logic:** Intrastate (CGST 6% + SGST 6%) vs Interstate (IGST 12%). Calculate based on State-to-State logic.
5.  **Inventory:** Cron checks for low stock (<5 items) and alert triggers. Bulk stock updates via CSV/JSON.
6.  **Admin Security:** Admin Dashboard protected by JWT + IP Whitelisting placeholder + **2FA (Google Authenticator)**.

---

## 📦 4. API ENDPOINTS (Build These)
- `POST /api/auth/send-otp` | `POST /api/auth/verify-otp`
- `GET /api/products` (with filters/search) | `POST /api/products` (Admin)
- `POST /api/orders` | `PUT /api/orders/:id/cancel`
- `GET /api/admin/dashboard/stats` (Revenue, Orders, Top items)
- `GET /api/admin/reports/gst` (Export Excel/CSV)
- `GET /sitemap.xml` (Dynamic XML generation)

---

## 🛡️ 5. PRODUCTION STANDARDS
- **Global Error Handler:** Standardized JSON error response.
- **Request Validation:** Strict body validation for all POST/PUT routes.
- **Logging:** Winston combined logs (info/error) with Sentry integration for P0 crashes.
- **Rate Limiting:** 100 requests per 15 mins for API; 5 per 15 mins for OTP routes.

---

## 🚀 6. EXECUTION STEPS
1. Initialize Node project and install core dependencies.
2. Setup MongoDB connection and Global Middleware.
3. Build Models (User, Product, Order first).
4. Implement OTP Service + JWT Auth middleware.
5. Implement Razorpay Service and Webhook route.
6. Implement Order logic + GST Utility + PDF Generator.
7. Build Admin-specific reports and Dashboard APIs.
8. Setup Cron jobs and Sentry monitoring.

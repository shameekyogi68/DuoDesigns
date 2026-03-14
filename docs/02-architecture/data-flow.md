---
title: Data Flow
app: All
section: 02-architecture
last-updated: 2025-03-14
maintained-by: Technical Architect
status: Current
---

# Data Flow

Understanding how data moves through the Duo Designs ecosystem from the moment a user clicks to the final database write.

## 🔑 Authentication Flow (OTP)
1.  **Frontend**: User enters email → `POST /api/auth/send-otp`.
2.  **Backend**: Validates email → Generates 6-digit code → Saves to `User` model → Sends email via Gmail.
3.  **Frontend**: User enters code → `POST /api/auth/verify-otp`.
4.  **Backend**: Checks validity → Issues JWT → Sets Cookie or returns JSON.
5.  **Frontend**: Subsequent requests include JWT in `Authorization` header.

## 🛒 Order & Payment Flow
1.  **Customer App**: `POST /api/orders` (Creation).
2.  **Backend**: Calculates GST + Total → Creates "placed" Order in DB.
3.  **Customer App**: `POST /api/payments/create-order`.
4.  **Backend**: Calls Razorpay API → Returns `razorpayOrderId`.
5.  **Customer App**: User completes payment popup.
6.  **Backend**: Razorpay Webhook or `verify` endpoint triggers → Order status updated to "paid".
7.  **Admin Panel**: Order appears instantly in dashboard via re-fetch.

## 🖼️ File Upload Flow
1.  **Customer App**: User selects image → `POST /api/upload`.
2.  **Backend**: `multer` parses file → `Cloudinary` SDK uploads → Persistent URL returned.
3.  **Customer App**: Saves URL in order metadata.

---
[Related: Authentication](../03-backend/authentication.md) | [Related: Payment Flow](../03-backend/payment-flow.md)

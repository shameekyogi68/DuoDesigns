---
title: Business Rules
app: All
section: 01-project
last-updated: 2025-03-14
maintained-by: Project Manager
status: Current
---

# Business Rules

This document outlines the core business logic rules baked into the Duo Designs platform.

## 📦 Fulfillment & Logistics

### 1. No Cash on Delivery (COD)
- **Rule**: All orders must be fully paid upfront via Razorpay.
- **Implementation**: The checkout flow only proceeds once the `payment.status` is checked as `paid`.
- **Reason**: Custom-printed items cannot be resold if returned or rejected at the doorstep.

### 2. Pincode Validation
- **Rule**: Orders are only accepted for pincodes present in the `Pincode` model with `isDeliverable: true`.
- **Implementation**: The customer app triggers a check against `GET /api/shipping/:pincode` before allowing a user to "Add to Cart".

## 💸 Pricing & Taxation

### 3. GST Breakdown
- **Rule**: Every order must calculate and record specific GST components based on the customer's state.
- **Rule**: Intrastate (Karnataka) = 9% CGST + 9% SGST.
- **Rule**: Interstate (Outside Karnataka) = 18% IGST.
- **Implementation**: `backend/src/services/gst.service.js` → `calculateGST()`.

### 4. Variant Pricing
- **Rule**: Larger sizes (XL, XXL) carry a price addon.
- **Implementation**: `Product` model has `xlAddon` and `xxlAddon` fields (Default: ₹50).

## 🎟️ Discounts & Coupons

### 5. Coupon Validity
- **Rule**: Coupons have strict expiry dates and maximum usage counts.
- **Implementation**: `backend/src/validators/coupon.validator.js` checks date and count before applying.

## 📱 User Security

### 6. Passwordless Login (OTP)
- **Rule**: Customers do not have passwords. They login using 6-digit OTPs sent to their email.
- **Implementation**: `backend/src/controllers/auth.controller.js` → `sendOTP()`.

---
[Related: Pricing Rules](./pricing-rules.md) | [Related: API Overview](../04-api-reference/overview.md)

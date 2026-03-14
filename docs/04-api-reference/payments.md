---
title: Payments API
app: All
section: 04-api-reference
last-updated: 2025-03-14
maintained-by: Backend Developer
status: Current
---

# Payments API

Endpoints for interacting with Razorpay.

### `POST /payments/create-order`
Initializes a Razorpay transaction.
- **Auth**: Customer Token
- **Body**: `{ "orderId": "MONGODB_ORDER_ID" }`
- **Response**: Returns `razorpayOrderId` and `amount` for checkout popup.

### `POST /payments/verify`
Verify payment signature after checkout.
- **Auth**: Customer Token
- **Body**: `{ "razorpay_order_id": "...", "razorpay_payment_id": "...", "razorpay_signature": "..." }`
- **Response**: `200` if valid, `400` if fraudulent.

---

# Coupons API

### `POST /coupons/validate`
Check if a coupon is valid for a cart.
- **Body**: `{ "code": "SAVE10", "cartItems": [...] }`

### `GET /coupons/active`
Returns all public coupons currently available.

---
[Related: Payment Flow](../03-backend/payment-flow.md)

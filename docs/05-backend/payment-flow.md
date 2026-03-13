---
title:        Payment Integration (Razorpay)
section:      05-backend
last-updated: 2025-03-13
maintained-by:Backend Developer
status:       Approved
---

# 💳 Payment Integration (Razorpay)

Duo Designs utilizes **Razorpay** for all financial transactions, supporting UPI, Net Banking, and Credit/Debit cards for the Indian market.

## 🛤️ Transaction Workflow

### Step 1: Order Initiation
- **Endpoint:** `POST /api/payments/create-order`
- **Logic:**
  - Verify if the `Order` exists and matches the user.
  - Call the Razorpay SDK `orders.create()` with the amount in **Paise** (amount * 100).
  - Return the `id` (e.g., `order_9A33X...`) and our public key to the frontend.

### Step 2: Verification (Synchronous)
- **Endpoint:** `POST /api/payments/verify`
- **Payload:** `{ razorpay_order_id, razorpay_payment_id, razorpay_signature }`
- **Security:** Use `crypto` with `RAZORPAY_KEY_SECRET` to verify the HMAC-SHA256 signature.
- **On Match:** 
  - Update `Order.status` to `placed`.
  - Update `Payment.status` to `paid`.
  - Trigger Email Confirmation.

### Step 3: Webhook (Asynchronous)
- **Endpoint:** `POST /api/webhooks/razorpay`
- **Purpose:** Handling scenarios where a user's browser closes after payment but before the verify call hits.
- **Event:** `payment.captured`.
- **Logic:** Same as step 2, but verifies using the raw request body as a buffer.

---

## 🏗️ Technical Component (`src/services/razorpay.service.js`)

```javascript
const Razorpay = require('razorpay');
const crypto = require('crypto');

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.verifyPaymentSignature = (orderId, paymentId, signature) => {
  const body = orderId + "|" + paymentId;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");
    
  return expectedSignature === signature;
};
```

---

## 🧪 Testing Account
- **Environment:** Use `rzp_test_...` keys for development.
- **Card:** Use Razorpay's test card details (e.g., `4111 1111 ...`) to simulate success and failure.

## ⚠️ Important Note
**RAZORPAY_WEBHOOK_SECRET** must be configured in both the Razorpay Dashboard and our `.env` to prevent fake success signals.

---
[Related: 04-frontend/cart-flow.md](../04-frontend/cart-flow.md) | [Home](../README.md)

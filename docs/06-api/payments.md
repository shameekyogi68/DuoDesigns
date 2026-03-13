---
title:        Payments API Reference
section:      06-api
last-updated: 2025-03-13
status:       Approved
---

# 💳 Payments API Reference

Endpoints handling integration with the Razorpay Gateway.

## 1. Create Razorpay Order
Prepare a transaction for the Razorpay popup.

- **Method:** `POST`
- **Path:** `/payments/create-order`
- **Body:** `{ "orderId": "mongo_order_id" }`
- **Success (200):**
  ```json
  {
    "success": true,
    "data": {
      "id": "order_XXXX",
      "amount": 120000,
      "currency": "INR",
      "key": "rzp_test_..."
    }
  }
  ```

---

## 2. Verify Payment
Submit the signature received from the Razorpay popup for verification.

- **Method:** `POST`
- **Path:** `/payments/verify`
- **Body:**
  ```json
  {
    "razorpay_order_id": "...",
    "razorpay_payment_id": "...",
    "razorpay_signature": "..."
  }
  ```

---

## 3. Webhook (Razorpay Internal)
The endpoint hit by Razorpay servers to confirm captures.

- **Method:** `POST`
- **Path:** `/webhooks/razorpay`
- **Security:** Requires verification using `RAZORPAY_WEBHOOK_SECRET`.

---
[Home](../README.md)

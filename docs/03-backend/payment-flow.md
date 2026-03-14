---
title: Payment Flow
app: Backend
section: 03-backend
last-updated: 2025-03-14
maintained-by: Backend Developer
status: Current
---

# Payment Flow (Razorpay)

Duo Designs uses Razorpay for secure, prepaid transactions.

## 🔄 Interaction Steps

1.  **Phase 1: Order Creation**
    - Frontend: `POST /api/orders` (Saves order as `status: 'placed'`, `payment.status: 'pending'`).
    - Frontend: `POST /api/payments/create-order`.
    - Backend: Calls Razorpay API to create an order-id. Returns it to frontend.

2.  **Phase 2: Customer Interaction**
    - Customer App: Opens Razorpay Checkout overlay.
    - User Pays: Razorpay processes transaction.

3.  **Phase 3: Verification**
    - Frontend: `POST /api/payments/verify`.
    - Backend: Uses `crypto` to verify the HMAC-SHA256 signature provided by Razorpay.
    - Backend: If valid, updates Order to `payment.status: 'paid'`.

4.  **Phase 4: Webhook (The Backup)**
    - If the user closes the browser before redirection, Razorpay hits our `POST /api/webhooks/razorpay`.
    - The backend processes the payment in the background identically to Phase 3.

⚠️ **Critical Security**: The backend *never* trusts the frontend for payment amounts. It verifies everything against the database and Razorpay's signature.

---
[Related: Razorpay Setup](../09-deployment/razorpay-setup.md) | [Related: API Reference](../04-api-reference/payments.md)

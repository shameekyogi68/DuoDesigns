---
title: Webhooks API
app: All
section: 04-api-reference
last-updated: 2025-03-14
maintained-by: Backend Developer
status: Current
---

# Webhooks API

Third-party incoming notifications handler.

### `POST /webhooks/razorpay`
The backup mechanism for payment verification.
- **Why**: Ensures orders are marked "paid" even if the customer's internet drops after payment but before the frontend can verify.
- **Handling**: 
  - Validates `razorpay_order_id`.
  - Checks if order is already paid.
  - Updates order status and triggers confirmation email.

⚠️ **Note**: This endpoint consumes **raw request body** for HMAC signature verification. Do not add standard JSON parsing middleware specifically to this route.

---
[Related: Razorpay Setup](../09-deployment/razorpay-setup.md)

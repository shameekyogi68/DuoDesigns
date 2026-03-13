---
title:        Refund Processing
section:      05-backend
last-updated: 2025-03-13
status:       Active
---

# 💸 Refund Processing

Duo Designs automates refunds via the **Razorpay API** whenever an order is cancelled before dispatch.

## 🔄 The Refund Workflow
1. **Trigger:** Admin or Customer initiates cancellation via `PUT /api/orders/:id/cancel`.
2. **Logic Check:** System verifies the payment status is `paid`.
3. **Gateway Call:** Backend calls `initiateRefund` in `refund.service.js`.
4. **Amount:** Always processed as the full order total (including GST and Shipping) in **Paise**.
5. **Persistence:** The Razorpay `refund_id` is stored in the Order document for tracking.

---

## 🛠️ Service Interface
```javascript
// Example usage
const refund = await initiateRefund(paymentId, amount, "Customer requested cancellation");
```

## 🏦 Timeline
Once initiated, Razorpay usually processes the refund to the original payment method within **5-7 business days**.

## 🛑 Failure Scenarios
If the Razorpay API returns an error (e.g., insufficient funds in the business account), the Order status is still updated to `cancelled`, but a warning is logged, and the Admin must manually process the refund via the Razorpay Dashboard.

---
[Home](../../README.md)

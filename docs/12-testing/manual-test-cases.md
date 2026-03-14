---
title: Manual Test Cases
app: All
section: 12-testing
last-updated: 2025-03-14
maintained-by: QA Lead
status: Current
---

# Manual Test Cases

These scenarios must be manually verified before every major production release.

## 🛍️ Storefront: Happy Path
- [ ] User navigates to a Category (e.g., Oversized).
- [ ] User selects a Product and a Size.
- [ ] User adds to Cart and clicks Checkout.
- [ ] User enters email and verifies OTP successfully.
- [ ] User selects a shipping address and completes payment.
- [ ] **Expectation**: Redirect to Success page, Cart is empty, Confirmation Email arrives.

## 🛠️ Admin: Fulfillment Path
- [ ] Admin logs in and sees the new order in Dashboard.
- [ ] Admin confirms the order.
- [ ] Admin clicks "Dispatch" and enters tracking info.
- [ ] **Expectation**: Order status shifts to `dispatched`, Dispatch Email arrives at customer's inbox.

## 📈 Partner: Tracking Path
- [ ] User uses a partner referral link.
- [ ] User completes a purchase.
- [ ] **Expectation**: The Revenue Tracker `Sales Log` shows the new entry with the correct commission.

---
[Next: Checkout Scenarios](./checkout-test-scenarios.md) | [Related: QA Tester](../11-developer-roles/qa-tester.md)

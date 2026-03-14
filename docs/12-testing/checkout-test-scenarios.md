---
title: Checkout & Coupon Scenarios
app: Customer App
section: 12-testing
last-updated: 2025-03-14
maintained-by: QA Analyst
status: Current
---

# Checkout & Coupon Scenarios

Edge cases for the most critical part of the funnel.

## 🎟️ Coupon Validation
- **Invalid Code**: Enter `FAKE10`. System should show red inline error.
- **Expired Code**: Use a code that exists in DB but `expiresAt` is in the past.
- **Min Order**: Use a code that requires ₹1000 with a ₹500 cart.
- **Double Use**: Try to apply a single-use coupon twice on the same account.

## 📦 Address & GST
- **Pincode check**: Enter a pincode not in the database. Expect "Sorry, we don't deliver here yet".
- **GST Pivot**: Select Karnataka address → verify CGST/SGST. Change to Delhi → verify IGST.
- **Rounding**: Verify that a ₹999.99 total doesn't result in ₹0.01 fractional payment errors.

---
[Related: Manual Test Cases](./manual-test-cases.md) | [Related: GST Calculation](../03-backend/gst-calculation.md)

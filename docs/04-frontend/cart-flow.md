---
title:        Checkout Workflow
section:      04-frontend
last-updated: 2025-03-13
maintained-by:Frontend Developer
status:       Approved
---

# 🛒 Checkout Workflow

The Duo Designs checkout process is designed for a frictionless single-session experience through a multi-step sequence.

## 🏗️ Step-by-Step Flow

### Step 1: Cart View
- **Action:** Customer reviews items, changes quantities, and applies a coupon.
- **Computation:** Prices update reactively using `useCartStore`.
- **CTA:** Click "PROCEED TO CHECKOUT".

### Step 2: Shipping & Login (If Guest)
- **Check:** Is the user logged in? 
  - **No:** Show a compact login/OTP form.
  - **Yes:** Pre-fill current saved address.
- **Pincode Verification:** Enter 6-digit Pincode. Frontend checks:
  - Deliverable state for GST.
  - Shipping charge override for the specific area.

### Step 3: Payment Phase
- **Action:** Razorpay checkout opens as a pop-over modal.
- **Logic:** 
  - Call `POST /api/payments/create-order` to get the `razorpayOrderId`.
  - Pass the order ID and amount to the Razorpay handler.
- **Outcome:** 
  - **Success:** Call `POST /api/payments/verify`.
  - **Failure:** Show "Payment Failed" toast and return to shipping step.

### Step 4: Success Phase
- **Branding:** Full-page "THANK YOU" animation.
- **Data:** 
  - Show the `Order Number`.
  - Provide a "Download Invoice" CTA calling `GET /api/orders/:id/invoice`.
- **Cart Cleanup:** Automatically clear the stored items in `cartStore`.

---

## 🛠️ State Persistence
If a user closes the tab during checkout, their cart items are preserved via `localStorage`. However, the **Coupon state** and **Selected Shipping Address** are cleared for security.

---

## ⚠️ Known Edge Cases
- **Stock Depletion:** If an item goes out of stock *during* the checkout phase, the frontend should trigger a `400` error from the API, remove the item, and alert the user.
- **Multiple Addresses:** Customers can save up to 5 addresses. Upon checkout, they simply choose a "Default" or select from a list.

---
[Related: 05-backend/payment-flow.md](../05-backend/payment-flow.md) | [Home](../README.md)

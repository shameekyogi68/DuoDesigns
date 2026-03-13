---
title:        Manual Testing Checklist
section:      11-testing
last-updated: 2025-03-13
status:       Approved
---

# 🧪 Manual Testing Checklist

Before every production release, the QA lead must manually verify these critical user journeys across desktop and mobile.

## 🛍️ 1. Shop & Customization
- [ ] Do all product images load wirelessly?
- [ ] Does the "Oversized" surcharge (+₹50) apply correctly in the price display?
- [ ] **Custom Upload:** Does the mockup preview update after an image is chosen?
- [ ] Does a "Lower resolution" warning appear for small files?

---

## 🔑 2. Authentication
- [ ] Can a new user receive an OTP and login?
- [ ] Does the "Resend" timer work (120s)?
- [ ] Does entering the wrong OTP 3 times invalidate the session?
- [ ] Can the user logout and immediately log back in?

---

## 🛒 3. Cart & Checkout (CRITICAL)
- [ ] Does applying a valid coupon reduce the subtotal?
- [ ] Does applying an invalid/expired coupon show a red error?
- [ ] **Pincode Step:**
    - [ ] Enter Karnataka Pincode (e.g. 560001) → Check for CGST/SGST.
    - [ ] Enter Delhi Pincode (e.g. 110001) → Check for IGST.
- [ ] Does free shipping apply if Subtotal > ₹999?

---

## 💳 4. Payments
- [ ] Does the Razorpay popup open with the correct amount?
- [ ] Does a successful payment lead to the `/success` page?
- [ ] Does a failed payment show an error and stay on the checkout page?

---

## ⚙️ 5. Admin Dashboard
- [ ] Can a new product be added and instantly seen on the shop?
- [ ] Does changing stock to 0 mark the item as "Out of Stock" on the frontend?
- [ ] Does Dispatching an order trigger an email (check inbox)?
- [ ] Can the Admin download the PDF invoice for a confirmed order?

---
[Related: 04-frontend/testing.md](../04-frontend/testing.md) | [Home](../README.md)

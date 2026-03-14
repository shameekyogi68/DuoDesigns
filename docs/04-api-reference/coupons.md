---
title: Coupons API
app: All
section: 04-api-reference
last-updated: 2025-03-14
maintained-by: Backend Developer
status: Current
---

# Coupons API

### `POST /coupons/validate`
Check if a coupon is valid for a cart.
- **Body**: `{ "code": "SAVE10", "cartItems": [...] }`

### `GET /coupons/active`
Returns all public coupons currently available.

---

# Shipping API

### `GET /shipping/:pincode`
Check if delivery is available.
- **Response**: `{ "deliverable": true, "estimatedDays": 5 }`

### `POST /shipping/bulk-import` (Admin)
Upload a CSV of deliverable pincodes.

---
[Related: Business Rules](../01-project/business-rules.md)

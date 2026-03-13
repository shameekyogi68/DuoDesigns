---
title:        Orders API Reference
section:      06-api
last-updated: 2025-03-13
status:       Approved
---

# 📦 Orders API Reference

Endpoints for placing and tracking customer orders.

## 1. Place Order
Create a new order record in the system.

- **Method:** `POST`
- **Path:** `/orders`
- **Auth:** Required
- **Body:**
  ```json
  {
    "items": [{ "productId": "...", "quantity": 2, "variant": "XL", "designUrl": "..." }],
    "shippingAddress": { "address": "...", "pincode": "560001", "state": "Karnataka" },
    "paymentMethod": "prepaid",
    "couponCode": "NEW10"
  }
  ```

---

## 2. Get My Orders
Retrieve order history for the logged-in user.

- **Method:** `GET`
- **Path:** `/orders/my`
- **Auth:** Required

---

## 3. Track Order (Public)
Publicly track an order using its DD number.

- **Method:** `GET`
- **Path:** `/orders/track/:orderNumber`

---

## 4. Download Invoice
Generate and stream the PDF invoice.

- **Method:** `GET`
- **Path:** `/orders/:id/invoice`
- **Auth:** Required (Owner or Admin only)

---
[Home](../README.md)

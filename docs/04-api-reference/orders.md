---
title: Orders API
app: All
section: 04-api-reference
last-updated: 2025-03-14
maintained-by: Backend Developer
status: Current
---

# Orders API

Handles the creation, tracking, and fulfillment of orders.

## 🔓 Public Endpoints

### `GET /orders/track/:orderNumber`
Returns current dispatch status for any order. Does not require login.

---

## 🔒 Customer Endpoints (Bearer Required)

### `POST /orders`
Creates a new pending order.
- **Body**: `{ "items": [...], "address": {...}, "couponCode": "..." }`
- **Response**: Returns the fully calculated order with GST breakdown.

### `GET /orders/my`
Returns all orders placed by the authenticated user.

### `GET /orders/:id/invoice`
Returns a binary PDF stream of the tax invoice.

---

## 🔒 Admin Endpoints (Admin Bearer Required)

### `GET /orders`
Returns all orders in the system. Supports filtering by `status`.

### `PUT /orders/:id/dispatch`
Marks order as dispatched.
- **Body**: `{ "courier": "BlueDart", "trackingNumber": "12345" }`

---
[Related: Payment Flow](../03-backend/payment-flow.md) | [Related: Invoice Generation](../03-backend/invoice-generation.md)

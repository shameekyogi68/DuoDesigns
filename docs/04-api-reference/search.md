---
title: Search API
app: Customer App
section: 04-api-reference
last-updated: 2025-03-14
maintained-by: Backend Developer
status: Current
---

# Search API

Powering the global search bar on the storefront.

### `GET /search`
Finds products based on a text query.
- **Parameters**: `q` (Search query)
- **Response**: List of basic product objects (Name, Thumbnail, Price, ID).

---

# Webhooks API

### `POST /webhooks/razorpay`
Incoming webhook from Razorpay for payment status updates.
- **Auth**: Signature verified via `X-Razorpay-Signature` header.
- **Logic**: Handles cases where the user closes the app before verification completes.

---
[Related: Payment Flow](../03-backend/payment-flow.md) | [Related: Security](../13-security/overview.md)

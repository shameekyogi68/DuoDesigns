---
title: Upload API
app: All
section: 04-api-reference
last-updated: 2025-03-14
maintained-by: Backend Developer
status: Current
---

# Upload API

Endpoints for media management via Cloudinary.

### `POST /upload/design`
Used by customers to upload their custom prints.
- **Form-Data**: `file` (Image only)
- **Response**: `{ "success": true, "data": { "url": "https://..." } }`

### `POST /upload/product` (Admin)
Used for adding high-res product photos.

---

# Customers API (Admin Only)

### `GET /customers`
Returns a list of all registered users with their order counts.

### `GET /customers/:id/orders`
Returns the order history for a specific customer.

---
[Related: File Upload](../03-backend/file-upload.md)

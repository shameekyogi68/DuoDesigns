---
title: Shipping API
app: All
section: 04-api-reference
last-updated: 2025-03-14
maintained-by: Backend Developer
status: Current
---

# Shipping API

### `GET /shipping/:pincode`
Check if delivery is available for a specific location.
- **Success Response**: `{ "success": true, "data": { "pincode": "560001", "isDeliverable": true } }`

### `POST /shipping/bulk-import`
Admin endpoint to upload a CSV file of deliverable locations.
- **Auth**: Admin Token
- **Body**: `multipart/form-data` (file)

---

# Upload API

### `POST /upload/design`
Public endpoint for custom apparel designs.
- **Body**: `multipart/form-data` (file)
- **Response**: `{ "url": "cloudinary_url_here" }`

### `POST /upload/product`
Admin endpoint for product images.
- **Auth**: Admin Token

---
[Related: File Upload](../03-backend/file-upload.md)

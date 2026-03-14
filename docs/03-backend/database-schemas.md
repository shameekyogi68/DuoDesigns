---
title: Database Schemas
app: Backend
section: 03-backend
last-updated: 2025-03-14
maintained-by: Backend Developer
status: Current
---

# Database Schemas

Duo Designs uses MongoDB with Mongoose. Below are the core schemas that drive the system.

## 👕 Product Model
**Collection**: `products`
- `name`: String (Required)
- `category`: Enum (tshirt, oversized, trackpants, mug, keychain)
- `basePrice`: Number
- `variants`: Array of { color, colorHex, stock: { S, M, L, XL, XXL } }
- `images`: Array of Strings (Cloudinary URLs)

## 📦 Order Model
**Collection**: `orders`
- `orderNumber`: String (Unique)
- `user`: ObjectId (Ref: User)
- `items`: Array of { product, qty, price, design, size, variant }
- `pricing`: { subtotal, shipping, discount, taxableAmount, cgst, sgst, igst, total }
- `status`: Enum (placed, confirmed, dispatched, delivered, cancelled)
- `payment`: { razorpayOrderId, status: (pending, paid, failed) }

## 👤 User Model
**Collection**: `users`
- `email`: String (Unique, Indexed)
- `name`: String
- `role`: Enum (customer, admin)
- `otp`: { code, expiresAt } (Deleted after use)

---
[Related: Product Catalogue](../01-project/product-catalogue.md) | [Related: API Reference](../04-api-reference/products.md)

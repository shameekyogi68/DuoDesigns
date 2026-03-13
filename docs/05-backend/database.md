---
title:        Database Design (MongoDB)
section:      05-backend
last-updated: 2025-03-13
maintained-by:Backend Developer
status:       Approved
---

# 🗄️ Database Design (MongoDB)

Duo Designs uses **MongoDB Atlas** for its flexibility in handling nested order objects and product variants.

## 📁 Key Collections (8 Models)

### 1. **User**
- Stores customer details, saved addresses, and active refresh tokens.
- **Critical Index:** `{ email: 1 }` (unique).

### 2. **Product**
- Stores variant metadata (S, M, L levels), base pricing, and image URLs.
- **Critical Index:** `{ category: 1 }`, `{ price: 1 }`.
- **Text Index:** `{ name: 'text', description: 'text' }` for search.

### 3. **Order**
- The most detailed document. Stores snapshots of product prices and taxes at the time of purchase.
- **Critial Index:** `{ user: 1 }`, `{ orderNumber: 1 }` (unique).

### 4. **Coupon**
- Handles discount codes, min-orders, and expiry.
- **Critical Index:** `{ code: 1 }` (unique).

### 5. **Pincode**
- List of serviceable areas.
- **Critical Index:** `{ pincode: 1 }` (unique).

### 6. **Payment**
- Links Razorpay Transaction IDs to Orders.

### 7. **Partner**
- Sales logging for external commission tracking.

### 8. **Settings**
- A singleton collection for site-wide configuration (Banners, Thresholds).

---

## 🏗️ Relationship Strategy

We use **Referencing** for core relationships:
- `Order` references `User` via `ObjectId`.
- `Payment` references `Order`.

We use **Embedding** for data that shouldn't change even if the original source does:
- `Order` embeds the **Shipping Address** (if user changes address later, existing orders must still show the original destination).
- `Order` embeds **Product Snapshots** (if product price changes, the order total must stay the same).

---

## 📈 Search Optimization
We use MongoDB **Text Search** for the product search feature. 
Example query used in `search.controller.js`:
```javascript
Product.find(
  { $text: { $search: query }, isActive: true }, 
  { score: { $meta: "textScore" } }
).sort({ score: { $meta: "textScore" } })
```

---

## 🛡️ Data Validation
Every schema uses strict Mongoose validation:
- `required: true` for essential fields.
- `enum: ['placed', 'confirmed', ...]` for status strings.
- `min: 0` for pricing and stock to prevent negative values.

---
[Related: 07-database/schemas.md](../07-database/schemas.md) | [Home](../README.md)

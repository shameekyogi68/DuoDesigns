---
title: Database Indexes
app: Backend
section: 03-backend
last-updated: 2025-03-14
maintained-by: Backend Developer
status: Current
---

# Database Indexes

To maintain high performance as the order volume grows, the following indexes are strictly enforced in the Mongoose schemas.

## 👕 Product Model
- `{ category: 1, isActive: 1 }`: Optimized for shop filtering.
- `{ isFeatured: 1 }`: Optimized for homepage highlights.
- `{ name: 'text', description: 'text' }`: Enables full-text search.

## 📦 Order Model
- `{ user: 1, createdAt: -1 }`: Optimized for the "My Orders" customer page.
- `{ orderNumber: 1 }`: Unique index for fast lookups and dispatching.
- `{ status: 1 }`: Optimized for admin dashboard filtering.

## 👤 User Model
- `{ email: 1 }`: Unique index for login performance.

💡 Check the `src/models/*.js` files for' index definitions at the bottom of each schema.

---
[Related: Database Schemas](./database-schemas.md) | [Related: API Reference (Search)](../04-api-reference/search.md)

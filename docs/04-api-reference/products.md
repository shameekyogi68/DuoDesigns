---
title: Products API
app: All
section: 04-api-reference
last-updated: 2025-03-14
maintained-by: Backend Developer
status: Current
---

# Products API

Endpoints for browsing and managing the product catalogue.

## 🔓 Public Endpoints

### `GET /products`
Returns a list of all active products.
- **Query Params**:
  - `category`: Filter by type (e.g., `tshirt`)
  - `featured`: `true` to get homepage items
  - `limit`: Number of items (Default: 20)

### `GET /products/:id`
Returns full details for a single product, including variables and base price.

---

## 🔒 Admin Endpoints

### `POST /products`
Creates a new product.
- **Body**: See [Product Model](../03-backend/database-schemas.md) for shape.

### `PUT /products/:id`
Updates product details (price, description, images).

### `PUT /products/:id/stock`
Updates stock for a single product variant.
- **Body**: `{ "variantId": "string", "size": "string", "stock": 50 }`

### `PUT /products/stock/bulk`
Updates stock for multiple items at once.

---
[Related: Database Schemas](../03-backend/database-schemas.md)

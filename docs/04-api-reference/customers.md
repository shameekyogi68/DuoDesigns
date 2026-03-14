---
title: Customers API
app: Admin Panel
section: 04-api-reference
last-updated: 2025-03-14
maintained-by: Backend Developer
status: Current
---

# Customers API

Exclusive endpoints for managing customer data.

### `GET /customers`
Fetches a list of all registered users.
- **Auth**: Admin Token
- **Query**: `page`, `limit`, `search`

### `GET /customers/:id`
Retrieves detailed profile and address data for a user.

---

# Partners API (Admin Only)

### `GET /partners`
Returns all entries in the `Partner` log (for revenue tracking).

### `POST /partners`
Manually add a sale attributing it to a partner/agency.

---
[Related: Revenue Tracker](../07-revenue-tracker/overview.md)

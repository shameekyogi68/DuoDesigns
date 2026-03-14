---
title: Partners API
app: Admin Panel
section: 04-api-reference
last-updated: 2025-03-14
maintained-by: Backend Developer
status: Current
---

# Partners API

Handles the bridge between Duo Designs and the Agency Revenue Tracker.

### `GET /partners`
Returns all recorded sales attribution for partners.
- **Auth**: Admin Token

### `PUT /partners/:id/paid`
Marks a specific commission month as paid by the client.

### `GET /partners/config/summary`
Calculates cumulative stats like **Total Sales Attributed** and **Pending Commission**.

---

# Dashboard API (Admin Only)

### `GET /admin/dashboard`
Returns high-level business stats:
- **Total Revenue (Last 30 days)**
- **Pending Orders**
- **Low Stock Alerts**
- **Top Selling Products**

---
[Related: Revenue Tracker](../07-revenue-tracker/overview.md)

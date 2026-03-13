---
title:        Admin App Guide
section:      04-frontend
last-updated: 2025-03-13
maintained-by:Frontend Lead
status:       Approved
---

# 🛡️ Admin App Guide

The Admin dashboard is a protected React application used by the Duo Designs team to manage the business.

## 🧱 Dashboard Architecture
- **Authenticated Layout:** Wraps all pages with a sidebar navigation and a global "Admin Header" showing the logged-in user.
- **Route Protection:** Every route is wrapped in an `AdminGuard` that checks `user.role === 'admin'`.

---

## 📋 Key Modules

### 1. **Order Management (`/orders`)**
- **Table View:** Shows basic order info + current status.
- **Order Details:** A side-drawer or modal showing the customer’s uploaded design and full address.
- **Actions:** Buttons to `Confirm`, `Dispatch` (requires Tracking Input), and `Deliver`.

### 2. **Inventory Management (`/inventory`)**
- **Product List:** High-level view of stock levels across all variants.
- **Product Editor:** Form to add new products or update variant stock counts.
- **Text Search:** Fast search using the `GET /api/search` endpoint.

### 3. **Partnerships (`/partners`)**
- Allows manual entry of sales attributed to partners.
- Displays a "To be Paid" total for each partner.

---

## 📊 Analytics & Charts
The home dashboard fetches data from `GET /api/admin/dashboard` to display:
- **Revenue Chart:** Total sales over the last 7 days (Daily granularity).
- **Status Breakdown:** Pie chart of current orders (`Placed` vs `Confirmed` vs `Delivered`).

---

## 🛠️ Specialized UI Components
- **`StatusSelector.jsx`:** A dropdown with color-coded badges for shifting order phases.
- **`TrackingModal.jsx`:** Pop-up that triggers when "Dispatch" is clicked, forcing the entry of Courier & Tracking ID.
- **`StockInput.jsx`:** A compact grid input for updating all color/size combinations of a single product SKU.

---

## 🔐 Auth Logic
Unlike the customer app, the Admin app often redirects directly to a `/login` page if the JWT token is missing or if the token belongs to a `role: 'customer'`.

---
[Related: 04-frontend/admin-app.md](./admin-app.md) | [Home](../README.md)

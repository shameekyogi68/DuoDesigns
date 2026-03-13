---
title:        Frontend Routing
section:      04-frontend
last-updated: 2025-03-13
maintained-by:Frontend Developer
status:       Approved
---

# 🛣️ Frontend Routing

We use `react-router-dom` (v6+) for managing all navigation.

## 🛍️ Customer App Routes

| Path | Component | Auth Required? |
| :--- | :--- | :---: |
| `/` | `Home` | No |
| `/shop` | `Shop` | No |
| `/category/:slug` | `CategoryView` | No |
| `/product/:id` | `ProductDetail` | No |
| `/cart` | `Cart` | No |
| `/login` | `Auth` | No |
| `/track` | `TrackOrder` | No |
| `/offers` | `Offers` | No |
| `/account` | `Profile` | ✅ Yes |
| `/account/orders` | `OrderHistory` | ✅ Yes |
| `/success/:id` | `OrderSuccess` | ✅ Yes |
| `/*` | `NotFound` | No |

---

## 🛡️ Admin App Routes

| Path | Component | Role Required? |
| :--- | :--- | :---: |
| `/` | `Dashboard` | Admin |
| `/orders` | `OrderManager` | Admin |
| `/orders/:id` | `OrderDetails` | Admin |
| `/inventory` | `InventoryManager` | Admin |
| `/customers` | `CustomerManager` | Admin |
| `/partners` | `PartnerManager` | Admin |
| `/settings` | `SiteSettings` | Admin |

---

## 🔒 Route Protection

We use high-order components to wrap our routes.

### 1. `AuthGuard.jsx`
- Checks if a JWT token exists in `authStore`.
- Redirects to `/login?redirect=current_path` if not authenticated.

### 2. `AdminGuard.jsx`
- Checks if token exists AND if `user.role === 'admin'`.
- Redirects to `/login` if failed.

## 🔄 Search Implementation
The search bar uses a global overlay. Typing triggers a `useEffect` that calls `GET /api/search` and displays results in a portal. Selecting a result navigates to `/product/:id`.

---
[Related: 04-frontend/customer-app.md](./customer-app.md) | [Home](../README.md)

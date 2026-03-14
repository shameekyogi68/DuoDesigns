---
title: State Management
app: Admin Panel
section: 06-admin-panel
last-updated: 2025-03-14
maintained-by: Frontend Developer
status: Current
---

# Admin State Management

The Admin panel uses **Zustand** stores for global data persistence across views.

## 🔑 `authStore`
- **Logic**: Stores the `admin` token and state.
- **Auto-Logout**: Clears if the API returns a `401` during an operation.

## 📦 `ordersStore`
- **Logic**: Caches the list of orders to ensure fast navigation back from Order Detail views.

## 🧪 `uiStore`
- **Logic**: Manages sidebar state (collapsed/expanded) and theme variables.

---
[Related: State Management (Customer App)](../05-customer-app/state-management.md)

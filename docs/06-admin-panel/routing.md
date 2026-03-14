---
title: Routing
app: Admin Panel
section: 06-admin-panel
last-updated: 2025-03-14
maintained-by: Frontend Developer
status: Current
---

# Admin Routing

The Admin Panel follows a flat routing hierarchy, where almost every view is protected.

## 📍 Hierarchy
- `/login`: Public.
- `/`: Dashboard (Default redirect).
- `/orders`: List.
- `/orders/:id`: Detail.
- `/products`: List.
- `/products/add`: Creative form.
- `/stock`: Inventory grid.

## 🛡️ Guard Logic
All routes (except `/login`) are wrapped in the `AdminProtectedRoute` component. This component checks for:
1. Presence of a `token` in `authStore`.
2. Role validation (must be `admin`).

If checks fail, the user is evicted to `/login`.

---
[Related: Pages](./pages.md) | [Related: Security](../13-security/overview.md)

---
title: Routing
app: Revenue Tracker
section: 07-revenue-tracker
last-updated: 2025-03-14
maintained-by: Frontend Developer
status: Current
---

# Routing Specification

The Revenue Tracker uses **React Router DOM v7** nested routes.

## 📍 Route Map
- `/login`: Public.
- `/dashboard`: High-level aggregate stats.
- `/orders`: Itemized attribution log.
- `/settlements`: Monthly payout tracking.
- `/reports`: Date-range filtering & export.
- `/settings`: Agency profile info.

## 🔒 Protection
The `App.jsx` uses a `ProtectedRoute` wrapper that verifies the user has the `agency` role. If a customer or guest tries to access this portal, they are redirected to `/login`.

---
[Related: Pages](./pages.md) | [Related: API Integration](./api-integration.md)

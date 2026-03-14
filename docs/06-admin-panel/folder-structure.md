---
title: Folder Structure
app: Admin Panel
section: 06-admin-panel
last-updated: 2025-03-14
maintained-by: Frontend Developer
status: Current
---

# Admin Panel Folder Structure

A standardized React internal tool directory.

```text
duo-designs-admin/
├── src/
│   ├── api/            # Axios instance and API call definitions
│   ├── components/
│   │   ├── auth/       # AdminProtectedRoute
│   │   ├── common/     # Sidebar, StatsCards, Table helpers
│   │   └── layout/     # AdminLayout (Shell)
│   ├── constants/      # App-wide constants (routes, categories)
│   ├── hooks/          # Custom admin-specific hooks
│   ├── pages/          # All dashboard and management pages
│   ├── store/          # Zustand stores for orders and stock
│   └── App.jsx         # Root router
├── public/
└── index.html
```

---
[Related: Tech Stack](../02-architecture/tech-stack.md) | [Related: Components](./components.md)

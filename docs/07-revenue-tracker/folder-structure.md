---
title: Folder Structure
app: Revenue Tracker
section: 07-revenue-tracker
last-updated: 2025-03-14
maintained-by: Frontend Developer
status: Current
---

# Revenue Tracker Folder Structure

```text
agency-revenue-tracker/
├── src/
│   ├── api/            # Shared Axios instance
│   ├── components/
│   │   ├── charts/     # Recharts wrappers
│   │   ├── common/     # Sidebar and UI Kit
│   │   └── layout/     # AppLayout Shell
│   ├── constants/      # API endpoints and route paths
│   ├── hooks/          # useAuth, useSales hooks
│   ├── pages/          # All dashboard views
│   ├── store/          # Zustand auth and data stores
│   └── App.jsx
├── public/
└── index.html
```

---
[Related: Tech Stack](../02-architecture/tech-stack.md) | [Related: API Integration](./api-integration.md)

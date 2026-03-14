---
title: Folder Structure
app: Customer App
section: 05-customer-app
last-updated: 2025-03-14
maintained-by: Frontend Developer
status: Current
---

# Customer App Folder Structure

The application follows a modular React structure with global state and custom hooks.

```text
duo-designs-customer/
├── src/
│   ├── api/            # Axios instance and API call definitions
│   ├── assets/         # Images, global SVGs, and fonts
│   ├── components/     # UI building blocks
│   │   ├── common/     # Reusable UI (Buttons, Modals, Loaders)
│   │   ├── layout/     # Header, Footer, ProtectedRoute
│   │   └── product/    # Product-specific components
│   ├── constants/      # App-wide constants (routes, strings)
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Full page components viewed by users
│   ├── store/          # Zustand global state stores
│   ├── styles/         # Vanilla CSS modules and design tokens
│   ├── utils/          # Formatters, helpers, and validators
│   └── App.jsx         # Root router and global wrappers
├── public/             # Static assets (robots.txt, etc.)
└── index.html          # Entry point
```

## Modular Logic
- **`pages/`**: Only handles routing and layout. Sub-logic is delegated to components.
- **`store/`**: All business logic (Cart, Auth, Wishlist) is decoupled from the UI and handled in Zustand.
- **`styles/`**: Uses a custom CSS token system (`variables.css`) to ensure consistency without a heavy framework like Tailwind (unless specified).

---
[Related: State Management](./state-management.md) | [Related: Components](./components.md)

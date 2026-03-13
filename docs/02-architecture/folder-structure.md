---
title:        Folder Structure
section:      02-architecture
last-updated: 2025-03-13
maintained-by:Senior Developer
status:       Approved
---

# 📂 Folder Structure

Duo Designs follows standard modular conventions to make navigation easy for new developers.

## 1. 🌐 Customer Frontend App
Root: `/customer-app`

```text
src/
├── assets/          # Static images, icons, fonts
├── components/      # Reusable UI components
│   ├── common/      # Header, Footer, Button, Input
│   ├── layout/      # Navbar, Page container
│   ├── product/     # ProductCard, ProductGrid
│   └── ui/          # Skeletens, Modals, Loaders
├── hooks/           # Custom React hooks (useCart, useAuth, useProducts)
├── pages/           # Page components (Home, Shop, Cart, etc.)
├── services/        # API calls using Axios
├── store/           # Zustand global state (authStore, cartStore)
├── styles/          # Global CSS, variables, animations
├── utils/           # Helper functions (formatPrice, valitateEmail)
├── App.jsx          # Main routing & layout wrapper
└── main.jsx         # Entry point
```

---

## 2. ⚙️ Backend API
Root: `/backend`

```text
src/
├── config/          # Configurations (DB, Cloudinary, Razorpay)
├── controllers/     # Route logic & responses
├── middleware/      # Auth, Admin checks, Rate limiting, Uploads
├── models/          # Mongoose Schemas (User, Order, Product)
├── routes/          # API route definitions & mapping
├── services/        # Business logic (GST, Email, Invoices, OTP)
├── utils/           # Utilities (asyncHandler, apiResponse)
├── validators/      # Middleware for request body validation
└── app.js           # Express app setup & middleware wiring
server.js            # Node.js entry point & Listener
```

---

## 3. 🛡️ Admin Frontend App
Root: `/admin-app`

```text
src/
├── components/
│   ├── dashboard/   # Summary cards, Stats charts
│   ├── order/       # OrderTable, DispatchModal
│   └── product/     # Add/Edit product forms
├── pages/
│   ├── Dashboard.jsx
│   ├── Orders.jsx
│   └── Inventory.jsx
└── ... (Similar structure to Customer App)
```

---

## 🔝 Root Level (Monorepo/Workspace)

```text
duo-designs/
├── customer-app/    # React Frontend
├── backend/         # Node.js API
├── admin-app/       # Admin React App
├── docs/            # THIS Documentation
└── .github/         # CI/CD Workflows
```

## 📜 Coding Style Key Points
- **PascalCase** for Components (`ProductCard.jsx`).
- **camelCase** for utils, hooks, and services (`useCart.js`, `formatPrice.js`).
- **kebab-case** for Stylesheets (`category-list.css`).
- **_snake_case** is avoided in filenames but used for Env Vars (`MONGODB_URI`).

---
[Related: 04-frontend/customer-app.md](../04-frontend/customer-app.md) | [Home](../README.md)

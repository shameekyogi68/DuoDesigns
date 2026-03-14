---
title: Pages
app: Customer App
section: 05-customer-app
last-updated: 2025-03-14
maintained-by: Frontend Developer
status: Current
---

# Page Reference

Every primary user path is mapped to a React component in `src/pages/`.

| Page Name | Path | Description |
|-----------|------|-------------|
| **Home** | `/` | HERO slider, Featured products, Categories. |
| **Category**| `/category/:id` | Filterable product grid for a specific type. |
| **Product** | `/product/:id` | Item details, size selection, variant picker. |
| **Custom** | `/custom-design`| Image uploader and customization tool. |
| **Cart** | `/cart` | Item list, pricing breakdown, coupon input. |
| **Login** | `/login` | OTP request and verification screens. |
| **Account** | `/account` | (Protected) Profile, Address, Order history. |
| **Track** | `/track` | Public order status lookup via tracking ID. |
| **Wishlist**| `/wishlist` | Saved items for the authenticated user. |

## Lazy Loading
All pages are **lazy-loaded** in `App.jsx` to ensure fast initial page weight.
```javascript
const Home = lazy(() => import('./pages/Home'));
```

---
[Related: Routing](./routing.md) | [Related: Components](./components.md)

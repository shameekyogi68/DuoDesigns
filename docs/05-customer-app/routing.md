---
title: Routing
app: Customer App
section: 05-customer-app
last-updated: 2025-03-14
maintained-by: Frontend Developer
status: Current
---

# Routing Architecture

Duo Designs uses **React Router DOM v7** for single-page navigation.

## 📍 Route Configuration
All paths are defined in `src/constants/routes.js` to prevent hardcoded string bugs.

```javascript
/* Example */
export const ROUTES = {
  HOME: '/',
  SHOP: '/shop',
  PRODUCT: '/product/:id',
  ACCOUNT: '/account'
};
```

## 🔒 Protected Access
Sensitive pages like `/account` are wrapped in a `ProtectedRoute` component.

```jsx
<Route element={<ProtectedRoute />}>
    <Route path="/account" element={<Account />} />
</Route>
```

💡 **Logic**: `ProtectedRoute` checks the `isAuthenticated` state from the `authStore`. If false, it redirects to `/login` with the current path in the state for post-login redirection.

## 🎞️ Scroll Management
The `ScrollToTop` component (in `App.jsx`) ensures that every navigation resets the window scroll position to `0,0`.

---
[Related: Pages](./pages.md) | [Related: State Management](./state-management.md)

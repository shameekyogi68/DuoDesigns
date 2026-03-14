---
title: State Management
app: Customer App
section: 05-customer-app
last-updated: 2025-03-14
maintained-by: Frontend Developer
status: Current
---

# State Management (Zustand)

The customer app uses **Zustand** for high-performance, lightweight state management.

## 🛍️ `cartStore`
Handles the shopping cart lifecycle.
- **State**: `items`, `total`, `isCartOpen`.
- **Actions**: `addItem`, `removeItem`, `updateQuantity`, `clearCart`.
- **Persist**: Syncs automatically with `localStorage` so the cart survives refresh.

## 👤 `authStore`
Handles user session and profile.
- **State**: `user`, `token`, `isAuthenticated`, `isLoading`.
- **Actions**: `setAuth`, `logout`, `updateUser`.
- **Persist**: Stores the JWT and user metadata securely.

## ❤️ `wishlistStore`
Handles saved favorites.
- **Logic**: Fetches data from API on mount and updates local state.

## Usage Example
```javascript
import { useCartStore } from '../store/cartStore';

function CartButton() {
  const items = useCartStore(state => state.items);
  return <span>{items.length} Items</span>;
}
```

---
[Related: API Integration](./api-integration.md) | [Related: Folder Structure](./folder-structure.md)

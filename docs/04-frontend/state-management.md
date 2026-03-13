---
title:        State Management (Zustand)
section:      04-frontend
last-updated: 2025-03-13
maintained-by:Frontend Lead
status:       Approved
---

# 🧠 State Management (Zustand)

Duo Designs uses **Zustand** for lightweight, performant global state management. It provides a much simpler alternative to Redux while still offering DevTools and Persistence.

## 1. Auth Store (`src/store/authStore.js`)
Handles everything related to user sessions and credentials.

**State:**
- `token`: String (Access JWT).
- `refreshToken`: String (Refresh JWT).
- `user`: Object (name, email, role, etc.).
- `isAuthenticated`: Boolean.

**Actions:**
- `setCredentials({ token, refreshToken, user })`: Saves all fields and sets `isAuthenticated` to true.
- `logout()`: Clears store and `localStorage`.

---

## 2. Cart Store (`src/store/cartStore.js`)
Persistently handles the user's shopping bag.

**State:**
- `items`: Array of objects (product, variant, designUrl, quantity).
- `coupon`: Object (applied coupon data).
- `shippingCharge`: Number.

**Actions:**
- `addItem(item)`: Adds or updates quantity.
- `removeItem(itemId)`: Filters out the item.
- `updateQuantity(itemId, newQty)`: Direct manipulation.
- `applyCoupon(couponData)`: Stores coupon for total calculation.
- `clearCart()`: Reset items to empty array.

**Persistence:**
Uses the `persist` middleware to automatically sync cart data to `localStorage`.

---

## 3. UI Store (`src/store/uiStore.js`)
Handles temporary UI states that don't belong in a single component.

**State:**
- `isCartOpen`: Boolean (Sidebar cart).
- `isSearching`: Boolean.
- `notifications`: Array of objects (toast messages).

**Actions:**
- `toggleCart()`: Simple boolean switch.
- `addNotification(msg, type)`: Adds toast and triggers auto-removal timer.

---

## 🛠️ Usage Example
```javascript
import useCartStore from '../store/cartStore';

const CartButton = () => {
    const itemsCount = useCartStore((state) => state.items.length);
    const toggleCart = useUIStore((state) => state.toggleCart);

    return (
        <button onClick={toggleCart}>
            Cart ({itemsCount})
        </button>
    );
};
```

---
[Related: 04-frontend/api-integration.md](./api-integration.md) | [Home](../README.md)

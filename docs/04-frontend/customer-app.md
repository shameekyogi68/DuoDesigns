---
title:        Customer App Guide
section:      04-frontend
last-updated: 2025-03-13
maintained-by:Frontend Lead
status:       Approved
---

# 🛍️ Customer App Guide

This document explains the internal specialized workflows of the Duo Designs primary storefront.

## 🏛️ Page Components (`src/pages`)
The storefront is a Single Page Application (SPA).

- **`Home.jsx`:** Heavy use of the `ProductGrid` component. Data is fetched via `useProducts` hook.
- **`ProductDetail.jsx`:** The most complex page. It manages size selection, color variants, and the logic to enable/disable the "Upload Design" button based on product category.
- **`Cart.jsx`:** Subscribes to `cartStore`. Real-time price updates happen here before moving to checkout.

---

## 🏗️ State Architecture (Zustand)
We avoid Prop Drilling by using specific Zustand stores.

### 1. **`authStore.js`**
- Manages `token`, `user`, and `isAuthenticated`.
- Method `login(userData)` stores the token in `localStorage`.
- Method `logout()` clears all stored data and redirects to `/`.

### 2. **`cartStore.js`**
- Manages `items[]`, `coupon`, and `shippingAddress`.
- Automatically persists to `localStorage` using Zustand middleware.
- Computed value `cartTotal` includes subtotal, discount, and logic for free shipping.

---

## 🛠️ API Integration (`src/services`)
We use an `api.js` helper which is an Axios instance.

```javascript
// Example: src/services/productService.js
import api from './api';

export const getProducts = async (params) => {
    const response = await api.get('/products', { params });
    return response.data;
};
```

---

## 🎨 Design Implementation
- All components use **Vanilla CSS**.
- **Global Variables:** Always reference `src/styles/variables.css` using `var(--color-accent)`.
- **Responsive Wrappers:** Most sections should be wrapped in `<div className="container">` to maintain alignment.

## 🚀 Key Feature Workflows
1. **Design Upload:** Uses `upload.service.js` to get a Cloudinary URL before adding the item to the cart.
2. **Checkout:** Multi-step form (Delivery → Payment) managed via a single `useCheckout` hook to maintain state transparency.

---
[Related: 04-frontend/otp-flow.md](./otp-flow.md) | [Home](../README.md)

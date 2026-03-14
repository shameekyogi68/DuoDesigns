---
title: Components
app: Customer App
section: 05-customer-app
last-updated: 2025-03-14
maintained-by: Frontend Developer
status: Current
---

# Component Reference

UI elements are divided into three category-specific folders in `src/components/`.

## 📦 Common (`/common`)
Generic, theme-agnostic UI elements.
- **Button**: Handles primary, secondary, and disabled states with loading spinners.
- **Input**: Standardized text fields with error label support.
- **Modal**: Portal-based overlays for dialogs.
- **PageLoader**: Fullscreen loading state used in Suspense fallbacks.

## 🧱 Layout (`/layout`)
The structural frame of the app.
- **Header**: Persistent navigation, category dropdown, and cart badge.
- **Footer**: Company links and social media icons.
- **ProtectedRoute**: Wrapper that redirects unauthenticated users to `/login`.

## 🏷️ Product (`/product`)
Domain-specific displays.
- **ProductCard**: Thumbnail, price, and "Quick Add" button for grids.
- **SizePicker**: Interactive selection for S, M, L, XL, XXL.
- **DesignUploader**: Drag-and-drop zone for custom prints.

---
[Related: Design System](../08-design-system/overview.md) | [Related: Pages](./pages.md)

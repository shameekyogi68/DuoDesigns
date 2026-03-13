---
title:        Component Library
section:      03-design
last-updated: 2025-03-13
maintained-by:Frontend Lead
status:       Approved
---

# 📦 Component Library

Reusable UI atoms and molecules used throughout the Customer and Admin apps.

## 1. Atoms (Basic UI)

### **Button**
- **File:** `src/components/common/Button.jsx`
- **Props:** `variant` (primary, outline, danger), `size`, `isLoading`, `fullWidth`.
- **Note:** Always uses uppercase `Bebas Neue` font.

### **Input**
- **File:** `src/components/common/Input.jsx`
- **Props:** `label`, `error`, `icon`, `type`.
- **Note:** Thick 1.5px border, white background.

### **Badge**
- **File:** `src/components/common/Badge.jsx`
- **Usage:** "Best Seller", "Out of Stock", "Sale".
- **Styles:** Solid background, 0 radius, bold Barlow font.

---

## 2. Molecules (Complex UI)

### **ProductCard**
- **File:** `src/components/product/ProductCard.jsx`
- **Structure:** Image → Title (Bebas) → Price (Barlow) → Quick Add CTA.
- **Hover:** Image zoom effect + border color change to Accent Lime.

### **CartItem**
- **File:** `src/components/cart/CartItem.jsx`
- **Structure:** Image → Name (Variant info) → Quantity Controls → Price.
- **Note:** Small thumbnail preview of custom design if applicable.

### **Modal / Drawer**
- **File:** `src/components/ui/Modal.jsx`
- **Style:** Overlay with 70% opacity, sharp white container, close button at top-right.

---

## 3. Layout Components

### **Navbar**
- **File:** `src/components/layout/Navbar.jsx`
- **Sections:** Logo (Left) → Links (Center) → Search/Account/Cart (Right).
- **Responsive:** Mobile drawer menu triggers below 1024px.

### **SectionHeader**
- **File:** `src/components/common/SectionHeader.jsx`
- **Usage:** Large titles at the top of collections.
- **Example:** `"NEW ARRIVALS"`, `"BROWSE BY CATEGORY"`.

---

## 4. Admin Specific

### **StatsCard**
- **Usage:** Large numbers on dashboard (Revenue, Orders, Customers).
- **Trend:** Shows `+X%` or `-X%` indicator in small green/red text.

### **StatusBadge**
- **Colors:**
  - `placed`: Blue
  - `confirmed`: Yellow
  - `dispatched`: Purple
  - `delivered`: Green

---

## ⚠️ Documentation Rules for Components
- Every new component MUST be added to this list.
- Component props should always be destructured.
- CSS should reside in a corresponding `.css` file using the BEM (Block-Element-Modifier) naming convention.

---
[Related: 03-design/pages.md](./pages.md) | [Home](../README.md)

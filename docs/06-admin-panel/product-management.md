---
title: Product & Stock Management
app: Admin Panel
section: 06-admin-panel
last-updated: 2025-03-14
maintained-by: Inventory Manager
status: Current
---

# Product & Stock Management

Maintaining the product catalogue and individual variant inventory.

## ➕ Adding Products
1. Enter basic info (Name, Base Price, Category).
2. Upload high-res images to Cloudinary via the dropzone.
3. Configure **Variants**: Every product *must* have at least one color variant to be active.
4. Set default stocks for S, M, L, XL, XXL.

## 📉 Stock Updates
The **Stock** page provides a simplified grid view for all products.
- **Bulk Edit**: Quickly tab through inputs to update stock levels after receiving fresh inventory.
- **Low Stock Dashboard**: Items with <10 units are automatically highlighted on the main dashboard to prevent overselling.

---
[Related: Product Catalogue](../01-project/product-catalogue.md) | [Related: API Reference (Products)](../04-api-reference/products.md)

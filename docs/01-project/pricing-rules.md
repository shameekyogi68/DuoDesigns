---
title: Pricing Rules
app: All
section: 01-project
last-updated: 2025-03-14
maintained-by: Project Manager
status: Current
---

# Pricing Rules

This document specifies the exact financial logic used to calculate order totals, tax, and commissions.

## 👕 Product Pricing

| Item | Component | Default Value | Code Reference |
|------|-----------|---------------|----------------|
| **Any T-Shirt** | XL Addon | ₹ 50 | `xlAddon` |
| **Any T-Shirt** | XXL Addon | ₹ 50 | `xxlAddon` |
| **Keychain** | Double Side Addon | ₹ 80 | `doubleSideAddon` |
| **All Products** | Strike-through Price | Varies | `oldPrice` |

## 🚚 Shipping Charges

- **Standard Charge**: ₹ 80 per order (Default).
- **Free Shipping Threshold**: ₹ 999.
- **Logic**: If `subtotal` >= `freeShippingThreshold`, `shippingCharge` becomes ₹ 0.

## 🧾 GST (Goods & Services Tax)

The total GST rate is locked at **18%** for all apparel.

| Location | Component Breakdown |
|----------|---------------------|
| **Karnataka (Intrastate)** | 9% CGST + 9% SGST |
| **Rest of India (Interstate)**| 18% IGST |

*Calculated on the `taxableAmount` (Subtotal + Shipping - Discount).*

## 🏷️ Coupons

| Type | Logic |
|------|-------|
| **Percentage** | `subtotal * (discountPercent / 100)` |
| **Flat** | `discountAmount` |

## 🤝 Agency Commission

- **Rate**: 5% of the `totalPayableAmount` of every successful order.
- **Calculation**: Tracked in the Agency Revenue Tracker app using live API data.

---
[Related: Business Rules](./business-rules.md) | [Related: GST Logic](../03-backend/gst-calculation.md)

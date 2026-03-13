---
title:        Product Catalogue
section:      01-project
last-updated: 2025-03-13
maintained-by:Product Designer
status:       Approved
---

# 📦 Product Catalogue

Duo Designs maintains a curated selection of products categorized based on their manufacturing and design complexity.

## 👕 Apparel Category

| Product | Base Price | Sizes | XL/XXL Surcharge | Fabric Details |
| :--- | :---: | :---: | :---: | :--- |
| **Regular T-Shirt** | ₹499 | S, M, L, XL, XXL | +₹50 | 180 GSM, 100% Bio-washed Cotton |
| **Oversized T-Shirt** | ₹799 | S, M, L, XL, XXL | +₹50 | 240 GSM, Heavyweight French Terry |
| **Trackpants** | ₹999 | S, M, L, XL, XXL | +₹50 | 280 GSM, Fleece Cotton |

### Variant Structure (Apparel)
Each apparel item is structured in the system with `variants` which track:
- `color` (e.g. Jet Black, Off White)
- `size` (S, M, L, XL, XXL)
- `stock` (Real-time quantity for that specific color/size combo)

---

## 🎨 Accessory Category

| Product | Base Price | Variants | Surcharges | Notes |
| :--- | :---: | :---: | :---: | :--- |
| **Ceramic Mugs** | ₹299 | White, Black, Red | N/A | Sublimation high-gloss print |
| **Keychains** | ₹149 | Acrylic, Metal, Wood | +₹80 (Double-side) | Dual-side print possible |

---

## 🏗️ Product Data Model (Simplified)
Each product in our system follows this unified schema logic:

- `category`: "t-shirt", "mug", "trackpants", "keychain"
- `pricing`: `basePrice` + `discountPrice` (if on sale)
- `isCustomizable`: `true` (enables frontend "Upload" button)
- `isBestSeller`: `true` (promotes to homepage hero)
- `images`: Array of product mockup URLs (max 5)

## 🎨 Design Options

### 1. Pre-made Designs
These are curated by Duo Designs and are available for direct purchase. No additional upload is needed from the user.

### 2. Custom Uploads
If `isCustomizable` is enabled, a customer can:
- **Upload PNG/JPG** from their device.
- **Preview** it on the product mockup.
- The system stores the design URL in the `Order` object upon checkout.

## 📈 Pricing & Discounts
- **Subtotal Calculation:** `(Base Price * Quantity) + Surcharges`
- **GST:** 18% (split into CGST/SGST or IGST).
- **Coupons:** Applied on the taxable subtotal before GST.

---
[Related: 01-project/glossary.md](./glossary.md) | [Home](../README.md)

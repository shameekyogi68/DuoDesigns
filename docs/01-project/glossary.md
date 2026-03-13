---
title:        Glossary of Terms
section:      01-project
last-updated: 2025-03-13
maintained-by:Technical Writer
status:       Approved
---

# 📖 Glossary of Terms

A comprehensive guide to the terminology and acronyms used throughout the Duo Designs ecosystem.

| Term | Definition |
| :--- | :--- |
| **Admin** | The platform owner. Uses a separate interface (`admin.duodesigns.in`) to manage orders, products, and analytics. |
| **Apparel** | Specifically refers to wearable products (T-shirts, Trackpants). |
| **Access Token** | A short-lived (15 minutes) JWT token passed in headers for authentication. |
| **Bebas Neue** | The primary display font used for headings and brand elements. |
| **Barlow** | The secondary sans-serif font used for all body text and UI elements. |
| **CGST** | Central Goods and Services Tax. 9% applied for Karnataka customers. |
| **Cloudinary** | Our cloud service for storing and optimizing images (designs, products). |
| **COD** | Cash on Delivery. **Not supported** by Duo Designs. |
| **Commission** | The exactly 5% fee earned by a Partner for every sale they drive. |
| **Dispatch** | The state when an order leaves the warehouse. Tracking ID must be added during this phase. |
| **Flat Discount** | A fixed monetary reduction (e.g., ₹100 Off) regardless of percentage. |
| **GSTIN** | Goods and Services Tax Identification Number. Unique to the business. |
| **HSN Code** | Harmonized System of Nomenclature. Required for tax compliance on all product invoices. |
| **IGST** | Integrated Goods and Services Tax. 18% applied for all non-Karnataka customers. |
| **Intrastate** | A sale where the customer is in the same state as the seller (Karnataka). |
| **Interstate** | A sale where the customer is in a different state from the seller. |
| **JWT** | JSON Web Token. Used for stateless authentication between frontend and API. |
| **OTP** | One-Time Password. 6-digit code used for registration and login via email. |
| **Partner** | A reseller or affiliate partner who helps drive sales to the platform. |
| **Pincode** | 6-digit Indian postal code used to verify shipping and calculate taxes. |
| **Prepaid** | An order where payment is completed before the product is manufactured/shipped. |
| **Razorpay** | The payment aggregator used for processing UPI, Debit/Credit cards. |
| **Refresh Token** | A long-lived (30 days) token stored in the database to renew Access Tokens without re-logging. |
| **SKU** | Stock Keeping Unit. A unique identifier for every variant (e.g., TSHIRT-BLACK-XL). |
| **SGST** | State Goods and Services Tax. 9% applied for Karnataka customers. |
| **Subtotal** | The amount calculated as `Price * Quantity` before taxes and coupons. |
| **Taxable Amount** | The amount on which GST is calculated (Subtotal - Coupon Discount). |
| **Variant** | A specific version of a product based on size or color. |
| **Webhook** | An HTTP callback from Razorpay to our API to confirm payment success. |

---
[Related: 02-architecture/system-overview.md](../02-architecture/system-overview.md) | [Home](../README.md)

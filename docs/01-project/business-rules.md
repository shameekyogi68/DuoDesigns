---
title:        Business Rules
section:      01-project
last-updated: 2025-03-13
maintained-by:Project Manager
status:       Approved
---

# 📜 Duo Designs Business Rules

This document outlines the hard-coded business logic that governs our e-commerce platform.

## 💳 Payments & Checkout
1. **Prepaid Only:** We do NOT offer Cash on Delivery (COD). All orders must be paid upfront.
2. **Payment Gateway:** Razorpay is the official payment partner. Standard 2% transaction fee applies.
3. **Refunds:** Refunds are processed within 5-7 working days. Only for damaged products (as confirmed by the Admin).
4. **Free Shipping:** Any order with a `subtotal` (after coupons) above **₹999** gets free delivery.
5. **Standard Shipping:** The default shipping charge is **₹80** per order. This can be overridden per `pincode` in the database.

## 🎨 Product Customization
1. **Design Uploads:** Customers can only upload **PNG** or **JPG** files.
2. **File Size Limit:** Maximum allowable size is **10MB** per design.
3. **Oversized Surcharge:** Size XL and XXL carry an additional **₹50** premium over the base price.
4. **Keychains:** A double-sided print option carries an additional **₹80** surcharge.

## 💸 Coupons & Discounts
1. **Coupon Types:**
   - **Flat Discount:** Deducts a fixed amount (e.g., ₹100 off).
   - **Percentage Discount:** Deducts a percent (e.g., 10% off).
2. **Minimum Order:** Coupons can have a `minOrder` requirement (e.g., "Min order ₹500").
3. **Usage Limit:** Coupons can be limited by number of uses or by an expiry date.
4. **Stacking:** Users can only apply **one coupon per order**.

## 🚚 Shipping & Delivery
1. **Pincode Verification:** Users MUST enter their pincode to check deliverability.
2. **Serviceability:** Delivery is ONLY offered to pincodes listed in the `Pincode` collection.
3. **Tracking:** Each order is assigned a `trackingNumber` and `courierPartner` by the Admin during the **Dispatch** phase.
4. **Statuses:** All orders move through this exact lifecycle:
   - `placed` (Paid but not yet seen)
   - `confirmed` (Admin accepted for production)
   - `dispatched` (Shipped out, tracking ID added)
   - `delivered` (Final destination reached)

## ⚖️ Taxation (GST)
1. **Seller State:** Duo Designs' registered warehouse is in **Karnataka**.
2. **Intrastate (Karnataka):** CGST 9% + SGST 9% (Total 18%) is applied to all customers with a Karnataka address.
3. **Interstate (Non-Karnataka):** IGST 18% is applied to all other states in India.
4. **HSN Codes:** Every product in the catalogue must have a valid HSN code for tax invoices.

## 🤝 Partner Commissions
1. **Commission Rate:** Every reseller/partner earns exactly **5% commission** on the base sale value.
2. **Payout:** Commissions are calculated automatically but marked as "paid" manually by the Admin.
3. **Rounding:** All financial calculations use 2 decimal places.

## 📦 Inventory Management
1. **Stock Rules:** When an item's stock reaches **0**, it is automatically marked as "Out of Stock" on the frontend.
2. **Low Stock Alert:** When stock falls below **10**, the frontend shows a "Only [X] left!" badge.

---
[Related: 01-project/user-roles.md](./user-roles.md) | [Home](../README.md)

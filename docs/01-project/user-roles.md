---
title: User Roles
app: All
section: 01-project
last-updated: 2025-03-14
maintained-by: Project Manager
status: Current
---

# User Roles

The system recognizes four primary tiers of users.

## 1. Guest (Anonymous)
- **Scope**: Customer App.
- **Access**: Browse products, view categories, check shipping availability, add items to cart.
- **Restriction**: Cannot checkout or view order history.

## 2. Customer (Authenticated)
- **Scope**: Customer App.
- **Login**: Email + OTP.
- **Access**: All Guest features + Checkout, Save Design, View Orders, Request Returns, Profile management.

## 3. Admin (Internal User)
- **Scope**: Admin Panel.
- **Login**: Username + Password (Securely stored in DB).
- **Access**: Product management, Order fulfillment, Inventory tracking, GST Reporting, Coupon generation.

## 4. Agency (Partner)
- **Scope**: Agency Revenue Tracker.
- **Login**: Local authentication (defined in environment).
- **Access**: View sales performance across Duo Designs, generate commission reports, verify monthly payments.

---
[Related: Authentication](../03-backend/authentication.md) | [Related: Security](../13-security/overview.md)

---
title:        Page Inventory
section:      03-design
last-updated: 2025-03-13
maintained-by:Lead Designer
status:       Approved
---

# 📄 Page Inventory

The platform is comprised of 12 distinct pages for the customer experience and a unified admin dashboard.

## 🛍️ Customer Frontend (11 Pages)

| Page | URL | Key Features |
| :--- | :--- | :--- |
| **Home** | `/` | Hero section, Best Sellers, Featured Categories, Trust Badges. |
| **Shop/All Products** | `/shop` | Filter by category, Sort by price/newest, Lazy loading grid. |
| **Category View** | `/category/:id` | Focused view of a specific product type (e.g., Oversized T-Shirts). |
| **Product Detail** | `/product/:id` | Size selector, Color variants, Delivery check, Custom design upload. |
| **Cart** | `/cart` | Quantity edit, Price breakdown, Coupon application. |
| **Login/Auth** | `/login` | Email input, 6-digit OTP boxes, Resend timer. |
| **Profile/Account** | `/account` | Address management, Order history links, Logout. |
| **Order History** | `/account/orders` | List of all past orders with status badges. |
| **Order Tracking** | `/track` | Public page to track order by `orderNumber`. |
| **Order Success** | `/success/:id` | Branded success checkmark, Invoice download link, Order details. |
| **Offers/Coupons** | `/offers` | Public list of active coupon codes and banners. |

---

## 🛡️ Admin Frontend (1 Unified View)

| Dashboard View | URL (Admin App) | Key Features |
| :--- | :--- | :--- |
| **Dashboard** | `/` | Revenue charts, Order counts, Low stock alerts. |
| **Orders** | `/orders` | Status filter, Search by name/id, Dispatch button. |
| **Inventory** | `/inventory` | List of all products, Quick stock edit, Toggle active status. |
| **Customers** | `/customers` | List of registered users and their contact info. |
| **Partners** | `/partners` | Log sales, View commissions, Mark as paid. |
| **Settings** | `/settings` | Site banners, Contact numbers, Courier list. |

---

## 🔗 Common Elements (Global)
- **Header:** Navigation, Search trigger, Account icon, Cart count.
- **Footer:** Links, Copyright, Made in India badge, Social links.
- **Notification Toast:** Used for "Item added to cart", "Login success", "Error" alerts.

## 404 Page
A custom branded 404 page exists at `/*` showing a "Lost in design?" message and a large CTA button to return to the Shop.

---
[Related: 04-frontend/routing.md](../04-frontend/routing.md) | [Home](../README.md)

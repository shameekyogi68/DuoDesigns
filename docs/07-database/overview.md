---
title:        Database Overview
section:      07-database
last-updated: 2025-03-13
status:       Approved
---

# 🗄️ Database Overview

Duo Designs uses **MongoDB** as its primary data store, hosted on **MongoDB Atlas** for high availability and automated backups.

## ⚙️ Connection Details
- **Provider:** MongoDB Atlas (AWS Region).
- **Driver:** Mongoose ODM (v8.x).
- **Cluster Type:** Shared (Free Tier) for Development, Dedicated for Production.

## 🏗️ Storage Strategy
We use a **highly denormalized** approach for Order data. When an order is placed, we take a "snapshot" of the product information (name, pricing, thumbnail) so that even if the product is deleted or updated later, the order history remains accurate and legally consistent.

---

## 🚦 Connectivity Config
To connect from the backend, ensure the following is in your `.env`:
`MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.abc.mongodb.net/duodesigns`

---

## 📊 Quick Model Summary

| Model | Collection Name | Purpose |
| :--- | :--- | :--- |
| **User** | `users` | Auth, Profile, Saved Addresses. |
| **Product** | `products` | Catalogue, Variants, Category mapping. |
| **Order** | `orders` | Sales records, Status history, Snapshots. |
| **Coupon** | `coupons` | Discount logic and availability. |
| **Pincode** | `pincodes` | Shipping serviceability list. |
| **Partner** | `partners` | Affiliate sales and commission logs. |

---
[Related: 05-backend/database.md](../05-backend/database.md) | [Home](../README.md)

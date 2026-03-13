---
title:        User Roles & Permissions
section:      01-project
last-updated: 2025-03-13
maintained-by:Project Manager
status:       Approved
---

# 👥 User Roles & Permissions

Duo Designs uses role-based access control (RBAC) to ensure security and clean workflow between customers and platform managers.

## 1. 🛍️ Customer
The primary user of the platform.

### Registration & Login
- **Method:** Passwordless OTP-based email login.
- **Verification:** User must verify a 6-digit OTP to create a session.
- **Data Stored:** Name, email, phone, multiple addresses, and order history.

### Permissions (Can Do)
- ✅ Browse product catalogue.
- ✅ Search for products.
- ✅ Upload custom designs (PNG/JPG < 10MB).
- ✅ Add items to cart and check pincode serviceability.
- ✅ Apply coupons.
- ✅ Place orders via Razorpay.
- ✅ Track order status using an Order ID.
- ✅ Download PDF invoices.
- ✅ Manage delivery addresses.

### Restrictions (Cannot Do)
- ❌ Access the Admin Dashboard.
- ❌ Modify product stock or pricing.
- ❌ Dispatch or cancel their own order after confirmation.
- ❌ View orders of other users.

---

## 2. ⚡ Admin (Owner)
The root user responsible for platform operations.

### Access
- **Method:** Separate Login page (often hidden or separate host).
- **Identifier:** Users with the `role: 'admin'` in the database.

### Permissions (Can Do)
- ✅ View overall revenue and order analytics.
- ✅ Manage the Product Catalogue (Create, Edit, Delete).
- ✅ Update real-time stock levels.
- ✅ Change Order Status (Placed → Confirmed → Dispatched → Delivered).
- ✅ Add Courier Tracking details to orders.
- ✅ Manage service area pincodes and shipping charges.
- ✅ Create and manage discount coupons.
- ✅ View and export Customer lists.
- ✅ Log Partner sales and mark commissions as "Paid".
- ✅ Update Global Site Settings (Contact, Banner text, free shipping threshold).

---

## 3. 🤝 Partner (Reseller)
Partners are external entities that drive sales to Duo Designs. They do not have a separate dashboard in the current MVP, but their data is managed by the Admin.

### Profile
- **Identifier:** Company Name / Point of Contact.
- **Workflow:** Admin logs sales attributable to a partner manually.
- **Incentive:** Exactly **5% commission** on the sale amount.

### Data Logged
- `saleAmount` (Excluding taxes).
- `commission` (Calculated automatic).
- `status` (`pending` | `paid`).

---

## 🔐 Access Summary Table

| Feature | Customer | Admin | Partner |
| :--- | :---: | :---: | :---: |
| Product Discovery | ✅ | ✅ | ✅ |
| Upload Design | ✅ | ✅ | ❌ |
| Manage Orders | ❌ | ✅ | ❌ |
| Manage Coupons | ❌ | ✅ | ❌ |
| View Analytics | ❌ | ✅ | ❌ |
| Payout Commissions | ❌ | ✅ | ❌ |

---
[Related: 01-project/product-catalogue.md](./product-catalogue.md) | [Home](../README.md)

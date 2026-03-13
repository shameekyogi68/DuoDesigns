---
title:        Admin Order Lifecycle
section:      09-workflows
last-updated: 2025-03-13
status:       Approved
---

# 📦 Admin Order Lifecycle

This workflow describes how an order moves through the system after a customer completes payment.

## 🏁 Phase 1: New Order (`placed`)
- **Notification:** Admin receives an email alert.
- **Action:** Open the **Orders** tab on the Admin Dashboard.
- **Review:** 
  - Check the customer's design for illegal content or low resolution.
  - Check if the item is in physical stock.
- **Confirm:** Click the **"Confirm Order"** button.
- **Outcome:** Order status moves to `confirmed`.

---

## 🏗️ Phase 2: Production
- **Action:** Export the customer's high-res design from Cloudinary.
- **Manufacturing:** Print on the selected apparel/accessory variant.
- **Packing:** Include the Tax Invoice (downloaded from order details).

---

## 🚚 Phase 3: Shipping (`dispatched`)
- **Booking:** Generate shipping label via third-party courier (DTDC, BlueDart).
- **Update API:** 
  1. Click **"Dispatch Order"**.
  2. Enter the **Courier Partner** (e.g. DTDC).
  3. Enter the **Tracking Number**.
- **Outcome:** 
  - Order status moves to `dispatched`.
  - Customer receives automated "Order Dispatched" email with tracking link.

---

## 🏁 Phase 4: Delivery (`delivered`)
- **Automation:** (Optional) API hits courier tracking webhook to check status.
- **Manual:** Admin clicks **"Mark as Delivered"** once confirmation is received.
- **Completion:** Order is removed from the "Active Orders" view and archived in "History".

---

## 🚫 Phase 5: Cancellations / Refunds
- Orders can only be cancelled by the Admin *before* dispatch.
- **Refund:** Process manually on the Razorpay Dashboard.
- **Log:** Update Order status to `cancelled` and add a reason note for the internal log.

---
[Related: 04-frontend/admin-app.md](../04-frontend/admin-app.md) | [Home](../README.md)

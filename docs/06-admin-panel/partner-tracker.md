---
title: Partner Tracker
app: Admin Panel
section: 06-admin-panel
last-updated: 2025-03-14
maintained-by: Business Manager
status: Current
---

# Partner Sales Tracking

The Admin Panel feeds data to the Agency Revenue Tracker via the **Partners** module.

## 🤝 Attribution Rule
A sale is attributed to a partner if a specific `partner_id` or referral code is attached to the customer session at the time of order creation.

## 📊 Admin View
The **Partners** page allows admins to:
1.  See cumulative sales per agency.
2.  Add manual sales entries if an offline deal occurs.
3.  Audit commission payouts.

## 🔗 Connection
Commission logic is central in the backend. Both the Admin Panel and the Revenue Tracker query the same `/api/partners` endpoints but display the information differently according to the user role.

---
[Related: Revenue Tracker Overview](../07-revenue-tracker/overview.md) | [Related: API Reference (Partners)](../04-api-reference/partners.md)

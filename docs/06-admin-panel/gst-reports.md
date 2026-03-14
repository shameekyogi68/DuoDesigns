---
title: GST Reports
app: Admin Panel
section: 06-admin-panel
last-updated: 2025-03-14
maintained-by: Accountant
status: Current
---

# GST Reports & Taxation

The Admin Panel provides the raw data needed for GST filing.

## 📈 Taxation Dashboard
The **Payments** view acts as the ledger. Every successful transaction is listed with its tax components.

| Field | Description |
|-------|-------------|
| **Taxable Amount** | Order Subtotal - Discounts. |
| **CGST** | 9% of Taxable (Karnataka only). |
| **SGST** | 9% of Taxable (Karnataka only). |
| **IGST** | 18% of Taxable (Rest of India). |

## 📥 Quarterly Export
1.  Navigate to **Payments**.
2.  Filter by the relevant Date Range.
3.  Click "Export CSV".
4.  This CSV can be handed directly to an accountant to calculate quarterly filing liabilities.

---
[Related: GST Calculation Logic](../03-backend/gst-calculation.md) | [Related: Pricing Rules](../01-project/pricing-rules.md)

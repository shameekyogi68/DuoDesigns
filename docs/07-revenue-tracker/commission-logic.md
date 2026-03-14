---
title: Commission Logic
app: Revenue Tracker
section: 07-revenue-tracker
last-updated: 2025-03-14
maintained-by: Business Analyst
status: Current
---

# Commission Calculation Logic

The Revenue Tracker visualizes the performance-based earnings of the partner agency.

## 📏 The Rules
Commissions are calculated as a percentage of the **Taxable Amount** (Subtotal minus Discounts).

| Component | Policy |
|-----------|--------|
| **Base Commission** | 10% of Taxable Sales. |
| **Shipping** | Non-commissionable. |
| **GST** | Non-commissionable (excluded from calculation). |

## 📅 Monthly Consolidation
Sales are grouped by **Order Date**.
- **Pending**: Order is paid but commission hasn't been confirmed/cleared for payment by Duo Designs.
- **Cleared**: Duo Designs has approved the payout.
- **Paid**: Payout has been transferred to the agency's account.

## 🧮 Example
- **Gross Order**: ₹1,180 (₹1,000 product + ₹180 GST).
- **Taxable (Base)**: ₹1,000.
- **Agency Commission**: ₹100.

---
[Related: Payout Tracking](./payout-tracking.md) | [Related: Pricing Rules](../01-project/pricing-rules.md)

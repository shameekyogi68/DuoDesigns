---
title: Report Generation
app: Revenue Tracker
section: 07-revenue-tracker
last-updated: 2025-03-14
maintained-by: Marketing Lead
status: Current
---

# Report Generation (Export)

We use **`jspdf`** and **`jspdf-autotable`** to generate printable PDF reports client-side.

## 📈 Types of Reports
1. **Performance Summary**: High-level PDF showing Total Sales vs Last Month vs Target.
2. **Detailed Sales Log**: A multi-page PDF listing every order number, date, and commission.
3. **Settlement Statement**: A formal document for internal record-keeping when a payout is received.

## ⚙️ How it works
The `src/utils/reportGenerator.js` utility loops through the filtered dataset in the `Reports` view and constructs a PDF table. This ensures the data is downloaded instantly without another server request.

---
[Related: Payout Tracking](./payout-tracking.md) | [Related: API Integration](./api-integration.md)

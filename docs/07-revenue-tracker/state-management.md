---
title: State Management
app: Revenue Tracker
section: 07-revenue-tracker
last-updated: 2025-03-14
maintained-by: Frontend Developer
status: Current
---

# Revenue Tracker State

A compact state management system using **Zustand**.

## 🔑 `authStore`
Identical logic to the storefront but tuned for the `agency` user object. It persists the partner's unique `partnerCode` and `branchName` if applicable.

## 📊 `salesStore`
Stores the current month's sales list. This prevents reloading the entire ledger when toggling between "Summary" and "Monthly" views.

---
[Related: State Management (Storefront)](../05-customer-app/state-management.md)

---
title: Testing
app: Revenue Tracker
section: 07-revenue-tracker
last-updated: 2025-03-14
maintained-by: QA Lead
status: Current
---

# Revenue Tracker Testing

The priority for this portal is **Mathematical Accuracy**.

## 🧪 Testing Focus

### 1. Calculation Audit
- Manually calculate the 10% commission for a sample of 5 orders across different states (GST logic verification). 
- Ensure that "Cleared" amounts correctly ignore "Pending" or "Cancelled" orders.

### 2. Export Validation
- Periodically download every report type (Dashboard, Monthly, Sales).
- Open in Adobe Acrobat and Chrome Preview to ensure **auto-table layouts** don't break on long product names.

### 3. Cross-Browser PDF Logic
- Verify that `jspdf` correctly prompts a "Save As" dialog on Safari (iOS) and Chrome (Android).

---
[Related: Commission Logic](./commission-logic.md) | [Related: Manual Test Cases](../12-testing/manual-test-cases.md)

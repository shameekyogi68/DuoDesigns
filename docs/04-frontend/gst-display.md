---
title:        GST Display Logic
section:      04-frontend
last-updated: 2025-03-13
maintained-by:Frontend Lead
status:       Approved
---

# 💸 GST Display Logic

The Duo Designs frontend handles complex Indian tax display logic to ensure customers across different states have a transparent checkout experience.

## 🏛️ When GST is Shown
GST remains hidden or is shown as "Taxes calculated at checkout" until the customer enters they delivery **Pincode**.

- **Cart Page:** Shows `Subtotal`.
- **Checkout Page (Phase 1):** User enters Pincode.
- **Checkout Page (Phase 2):** GST breakdown appears based on the identified State.

---

## 🏗️ Technical Logic

### 1. Determining the Tax Type
Based on the `ServiceableState` of the Pincode:
- **State == "Karnataka":** Intrastate (CGST 9% + SGST 9%).
- **State != "Karnataka":** Interstate (IGST 18%).

### 2. Common Utility Function
- **File:** `src/utils/taxHelper.js`
- **Method:** `getTaxBreakdown(subtotal, state)`

```javascript
export const getTaxBreakdown = (subtotal, state) => {
    const isKarnataka = state.toLowerCase() === 'karnataka';
    const totalGst = subtotal * 0.18;

    if (isKarnataka) {
        return {
            type: 'intrastate',
            cgst: totalGst / 2,
            sgst: totalGst / 2,
            totalGst
        };
    }

    return {
        type: 'interstate',
        igst: totalGst,
        totalGst
    };
};
```

---

## 🎨 UI Representation
We use a specific `<GSTSummary />` component to render the breakdown.

### Case A: Karnataka Customer
- **Subtotal:** ₹499.00
- **CGST (9%):** ₹44.91
- **SGST (9%):** ₹44.91
- **Total Amount:** ₹588.82

### Case B: Non-Karnataka Customer (e.g. Maharashtra)
- **Subtotal:** ₹499.00
- **IGST (18%):** ₹89.82
- **Total Amount:** ₹588.82

---

## ⚠️ Display Rules
1. **Never Round Tax Until Final Total:** Keep 2 decimal places to avoid cent-off errors.
2. **Standard HSN Labels:** Always show the text "Incl. all taxes" below the total amount on product pages if possible, using the base product price.

---
[Related: 05-backend/gst-calculation.md](../05-backend/gst-calculation.md) | [Home](../README.md)

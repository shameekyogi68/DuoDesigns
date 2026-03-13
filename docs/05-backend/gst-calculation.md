---
title:        GST Calculation Logic
section:      05-backend
last-updated: 2025-03-13
maintained-by:Backend Developer
status:       Approved
---

# ⚖️ GST Calculation Logic

Indian Goods and Services Tax (GST) is calculated dynamically based on the location of the seller warehouse versus the destination pincode.

## 🏛️ Business Constants
- **Seller State:** Karnataka
- **Tax Rate:** 18% (standard for apparel/accessories)
- **Calculation Type:** Taxes are calculated on the `Discounted Price` + `Shipping Charge`.

---

## 🏗️ The Algorithm

### 1. Determining Context
We compare the `shippingAddress.state` against our `SELLER_STATE`.

| Scenario | Customer State | Tax Type | Breakdown |
| :--- | :--- | :--- | :--- |
| **Intrastate** | Karnataka | CGST + SGST | 9% Central + 9% State |
| **Interstate** | Any other state | IGST | 18% Integrated |

### 2. The Math (Step-by-Step)
Let's take an example:
1. **Gross Subtotal:** ₹1097.00
2. **Coupon Discount:** ₹100.00
3. **Shipping:** ₹80.00
4. **Taxable Amount:** `(1097 - 100) + 80 = ₹1077.00`
5. **Total Tax (18%):** `1077 * 0.18 = ₹193.86`
6. **Case Karnataka:** ₹96.93 (CGST) + ₹96.93 (SGST)
7. **Case Delhi:** ₹193.86 (IGST)

---

## 🛠️ Implementation (`src/services/gst.service.js`)

```javascript
exports.calculateGST = (subtotal, shipping, discount, state) => {
    const taxableAmount = subtotal + shipping - discount;
    const isKarnataka = state.toLowerCase() === 'karnataka';
    const totalGst = Math.round(taxableAmount * 0.18 * 100) / 100;

    if (isKarnataka) {
        const split = totalGst / 2;
        return {
            type: 'intrastate',
            cgst: split,
            sgst: split,
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

## 📄 Invoicing Requirement
These split values MUST be individual line items on the PDF invoice to remain legally compliant.
- **CGST:** 9403.30.10 (HSN)
- **IGST:** 9403.30.10 (HSN)

---
[Related: 04-frontend/gst-display.md](../04-frontend/gst-display.md) | [Home](../README.md)

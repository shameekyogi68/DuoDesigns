---
title: GST Display Logic
app: Customer App
section: 05-customer-app
last-updated: 2025-03-14
maintained-by: Frontend Developer
status: Current
---

# GST Display Logic (Frontend)

The storefront displays pricing as inclusive or exclusive of tax based on the user's location.

## 📍 Determination
The app determines the relevant GST components by checking the user's selected shipping address.

1.  **Karnataka Addresses**: Shows a combined breakdown of **9% CGST + 9% SGST**.
2.  **Other States**: Shows a single **18% IGST** line item.

## 🧾 Price Calculation (Client-side)
While the backend is the final authority, the frontend utility `src/utils/pricing.js` provides instant feedback:

```javascript
export const calculateDisplayTax = (subtotal, state) => {
  const rate = 0.18;
  const totalTax = subtotal * rate;
  
  if (state === 'Karnataka') {
    return { cgst: totalTax/2, sgst: totalTax/2, igst: 0 };
  }
  return { cgst: 0, sgst: 0, igst: totalTax };
}
```

## ⚠️ Important Note
Frontend calculations are for UI display only. The actual payment amount is always fetched from the `/api/orders` response to ensure mathematical consistency with the backend.

---
[Related: GST Calculation](../03-backend/gst-calculation.md) | [Related: Pricing Rules](../01-project/pricing-rules.md)

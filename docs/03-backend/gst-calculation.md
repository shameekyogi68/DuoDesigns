---
title: GST Calculation
app: Backend
section: 03-backend
last-updated: 2025-03-14
maintained-by: Backend Developer
status: Current
---

# GST Calculation Logic

The Duo Designs backend implements exact Indian GST logic to be compliant with taxation rules.

## 🛠️ The Service
The logic is isolated in `src/services/gst.service.js`.

### Core Logic
The system determines tax based on the **Customer's State** relative to the **Seller's State (Karnataka)**.

| Scenario | Tax Applied | Rates |
|----------|-------------|-------|
| **Intrastate (Karnataka)** | CGST + SGST | 9% + 9% |
| **Interstate (Rest of India)** | IGST | 18% |

## 📐 The Formula

```javascript
// Taxable Amount = Subtotal + Shipping - Coupon Discount
const taxable = subtotal + shipping - discount;

// Total GST = Taxable * 0.18
```

## 📄 Example Calculation
- **Product**: ₹1,000
- **Shipping**: ₹80
- **Discount**: ₹100
- **Taxable**: ₹980
- **Buyer in Karnataka**: ₹88.20 CGST + ₹88.20 SGST
- **Buyer in Delhi**: ₹176.40 IGST

💡 **Total Amount** = ₹980 + ₹176.40 = ₹1,156.40

---
[Related: Pricing Rules](../01-project/pricing-rules.md) | [Related: Invoice Generation](./invoice-generation.md)

---
title:        Invoice Generation (PDF)
section:      05-backend
last-updated: 2025-03-13
maintained-by:Backend Lead
status:       Approved
---

# 📄 Invoice Generation (PDF)

Duo Designs generates a legally-compliant Tax Invoice for every single order. We use **pdf-lib** for high-performance PDF manipulation in Node.js.

## 🏛️ Template Structure
The invoice is built from scratch in memory. It includes:
1. **Header:** Duo Designs Logo + GSTIN.
2. **Bill To:** Customer Name, Phone, and Address.
3. **Details:** Order Number, Date, Tracking (if available).
4. **Table:** 
   - Product Name (Size/Color).
   - Base Price.
   - HSN Code.
   - Quantity.
   - Line Total.
5. **Tax Summary:** Explicit split of CGST, SGST, or IGST.
6. **Footer:** "This is a computer-generated invoice."

---

## 🛠️ Logic Flow (`src/services/invoice.service.js`)

1. **Trigger:** User pays → `PaymentVerified` event.
2. **Fetch:** Get full `Order` details populated with `User` data.
3. **Creation:**
   - Create `PDFDocument` instance.
   - Load custom fonts (Barlow-Regular, Barlow-Bold).
   - Draw text and lines for the table.
4. **Saving:** Save the PDF as a buffer or write to a `tmp/` folder.
5. **Action:** Pass the file path to `emailService` for attachment.

---

## 🧩 Calculations Recap
- **Taxable Value:** Final price after coupons but before GST.
- **Rounding:** Final Total is always rounded to 2 decimal places.

## ⚠️ Important Considerations
- **Storage:** We do NOT store every PDF in MongoDB. We generate them fresh whenever `GET /api/orders/:id/invoice` is called. This saves database space.
- **Encoding:** Prices use the standard Unicode for the Indian Rupee (₹) symbol.

## 🧪 Testing the PDF
Develop individual components of the invoice first, and use `npm run test:invoice` to generate a `test.pdf` for visual inspection of spacing and font alignment.

---
[Related: 01-project/business-rules.md](../01-project/business-rules.md) | [Home](../README.md)

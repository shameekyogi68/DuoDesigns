---
title: Invoice Generation
app: Backend
section: 03-backend
last-updated: 2025-03-14
maintained-by: Backend Developer
status: Current
---

# Invoice Generation

Duo Designs automatically generates professional PDF tax invoices for every order.

## 🛠️ The Technology
We use **`pdf-lib`** to programmatically build the PDF structure from scratch. This allows for total control over layout without requiring an external template engine.

## 📄 Key Components of the Invoice
1.  **Header**: Duo Designs branding and "TAX INVOICE" label.
2.  **Order Metadata**: Invoice number (matched to order number) and date.
3.  **Customer Info**: Name, Address, and State (crucial for GST context).
4.  **Item Table**: Name, Variant/Size, Qty, and Unit Price.
5.  **Tax Table**: 
    - Subtotal
    - Shipping
    - Discount (if any)
    - CGST/SGST or IGST breakdown
    - **Final Grand Total**

## 📂 Implementation
The generation logic lives in `src/services/invoice.service.js` → `generateInvoice()`.

## 📥 How to Download
Invoices are accessed via the `GET /api/orders/:id/invoice` endpoint, which returns a binary stream with `Content-Type: application/pdf`.

---
[Related: GST Calculation](./gst-calculation.md) | [Related: API Reference](../04-api-reference/orders.md)

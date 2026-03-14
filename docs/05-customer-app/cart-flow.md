---
title: Cart & Checkout Flow
app: Customer App
section: 05-customer-app
last-updated: 2025-03-14
maintained-by: Frontend Developer
status: Current
---

# Cart & Checkout Flow

The checkout process is optimized for completion with minimum friction.

## 1. Add to Cart
- User selects product, size, and quantity.
- `cartStore` checks existing items to increment quantity instead of duplicating.
- A "Success" toast notification triggers.

## 2. Cart Sidebar/Page
- Real-time updates as quantities shift.
- **Dynamic Pricing**: Shows subtotal, estimated GST, and shipping.
- **Coupon Validation**: Calls `POST /api/coupons/validate` on blur or button click.

## 3. Checkout (Step-by-Step)
1. **Shipping Details**: Pre-filled from user profile if logged in.
2. **Review**: Final confirmation of items and total.
3. **Payment**:
   - Application calls `/api/orders` to lock in prices in DB.
   - Application calls `/api/payments/create-order` to get Razorpay ID.
   - Razorpay Checkout overlay opens.

## 4. Post-Payment
- Verification triggers on success.
- User redirected to `/order-success/:orderNumber`.
- `cartStore` is wiped clean using `clearCart()`.

---
[Related: GST Display](./gst-display.md) | [Related: Payment Flow](../03-backend/payment-flow.md)

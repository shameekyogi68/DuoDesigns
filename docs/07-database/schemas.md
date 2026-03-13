---
title:        Mongoose Schemas Reference
section:      07-database
last-updated: 2025-03-13
status:       Approved
---

# 🏗️ Mongoose Schemas Reference

Detailed breakdown of the primary data models in Duo Designs.

## 1. User Schema (`User.js`)
```javascript
{
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String },
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
  addresses: [{
    street: String,
    city: String,
    state: String,
    pincode: String,
    isDefault: Boolean
  }],
  refreshTokens: [String]
}
```

---

## 2. Product Schema (`Product.js`)
```javascript
{
  name: { type: String, required: true },
  description: String,
  category: { type: String, required: true },
  basePrice: { type: Number, required: true },
  images: [String],
  variants: [{
    color: String,
    size: String,
    stock: { type: Number, default: 0 }
  }],
  isCustomizable: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true }
}
```

---

## 3. Order Schema (`Order.js`)
```javascript
{
  orderNumber: { type: String, unique: true },
  user: { type: ObjectId, ref: 'User' },
  items: [{
    productId: ObjectId,
    name: String,
    price: Number,
    variant: String,
    designUrl: String,
    quantity: Number
  }],
  status: { 
    type: String, 
    enum: ['placed', 'confirmed', 'dispatched', 'delivered', 'cancelled'],
    default: 'placed' 
  },
  pricing: {
    subtotal: Number,
    discount: Number,
    shipping: Number,
    tax: { type: Number, cgst: Number, sgst: Number, igst: Number },
    total: Number
  },
  shippingDetails: {
    address: String,
    trackingNumber: String,
    courierPartner: String
  }
}
```

---

## 4. Pincode Schema (`Pincode.js`)
```javascript
{
  pincode: { type: String, unique: true },
  state: String,
  city: String,
  isDeliverable: { type: Boolean, default: true },
  shippingChargeOverride: Number
}
```

---
[Home](../README.md)

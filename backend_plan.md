Here's the complete backend breakdown:

---

## ⚙️ Backend — Complete Plan

### Stack
```
Node.js + Express
MongoDB Atlas (database)
Mongoose (ODM)
```

---

## 📁 Folder Structure

```
duo-designs-backend/
├── src/
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── product.controller.js
│   │   ├── order.controller.js
│   │   ├── payment.controller.js
│   │   ├── coupon.controller.js
│   │   ├── shipping.controller.js
│   │   ├── upload.controller.js
│   │   ├── customer.controller.js
│   │   └── partner.controller.js
│   │
│   ├── models/
│   │   ├── User.model.js
│   │   ├── Product.model.js
│   │   ├── Order.model.js
│   │   ├── Coupon.model.js
│   │   ├── Pincode.model.js
│   │   ├── Payment.model.js
│   │   ├── Partner.model.js
│   │   └── Settings.model.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── product.routes.js
│   │   ├── order.routes.js
│   │   ├── payment.routes.js
│   │   ├── coupon.routes.js
│   │   ├── shipping.routes.js
│   │   ├── upload.routes.js
│   │   ├── customer.routes.js
│   │   └── partner.routes.js
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js       ← verify JWT
│   │   ├── admin.middleware.js      ← check admin role
│   │   ├── upload.middleware.js     ← multer config
│   │   ├── validate.middleware.js   ← express-validator
│   │   ├── rateLimit.middleware.js  ← rate limiting
│   │   └── error.middleware.js      ← global error handler
│   │
│   ├── services/
│   │   ├── email.service.js         ← Gmail SMTP templates
│   │   ├── otp.service.js           ← OTP generate + verify
│   │   ├── razorpay.service.js      ← payment logic
│   │   ├── cloudinary.service.js    ← image upload
│   │   ├── invoice.service.js       ← PDF generation
│   │   └── gst.service.js           ← GST calculation
│   │
│   ├── utils/
│   │   ├── generateOrderId.js       ← DD-YYYY-XXXX format
│   │   ├── generateOTP.js           ← 6 digit OTP
│   │   ├── apiResponse.js           ← standard response format
│   │   └── asyncHandler.js          ← try/catch wrapper
│   │
│   ├── config/
│   │   ├── db.js                    ← MongoDB connection
│   │   ├── cloudinary.js            ← Cloudinary setup
│   │   └── razorpay.js              ← Razorpay setup
│   │
│   ├── validators/
│   │   ├── auth.validator.js
│   │   ├── order.validator.js
│   │   ├── product.validator.js
│   │   └── coupon.validator.js
│   │
│   └── app.js                       ← Express app setup
│
├── .env
├── .env.example
├── .gitignore
├── .eslintrc.js
├── package.json
└── server.js                        ← Entry point
```

---

## 📦 All NPM Packages

```bash
# Core
npm install express mongoose dotenv cors helmet

# Auth
npm install bcryptjs jsonwebtoken express-rate-limit

# Email
npm install nodemailer

# Payments
npm install razorpay

# File uploads
npm install multer cloudinary multer-storage-cloudinary

# PDF
npm install pdf-lib

# Validation
npm install express-validator

# Dev
npm install -D nodemon eslint
```

---

## 🗄️ MongoDB Schemas

### User
```javascript
{
  name:       String,
  email:      String (unique),
  phone:      String,
  role:       enum ['customer', 'admin'],
  isVerified: Boolean,
  addresses: [{
    label:    String,        // Home / Office
    line1:    String,
    line2:    String,
    city:     String,
    state:    String,
    pincode:  String,
    isDefault: Boolean
  }],
  otp: {
    code:      String,
    expiresAt: Date,
    attempts:  Number
  },
  createdAt, updatedAt
}
```

### Product
```javascript
{
  name:        String,
  category:    enum ['tshirt','oversized','trackpants','mug','keychain'],
  description: String,
  basePrice:   Number,
  xlAddon:     Number,      // default 50
  xxlAddon:    Number,      // default 50
  doubleSideAddon: Number,  // default 80 (keychains only)
  variants: [{
    color:    String,
    colorHex: String,
    stock: {
      S: Number, M: Number, L: Number,
      XL: Number, XXL: Number
    }
  }],
  images:         [String],  // Cloudinary URLs
  premadeDesigns: [String],  // Cloudinary URLs
  isActive:    Boolean,
  isFeatured:  Boolean,
  createdAt, updatedAt
}
```

### Order
```javascript
{
  orderNumber: String,       // DD-2025-0049
  user:        ObjectId,
  items: [{
    product:    ObjectId,
    name:       String,
    category:   String,
    variant:    String,      // color
    size:       String,
    qty:        Number,
    price:      Number,
    design:     String,      // Cloudinary URL
    designType: enum ['uploaded','premade']
  }],
  address: {
    name: String, phone: String,
    line1: String, line2: String,
    city: String, state: String, pincode: String
  },
  coupon: {
    code:           String,
    discountAmount: Number
  },
  pricing: {
    subtotal:      Number,
    shipping:      Number,
    discount:      Number,
    taxableAmount: Number,
    cgst:          Number,
    sgst:          Number,
    igst:          Number,
    total:         Number
  },
  gstType:  enum ['intrastate','interstate'],
  payment: {
    razorpayOrderId:   String,
    razorpayPaymentId: String,
    razorpaySignature: String,
    status: enum ['pending','paid','failed']
  },
  status: enum ['placed','confirmed','dispatched','delivered'],
  dispatch: {
    courier:        String,
    trackingNumber: String,
    dispatchedAt:   Date
  },
  createdAt, updatedAt
}
```

### Coupon
```javascript
{
  code:      String (unique, uppercase),
  type:      enum ['flat','percentage'],
  value:     Number,
  minOrder:  Number,
  maxUses:   Number,
  usedCount: Number,
  expiresAt: Date,
  isActive:  Boolean,
  createdAt
}
```

### Pincode
```javascript
{
  pincode:        String (unique),
  area:           String,
  city:           String,
  state:          String,
  shippingCharge: Number,
  isDeliverable:  Boolean
}
```

### Partner
```javascript
{
  companyName:  String,
  saleAmount:   Number,
  commission:   Number,   // auto = saleAmount * 0.05
  notes:        String,
  saleDate:     Date,
  status:       enum ['pending','paid'],
  paidAt:       Date,
  createdAt
}
```

---

## 🔌 All API Routes

### Auth Routes
```
POST   /api/auth/send-otp       → Send OTP to email
POST   /api/auth/verify-otp     → Verify OTP, return JWT
POST   /api/auth/google         → Google OAuth
GET    /api/auth/me             → Get my profile (protected)
PUT    /api/auth/profile        → Update name/phone (protected)
POST   /api/auth/address        → Add address (protected)
PUT    /api/auth/address/:id    → Update address (protected)
DELETE /api/auth/address/:id    → Delete address (protected)
```

### Product Routes
```
GET    /api/products            → All products (filters: category, sort, featured)
GET    /api/products/:id        → Single product
POST   /api/products            → Create (admin)
PUT    /api/products/:id        → Update (admin)
DELETE /api/products/:id        → Delete (admin)
PUT    /api/products/:id/stock  → Update stock (admin)
GET    /api/products/low-stock  → Low stock list (admin)
```

### Order Routes
```
POST   /api/orders              → Place order (protected)
GET    /api/orders/my           → My orders (protected)
GET    /api/orders/track/:num   → Track by order number (public)
GET    /api/orders/:id/invoice  → Download invoice PDF (protected)
GET    /api/orders              → All orders (admin)
PUT    /api/orders/:id/confirm  → Confirm order (admin)
PUT    /api/orders/:id/dispatch → Dispatch + send email (admin)
PUT    /api/orders/:id/deliver  → Mark delivered (admin)
```

### Payment Routes
```
POST   /api/payments/create-order → Create Razorpay order
POST   /api/payments/verify       → Verify payment signature
GET    /api/payments              → Payment logs (admin)
```

### Coupon Routes
```
POST   /api/coupons/validate    → Validate coupon
GET    /api/coupons/active      → Active coupons for offers page
GET    /api/coupons             → All coupons (admin)
POST   /api/coupons             → Create coupon (admin)
DELETE /api/coupons/:id         → Delete coupon (admin)
```

### Shipping Routes
```
GET    /api/shipping/:pincode   → Check delivery + charge (public)
GET    /api/shipping            → All pincodes (admin)
POST   /api/shipping            → Add pincode (admin)
PUT    /api/shipping/:id        → Update pincode (admin)
DELETE /api/shipping/:id        → Delete pincode (admin)
```

### Upload Routes
```
POST   /api/upload/design       → Upload customer design
POST   /api/upload/product      → Upload product images (admin)
POST   /api/upload/premade      → Upload pre-made designs (admin)
```

### Customer Routes (admin only)
```
GET    /api/customers           → All customers
GET    /api/customers/:id       → Single customer
GET    /api/customers/:id/orders → Customer's orders
```

### Partner Routes (admin only)
```
GET    /api/partners            → All partner entries
POST   /api/partners            → Log new sale
PUT    /api/partners/:id/paid   → Mark commission paid
DELETE /api/partners/:id        → Delete entry
GET    /api/partners/summary    → Monthly summary
```

### Settings Routes (admin only)
```
GET    /api/settings            → Get all settings
PUT    /api/settings            → Update settings
```

---

## 🔐 Middleware Chain

```
Every request:
→ cors()
→ helmet()
→ express.json()

Auth routes:
→ rateLimit (max 5/min)
→ validate
→ controller

Protected routes:
→ authMiddleware (verify JWT)
→ controller

Admin routes:
→ authMiddleware (verify JWT)
→ adminMiddleware (check role)
→ controller
```

---

## 📧 Email Templates

```
1. OTP Email
   Subject: Your Duo Designs OTP — {otp}

2. Order Confirmed
   Subject: Order Confirmed! #DD-2025-XXXX
   Attachment: Invoice PDF

3. Order Dispatched
   Subject: Your Order is on its Way! 🚚
   Body: Courier + tracking number + track link

4. Order Delivered
   Subject: Order Delivered! Hope you love it 🎨

5. Password Reset OTP
   Subject: Reset Your Duo Designs Password
```

---

## 🚀 Setup Commands

```bash
# Create project
mkdir duo-designs-backend
cd duo-designs-backend
npm init -y

# Install all packages
npm install express mongoose dotenv cors helmet \
  bcryptjs jsonwebtoken express-rate-limit \
  nodemailer razorpay pdf-lib \
  multer cloudinary multer-storage-cloudinary \
  express-validator

npm install -D nodemon eslint

# Create folder structure
mkdir -p src/{controllers,models,routes,middleware,services,utils,config,validators}
```

---

## 🤖 IDE Prompt for Backend

```
You are a senior Node.js backend developer building a 
production-ready REST API for Duo Designs — a custom 
print e-commerce platform in India.

STACK:
Node.js + Express + MongoDB Atlas + Mongoose
Razorpay + Gmail SMTP + Cloudinary + pdf-lib
JWT Auth + bcryptjs + express-rate-limit

RULES:
1. Every route uses asyncHandler (no try/catch in controllers)
2. All responses use standard apiResponse util
   { success, message, data, error }
3. All inputs validated with express-validator
4. No business logic in routes — controllers only
5. No database calls in controllers — services only
6. Every model has timestamps: true
7. Passwords always hashed with bcrypt rounds 12
8. JWT expiry: 7 days
9. OTP expiry: 10 minutes, max 3 attempts
10. All admin routes protected by adminMiddleware
11. Cloudinary used for ALL image storage
12. GST logic only in gst.service.js
13. Email logic only in email.service.js
14. Order IDs format: DD-YYYY-XXXX (padded 4 digits)
15. Full JSDoc documentation on every function

GENERATE IN THIS ORDER:
1. server.js + app.js
2. config/ (db, cloudinary, razorpay)
3. utils/ (asyncHandler, apiResponse, generateOTP, generateOrderId)
4. services/gst.service.js
5. All models/ (User, Product, Order, Coupon, Pincode, Payment, Partner, Settings)
6. All middleware/
7. services/email.service.js (with all 5 templates)
8. services/otp.service.js
9. services/razorpay.service.js
10. services/cloudinary.service.js
11. services/invoice.service.js
12. All validators/
13. All controllers/
14. All routes/
15. README.md

One file at a time. Show complete code.
Ask "next?" before continuing.
```

---

## 📋 Build Order Summary

```
PHASE 1 — Foundation
├── server.js
├── app.js
└── config/ (db, cloudinary, razorpay)

PHASE 2 — Utils & Services
├── asyncHandler, apiResponse
├── generateOTP, generateOrderId
├── gst.service.js
└── email.service.js

PHASE 3 — Models (8 total)
└── User, Product, Order, Coupon,
    Pincode, Payment, Partner, Settings

PHASE 4 — Middleware
└── auth, admin, upload, validate,
    rateLimit, error

PHASE 5 — Controllers + Routes (9 each)
└── auth, product, order, payment,
    coupon, shipping, upload,
    customer, partner

PHASE 6 — Test & Deploy
└── Postman collection → Render deploy
```

---

Everything you need to build the complete backend. Start with the IDE prompt above and go one file at a time. 🚀
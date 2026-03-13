# Admin Panel Complete Requirements

## 1. Project Context

### 1.1 What the Admin Panel Is
- **Purpose and scope:** A central dashboard to manage products, orders, customers, inventory, coupons, and business metrics for Duo Designs.
- **Who uses it:** Only the owner/admin.
- **How it connects to the backend:** The admin panel consumes the identical REST API as the customer app, using protected endpoints that verify a specific "admin" role within the JWT.
- **How it differs from the customer app:** It's an entirely separate React + Vite application, allowing it to have a completely different architecture, dependency tree (like heavy charting libraries), and security profile without impacting the bundle size of the customer-facing frontend.
- **URL:** admin.duodesigns.in

### 1.2 Relationship to Existing Codebase
- **API Endpoints:**
  - `GET /api/admin/dashboard`
  - `GET /api/orders`, `PUT /api/orders/:id/*`
  - `GET /api/products`, `POST /api/products`, `PUT /api/products/:id/*`, `DELETE /api/products/:id`
  - `GET /api/customers`, `GET /api/customers/:id/*`
  - `GET /api/coupons`, `POST /api/coupons`, `DELETE /api/coupons/:id`
  - `GET /api/shipping`, `POST /api/shipping`, `PUT /api/shipping/:id`, `DELETE /api/shipping/:id`, `POST /api/shipping/bulk-import`
  - `POST /api/upload/*`
  - `GET /api/partners`, `POST /api/partners`, `PUT /api/partners/:id/paid`, `DELETE /api/partners/:id`
  - `GET /api/admin/reports/*`
  - `POST /api/auth/2fa/*`
- **MongoDB Models:** Uses all models (User, Product, Order, Coupon, Pincode, Payment, Partner, Settings, Review, ReturnRequest, BulkEnquiry, Referral, AbandonedCart, BackInStock).
- **Middleware:** All requests pass through `auth.middleware.js` (validates JWT) and `admin.middleware.js` (checks `req.user.role === 'admin'`).
- **Role Check:** The `admin.middleware.js` checks `if (!req.user || req.user.role !== 'admin')`.

### 1.3 Expected Admin HTML Design Reference
(Note: An exact `admin.html` file was not found in the codebase, but the desired design language is consistent with the customer app's Brutalist/High-Contrast aesthetic.)
- **Colors:** Black (`#0a0a0a`), White (`#f5f5f0`), Accent (`#c8ff00`), Greys.
- **Fonts:** `Bebas Neue` for large headers, `Barlow` (and `Barlow Condensed`) for body and structural text.
- **Layout:** Standard sidebar navigation on the left, topbar with user profile/logout, and a large main content area. Flat borders (1.5px solid black), sharp corners.

---

## 2. Tech Stack

### 2.1 Framework & Core
- React 18 + Vite
- React Router v6
- Separate project from customer app
- Deployed to admin.duodesigns.in

### 2.2 State Management
- Zustand
  - `adminAuthStore`: user info, JWT token.
  - `adminUIStore`: sidebar toggle state, global notifications.

### 2.3 Data Fetching
- **Axios:** Instance with base URL, JWT interceptor, handling 401s for re-authentication.
- **React Query:** Managing server state, caching, and polling (e.g., polling `GET /api/orders` every 30s to check for new orders).

### 2.4 UI & Styling
- Pure CSS (Vanilla) building on the existing design tokens, or Tailwind CSS if preferred for speed, matching the exact color codes and font families.
- **Charting:** `recharts` for dashboard graphs.

### 2.5 Forms
- `react-hook-form`
- `@hookform/resolvers/zod` + `zod` for validation schemas.

### 2.6 Additional Packages
- `lucide-react` (icons)
- `date-fns` (date formatting)
- `sonner` or `react-hot-toast` (notifications)

---

## 3. Complete Folder Structure

```
duo-designs-admin/
├── src/
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Orders.jsx
│   │   ├── OrderDetail.jsx
│   │   ├── Products.jsx
│   │   ├── ProductFormPage.jsx
│   │   ├── Stock.jsx
│   │   ├── Customers.jsx
│   │   ├── CustomerDetail.jsx
│   │   ├── Coupons.jsx
│   │   ├── Shipping.jsx
│   │   ├── Payments.jsx
│   │   ├── Partners.jsx
│   │   ├── Settings.jsx
│   │   └── Login.jsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AdminLayout.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Topbar.jsx
│   │   ├── ui/
│   │   │   └── (Button, Input, Table, Modal, Card, etc.)
│   │   ├── charts/
│   │   │   └── RevenueChart.jsx
│   │   ├── forms/
│   │   │   └── (ProductForm, SettingsForm, etc.)
│   │   ├── tables/
│   │   │   └── (OrdersTable, ProductsTable, etc.)
│   ├── store/
│   │   ├── authStore.js
│   │   └── uiStore.js
│   ├── api/
│   │   ├── axios.js
│   │   └── endpoints.js
│   ├── hooks/
│   ├── utils/
│   └── styles/
│       └── globals.css
├── package.json
└── vite.config.js
```

---

## 4. All Pages — Complete Specification

### 4.1 Dashboard (`/`)
- **Data:** `GET /api/admin/dashboard`
- **UI:** 4 Stat Cards (Revenue, Orders, Products, Customers), Revenue Bar Chart (7 days), Recent Orders Table.

### 4.2 Orders (`/orders`)
- **Data:** `GET /api/orders?page=x&status=y`
- **UI:** Filter Chips (All, Placed, Confirmed, Dispatched, Delivered), Search Bar, Orders Table with status badges and action buttons.

### 4.3 Order Detail (`/orders/:id`)
- **Data:** `GET /api/orders/:id`
- **UI:** Customer info, Shipping Address, Items list (with design image previews), Pricing breakdown, Status timeline, Action buttons to change status (e.g., Dispatch modal).

### 4.4 Products (`/products`)
- **Data:** `GET /api/products` (admin view)
- **UI:** Products Table showing Image, Name, Category, Base Price, Total Stock, Active toggle.

### 4.5 Add/Edit Product (`/products/new`, `/products/:id/edit`)
- **Data:** `POST /api/products` or `PUT /api/products/:id`
- **UI:** Complex form utilizing React Hook Form. Sections for basic info, pricing addons (XL, XXL, Double Sided), Color Variant Builder (add colors, hex codes, size arrays), Image Uploader (Cloudinary).

### 4.6 Stock Management (`/stock`)
- **Data:** `GET /api/products` -> Map variants to a flat table structure.
- **UI:** Massive data table with inline editing. Columns for Product Name, Variant Color, Size S, M, L, XL, XXL. "Save Changes" bulk updates via `PUT /api/products/stock/bulk`.

### 4.7 Customers (`/customers`)
- **Data:** `GET /api/customers`
- **UI:** Table of registered users, showing Name, Email, Phone, Order Count, Total Spent.

### 4.8 Customer Detail (`/customers/:id`)
- **Data:** `GET /api/customers/:id` & `GET /api/customers/:id/orders`
- **UI:** User profile card, list of all orders associated with this user.

### 4.9 Coupons & Offers (`/coupons`)
- **Data:** `GET /api/coupons`
- **UI:** Table of active/expired coupons. Button to create new coupon (Code, Type, Value, MinOrder, Expiry).

### 4.10 Shipping Zones (`/shipping`)
- **Data:** `GET /api/shipping`
- **UI:** Table of serviceable pincodes. Options to manual add singular pincodes or bulk upload a CSV.

### 4.11 Payments (`/payments`)
- **Data:** `GET /api/payments`
- **UI:** Audit log of Razorpay transactions linked to Order IDs.

### 4.12 Partnership Tracker (`/partners`)
- **Data:** `GET /api/partners`
- **UI:** Form to log manual partner sales. Table showing pending commissions to be paid out.

### 4.13 Settings (`/settings`)
- **Data:** `GET /api/settings`, `PUT /api/settings`
- **UI:** Form for Free Shipping Threshold, GST Rate toggle, store address info.

---

## 5. API Reference (Admin Context)

- **Auth Requirement:** All requests must pass `Bearer <token>` in the Authorization header.
- **Error Handling:** Global Axios interceptor must catch `401 Unauthorized` and redirect to `/login`.

### Endpoints (Key)
- `GET /api/admin/dashboard`
- `GET /api/orders`
- `PUT /api/orders/:id/confirm`
- `PUT /api/orders/:id/dispatch` -> Body: `{ courier, trackingNumber }`
- `PUT /api/orders/:id/deliver`
- `PUT /api/orders/:id/cancel`
- `GET /api/admin/reports/gst?month=X&year=Y`
- `POST /api/upload/product` (multipart/form-data)

---

## 6. Build Instructions

1. **Setup:** `npm create vite@latest duo-designs-admin -- --template react`
2. **Install Dep:** `npm i react-router-dom axios zustand recharts react-hook-form @hookform/resolvers zod lucide-react`
3. **Environment:** Create `.env` pointing VITE_API_URL to the backend URL.
4. **Auth Flow:** Build the Login page and `adminAuthStore.js` first. Verify the JWT contains role 'admin'.
5. **Layout:** Build `AdminLayout.jsx` with the persistent sidebar.
6. **Dashboard:** Build the `/` route to prove data fetching works.
7. **Iterate:** Build out Orders, then Products, then the rest.

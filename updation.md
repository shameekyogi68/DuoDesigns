Here's the complete IDE prompt:

```
You are a senior full-stack developer and technical architect.

Analyze the ENTIRE existing Duo Designs website codebase 
and generate a single comprehensive markdown file called:

admin-panel-requirements.md

This file must contain EVERYTHING needed to build the 
Admin Panel from scratch — so complete that any developer 
can read it and start building immediately without asking 
any questions.

═══════════════════════════════════════════════
STEP 1 — SCAN THE ENTIRE CODEBASE FIRST
═══════════════════════════════════════════════

Before writing a single line of the markdown file,
you must scan and read these locations:

FRONTEND (Customer App):
□ Read every file in src/pages/
□ Read every file in src/components/
□ Read every file in src/store/
□ Read every file in src/api/
□ Read every file in src/hooks/
□ Read every file in src/utils/
□ Read every file in src/constants/
□ Read src/App.jsx and src/main.jsx

BACKEND:
□ Read every file in src/models/
□ Read every file in src/controllers/
□ Read every file in src/routes/
□ Read every file in src/middleware/
□ Read every file in src/services/
□ Read every file in src/utils/
□ Read every file in src/config/
□ Read every validator in src/validators/
□ Read server.js and app.js

EXISTING ADMIN DESIGN:
□ Read admin.html (the existing HTML design)
□ Note every section, panel, table, form, and 
  button that already exists in the design

DOCUMENTATION:
□ Read docs/06-api/ (all API reference files)
□ Read docs/07-database/schemas.md
□ Read docs/01-project/business-rules.md
□ Read docs/01-project/user-roles.md

Only after reading ALL of the above,
generate the markdown file.

═══════════════════════════════════════════════
STEP 2 — GENERATE admin-panel-requirements.md
═══════════════════════════════════════════════

The markdown file must contain these exact sections
in this exact order:

────────────────────────────────────────────────
SECTION 1: PROJECT CONTEXT
────────────────────────────────────────────────

1.1 What the Admin Panel Is
    - Purpose and scope
    - Who uses it (only the owner/admin)
    - How it connects to the backend
    - How it differs from the customer app
    - URL: admin.duodesigns.in

1.2 Relationship to Existing Codebase
    - List every backend API endpoint that the 
      admin panel will consume (found by reading routes/)
    - List every MongoDB model the admin panel 
      reads or writes to (found by reading models/)
    - List every middleware the admin panel 
      requests must pass through
    - Identify the JWT admin role check 
      (found in middleware/admin.middleware.js)

1.3 Existing Admin HTML Design Reference
    - List every section found in admin.html
    - List every data table found in admin.html
    - List every form found in admin.html
    - List every modal found in admin.html
    - List every chart/graph found in admin.html
    - Note the exact color scheme used
    - Note the exact fonts used

────────────────────────────────────────────────
SECTION 2: TECH STACK
────────────────────────────────────────────────

2.1 Framework & Core
    - React 18 + Vite
    - React Router v6 (all admin routes)
    - Separate project from customer app
    - Deployed to admin.duodesigns.in

2.2 State Management
    - Zustand stores needed (list every store 
      with its state shape and actions)

2.3 Data Fetching
    - Axios instance setup for admin
      (base URL, JWT interceptor, 401 handler)
    - React Query for all GET requests
      (list every query key needed)
    - Which endpoints need polling 
      (e.g. new orders — check every 30 seconds)

2.4 UI & Styling
    - Exact CSS variables from admin.html
    - Exact fonts from admin.html
    - Tailwind CSS utility classes to add
    - Dark theme implementation
    - Recharts for all charts/graphs

2.5 Forms
    - React Hook Form for all forms
    - Zod schema validation for each form
    - List every form in the admin panel 
      with its fields and validation rules

2.6 Additional Packages
    - List every npm package needed
    - State the exact version to install
    - State the exact purpose of each package

────────────────────────────────────────────────
SECTION 3: COMPLETE FOLDER STRUCTURE
────────────────────────────────────────────────

Generate the COMPLETE folder and file tree for 
the admin app. Include EVERY file:

duo-designs-admin/
├── src/
│   ├── pages/
│   │   ├── (every page — derived from admin.html sections)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── (Sidebar, Topbar, etc.)
│   │   ├── ui/
│   │   │   ├── (every reusable component)
│   │   ├── charts/
│   │   │   ├── (every chart component)
│   │   ├── tables/
│   │   │   ├── (every data table component)
│   │   ├── forms/
│   │   │   ├── (every form component)
│   │   └── modals/
│   │       ├── (every modal component)
│   ├── store/
│   ├── api/
│   ├── hooks/
│   ├── utils/
│   ├── constants/
│   └── styles/
├── .env.example
├── .gitignore
├── vite.config.js
├── jsconfig.json
└── package.json

For every single file listed, write a one-line 
description of exactly what it does.

────────────────────────────────────────────────
SECTION 4: ALL PAGES — COMPLETE SPECIFICATION
────────────────────────────────────────────────

For EVERY page in the admin panel, document:

PAGE NAME
Route:           /admin/page-name
Component file:  src/pages/PageName.jsx
Description:     What this page does

DATA NEEDED:
  - List every API endpoint called on this page
  - List the exact request method + URL
  - List what data is displayed from the response
  - List what React Query key to use
  - List refresh interval if real-time needed

UI ELEMENTS:
  - List every stat card with its data source
  - List every table with its columns
  - List every form with its fields
  - List every button with its action
  - List every modal triggered from this page
  - List every chart with its data source

STATE:
  - List every useState needed on this page
  - List every useEffect needed
  - List every Zustand store used

PERMISSIONS:
  - Who can access (admin only / super-admin only)
  - What happens if non-admin tries to access

---

Do this for ALL these pages (derived from admin.html):

4.1  Dashboard (/)
4.2  Orders (/orders)
4.3  Order Detail (/orders/:id)
4.4  Products (/products)
4.5  Add Product (/products/new)
4.6  Edit Product (/products/:id/edit)
4.7  Stock Management (/stock)
4.8  Customers (/customers)
4.9  Customer Detail (/customers/:id)
4.10 Coupons & Offers (/coupons)
4.11 Shipping Zones (/shipping)
4.12 Payments (/payments)
4.13 Partnership Tracker (/partners)
4.14 Settings (/settings)

────────────────────────────────────────────────
SECTION 5: ALL COMPONENTS — COMPLETE SPECIFICATION
────────────────────────────────────────────────

For EVERY reusable component, document:

COMPONENT NAME
File:        src/components/path/ComponentName.jsx
Description: What it does in one line

PROPS:
  propName   Type       Required?   Default    Description

INTERNAL STATE:
  List any useState inside the component

API CALLS:
  List any direct API calls (rare — prefer passing data)

EVENTS EMITTED:
  List every callback prop (onSave, onDelete, etc.)

USED ON PAGES:
  List every page that uses this component

EXAMPLE USAGE:
  <ComponentName prop1="value" prop2={data} />

---

Document ALL these components:

LAYOUT:
5.1  Sidebar
5.2  Topbar
5.3  PageHeader
5.4  ProtectedRoute (admin role check)
5.5  ErrorBoundary

CHARTS:
5.6  RevenueChart (bar chart — last 7 days)
5.7  OrdersChart (bar chart — last 7 days)
5.8  CategoryPieChart (orders by product type)
5.9  StockStatusChart

TABLES:
5.10 OrdersTable
5.11 ProductsTable
5.12 CustomersTable
5.13 PaymentsTable
5.14 PartnersTable
5.15 PincodesTable
5.16 CouponsTable

FORMS:
5.17 ProductForm (add + edit — same form)
5.18 CouponForm
5.19 PincodeForm
5.20 DispatchForm
5.21 PartnerSaleForm
5.22 SettingsForm

MODALS:
5.23 DispatchModal
5.24 ConfirmDeleteModal
5.25 OrderDetailModal
5.26 CustomerDetailModal
5.27 StockUpdateModal

UI PRIMITIVES:
5.28 StatCard
5.29 StatusBadge
5.30 ActionButton
5.31 SearchBar
5.32 FilterChips
5.33 DataTable (base component)
5.34 ImageUploader (product images)
5.35 DesignUploader (pre-made designs)
5.36 ColorVariantBuilder
5.37 StockInput
5.38 Toast (notifications)
5.39 PageLoader
5.40 EmptyState

────────────────────────────────────────────────
SECTION 6: ALL API CALLS — COMPLETE REFERENCE
────────────────────────────────────────────────

Read every file in the backend routes/ folder.
Read every file in the backend controllers/ folder.

For EVERY admin API endpoint, document:

ENDPOINT NAME
Method:       GET / POST / PUT / DELETE
URL:          /api/endpoint
Auth:         Bearer Token + Admin Role Required
Used On Page: (which admin page calls this)

REQUEST:
  Headers:    { Authorization: Bearer {token} }
  Body:       { field: type — required/optional }
  Params:     { param: description }
  Query:      { param: description }

SUCCESS RESPONSE (200/201):
  {
    success: true,
    data: { exact shape of response object }
  }

ERROR RESPONSES:
  400 — validation error (when this happens)
  401 — unauthorized (when this happens)
  403 — forbidden (when this happens)
  404 — not found (when this happens)
  500 — server error (when this happens)

FRONTEND USAGE:
  // Exact code to call this endpoint
  const { data } = useQuery(['queryKey'], () => 
    adminApi.get('/endpoint'))

---

Cover ALL these endpoint groups:
6.1  Dashboard stats
6.2  Orders (list, detail, confirm, dispatch, deliver)
6.3  Products (list, create, update, delete, stock)
6.4  Customers (list, detail, orders)
6.5  Coupons (list, create, delete)
6.6  Shipping zones (list, create, update, delete, bulk import)
6.7  Payments (list, export)
6.8  Partners (list, create, mark paid, summary)
6.9  Upload (product images, pre-made designs)
6.10 Settings (get, update)
6.11 Search
6.12 GST report export
6.13 Auth (admin login, refresh token, logout)

────────────────────────────────────────────────
SECTION 7: ZUSTAND STORES — COMPLETE SPECIFICATION
────────────────────────────────────────────────

For EVERY Zustand store in the admin app, document:

STORE NAME: adminAuthStore
File: src/store/adminAuthStore.js

STATE SHAPE:
  {
    admin: null | { id, name, email, role },
    token: null | string,
    refreshToken: null | string,
    isLoggedIn: boolean,
    isLoading: boolean,
  }

ACTIONS:
  login(email)     → calls POST /api/auth/send-otp
  verifyOTP(otp)   → calls POST /api/auth/verify-otp
  logout()         → calls POST /api/auth/logout
  refreshToken()   → calls POST /api/auth/refresh-token
  setAdmin(admin)  → sets admin in state

PERSISTENCE:
  What gets stored in localStorage
  What gets cleared on logout

---

Document ALL these stores:
7.1  adminAuthStore
7.2  adminUIStore (sidebar open/close, active page, toasts)
7.3  adminOrdersStore (filters, selected order)
7.4  adminProductsStore (filters, editing product)

────────────────────────────────────────────────
SECTION 8: ROUTING — COMPLETE SPECIFICATION
────────────────────────────────────────────────

8.1 Route Table
    List every route with:
    - Path
    - Component
    - Auth required
    - Admin role required
    - Page title

8.2 Route Guards
    - How AdminProtectedRoute works
    - What happens when token expires mid-session
    - What happens when non-admin tries to access

8.3 React Router Setup
    - Complete App.jsx code with all routes
    - Nested routes structure
    - Redirect rules

8.4 Navigation Structure
    - Sidebar navigation items (derived from admin.html)
    - Which routes are nested
    - Active state detection

────────────────────────────────────────────────
SECTION 9: AUTHENTICATION FLOW
────────────────────────────────────────────────

9.1 Admin Login Flow (step by step)
    Step 1: Admin goes to admin.duodesigns.in
    Step 2: Redirected to /login (not logged in)
    Step 3: Enter email
    Step 4: OTP sent to email
    Step 5: Enter OTP
    Step 6: JWT + refresh token returned
    Step 7: Token stored in adminAuthStore
    Step 8: Redirected to /dashboard
    
    Document the exact API calls, state 
    changes, and redirects at each step.

9.2 Token Management
    - Where access token is stored
    - Where refresh token is stored
    - Axios interceptor code for auto-attaching token
    - Axios interceptor code for auto-refreshing on 401
    - What happens on refresh token expiry

9.3 Admin Role Verification
    - How backend verifies admin role
      (read admin.middleware.js and document exactly)
    - What JWT payload contains for admin
    - How frontend checks admin role

9.4 Logout
    - What gets cleared from state
    - What gets cleared from localStorage
    - API call to invalidate refresh token
    - Redirect after logout

────────────────────────────────────────────────
SECTION 10: REAL-TIME FEATURES
────────────────────────────────────────────────

10.1 New Order Notifications
     - How admin gets notified of new orders
     - Polling interval (every X seconds)
     - Sound/visual notification on new order
     - Badge count on Orders nav item
     - Which React Query refetch strategy to use

10.2 Low Stock Alerts
     - When triggered (stock < 10)
     - Where shown (dashboard + notification bell)
     - How to dismiss

10.3 Dashboard Auto-Refresh
     - Which dashboard stats refresh automatically
     - What interval
     - How to implement with React Query

────────────────────────────────────────────────
SECTION 11: FORMS — COMPLETE SPECIFICATION
────────────────────────────────────────────────

For EVERY form in the admin panel, document:

FORM NAME: ProductForm
File: src/components/forms/ProductForm.jsx

FIELDS:
  Field Name    | Type     | Required | Validation Rule
  name          | text     | yes      | min 3 chars, max 100
  category      | select   | yes      | must be valid category
  basePrice     | number   | yes      | min 1, max 99999
  ... (every field)

ZOD SCHEMA:
  Write the complete Zod validation schema

DEFAULT VALUES:
  For edit mode — what gets pre-filled

SUBMIT HANDLER:
  - What API endpoint is called
  - What happens on success (toast + redirect)
  - What happens on error (error message shown)

SPECIAL BEHAVIOURS:
  - List any conditional fields
    (e.g. doubleSideAddon only shows for keychains)
  - List any dynamic fields
    (e.g. variant rows can be added/removed)
  - List any file uploads in this form

---

Document ALL forms:
11.1  ProductForm
11.2  CouponForm
11.3  PincodeForm
11.4  DispatchForm
11.5  PartnerSaleForm
11.6  SettingsForm
11.7  AdminLoginForm

────────────────────────────────────────────────
SECTION 12: DASHBOARD — DEEP SPECIFICATION
────────────────────────────────────────────────

12.1 Stat Cards (all 4)
     For each card:
     - Label text
     - Data source (exact API field)
     - Format (currency/number/percentage)
     - Secondary info (change vs last month)
     - Color/icon

12.2 Revenue Chart
     - Chart type: Bar chart (Recharts)
     - X axis: Last 7 days (Mon–Sun)
     - Y axis: Revenue in ₹
     - Data source: GET /api/admin/dashboard
     - Hover tooltip format
     - Exact Recharts component code

12.3 Orders Chart
     - Chart type: Bar chart (Recharts)
     - X axis: Last 7 days
     - Y axis: Order count
     - Data source: GET /api/admin/dashboard
     - Exact Recharts component code

12.4 Recent Orders Table
     - Columns: Order ID, Customer, Items, Amount, Status, Date, Action
     - Rows: Last 5 orders
     - Status badge colours (match admin.html)
     - Action: "Dispatch" button (opens DispatchModal)
     - Clicking order ID → /orders/:id

12.5 Low Stock Alert Table
     - Columns: Product, Variant, Stock, Status, Action
     - "Update Stock" button → opens StockUpdateModal
     - Only shows products where any variant stock < 10

────────────────────────────────────────────────
SECTION 13: ORDERS MANAGEMENT — DEEP SPECIFICATION
────────────────────────────────────────────────

13.1 Orders List Page
     - Filter chips: All / Placed / Confirmed / Dispatched / Delivered
     - Search: by order ID or customer name/email
     - Table columns (all derived from Order model in codebase)
     - Pagination: 20 orders per page
     - Sort: newest first by default

13.2 Order Status Flow
     - Placed → Confirmed: admin clicks Confirm button
     - Confirmed → Dispatched: admin clicks Dispatch 
       (opens DispatchModal — enters courier + tracking)
     - Dispatched → Delivered: admin clicks Mark Delivered
     - Each transition calls which exact API endpoint
     - Each transition triggers which email

13.3 Dispatch Modal — Complete Spec
     - Fields: Courier Name (text), Tracking Number (text)
     - Validation: both fields required
     - On submit: PUT /api/orders/:id/dispatch
     - On success: order status updates, email sent, modal closes
     - Shows order summary inside modal

13.4 Order Detail Page (/orders/:id)
     - All order data shown (derived from Order model)
     - Full pricing breakdown (subtotal, shipping, GST, total)
     - Customer design image shown (if uploaded)
     - Address shown
     - Payment details (Razorpay ID, status)
     - Status timeline
     - Invoice download button
     - Action buttons based on current status

────────────────────────────────────────────────
SECTION 14: PRODUCTS MANAGEMENT — DEEP SPECIFICATION
────────────────────────────────────────────────

14.1 Products List
     - Search by name
     - Filter by category, status (active/inactive)
     - Stock bar indicator per product
     - Edit and Delete actions
     - "Add Product" button → /products/new

14.2 Add/Edit Product Form — Every Field
     Derive EVERY field from the Product model 
     found in src/models/Product.model.js
     Document type, validation, and UI component for each.

14.3 Color Variant Builder
     - Add multiple colour variants dynamically
     - Each variant: colour name, hex code, stock per size
     - Size options: S, M, L, XL, XXL
     - Remove variant button
     - Colour picker or hex input

14.4 Image Upload
     - Upload to Cloudinary via POST /api/upload/product
     - Multiple images allowed
     - Preview thumbnails
     - Drag and drop support
     - Remove individual images

14.5 Pre-made Design Upload
     - Upload to Cloudinary via POST /api/upload/premade
     - These are shown to customers on product page
     - Multiple designs allowed
     - Preview grid

14.6 Category-Specific Fields
     - Document which fields show/hide based on category
     - Keychains: show doubleSideAddon field
     - Apparel: show size chart fields
     - Mugs: hide size fields

────────────────────────────────────────────────
SECTION 15: STOCK MANAGEMENT — DEEP SPECIFICATION
────────────────────────────────────────────────

15.1 Stock Table
     - One row per product-colour-size combination
     - Inline editable stock number inputs
     - Highlight cells where stock < 10 in red
     - Highlight cells where stock = 0 in dark red
     - "Save" button per row (calls PUT /api/products/:id/stock)
     - Filter: All / Low Stock / Out of Stock / In Stock

15.2 Bulk Save
     - "Save All Changes" button
     - Calls PUT /api/products/stock/bulk
     - Shows count of items updated

15.3 Auto Out-of-Stock Logic
     - Explain how backend handles stock = 0
     - What the admin sees when a variant hits 0
     - How to re-enable an out-of-stock variant

────────────────────────────────────────────────
SECTION 16: GST & PAYMENTS — DEEP SPECIFICATION
────────────────────────────────────────────────

16.1 Payments Table
     - All columns derived from Payment model
     - Show CGST, SGST, IGST separately per order
     - Razorpay payment ID per row
     - Filter by date range

16.2 Revenue Stats
     - Total revenue
     - Razorpay fees (2%)
     - GST collected (CGST + SGST + IGST totals)
     - Net revenue after fees and GST

16.3 GST Export
     - "Export GST Report" button
     - Date range picker (month + year)
     - Calls GET /api/admin/gst-report?month=X&year=Y
     - Downloads Excel file via exceljs
     - Format of the Excel file columns

────────────────────────────────────────────────
SECTION 17: PARTNERSHIP TRACKER — DEEP SPECIFICATION
────────────────────────────────────────────────

17.1 Summary Cards
     - Total partner sales tracked (all time)
     - Total 5% commission earned (all time)
     - Pending commission (not yet paid)

17.2 Log Sale Form
     - Fields: Company Name, Sale Amount, Sale Date, Notes
     - Commission auto-calculated: saleAmount × 0.05
     - Shown live as user types sale amount
     - On submit: POST /api/partners

17.3 Commission Table
     - Columns: Date, Company, Sale Amount, 5% Commission, Status, Actions
     - "Mark Paid" button → PUT /api/partners/:id/paid
     - "Delete" button → DELETE /api/partners/:id
     - Status badge: Pending (orange) / Paid (green)

17.4 Monthly Summary
     - Filter by month + year
     - Shows totals for selected month
     - Calls GET /api/partners/summary?month=X&year=Y

────────────────────────────────────────────────
SECTION 18: SETTINGS PAGE — DEEP SPECIFICATION
────────────────────────────────────────────────

18.1 Business Settings
     - Derive from Settings model in codebase
     - Free shipping threshold (₹)
     - GST rate (currently 12%)
     - Seller state (currently Karnataka)
     - Company GSTIN (for invoices)
     - Company name and address (for invoices)

18.2 Notification Settings
     - Low stock alert threshold (currently 10)
     - Email notifications on/off
     - WhatsApp notifications on/off

18.3 Payment Settings
     - Razorpay live/test mode toggle
     - Webhook URL display (read-only)
     - Connection test button

────────────────────────────────────────────────
SECTION 19: DESIGN SYSTEM
────────────────────────────────────────────────

19.1 Colors (derive EXACTLY from admin.html CSS variables)
     List every --variable: #hex value

19.2 Typography (derive from admin.html)
     - Font families
     - Font sizes used
     - Font weights used

19.3 Component Styles
     - Table row hover state
     - Status badge variants (all colours)
     - Button variants (primary, outline, danger, success)
     - Card style
     - Modal style
     - Form input style
     - Sidebar active state style
     
     For each: write the exact CSS or Tailwind classes

19.4 Dark Theme Implementation
     - How dark theme is applied globally
     - CSS variables for dark mode
     - Background colours for each element type

19.5 Breakpoints
     - Admin panel is primarily desktop
     - Document tablet behaviour (sidebar collapses)
     - Document mobile behaviour (if supported)

────────────────────────────────────────────────
SECTION 20: COMPLETE BUILD INSTRUCTIONS
────────────────────────────────────────────────

20.1 Project Setup Commands
     - Exact commands from zero to running dev server

20.2 Environment Variables
     - Every .env variable needed
     - Where to find the value for each
     - Which are different from the customer app

20.3 Build Order
     List the EXACT order to build every file:
     Step 1:  Set up Vite project
     Step 2:  Install packages (list exact npm command)
     Step 3:  Create folder structure
     Step 4:  Create constants and config files
     Step 5:  Create Axios instance (api/axios.js)
     Step 6:  Create Zustand stores
     Step 7:  Create layout components (Sidebar, Topbar)
     Step 8:  Create AdminProtectedRoute
     Step 9:  Set up App.jsx with all routes
     Step 10: Build Dashboard page first
     Step 11: Build Orders pages
     Step 12: Build Products pages
     Step 13: Build remaining pages
     Step 14: Build all reusable components
     Step 15: Connect all API calls
     Step 16: Add real-time polling
     Step 17: Test all flows
     Step 18: Deploy to Vercel

20.4 Deployment
     - Vercel deployment steps
     - Environment variables to set in Vercel
     - Custom domain setup (admin.duodesigns.in)
     - CORS update needed on backend

20.5 Backend Changes Required
     List every change needed in the existing backend
     to support the admin panel:
     - New endpoints to add (if any)
     - Existing endpoints to modify (if any)
     - CORS whitelist update
     - Any new middleware needed

────────────────────────────────────────────────
SECTION 21: TESTING CHECKLIST
────────────────────────────────────────────────

21.1 Manual Test Cases
     For EVERY admin feature, write test cases:
     
     Format:
     TEST ID:   ADMIN-001
     FEATURE:   Admin Login
     STEPS:     1. Go to admin.duodesigns.in
                2. Enter admin email
                3. Receive OTP
                4. Enter OTP
                5. Click Verify
     EXPECTED:  Redirected to dashboard
     TEST DATA: admin@duodesigns.in

     Cover:
     □ Login flow (success + wrong OTP + expired OTP)
     □ Dashboard stats load correctly
     □ View orders list + filter by status
     □ Dispatch an order (enter courier + tracking)
     □ Add new product with variants
     □ Upload product images
     □ Update stock
     □ Create coupon
     □ Add pincode
     □ Log partner sale
     □ Export GST report
     □ Update settings
     □ Logout

21.2 API Test Cases
     For every admin endpoint, document:
     - Happy path test
     - Auth failure test (no token)
     - Role failure test (customer token)
     - Validation failure test

────────────────────────────────────────────────
SECTION 22: KNOWN DEPENDENCIES & WARNINGS
────────────────────────────────────────────────

22.1 Backend Dependencies
     List everything the admin panel needs 
     from the backend to be working first:
     - Which endpoints must exist
     - Which models must be seeded with data

22.2 Third-Party Dependencies
     List every external service the admin needs:
     - Razorpay (for payment data)
     - Cloudinary (for image uploads)
     - Gmail SMTP (for email triggers)

22.3 Common Pitfalls
     Document known issues to watch out for:
     - CORS headers must include admin domain
     - File upload size limits
     - Razorpay webhook must be configured
     - JWT secret must match between apps

═══════════════════════════════════════════════
FORMATTING RULES FOR THE MARKDOWN FILE
═══════════════════════════════════════════════

1. Every section must have a clear H1 or H2 heading
2. Every subsection must have a H3 heading
3. All API endpoints in code blocks with method label
4. All code examples in fenced code blocks with language
5. All field lists in markdown tables
6. All step-by-step instructions in numbered lists
7. All checklists use - [ ] markdown checkboxes
8. Use ⚠️ for warnings
9. Use 💡 for tips
10. Use ✅ for completed items
11. Every section must have a TL;DR summary 
    at the top (max 2 sentences)
12. Cross-reference other sections with links

═══════════════════════════════════════════════
OUTPUT
═══════════════════════════════════════════════

Output location: /docs/admin-panel-requirements.md

This must be ONE single file.
It must be complete enough that a developer 
who has never seen this codebase before can 
read it and build the entire admin panel 
without asking a single question.

Minimum length: 1500 lines of markdown.
No placeholders. No "add more here" comments.
Every section must be fully filled in based 
on the actual codebase you scanned.
```

---

## What This Prompt Does

```
STEP 1 — Scans your entire codebase
         (reads every model, route, controller,
          component, store, and the admin.html)

STEP 2 — Generates ONE complete markdown file
         with 22 sections covering everything
         from tech stack to test cases

OUTPUT — /docs/admin-panel-requirements.md
         Ready for any developer to build from
```

---

## After Running This Prompt

You will have a single `admin-panel-requirements.md` file that contains:

```
✅ Every page fully specced
✅ Every component documented
✅ Every API call listed
✅ Every form field + validation
✅ Complete folder structure
✅ Build order step by step
✅ Test cases for everything
✅ Design system extracted from admin.html
✅ Auth flow documented
✅ Deployment instructions
```

Then paste THAT file into a new conversation and say **"Build the admin panel from this requirements document"** — and it will build it perfectly. 🚀
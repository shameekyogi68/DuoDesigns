Paste this prompt into Cursor with your entire codebase open:

---

```
You are a senior full-stack React developer.

The Duo Designs customer web app is already built.
Now build the complete Admin Panel from scratch.

Before writing any code, scan the entire existing codebase:
- Read every file in the customer app src/
- Read every file in backend src/
- Read admin.html (the existing admin design)
- Read /docs/admin-panel-requirements.md

Build everything exactly as specified in that requirements
document. Do not skip anything. Do not simplify anything.

═══════════════════════════════════════════════
PROJECT SETUP
═══════════════════════════════════════════════

Create a new folder: duo-designs-admin/

Run these exact commands:
npm create vite@latest duo-designs-admin -- --template react
cd duo-designs-admin
npm install react-router-dom axios @tanstack/react-query
npm install zustand react-hook-form @hookform/resolvers zod
npm install recharts react-hot-toast react-helmet-async
npm install lucide-react date-fns
npm install -D tailwindcss postcss autoprefixer
npm install -D vitest @testing-library/react @testing-library/jest-dom
npx tailwindcss init -p

═══════════════════════════════════════════════
DESIGN RULES — READ ADMIN.HTML FIRST
═══════════════════════════════════════════════

Extract EVERY CSS variable from admin.html and use
them exactly. Do not invent new colors or styles.

The admin panel must look IDENTICAL to admin.html.
Same colors. Same fonts. Same layout. Same sidebar.
Convert the HTML design into React components 1:1.

Key design rules from admin.html:
- Dark theme throughout
- Sidebar fixed on left
- Topbar fixed on top
- Content area scrolls
- Sharp edges (no border-radius except badges)
- Accent color for active states and CTAs

═══════════════════════════════════════════════
COMPLETE FOLDER STRUCTURE TO CREATE
═══════════════════════════════════════════════

duo-designs-admin/
├── src/
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Orders.jsx
│   │   ├── OrderDetail.jsx
│   │   ├── Products.jsx
│   │   ├── AddProduct.jsx
│   │   ├── EditProduct.jsx
│   │   ├── Stock.jsx
│   │   ├── Customers.jsx
│   │   ├── CustomerDetail.jsx
│   │   ├── Coupons.jsx
│   │   ├── Shipping.jsx
│   │   ├── Payments.jsx
│   │   ├── Partners.jsx
│   │   ├── Settings.jsx
│   │   └── NotFound.jsx
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Topbar.jsx
│   │   │   ├── AdminLayout.jsx
│   │   │   └── PageHeader.jsx
│   │   │
│   │   ├── auth/
│   │   │   └── AdminProtectedRoute.jsx
│   │   │
│   │   ├── charts/
│   │   │   ├── RevenueChart.jsx
│   │   │   ├── OrdersChart.jsx
│   │   │   ├── CategoryPieChart.jsx
│   │   │   └── StockStatusChart.jsx
│   │   │
│   │   ├── tables/
│   │   │   ├── OrdersTable.jsx
│   │   │   ├── ProductsTable.jsx
│   │   │   ├── CustomersTable.jsx
│   │   │   ├── PaymentsTable.jsx
│   │   │   ├── PartnersTable.jsx
│   │   │   ├── PincodesTable.jsx
│   │   │   └── CouponsTable.jsx
│   │   │
│   │   ├── forms/
│   │   │   ├── ProductForm.jsx
│   │   │   ├── CouponForm.jsx
│   │   │   ├── PincodeForm.jsx
│   │   │   ├── DispatchForm.jsx
│   │   │   ├── PartnerSaleForm.jsx
│   │   │   └── SettingsForm.jsx
│   │   │
│   │   ├── modals/
│   │   │   ├── DispatchModal.jsx
│   │   │   ├── ConfirmDeleteModal.jsx
│   │   │   ├── OrderDetailModal.jsx
│   │   │   ├── CustomerDetailModal.jsx
│   │   │   └── StockUpdateModal.jsx
│   │   │
│   │   └── ui/
│   │       ├── StatCard.jsx
│   │       ├── StatusBadge.jsx
│   │       ├── ActionButton.jsx
│   │       ├── SearchBar.jsx
│   │       ├── FilterChips.jsx
│   │       ├── DataTable.jsx
│   │       ├── ImageUploader.jsx
│   │       ├── ColorVariantBuilder.jsx
│   │       ├── StockInput.jsx
│   │       ├── Toast.jsx
│   │       ├── PageLoader.jsx
│   │       ├── EmptyState.jsx
│   │       └── ErrorBoundary.jsx
│   │
│   ├── store/
│   │   ├── adminAuthStore.js
│   │   ├── adminUIStore.js
│   │   ├── adminOrdersStore.js
│   │   └── adminProductsStore.js
│   │
│   ├── api/
│   │   ├── axios.js
│   │   ├── auth.api.js
│   │   ├── dashboard.api.js
│   │   ├── orders.api.js
│   │   ├── products.api.js
│   │   ├── customers.api.js
│   │   ├── coupons.api.js
│   │   ├── shipping.api.js
│   │   ├── payments.api.js
│   │   ├── partners.api.js
│   │   ├── upload.api.js
│   │   └── settings.api.js
│   │
│   ├── hooks/
│   │   ├── useAdminAuth.js
│   │   ├── useOrders.js
│   │   ├── useProducts.js
│   │   ├── useCustomers.js
│   │   ├── useDashboard.js
│   │   ├── useNewOrderPolling.js
│   │   ├── useLowStockAlerts.js
│   │   └── useDocumentTitle.js
│   │
│   ├── utils/
│   │   ├── formatters.js
│   │   ├── gst.js
│   │   └── validators.js
│   │
│   ├── constants/
│   │   ├── routes.js
│   │   └── app.js
│   │
│   ├── styles/
│   │   ├── globals.css
│   │   └── variables.css
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .env.example
├── .gitignore
├── jsconfig.json
├── vite.config.js
└── package.json

═══════════════════════════════════════════════
BUILD ORDER — FOLLOW EXACTLY
═══════════════════════════════════════════════

Build in this exact order. Complete each step
fully before moving to the next.

────────────────────────────────────────────────
STEP 1 — CONFIG FILES
────────────────────────────────────────────────

1a. vite.config.js
    - Path alias: @ → src/
    - Server port: 5174 (different from customer app)

1b. jsconfig.json
    - Path aliases matching vite config

1c. tailwind.config.js
    - Content paths
    - Extend theme with admin color variables

1d. .env.example
    VITE_API_URL=https://api.duodesigns.in/api
    VITE_APP_NAME=Duo Designs Admin

1e. .gitignore
    Standard React + Vite gitignore

────────────────────────────────────────────────
STEP 2 — STYLES
────────────────────────────────────────────────

2a. src/styles/variables.css
    Extract EVERY CSS variable from admin.html.
    Copy them exactly.

2b. src/styles/globals.css
    - Import variables.css
    - Base reset
    - Body background and font
    - Scrollbar styles (dark theme)
    - Table base styles
    - Form input base styles

────────────────────────────────────────────────
STEP 3 — CONSTANTS
────────────────────────────────────────────────

3a. src/constants/routes.js
    Export every admin route as a constant:
    export const ROUTES = {
      LOGIN: '/login',
      DASHBOARD: '/',
      ORDERS: '/orders',
      ORDER_DETAIL: '/orders/:id',
      PRODUCTS: '/products',
      ADD_PRODUCT: '/products/new',
      EDIT_PRODUCT: '/products/:id/edit',
      STOCK: '/stock',
      CUSTOMERS: '/customers',
      CUSTOMER_DETAIL: '/customers/:id',
      COUPONS: '/coupons',
      SHIPPING: '/shipping',
      PAYMENTS: '/payments',
      PARTNERS: '/partners',
      SETTINGS: '/settings',
    }

3b. src/constants/app.js
    Export all app constants:
    - APP_NAME
    - API_URL
    - LOW_STOCK_THRESHOLD (10)
    - ORDERS_PER_PAGE (20)
    - POLL_INTERVAL_NEW_ORDERS (30000)
    - POLL_INTERVAL_DASHBOARD (60000)
    - ORDER_STATUSES array
    - PRODUCT_CATEGORIES array
    - GST_RATE
    - COMMISSION_RATE (0.05)
    - SELLER_STATE

────────────────────────────────────────────────
STEP 4 — UTILITIES
────────────────────────────────────────────────

4a. src/utils/formatters.js
    Export these functions:
    - formatCurrency(amount) → "₹1,299"
    - formatDate(date) → "12 Jun 2025"
    - formatDateTime(date) → "12 Jun 2025, 3:45 PM"
    - formatOrderId(id) → "DD-2025-0049"
    - formatPhone(phone) → "+91 98765 43210"
    - truncateText(text, length) → "Hello wor..."
    - getInitials(name) → "AK"
    - formatFileSize(bytes) → "2.4 MB"

4b. src/utils/gst.js
    Copy exact GST logic from customer app:
    - calculateGST(subtotal, shipping, discount, state)
    - getGSTType(customerState)
    - formatGSTBreakdown(gstData)

4c. src/utils/validators.js
    - isValidGSTIN(gstin)
    - isValidPincode(pincode)
    - isValidPhone(phone)
    - isValidEmail(email)
    - isValidOrderId(orderId)

────────────────────────────────────────────────
STEP 5 — API LAYER
────────────────────────────────────────────────

5a. src/api/axios.js
    Create Axios instance with:
    - baseURL from VITE_API_URL env var
    - Request interceptor:
      → Auto-attach Bearer token from adminAuthStore
    - Response interceptor:
      → On 401: attempt token refresh
      → If refresh fails: logout + redirect to /login
      → On other errors: pass through

5b. src/api/auth.api.js
    export const authApi = {
      sendOTP: (email) → POST /auth/send-otp
      verifyOTP: (email, otp) → POST /auth/verify-otp
      refreshToken: (token) → POST /auth/refresh-token
      logout: () → POST /auth/logout
      getMe: () → GET /auth/me
    }

5c. src/api/dashboard.api.js
    export const dashboardApi = {
      getStats: () → GET /admin/dashboard
    }

5d. src/api/orders.api.js
    export const ordersApi = {
      getAll: (params) → GET /orders?status=&page=&search=
      getById: (id) → GET /orders/:id
      confirm: (id) → PUT /orders/:id/confirm
      dispatch: (id, data) → PUT /orders/:id/dispatch
      deliver: (id) → PUT /orders/:id/deliver
      getInvoice: (id) → GET /orders/:id/invoice
    }

5e. src/api/products.api.js
    export const productsApi = {
      getAll: (params) → GET /products
      getById: (id) → GET /products/:id
      create: (data) → POST /products
      update: (id, data) → PUT /products/:id
      delete: (id) → DELETE /products/:id
      updateStock: (id, data) → PUT /products/:id/stock
      bulkUpdateStock: (data) → PUT /products/stock/bulk
      getLowStock: () → GET /products/low-stock
    }

5f. src/api/customers.api.js
    export const customersApi = {
      getAll: (params) → GET /customers
      getById: (id) → GET /customers/:id
      getOrders: (id) → GET /customers/:id/orders
    }

5g. src/api/coupons.api.js
    export const couponsApi = {
      getAll: () → GET /coupons
      create: (data) → POST /coupons
      delete: (id) → DELETE /coupons/:id
    }

5h. src/api/shipping.api.js
    export const shippingApi = {
      getAll: () → GET /shipping
      create: (data) → POST /shipping
      update: (id, data) → PUT /shipping/:id
      delete: (id) → DELETE /shipping/:id
      bulkImport: (file) → POST /shipping/bulk-import
    }

5i. src/api/payments.api.js
    export const paymentsApi = {
      getAll: (params) → GET /payments
      getGSTReport: (month, year) → GET /admin/gst-report
    }

5j. src/api/partners.api.js
    export const partnersApi = {
      getAll: () → GET /partners
      create: (data) → POST /partners
      markPaid: (id) → PUT /partners/:id/paid
      delete: (id) → DELETE /partners/:id
      getSummary: (month, year) → GET /partners/summary
    }

5k. src/api/upload.api.js
    export const uploadApi = {
      uploadProductImage: (file) → POST /upload/product
      uploadPremadeDesign: (file) → POST /upload/premade
    }

5l. src/api/settings.api.js
    export const settingsApi = {
      get: () → GET /settings
      update: (data) → PUT /settings
    }

────────────────────────────────────────────────
STEP 6 — ZUSTAND STORES
────────────────────────────────────────────────

6a. src/store/adminAuthStore.js
    State:
    - admin: null | { id, name, email, role }
    - token: null | string (access token)
    - refreshToken: null | string
    - isLoggedIn: boolean
    - isLoading: boolean
    - error: null | string

    Actions:
    - sendOTP(email) → calls authApi.sendOTP
    - verifyOTP(email, otp) → calls authApi.verifyOTP
      → on success: sets admin, token, refreshToken
      → persists token to localStorage
    - logout() → calls authApi.logout
      → clears all state and localStorage
    - refreshAccessToken() → calls authApi.refreshToken
    - initializeAuth() → reads token from localStorage
      → calls authApi.getMe to validate
      → called in main.jsx on app start

6b. src/store/adminUIStore.js
    State:
    - sidebarOpen: boolean (default true)
    - activePage: string
    - toasts: []
    - notifications: []
    - unreadOrderCount: 0

    Actions:
    - toggleSidebar()
    - setActivePage(page)
    - addToast(toast)
    - removeToast(id)
    - addNotification(notification)
    - markNotificationsRead()
    - setUnreadOrderCount(count)

6c. src/store/adminOrdersStore.js
    State:
    - filters: { status: 'all', search: '', page: 1 }
    - selectedOrderId: null

    Actions:
    - setFilter(key, value)
    - resetFilters()
    - setSelectedOrder(id)

6d. src/store/adminProductsStore.js
    State:
    - filters: { category: 'all', status: 'all', search: '' }
    - editingProduct: null

    Actions:
    - setFilter(key, value)
    - resetFilters()
    - setEditingProduct(product)

────────────────────────────────────────────────
STEP 7 — CUSTOM HOOKS
────────────────────────────────────────────────

7a. src/hooks/useAdminAuth.js
    - Returns { admin, isLoggedIn, isLoading }
    - Returns { sendOTP, verifyOTP, logout }
    - Calls initializeAuth on mount

7b. src/hooks/useDashboard.js
    - Uses React Query to fetch dashboard stats
    - Query key: ['admin', 'dashboard']
    - Refetch interval: 60 seconds
    - Returns { stats, isLoading, error }

7c. src/hooks/useOrders.js
    - Uses React Query with filters from adminOrdersStore
    - Query key: ['admin', 'orders', filters]
    - Returns { orders, total, isLoading, error }
    - Returns { confirmOrder, dispatchOrder, deliverOrder }

7d. src/hooks/useProducts.js
    - Uses React Query with filters from adminProductsStore
    - Returns { products, isLoading, error }
    - Returns { createProduct, updateProduct, deleteProduct }
    - Returns { updateStock, bulkUpdateStock }

7e. src/hooks/useCustomers.js
    - Returns { customers, isLoading, error }

7f. src/hooks/useNewOrderPolling.js
    - Polls GET /orders?status=Placed every 30 seconds
    - Compares count with previous count
    - If new orders found:
      → Plays notification sound
      → Updates unreadOrderCount in adminUIStore
      → Shows toast notification

7g. src/hooks/useLowStockAlerts.js
    - Fetches GET /products/low-stock on mount
    - Returns { lowStockItems, count }

7h. src/hooks/useDocumentTitle.js
    - Sets browser tab title
    - Format: "Orders | Duo Designs Admin"

────────────────────────────────────────────────
STEP 8 — LAYOUT COMPONENTS
────────────────────────────────────────────────

8a. src/components/layout/Sidebar.jsx
    Build to exactly match admin.html sidebar.
    Navigation items in exact order from admin.html:
    - Dashboard (icon + label)
    - Orders (icon + label + unread badge)
    - Products (icon + label)
    - Stock (icon + label)
    - Customers (icon + label)
    - Coupons (icon + label)
    - Shipping (icon + label)
    - Payments (icon + label)
    - Partners (icon + label)
    - Settings (icon + label)
    
    Behaviors:
    - Active item highlighted (use React Router NavLink)
    - Collapse to icon-only on toggle
    - Logo at top
    - Logout button at bottom

8b. src/components/layout/Topbar.jsx
    Build to exactly match admin.html topbar.
    Contains:
    - Sidebar toggle button (hamburger)
    - Page title (from current route)
    - Search bar (global search)
    - Notification bell (with unread count badge)
    - Admin avatar + name dropdown
      → Profile option
      → Logout option

8c. src/components/layout/AdminLayout.jsx
    Wrapper component for all authenticated pages:
    - Renders Sidebar + Topbar + children
    - Handles sidebar open/close state
    - Starts useNewOrderPolling
    - Starts useLowStockAlerts

8d. src/components/layout/PageHeader.jsx
    Props: title, subtitle, actions (buttons)
    Renders the top of each page content area.

────────────────────────────────────────────────
STEP 9 — AUTHENTICATION
────────────────────────────────────────────────

9a. src/components/auth/AdminProtectedRoute.jsx
    - Reads isLoggedIn from adminAuthStore
    - If not logged in → redirect to /login
    - If logged in → render children
    - Shows PageLoader while initializeAuth runs

9b. src/pages/Login.jsx
    Build to match admin.html login section.
    Two-step form:
    
    Step 1 — Email Input:
    - Email input field
    - "Send OTP" button
    - Calls authApi.sendOTP(email)
    - On success → show Step 2
    
    Step 2 — OTP Input:
    - 6-box OTP input (same as customer app)
    - 10-minute countdown timer
    - "Verify" button
    - "Resend OTP" button (after timer expires)
    - Calls authApi.verifyOTP(email, otp)
    - On success → redirect to /dashboard
    
    Error handling:
    - Wrong OTP → show error message
    - Expired OTP → show "OTP expired, resend"
    - Max attempts → show "Too many attempts"

────────────────────────────────────────────────
STEP 10 — UI PRIMITIVES
────────────────────────────────────────────────

10a. StatCard.jsx
     Props: label, value, change, changeType, icon, color
     Displays: large value, label, % change vs last period
     Matches admin.html stat cards exactly.

10b. StatusBadge.jsx
     Props: status
     Returns colored badge for:
     - Order statuses: Placed/Confirmed/Dispatched/Delivered
     - Payment statuses: Pending/Paid/Failed
     - Stock statuses: In Stock/Low Stock/Out of Stock
     - Coupon statuses: Active/Expired
     Colors must exactly match admin.html.

10c. ActionButton.jsx
     Props: variant, size, onClick, disabled, loading, icon
     Variants: primary, outline, danger, success, ghost
     Shows spinner when loading=true

10d. SearchBar.jsx
     Props: value, onChange, placeholder
     Debounced input (300ms)
     Clear button when value is not empty

10e. FilterChips.jsx
     Props: options, selected, onChange
     Renders horizontal row of clickable chips
     Active chip highlighted with accent color

10f. DataTable.jsx
     Base table component used by all table components
     Props: columns, data, isLoading, emptyMessage
     Features:
     - Shows skeleton rows while loading
     - Shows EmptyState when no data
     - Hover row highlight

10g. ImageUploader.jsx
     Props: value, onChange, multiple, accept
     Features:
     - Drag and drop zone
     - File picker button
     - Preview thumbnails
     - Remove button per image
     - Upload progress indicator
     - Calls uploadApi.uploadProductImage
     - Max file size validation (10MB)
     - Format validation (JPG, PNG only)

10h. ColorVariantBuilder.jsx
     For product form — manages color variants dynamically
     Each variant has:
     - Color name input
     - Hex color picker
     - Stock inputs for S, M, L, XL, XXL
     - Remove variant button
     "Add Color Variant" button adds new row

10i. StockInput.jsx
     Numeric input with +/- buttons
     Min value: 0
     Highlights red when value < 10

10j. EmptyState.jsx
     Props: icon, title, message, action
     Shown when table has no data

10k. PageLoader.jsx
     Full page centered spinner
     Shown while auth initializes

10l. ErrorBoundary.jsx
     Catches React errors gracefully
     Shows error message with retry button

────────────────────────────────────────────────
STEP 11 — APP.JSX + ROUTING
────────────────────────────────────────────────

Build complete App.jsx with all routes:

<QueryClientProvider>
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<AdminProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<OrderDetail />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/new" element={<AddProduct />} />
          <Route path="/products/:id/edit" element={<EditProduct />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/:id" element={<CustomerDetail />} />
          <Route path="/coupons" element={<Coupons />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
</QueryClientProvider>

────────────────────────────────────────────────
STEP 12 — DASHBOARD PAGE
────────────────────────────────────────────────

File: src/pages/Dashboard.jsx

Build to exactly match admin.html dashboard section.

STAT CARDS ROW (4 cards):
- Total Revenue (₹) — from stats.totalRevenue
- Total Orders — from stats.totalOrders
- Total Customers — from stats.totalCustomers
- Pending Orders — from stats.pendingOrders
Each card shows value + change vs last month

CHARTS ROW:
- RevenueChart (left, 60% width) — last 7 days revenue
- OrdersChart (right, 40% width) — last 7 days orders

BOTTOM ROW:
- Recent Orders table (left, 60% width)
  → Last 5 orders
  → Columns: Order ID, Customer, Amount, Status, Action
  → "Dispatch" button opens DispatchModal
- Low Stock Alert table (right, 40% width)
  → Products where stock < 10
  → "Update Stock" button opens StockUpdateModal

DATA FETCHING:
- useDashboard() hook for all stats and chart data
- Shows skeleton while loading
- Auto-refreshes every 60 seconds

────────────────────────────────────────────────
STEP 13 — ORDERS PAGES
────────────────────────────────────────────────

13a. src/pages/Orders.jsx
     Build to exactly match admin.html orders section.

     TOP BAR:
     - SearchBar (search by order ID or customer name)
     - FilterChips: All / Placed / Confirmed / 
                    Dispatched / Delivered
     - Total order count

     TABLE (OrdersTable component):
     Columns (derive from Order model):
     - Order ID (link to /orders/:id)
     - Customer Name + Email
     - Products (item count)
     - Total Amount (formatted ₹)
     - Payment Status badge
     - Order Status badge
     - Date (formatted)
     - Actions:
       → "Confirm" button (if status = Placed)
       → "Dispatch" button (if status = Confirmed)
         opens DispatchModal
       → "Deliver" button (if status = Dispatched)
       → "View" button (always — links to OrderDetail)

     PAGINATION:
     - 20 orders per page
     - Previous / Next buttons
     - Page X of Y indicator

     REAL-TIME:
     - Refetch every 30 seconds
     - Toast notification on new order

13b. src/pages/OrderDetail.jsx
     Build to exactly match admin.html order detail view.
     
     Sections:
     - Order header (ID, date, status timeline)
     - Customer info (name, email, phone, address)
     - Products ordered (with design image if uploaded)
     - Pricing breakdown:
       → Subtotal
       → Shipping
       → Discount (if coupon applied)
       → CGST + SGST (or IGST)
       → Total
     - Payment details (Razorpay ID, method, status)
     - Dispatch details (courier, tracking, if dispatched)
     
     ACTION BUTTONS (based on current status):
     - Placed → "Confirm Order" button
     - Confirmed → "Dispatch Order" button (DispatchModal)
     - Dispatched → "Mark as Delivered" button
     
     BOTTOM ACTIONS:
     - "Download Invoice" button (calls getInvoice API)
     - "Back to Orders" link

────────────────────────────────────────────────
STEP 14 — PRODUCTS PAGES
────────────────────────────────────────────────

14a. src/pages/Products.jsx
     TOP BAR:
     - SearchBar
     - FilterChips: All / Active / Inactive + by category
     - "Add Product" button → /products/new

     TABLE (ProductsTable):
     Columns:
     - Product image (thumbnail)
     - Name + Category
     - Base Price
     - Variants count
     - Total Stock (sum of all variants)
     - Stock bar (visual indicator)
     - Status (Active/Inactive badge)
     - Actions: Edit / Delete

14b. src/pages/AddProduct.jsx
     Full-page form using ProductForm component.
     On success → redirect to /products with toast.

14c. src/pages/EditProduct.jsx
     Fetches product by ID from URL param.
     Pre-fills ProductForm with existing data.
     On success → redirect to /products/:id with toast.

14d. src/components/forms/ProductForm.jsx
     THE MOST COMPLEX FORM — build completely.

     FIELDS (derive all from Product model):
     Basic Info:
     - name (text, required, min 3)
     - category (select: T-Shirt Regular / T-Shirt 
                 Oversized / Trackpants / Mug / Keychain)
     - description (textarea, required)
     - basePrice (number, required, min 1)
     - mrpPrice (number, optional — shown crossed out)
     - isActive (toggle, default true)

     Category-Specific Fields:
     - Show fabric, gsm, fit fields for apparel only
     - Show capacity field for mugs only
     - Show dimensions field for keychains only
     - Show doubleSideAddon field for keychains only
       (number input, default 80)

     Size & Price Addons (apparel only):
     - xlAddon (number, default 50)
     - xxlAddon (number, default 50)
     - Show size chart upload for apparel

     Color Variants (ColorVariantBuilder):
     - At least 1 variant required
     - Each: colorName, hexCode, stock per size

     Images (ImageUploader):
     - Upload multiple product images
     - At least 1 required

     Pre-made Designs (DesignUploader):
     - Optional
     - Upload multiple design options for customers

     ZOD SCHEMA:
     Write complete Zod validation schema for all fields.

────────────────────────────────────────────────
STEP 15 — STOCK PAGE
────────────────────────────────────────────────

File: src/pages/Stock.jsx

TOP BAR:
- FilterChips: All / Low Stock / Out of Stock / In Stock
- "Save All Changes" button (bulk save)
- Last updated timestamp

TABLE (one row per product-colour-size):
Columns:
- Product Name
- Category
- Colour
- Size
- Current Stock (StockInput — inline editable)
- Status badge
- Individual "Save" button

BEHAVIOURS:
- Red highlight on rows where stock < 10
- Dark red + "Out of Stock" badge when stock = 0
- Track which rows have been edited (dirty state)
- Individual row save: PUT /api/products/:id/stock
- Bulk save: PUT /api/products/stock/bulk
- Confirmation toast on save

MODALS:
- StockUpdateModal for quick update from Dashboard

────────────────────────────────────────────────
STEP 16 — CUSTOMERS PAGE
────────────────────────────────────────────────

16a. src/pages/Customers.jsx
     TABLE (CustomersTable):
     Columns (derive from User model):
     - Avatar (initials circle)
     - Name + Email
     - Phone
     - Total Orders
     - Total Spent (₹)
     - Join Date
     - Actions: View

16b. src/pages/CustomerDetail.jsx
     Sections:
     - Customer profile (name, email, phone, join date)
     - Saved addresses list
     - Order history table (all orders by this customer)
     - Total spent + order count stats

────────────────────────────────────────────────
STEP 17 — COUPONS PAGE
────────────────────────────────────────────────

File: src/pages/Coupons.jsx

TOP: "Create Coupon" button (opens CouponForm modal)

TABLE (CouponsTable):
Columns (derive from Coupon model):
- Code
- Type (Flat ₹ / Percentage %)
- Value
- Min Order Amount
- Uses (used / max)
- Valid Until
- Status badge (Active / Expired)
- Actions: Delete

COUPON FORM FIELDS:
- code (text, uppercase, required)
- type (select: flat | percentage)
- value (number, required)
  → if flat: max ₹5000
  → if percentage: max 100
- minOrderAmount (number, default 0)
- maxUses (number, optional)
- expiresAt (date picker, required)

────────────────────────────────────────────────
STEP 18 — SHIPPING PAGE
────────────────────────────────────────────────

File: src/pages/Shipping.jsx

TOP BAR:
- "Add Pincode" button (opens PincodeForm)
- "Bulk Import CSV" button (file upload)
- SearchBar (search pincodes)

TABLE (PincodesTable):
Columns (derive from Pincode model):
- Pincode
- City
- State
- Shipping Charge (₹)
- Delivery Days
- Status (Active/Inactive)
- Actions: Edit / Delete

PINCODE FORM FIELDS:
- pincode (6 digits, required)
- city (text, required)
- state (text, required)
- shippingCharge (number, required)
- deliveryDays (number, required)
- isActive (toggle, default true)

BULK IMPORT:
- CSV file upload
- Shows preview of rows to be imported
- Calls POST /api/shipping/bulk-import

────────────────────────────────────────────────
STEP 19 — PAYMENTS PAGE
────────────────────────────────────────────────

File: src/pages/Payments.jsx

TOP STATS ROW (4 cards):
- Total Revenue (all time)
- Razorpay Fees (2% of total)
- GST Collected (total CGST + SGST + IGST)
- Net Revenue (after fees and GST)

DATE FILTER:
- Month picker + Year picker
- "Export GST Report" button
  → Calls GET /api/admin/gst-report?month=X&year=Y
  → Downloads Excel file

TABLE (PaymentsTable):
Columns (derive from Payment model + Order):
- Order ID (link to /orders/:id)
- Customer Name
- Subtotal
- CGST or IGST amount
- SGST amount (blank if interstate)
- Shipping
- Total
- Razorpay ID
- Payment Date
- Status badge

────────────────────────────────────────────────
STEP 20 — PARTNERS PAGE
────────────────────────────────────────────────

File: src/pages/Partners.jsx

TOP STATS ROW (3 cards):
- Total Partner Sales (₹)
- Total Commission Earned (₹) — (total × 5%)
- Pending Commission (₹) — (unpaid × 5%)

SUMMARY FILTER:
- Month + Year selector
- Shows monthly totals below

LOG SALE FORM (PartnerSaleForm — inline at top):
Fields:
- companyName (text, required)
- saleAmount (number, required)
- saleDate (date, required, default today)
- notes (textarea, optional)
- commission: AUTO-CALCULATED DISPLAY
  → Show live: "Commission: ₹{saleAmount × 0.05}"
  → Updates as user types saleAmount

TABLE (PartnersTable):
Columns (derive from Partner model):
- Date
- Company Name
- Sale Amount (₹)
- Commission (₹) — (amount × 0.05)
- Notes
- Status badge (Pending orange / Paid green)
- Actions:
  → "Mark Paid" button (if Pending)
  → "Delete" button

────────────────────────────────────────────────
STEP 21 — SETTINGS PAGE
────────────────────────────────────────────────

File: src/pages/Settings.jsx

SECTIONS:

Business Settings:
- Company Name (text)
- Company GSTIN (text, validated)
- Registered Address (textarea)
- Seller State (text, default Karnataka)
- Support Email (email)
- Support Phone (tel)

Pricing Settings:
- Free Shipping Above (₹, number)
- Default Shipping Charge (₹, number)
- XL Size Addon (₹, number, default 50)
- XXL Size Addon (₹, number, default 50)
- Keychain Double Side Addon (₹, number, default 80)

GST Settings:
- GST Rate Display (read-only, shows current rate)
- Toggle: Use 5% GST for orders below ₹1000 (checkbox)

Notification Settings:
- Low Stock Alert Threshold (number, default 10)
- Email Notifications (toggle)
- WhatsApp Notifications (toggle)
- New Order Sound Alert (toggle)

Payment Settings:
- Razorpay Mode Display (Live/Test — read only)
- Webhook URL (read only, copyable)
- "Test Connection" button → calls Razorpay ping

All settings use SettingsForm with Zod validation.
"Save Settings" button → PUT /api/settings

────────────────────────────────────────────────
STEP 22 — MODALS
────────────────────────────────────────────────

22a. DispatchModal.jsx
     Props: orderId, orderSummary, onClose, onSuccess
     Fields:
     - courierName (text, required)
     - trackingNumber (text, required)
     - trackingUrl (url, optional)
     Submit → PUT /api/orders/:id/dispatch
     On success → toast + close + refetch orders

22b. ConfirmDeleteModal.jsx
     Props: title, message, onConfirm, onClose
     Generic confirmation dialog.
     Used for delete product, delete coupon, 
     delete pincode, delete partner entry.

22c. StockUpdateModal.jsx
     Props: product, onClose, onSuccess
     Quick stock update form
     Shows product name + variant
     Stock number input
     Submit → PUT /api/products/:id/stock

22d. OrderDetailModal.jsx
     Props: orderId, onClose
     Quick peek modal (subset of OrderDetail page)
     Used from Dashboard recent orders table

22e. CustomerDetailModal.jsx
     Props: customerId, onClose
     Quick peek modal
     Shows customer profile + last 3 orders

────────────────────────────────────────────────
STEP 23 — CHARTS
────────────────────────────────────────────────

All charts use Recharts. Match admin.html colors exactly.

23a. RevenueChart.jsx
     Type: BarChart
     Data: last 7 days revenue from dashboard API
     X axis: day labels (Mon, Tue, Wed...)
     Y axis: ₹ amount
     Bar color: accent (#E8FF3B)
     Tooltip: "₹1,299 on Monday"
     Responsive container

23b. OrdersChart.jsx
     Type: BarChart
     Data: last 7 days order count
     Bar color: white/light
     Same structure as RevenueChart

23c. CategoryPieChart.jsx
     Type: PieChart
     Data: orders by product category
     Colors: different for each category
     Legend below chart

23d. StockStatusChart.jsx
     Type: PieChart
     Data: In Stock / Low Stock / Out of Stock counts
     Colors: green / orange / red

────────────────────────────────────────────────
STEP 24 — DEPLOYMENT CONFIG
────────────────────────────────────────────────

24a. vercel.json
     {
       "rewrites": [{ "source": "/(.*)", "destination": "/" }]
     }
     (Required for React Router to work on Vercel)

24b. README.md for admin app
     - Setup instructions
     - Environment variables
     - How to deploy
     - How to add new admin features

═══════════════════════════════════════════════
BACKEND CHANGES REQUIRED
═══════════════════════════════════════════════

After building the frontend, make these changes
to the existing backend:

1. CORS Update (app.js):
   Add admin domain to allowed origins:
   origin: [
     'https://duodesigns.in',
     'https://admin.duodesigns.in',
     'http://localhost:5173',
     'http://localhost:5174'  ← add this
   ]

2. Settings Route (if not already built):
   GET  /api/settings → returns Settings document
   PUT  /api/settings → updates Settings document
   Admin auth required on PUT.

3. Verify all admin-specific endpoints
   have admin.middleware protecting them.

═══════════════════════════════════════════════
CODING STANDARDS — FOLLOW EXACTLY
═══════════════════════════════════════════════

1. Every component has JSDoc comment at top
2. Every prop documented with PropTypes
3. Every API call has try/catch
4. Every form has Zod validation
5. Every async action shows loading state
6. Every error shows user-friendly toast message
7. No hardcoded strings — use constants/app.js
8. No inline styles — use CSS variables + Tailwind
9. All monetary values use formatCurrency()
10. All dates use formatDate()
11. All API files export named functions only
12. All Zustand stores use devtools middleware

═══════════════════════════════════════════════
QUALITY CHECKLIST — VERIFY BEFORE DONE
═══════════════════════════════════════════════

□ Login flow works end to end
□ Dashboard loads with real data
□ Orders list with filters and search works
□ Dispatch flow (Confirmed → Dispatched) works
□ Add product with variants and images works
□ Edit product pre-fills correctly
□ Stock update (single + bulk) works
□ Coupons create and delete works
□ Pincodes add and delete works
□ Partner sale logged + commission calculated works
□ GST report exports as Excel file
□ Settings saves and persists correctly
□ Logout clears session completely
□ Non-admin user gets blocked at route level
□ Token refresh works on 401
□ New order polling triggers notification
□ Low stock alert shows on dashboard
□ All charts render with data
□ All tables show EmptyState when no data
□ All modals open and close correctly
□ All forms show validation errors
□ All toasts appear and auto-dismiss
□ Sidebar collapses on toggle
□ Page titles update on navigation
□ Browser tab title updates per page
□ No console errors in production build
```

---

## What This Builds

```
16 pages          → All admin sections
40+ components    → Every UI element
12 API files      → Every backend call
4 Zustand stores  → Complete state management
8 custom hooks    → All data fetching
4 chart components→ Revenue, orders, category, stock
5 modals          → Dispatch, delete, detail views
Real-time polling → New orders every 30 seconds
GST export        → Excel download
Complete auth     → OTP + JWT + refresh token
```

Paste into Cursor with your full codebase open and it will build the entire admin panel in one go. 🚀
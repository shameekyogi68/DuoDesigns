Perfect! Here's the complete IDE prompt:

---

```
You are a senior full-stack developer.

Build a completely separate, private web application
called the "Agency Revenue Tracker" for the development
agency that built and manages the Duo Designs website.

This app is COMPLETELY SEPARATE from Duo Designs codebase.
Duo Designs cannot see this. Only the agency can access it.

This app auto-pulls every order from the Duo Designs
backend in real time, calculates 5% commission on every
sale, and generates monthly reports showing exactly
what Duo Designs owes the agency.

═══════════════════════════════════════════════
WHAT THIS APP DOES
═══════════════════════════════════════════════

1. Connects to Duo Designs backend API using a
   special read-only admin token
2. Pulls every paid order automatically
3. Calculates 5% of every order's total value
4. Shows running totals by month
5. Generates a professional monthly PDF report
6. Keeps full history of all payments received
7. Shows unpaid vs paid commission at a glance

This is the agency's PROOF OF WORK and INVOICE SYSTEM.
If Duo Designs disputes any amount, this app has the
complete order-by-order breakdown as evidence.

═══════════════════════════════════════════════
PROJECT SETUP
═══════════════════════════════════════════════

Folder name: agency-revenue-tracker/

npm create vite@latest agency-revenue-tracker -- --template react
cd agency-revenue-tracker
npm install react-router-dom axios @tanstack/react-query
npm install zustand react-hook-form @hookform/resolvers zod
npm install recharts react-hot-toast date-fns
npm install reportlab jspdf jspdf-autotable
npm install lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

═══════════════════════════════════════════════
DESIGN SYSTEM
═══════════════════════════════════════════════

This is a PRIVATE internal tool — clean, professional,
minimal. Not the Duo Designs brand.

Colors:
--bg-primary:    #0F1117   (dark navy background)
--bg-card:       #1A1D27   (card background)
--bg-input:      #252836   (input background)
--border:        #2E3347   (borders)
--text-primary:  #FFFFFF   (headings)
--text-secondary:#9CA3AF   (labels, secondary)
--accent:        #6366F1   (indigo — CTAs, active)
--accent-light:  #818CF8   (hover states)
--success:       #10B981   (paid, positive)
--warning:       #F59E0B   (pending, warning)
--danger:        #EF4444   (overdue, negative)
--chart-1:       #6366F1
--chart-2:       #10B981
--chart-3:       #F59E0B
--chart-4:       #EF4444

Font: Inter (Google Fonts)
Border radius: 8px for cards, 4px for inputs
No sharp edges — this is internal, not branded

═══════════════════════════════════════════════
COMPLETE FOLDER STRUCTURE
═══════════════════════════════════════════════

agency-revenue-tracker/
├── src/
│   ├── pages/
│   │   ├── Login.jsx               ← agency private login
│   │   ├── Dashboard.jsx           ← overview + stats
│   │   ├── Orders.jsx              ← all orders table
│   │   ├── Monthly.jsx             ← month by month view
│   │   ├── Reports.jsx             ← generate + download PDFs
│   │   └── Settings.jsx            ← API connection settings
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppLayout.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Topbar.jsx
│   │   ├── charts/
│   │   │   ├── MonthlyRevenueChart.jsx
│   │   │   ├── CommissionChart.jsx
│   │   │   └── PaymentStatusChart.jsx
│   │   ├── tables/
│   │   │   ├── OrdersTable.jsx
│   │   │   └── MonthlyTable.jsx
│   │   └── ui/
│   │       ├── StatCard.jsx
│   │       ├── StatusBadge.jsx
│   │       ├── MonthPicker.jsx
│   │       ├── PageLoader.jsx
│   │       └── EmptyState.jsx
│   │
│   ├── store/
│   │   ├── authStore.js
│   │   └── ordersStore.js
│   │
│   ├── api/
│   │   ├── axios.js
│   │   └── orders.api.js
│   │
│   ├── hooks/
│   │   ├── useOrders.js
│   │   ├── useMonthlyStats.js
│   │   └── useAutoSync.js
│   │
│   ├── utils/
│   │   ├── commission.js           ← all 5% calculations
│   │   ├── formatters.js
│   │   ├── pdfGenerator.js         ← monthly report PDF
│   │   └── reportData.js           ← shape data for reports
│   │
│   ├── constants/
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
├── vite.config.js
└── package.json

═══════════════════════════════════════════════
ENVIRONMENT VARIABLES
═══════════════════════════════════════════════

.env.example:

# Duo Designs Backend API
VITE_DUO_API_URL=https://api.duodesigns.in/api

# Agency Private Login (hardcoded credentials
# stored as env vars — no database needed for auth)
VITE_AGENCY_EMAIL=agency@yourdomain.com
VITE_AGENCY_PASSWORD_HASH=bcrypt_hash_here

# Commission Rate
VITE_COMMISSION_RATE=0.05

# Auto-sync interval in milliseconds (default 5 mins)
VITE_SYNC_INTERVAL=300000

# App
VITE_APP_NAME=Revenue Tracker
VITE_APP_VERSION=1.0.0

═══════════════════════════════════════════════
AUTHENTICATION
═══════════════════════════════════════════════

This app has NO backend of its own.
Authentication is purely frontend:

- Single hardcoded email + password (from .env)
- Password stored as bcrypt hash in .env
- On login: compare input with hash using bcryptjs
- On success: set isLoggedIn=true in authStore
  + store session in localStorage
- Session expires after 7 days
- No OTP, no database, no API call for auth

This keeps it completely private and self-contained.

Login page:
- Clean centered card
- Email + password inputs
- "Login" button
- Wrong credentials → shake animation + error message
- No "forgot password" — agency owns the credentials

npm install bcryptjs

src/store/authStore.js:
State:
- isLoggedIn: boolean
- loginTime: timestamp

Actions:
- login(email, password)
  → compare with VITE_AGENCY_EMAIL
  → bcrypt.compare(password, VITE_AGENCY_PASSWORD_HASH)
  → if match: set isLoggedIn + loginTime
  → if not: set error
- logout()
  → clear state + localStorage
- initializeAuth()
  → check localStorage
  → verify session not older than 7 days
  → called on app start

ProtectedRoute:
- Reads isLoggedIn from authStore
- If false → redirect to /login
- Shows PageLoader while initializing

═══════════════════════════════════════════════
HOW IT CONNECTS TO DUO DESIGNS BACKEND
═══════════════════════════════════════════════

This app calls the Duo Designs backend API using
the admin JWT token stored in .env or Settings page.

src/api/axios.js:
- baseURL: VITE_DUO_API_URL
- Request interceptor:
  → Attach admin token from settings store
  → Headers: { Authorization: Bearer {adminToken} }
- Response interceptor:
  → On 401: show "API token expired" warning
  → On network error: show "Cannot reach Duo Designs API"

The admin token is the same JWT used by the admin panel.
Store it in the Settings page of this app.
It is saved in localStorage (not hardcoded).

src/api/orders.api.js:
export const ordersApi = {

  // Get ALL paid orders (paginated)
  getAllPaidOrders: (params) →
    GET /orders?status=Delivered&page=X&limit=100

  // Get orders for a specific month
  getOrdersByMonth: (month, year) →
    GET /orders?month=X&year=Y&status=Delivered

  // Get single order detail
  getOrderById: (id) →
    GET /orders/:id

  // Get dashboard stats
  getDashboardStats: () →
    GET /admin/dashboard
}

═══════════════════════════════════════════════
COMMISSION CALCULATION — CORE LOGIC
═══════════════════════════════════════════════

src/utils/commission.js

All commission calculations live here.
5% of the ORDER TOTAL (after GST, after discount).

Export these functions:

calculateCommission(orderTotal)
→ returns orderTotal × 0.05
→ rounded to 2 decimal places

calculateMonthlyCommission(orders)
→ takes array of orders
→ returns {
    totalRevenue: sum of all order totals,
    totalCommission: totalRevenue × 0.05,
    orderCount: orders.length,
    avgOrderValue: totalRevenue / orderCount,
    paidCommission: sum where paymentStatus=paid,
    pendingCommission: sum where paymentStatus=pending
  }

calculateAllTimeStats(allOrders)
→ returns {
    totalRevenue,
    totalCommission,
    totalOrders,
    monthlyBreakdown: [
      {
        month: "January 2025",
        monthKey: "2025-01",
        revenue: number,
        commission: number,
        orderCount: number,
        status: "paid" | "pending"
      }
    ]
  }

groupOrdersByMonth(orders)
→ groups orders array by month
→ returns object keyed by "YYYY-MM"

getMonthLabel(monthKey)
→ "2025-01" → "January 2025"

formatCommission(amount)
→ "₹6,497.50"

═══════════════════════════════════════════════
ZUSTAND STORES
═══════════════════════════════════════════════

src/store/authStore.js (documented above)

src/store/ordersStore.js
State:
- orders: []                    ← all synced orders
- lastSyncedAt: null | Date     ← when last pulled
- isSyncing: boolean
- syncError: null | string
- monthlyStats: {}              ← keyed by "YYYY-MM"
- allTimeStats: null
- adminToken: null | string     ← Duo Designs API token
- commissionRate: 0.05

Actions:
- syncOrders()
  → calls ordersApi.getAllPaidOrders
  → stores in state + localStorage cache
  → updates lastSyncedAt
  → recalculates all stats

- setAdminToken(token)
  → stores in state + localStorage

- setCommissionRate(rate)
  → stores in state + localStorage

- getOrdersForMonth(month, year)
  → filters orders array by month/year
  → returns filtered array

- markMonthAsPaid(monthKey)
  → sets monthlyStats[monthKey].status = "paid"
  → saves to localStorage

- markMonthAsUnpaid(monthKey)
  → sets monthlyStats[monthKey].status = "pending"

Note: Payment tracking is LOCAL ONLY (localStorage).
The Duo Designs backend has no idea about this tracking.
This is purely for the agency's own records.

═══════════════════════════════════════════════
AUTO SYNC HOOK
═══════════════════════════════════════════════

src/hooks/useAutoSync.js

- Calls syncOrders() on app mount
- Sets up interval to sync every 5 minutes
  (configurable via VITE_SYNC_INTERVAL)
- Shows "Last synced: 2 minutes ago" in topbar
- Shows "Syncing..." spinner while syncing
- Shows error toast if sync fails
- Manual "Sync Now" button in topbar triggers this
- On first load if no orders in state: show full
  page loader with "Connecting to Duo Designs..."

═══════════════════════════════════════════════
PAGES — COMPLETE SPECIFICATION
═══════════════════════════════════════════════

────────────────────────────────────────────────
PAGE 1 — DASHBOARD (/)
────────────────────────────────────────────────

The main overview page. Shows everything at a glance.

TOP ROW — 4 STAT CARDS:
Card 1: Total Revenue (All Time)
  - Value: sum of ALL delivered orders
  - Format: ₹12,45,890
  - Sub: "Across {orderCount} orders"
  - Color accent: indigo

Card 2: Total Commission Earned (All Time)
  - Value: totalRevenue × 5%
  - Format: ₹62,294.50
  - Sub: "@ 5% commission rate"
  - Color accent: green

Card 3: This Month's Revenue
  - Value: current month order totals
  - Format: ₹1,89,420
  - Sub: "{orderCount} orders this month"
  - Color accent: indigo

Card 4: This Month's Commission
  - Value: current month commission
  - Format: ₹9,471
  - Sub: "Due on 1st of next month"
  - Color accent: green (if paid) / orange (if pending)

MIDDLE ROW — 2 CHARTS:
Left (60%): MonthlyRevenueChart
  - Bar chart
  - Last 12 months revenue bars
  - X axis: month labels
  - Y axis: ₹ revenue
  - Hover: "₹X revenue | ₹Y commission"

Right (40%): PaymentStatusChart
  - Pie/donut chart
  - Paid commission vs Pending commission
  - Center label: total commission
  - Legend: Paid (green) / Pending (orange)

BOTTOM ROW — 2 TABLES:
Left (60%): Recent Orders
  - Last 10 orders synced from Duo Designs
  - Columns: Order ID, Date, Amount, Commission (5%)
  - "View All Orders" link at bottom

Right (40%): Monthly Summary (last 6 months)
  - Month | Revenue | Commission | Status
  - Status: Paid (green badge) / Pending (orange badge)
  - "Mark Paid" / "Mark Unpaid" toggle button per row
  - "Download PDF" button per row

TOPBAR ADDITIONS:
  - "Last synced: X minutes ago" text
  - "Sync Now" button with spinner

────────────────────────────────────────────────
PAGE 2 — ORDERS (/orders)
────────────────────────────────────────────────

Complete table of every order synced from Duo Designs.

TOP BAR:
- SearchBar (search by order ID or amount)
- Month/Year filter picker
- "Sync Now" button
- Total orders count + total revenue for filtered view

TABLE (OrdersTable):
Columns:
- Order ID (e.g. DD-2025-0049)
- Order Date (formatted)
- Customer State (Karnataka = CGST+SGST, else IGST)
- Products (item names + count)
- Order Subtotal (₹)
- GST Amount (₹)
- Shipping (₹)
- Order Total (₹) ← THIS is what 5% is calculated on
- Our Commission (₹) = Total × 0.05
  → Highlighted in green
- Month Status (Paid/Pending badge)
  → Based on whether that month is marked paid

FOOTER ROW (sticky):
- Total: | | | | ₹X | ₹X | ₹X | ₹X | ₹X |
  (sum of each column for filtered view)

EXPORT BUTTON:
- "Export CSV" → downloads current filtered view as CSV

────────────────────────────────────────────────
PAGE 3 — MONTHLY (/monthly)
────────────────────────────────────────────────

Month-by-month breakdown. The most important page
for tracking what is owed.

MONTH SELECTOR:
- Grid of all months that have orders
- Each month shown as a card:
  ┌─────────────────┐
  │ January 2025    │
  │                 │
  │ ₹1,89,420       │ ← total revenue
  │ 47 orders       │
  │                 │
  │ Commission:     │
  │ ₹9,471          │ ← in large green text
  │                 │
  │ [PAID ✓]        │ ← green if paid
  │ or [PENDING]    │ ← orange if pending
  └─────────────────┘

Clicking a month card → expands to show:
- Full orders table for that month
- Same columns as Orders page
- Monthly totals row at bottom
- "Download PDF Report" button for this month
- "Mark as Paid" / "Mark as Unpaid" toggle

────────────────────────────────────────────────
PAGE 4 — REPORTS (/reports)
────────────────────────────────────────────────

Generate and download professional PDF reports
to send to Duo Designs as invoices.

REPORT GENERATOR:
- Month picker (select month + year)
- "Generate Report" button
- Preview of what the PDF will look like
- "Download PDF" button

PDF REPORT CONTENT (generate with jspdf):
The PDF must look like a professional invoice.

Page 1 — Cover:
┌────────────────────────────────────┐
│  [AGENCY NAME]                     │
│  Digital Services Invoice          │
│                                    │
│  Invoice #: INV-2025-01            │
│  Period: January 2025              │
│  Date Issued: 1 February 2025      │
│                                    │
│  Billed To:                        │
│  Duo Designs                       │
│  [their address]                   │
│                                    │
│  From:                             │
│  [Agency Name]                     │
│  [Agency Address]                  │
│  [Agency Email]                    │
└────────────────────────────────────┘

Page 2 — Summary:
┌────────────────────────────────────┐
│  SERVICE SUMMARY                   │
│                                    │
│  Website Development & Hosting  ✓  │
│  Digital Marketing              ✓  │
│  Maintenance & Support          ✓  │
│                                    │
│  REVENUE SUMMARY — January 2025    │
│  ┌──────────────────────────────┐  │
│  │ Total Orders This Month: 47  │  │
│  │ Gross Revenue Generated:     │  │
│  │ ₹1,89,420                    │  │
│  │                              │  │
│  │ Commission Rate: 5%          │  │
│  │ Commission Due:              │  │
│  │ ₹9,471                       │  │
│  └──────────────────────────────┘  │
│                                    │
│  AMOUNT DUE: ₹9,471                │
│  Due Date: 15 February 2025        │
└────────────────────────────────────┘

Page 3 — Order Breakdown (full table):
Every order that month:
Order ID | Date | Amount | 5% Commission
DD-2025-0001 | 1 Jan | ₹1,299 | ₹64.95
DD-2025-0002 | 1 Jan | ₹2,199 | ₹109.95
... all orders ...
─────────────────────────────────────
TOTAL       | 47 orders | ₹1,89,420 | ₹9,471

Page 4 — Terms:
- Payment terms
- Bank details (agency's bank — from Settings)
- Signature line
- "Generated by Agency Revenue Tracker"

REPORT HISTORY TABLE:
Shows all previously generated reports:
- Month
- Generated Date
- Revenue
- Commission
- Download button (re-download any past report)
- Status (Paid/Pending)

────────────────────────────────────────────────
PAGE 5 — SETTINGS (/settings)
────────────────────────────────────────────────

All configuration for the app.

SECTION 1 — API CONNECTION:
- Duo Designs API URL (text, default from .env)
- Admin JWT Token (password input, paste token here)
  → "Test Connection" button
  → Shows: "✅ Connected — Duo Designs API reachable"
  → Shows: "❌ Failed — Check token or URL"
- "Sync Now" button

SECTION 2 — COMMISSION SETTINGS:
- Commission Rate (number, default 5%)
  → Shows live: "You earn ₹X per ₹1000 in sales"
- Commission calculation basis:
  → Radio: Order Total (after GST) ← default
  → Radio: Order Subtotal (before GST)
  → Radio: Order Subtotal (before GST + Shipping)
  Note: Changes recalculate all historical data

SECTION 3 — AGENCY DETAILS (for PDF invoices):
- Agency Name (text)
- Agency Address (textarea)
- Agency Email (email)
- Agency Phone (tel)
- Agency GST Number (optional)
- Bank Name (text)
- Account Number (text)
- IFSC Code (text)
- Account Holder Name (text)

SECTION 4 — CLIENT DETAILS (for PDF invoices):
- Client Name (default: Duo Designs)
- Client Address (textarea)
- Client Email (email)
- Client GST Number (optional)
- Payment Due Days (number, default 15)
  → Used to calculate due date on invoices

SECTION 5 — CHANGE LOGIN PASSWORD:
- Current Password
- New Password
- Confirm New Password
- Note: Updates the hash in localStorage
  (user must manually update .env for persistence)

All settings saved to localStorage immediately on change.

═══════════════════════════════════════════════
PDF GENERATOR — COMPLETE SPEC
═══════════════════════════════════════════════

src/utils/pdfGenerator.js

Use jspdf + jspdf-autotable.

Export:
generateMonthlyReport(month, year, orders, settings)

Parameters:
- month: number (1-12)
- year: number
- orders: array of orders for that month
- settings: agency + client details from Settings page

The function:
1. Creates new jsPDF document (A4)
2. Renders cover page with agency branding
3. Renders summary page with commission breakdown
4. Renders full order table using autoTable
5. Renders payment terms + bank details page
6. Auto-downloads as:
   "DuoDesigns_Invoice_January_2025.pdf"

Invoice number format: INV-YYYY-MM
(e.g. INV-2025-01 for January 2025)

Due date: invoice date + settings.paymentDueDays

═══════════════════════════════════════════════
CHARTS — COMPLETE SPEC
═══════════════════════════════════════════════

All using Recharts. Dark theme.

MonthlyRevenueChart.jsx:
- ComposedChart
- Bar: monthly revenue (indigo)
- Line: monthly commission (green)
- Dual Y axis (revenue left, commission right)
- X axis: "Jan", "Feb", "Mar"...
- Tooltip shows both values
- Last 12 months of data

CommissionChart.jsx:
- BarChart
- Single bar per month
- Commission amount
- Color: green if paid, orange if pending
- Last 12 months

PaymentStatusChart.jsx:
- PieChart / Donut
- Paid commission (green)
- Pending commission (orange)
- Center text: total commission
- Click slice → filters orders table

═══════════════════════════════════════════════
DATA PERSISTENCE STRATEGY
═══════════════════════════════════════════════

Since this app has NO backend of its own,
everything is stored in localStorage.

localStorage keys:
- art_auth          → { isLoggedIn, loginTime }
- art_orders        → { orders[], lastSyncedAt }
- art_monthly_status→ { "2025-01": "paid", ... }
- art_settings      → { all settings page values }
- art_admin_token   → Duo Designs JWT token
- art_reports       → { generated report metadata[] }

On every app start:
1. Load auth → check session expiry
2. Load settings → restore all config
3. Load orders from cache → show immediately
4. Trigger background sync → update from API
5. Update stats with fresh data

Cache strategy:
- Show cached data immediately (no loading flash)
- Sync in background
- Show "Last synced X mins ago" always
- If cache is older than 1 hour → show warning

═══════════════════════════════════════════════
BUILD ORDER
═══════════════════════════════════════════════

Follow this exact order:

Step 1:  Config files (vite, tailwind, jsconfig)
Step 2:  CSS variables + globals.css
Step 3:  constants/app.js
Step 4:  utils/formatters.js
Step 5:  utils/commission.js ← build + test this first
Step 6:  utils/pdfGenerator.js
Step 7:  utils/reportData.js
Step 8:  api/axios.js
Step 9:  api/orders.api.js
Step 10: store/authStore.js
Step 11: store/ordersStore.js
Step 12: hooks/useAutoSync.js
Step 13: hooks/useOrders.js
Step 14: hooks/useMonthlyStats.js
Step 15: Layout components (Sidebar, Topbar, AppLayout)
Step 16: UI primitives (StatCard, StatusBadge, etc.)
Step 17: Charts (all 3)
Step 18: Tables (OrdersTable, MonthlyTable)
Step 19: Login page + auth
Step 20: Dashboard page
Step 21: Orders page
Step 22: Monthly page
Step 23: Reports page
Step 24: Settings page
Step 25: App.jsx routing
Step 26: vercel.json deployment config

═══════════════════════════════════════════════
ROUTING
═══════════════════════════════════════════════

App.jsx:
<Routes>
  <Route path="/login" element={<Login />} />
  <Route element={<ProtectedRoute />}>
    <Route element={<AppLayout />}>
      <Route path="/" element={<Dashboard />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/monthly" element={<Monthly />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/settings" element={<Settings />} />
    </Route>
  </Route>
  <Route path="*" element={<Navigate to="/" />} />
</Routes>

═══════════════════════════════════════════════
DEPLOYMENT
═══════════════════════════════════════════════

Deploy to Vercel on YOUR agency domain.
NOT on duodesigns.in — on your own domain.

Example: tracker.youragency.com

vercel.json:
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}

Environment variables to set in Vercel:
VITE_DUO_API_URL
VITE_AGENCY_EMAIL
VITE_AGENCY_PASSWORD_HASH
VITE_COMMISSION_RATE
VITE_SYNC_INTERVAL

To generate password hash for .env:
node -e "const b=require('bcryptjs');
console.log(b.hashSync('yourpassword',10))"

═══════════════════════════════════════════════
SECURITY NOTES
═══════════════════════════════════════════════

1. This app is on YOUR domain — Duo Designs
   has no idea it exists

2. The admin token gives READ access to orders
   Keep it secret — rotate if compromised

3. Password hash in .env — never commit .env
   to any repository

4. All data in localStorage — only accessible
   on your device/browser

5. Deploy on Vercel with password protection
   (Vercel Pro has built-in password protection)
   OR rely on the login page

6. Do NOT share the URL with anyone outside
   your agency

═══════════════════════════════════════════════
QUALITY CHECKLIST
═══════════════════════════════════════════════

□ Login works with correct credentials
□ Wrong password shows error + shake animation
□ Session persists across browser refresh
□ Session expires after 7 days
□ App connects to Duo Designs API with token
□ Orders sync automatically on load
□ Manual sync works from topbar button
□ "Last synced X minutes ago" updates correctly
□ Dashboard stat cards show correct totals
□ All 3 charts render with real data
□ Orders table shows all orders with 5% column
□ Search and month filter work on orders table
□ Monthly page shows all months as cards
□ Clicking month card expands order list
□ Mark as Paid / Unpaid toggles correctly
□ Mark as Paid persists after page refresh
□ PDF report generates correctly for any month
□ PDF contains full order breakdown table
□ PDF invoice number is sequential
□ PDF downloads automatically with correct filename
□ Settings saves all fields to localStorage
□ API connection test works in Settings
□ Commission rate change recalculates everything
□ Agency details appear correctly in PDF
□ CSV export downloads from Orders page
□ App works offline with cached data
□ No console errors
□ Fully responsive on laptop screen
```

---

## 🎯 What This Gives You

```
WHAT IT DOES
├── Auto-syncs every Duo Designs paid order
├── Calculates your 5% on every single order
├── Tracks paid vs pending month by month
├── Generates professional PDF invoices
│   └── Full order breakdown as proof
├── Exports CSV for your records
└── Lives on YOUR domain, fully private

YOUR PROTECTION
├── Every order recorded with ID + amount
├── Month-by-month commission history
├── PDF invoice = legal document
├── If they dispute → show order breakdown
└── If they don't pay → you have the receipts
```

---

## 🚀 After Building This

```
1. Deploy to tracker.youragency.com
2. Go to Settings → paste Duo Designs admin token
3. Click Sync Now → all orders load
4. On 1st of every month:
   → Go to Reports
   → Select previous month
   → Generate PDF
   → Send to Duo Designs as invoice
5. When they pay → mark month as Paid ✅
```

Paste into Cursor and build it! 🚀
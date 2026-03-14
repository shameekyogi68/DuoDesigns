You are a senior technical writer and software architect.
Create a complete /docs folder for the Duo Designs project.
This documentation will be used by multiple team members
with different roles — developers, designers, testers,
DevOps engineers, and project managers.

Every document must be:
- Clear enough for a new team member to understand in 1 hour
- Detailed enough for a senior developer to implement from
- Consistent in formatting and terminology throughout
- Updated whenever code changes (living documentation)

═══════════════════════════════════════════════
PROJECT CONTEXT
═══════════════════════════════════════════════

PROJECT:     Duo Designs
TYPE:        Custom print e-commerce platform
MARKET:      India only
PAYMENT:     Razorpay (prepaid, no COD)
SELLER STATE: Karnataka (affects GST calculation)

3 APPS:
1. Customer App  → duodesigns.in         (React + Vite)
2. Admin App     → admin.duodesigns.in   (React + Vite)
3. Backend API   → api.duodesigns.in     (Node.js + Express)

PRODUCTS: Regular T-Shirt, Oversized T-Shirt,
          Trackpants, Mugs, Keychains

DESIGN: SHOP.CO inspired — bold black (#0A0A0A),
        warm white (#F5F5F0), accent yellow-green (#E8FF3B),
        Bebas Neue + Barlow fonts, zero border-radius

═══════════════════════════════════════════════
FOLDER STRUCTURE TO CREATE
═══════════════════════════════════════════════

/docs
├── README.md                        ← Master index of all docs
│
├── 01-project/
│   ├── overview.md                  ← What, why, who, vision
│   ├── business-rules.md            ← All business logic rules
│   ├── user-roles.md                ← Customer / Admin / Partner roles
│   ├── product-catalogue.md         ← All products, variants, pricing rules
│   └── glossary.md                  ← Terms used across the project
│
├── 02-architecture/
│   ├── system-overview.md           ← How all 3 apps connect
│   ├── tech-stack.md                ← Every tool and why it was chosen
│   ├── data-flow.md                 ← How data moves between apps
│   ├── folder-structure.md          ← Full folder tree for all 3 apps
│   └── environment-variables.md     ← All .env vars for all 3 apps
│
├── 03-design/
│   ├── design-system.md             ← Colors, fonts, spacing, breakpoints
│   ├── component-library.md         ← Every reusable component documented
│   ├── pages.md                     ← All 12 pages with features list
│   ├── style-guide.md               ← Writing style, tone, UI copy rules
│   └── accessibility.md             ← a11y rules and checklist
│
├── 04-frontend/
│   ├── getting-started.md           ← Setup from scratch in 5 minutes
│   ├── customer-app.md              ← Customer app structure + guide
│   ├── admin-app.md                 ← Admin app structure + guide
│   ├── routing.md                   ← All routes, protected routes
│   ├── state-management.md          ← Zustand stores explained
│   ├── api-integration.md           ← How frontend calls backend
│   ├── forms.md                     ← React Hook Form usage + validation
│   ├── otp-flow.md                  ← Complete OTP login flow
│   ├── design-upload.md             ← Design upload feature explained
│   ├── gst-display.md               ← How GST is shown on frontend
│   ├── cart-flow.md                 ← Complete cart → checkout → success
│   └── testing.md                   ← How to write and run frontend tests
│
├── 05-backend/
│   ├── getting-started.md           ← Backend setup from scratch
│   ├── architecture.md              ← MVC pattern + service layer
│   ├── database.md                  ← MongoDB schemas + indexes
│   ├── authentication.md            ← JWT + OTP + refresh token flow
│   ├── gst-calculation.md           ← Full GST logic with examples
│   ├── payment-flow.md              ← Razorpay integration step by step
│   ├── email-system.md              ← All 5 email templates + triggers
│   ├── file-upload.md               ← Cloudinary + Multer explained
│   ├── invoice-generation.md        ← pdf-lib invoice logic
│   ├── error-handling.md            ← Error types, codes, responses
│   ├── security.md                  ← All security measures explained
│   └── testing.md                   ← How to write and run backend tests
│
├── 06-api/
│   ├── overview.md                  ← Base URL, auth headers, response format
│   ├── auth.md                      ← Auth endpoints (send-otp, verify, etc)
│   ├── products.md                  ← Product endpoints
│   ├── orders.md                    ← Order endpoints
│   ├── payments.md                  ← Payment endpoints
│   ├── coupons.md                   ← Coupon endpoints
│   ├── shipping.md                  ← Shipping/pincode endpoints
│   ├── upload.md                    ← Upload endpoints
│   ├── customers.md                 ← Customer endpoints (admin)
│   ├── partners.md                  ← Partnership endpoints (admin)
│   ├── dashboard.md                 ← Dashboard stats endpoint (admin)
│   ├── search.md                    ← Search endpoint
│   └── webhooks.md                  ← Razorpay webhook endpoint
│
├── 07-database/
│   ├── overview.md                  ← MongoDB Atlas setup + connection
│   ├── schemas.md                   ← All 8 schemas with field descriptions
│   ├── indexes.md                   ← All indexes and why they exist
│   ├── relationships.md             ← How collections reference each other
│   └── seeding.md                   ← How to seed test data
│
├── 08-deployment/
│   ├── overview.md                  ← Full deployment architecture
│   ├── customer-app.md              ← Deploy customer app to Vercel
│   ├── admin-app.md                 ← Deploy admin app to Vercel
│   ├── backend.md                   ← Deploy backend to Render
│   ├── database.md                  ← MongoDB Atlas setup guide
│   ├── cloudinary.md                ← Cloudinary setup guide
│   ├── razorpay.md                  ← Razorpay account + webhook setup
│   ├── gmail-smtp.md                ← Gmail App Password setup
│   └── domain-setup.md              ← DNS + domain configuration
│
├── 09-workflows/
│   ├── git-workflow.md              ← Branching strategy + commit rules
│   ├── code-review.md               ← PR process + review checklist
│   ├── release-process.md           ← How to release new versions
│   └── hotfix-process.md            ← How to fix urgent production bugs
│
├── 10-roles/
│   ├── frontend-developer.md        ← Guide for frontend devs
│   ├── backend-developer.md         ← Guide for backend devs
│   ├── designer.md                  ← Guide for UI/UX designers
│   ├── tester.md                    ← Guide for QA testers
│   ├── devops.md                    ← Guide for DevOps engineers
│   └── project-manager.md           ← Guide for project managers
│
├── 11-testing/
│   ├── overview.md                  ← Testing strategy and philosophy
│   ├── frontend-tests.md            ← All frontend test cases
│   ├── backend-tests.md             ← All backend test cases
│   ├── api-testing.md               ← Postman collection usage
│   ├── manual-testing.md            ← Manual test checklist
│   └── test-data.md                 ← Test users, products, pincodes
│
└── 12-changelog/
    ├── CHANGELOG.md                 ← Version history
    └── ROADMAP.md                   ← Future features planned

═══════════════════════════════════════════════
RULES FOR EVERY DOCUMENT
═══════════════════════════════════════════════

1. HEADER — every .md file must start with:
---
title:        (document title)
section:      (e.g. 04-frontend)
last-updated: (date)
maintained-by:(role responsible for keeping this updated)
status:       Draft | Review | Approved
---

2. TABLE OF CONTENTS
Every document longer than 50 lines must have
a clickable table of contents at the top using
markdown anchor links

3. WRITING RULES
- Use simple English — no jargon without explanation
- Write in present tense ("The system sends" not "will send")
- Use second person ("You need to" not "The developer needs to")
- Every code block must have a language tag ```javascript
- Every terminal command in its own code block ```bash
- Use tables for comparisons, lists for steps
- Use ⚠️ for warnings, 💡 for tips, ✅ for confirmed, ❌ for don'ts

4. CODE EXAMPLES
Every technical document must have:
- At least one working code example
- Comments explaining every non-obvious line
- Expected output shown where relevant

5. LINKS
- All cross-references must use relative links
- Link to related docs at the bottom of every file
- Never use absolute URLs for internal docs

═══════════════════════════════════════════════
SPECIFIC CONTENT FOR EACH FILE
═══════════════════════════════════════════════

────────────────────────────────────────────────
docs/README.md
────────────────────────────────────────────────
Must include:
- Welcome message for new team members
- What Duo Designs is (2 sentences)
- Quick links to every section
- "Start Here" guide for each role:
  → New frontend dev? Start here
  → New backend dev? Start here
  → Designer joining? Start here
  → QA tester? Start here
  → DevOps? Start here
  → Project manager? Start here
- Project status badges
- Contact / who to ask for what

────────────────────────────────────────────────
docs/01-project/overview.md
────────────────────────────────────────────────
Must include:
- What Duo Designs is and does
- Target customers (India, custom print buyers)
- Business model (direct to consumer, prepaid only)
- Products sold with pricing overview
- How the platform works (customer journey)
- What makes it unique (custom design upload)
- Three apps overview with purpose of each

────────────────────────────────────────────────
docs/01-project/business-rules.md
────────────────────────────────────────────────
Must include ALL rules:
- No COD — prepaid only
- Design upload: PNG/JPG only, max 10MB
- OTP expires in 10 minutes, max 3 attempts
- XL/XXL costs +₹50 extra
- Double side keychain print costs +₹80 extra
- GST: CGST+SGST for Karnataka, IGST for other states
- Free shipping above ₹999
- Coupons: flat or %, with expiry and minimum order
- Stock auto marks out-of-stock when reaches 0
- Show "Only X left!" when stock < 10
- Order statuses: Placed → Confirmed → Dispatched → Delivered
- Admin manually enters courier name + tracking
- Partner commission is always exactly 5%
- Delivery only to admin-configured pincodes
- Seller state is Karnataka for all GST purposes

────────────────────────────────────────────────
docs/01-project/user-roles.md
────────────────────────────────────────────────
Must include for each role:
CUSTOMER:
- How they register (email OTP)
- What they can do
- What they cannot do
- Their data (orders, addresses, profile)

ADMIN (owner):
- How they access (separate app + login)
- Full list of permissions
- What only they can do

────────────────────────────────────────────────
docs/01-project/glossary.md
────────────────────────────────────────────────
Must define every term used in the project:
- OTP, JWT, Razorpay, Cloudinary
- Variant, SKU, Stock
- Intrastate, Interstate, CGST, SGST, IGST
- GST, GSTIN, HSN code
- Prepaid, COD
- Dispatch, Tracking
- Pre-made design, Uploaded design
- Commission, Partner
- Pincode, Shipping Zone
- Coupon, Flat discount, Percentage discount
- Order statuses (all 4)
- Access token, Refresh token
- Webhook, Signature verification

────────────────────────────────────────────────
docs/02-architecture/system-overview.md
────────────────────────────────────────────────
Must include:
- ASCII diagram showing all 3 apps + services
- How customer app talks to backend
- How admin app talks to backend
- All third-party services and what they do
- Request flow from browser to database

────────────────────────────────────────────────
docs/02-architecture/environment-variables.md
────────────────────────────────────────────────
Must include ALL env vars for all 3 apps:
For each variable:
- Name
- Which app uses it
- What it does
- Example value
- Where to get it
- Required or optional

────────────────────────────────────────────────
docs/03-design/design-system.md
────────────────────────────────────────────────
Must include:
COLORS (with hex, RGB, when to use each):
- #0A0A0A Black
- #F5F5F0 White
- #E8FF3B Accent
- #888888 Gray
- #F0F0EB Card BG
- #1A1A1A Dark
- #E8E8E2 Light Gray
- #3BB54A Green
- #E05050 Red

TYPOGRAPHY:
- Bebas Neue — when to use, sizes
- Barlow — weights, sizes, when to use
- Barlow Condensed — when to use

SPACING SCALE

BORDER RULES:
- Always 1.5px solid #0A0A0A on light bg
- Always 1px solid #222 on dark bg
- Never use border-radius
- Never use box-shadow — use borders instead

BUTTON STYLES:
- Primary (black fill → accent hover)
- Outline (transparent → black fill hover)
- Danger (red)
- All measurements exact

BREAKPOINTS:
- xs 320px, sm 480px, md 768px,
  lg 1024px, xl 1280px, 2xl 1400px

────────────────────────────────────────────────
docs/04-frontend/getting-started.md
────────────────────────────────────────────────
Step by step from zero:
1. Prerequisites (Node version, Git)
2. Clone repo
3. Install dependencies exact commands
4. Set up .env file (with what each var is)
5. Run development server
6. Open in browser
7. Run tests
8. Common errors + fixes

────────────────────────────────────────────────
docs/04-frontend/otp-flow.md
────────────────────────────────────────────────
Must document complete OTP flow:
- User enters email
- Frontend calls POST /api/auth/send-otp
- OTP arrives in email
- 6 box input with auto-move behavior
- Timer counts down 10 minutes
- On verify: POST /api/auth/verify-otp
- JWT stored in authStore + localStorage
- Redirect to previous page
- Error handling (wrong OTP, expired, blocked)
- Resend OTP behavior

────────────────────────────────────────────────
docs/04-frontend/cart-flow.md
────────────────────────────────────────────────
Must document complete flow:
Step 1 Cart:
- Add item, quantity, design shown
- Coupon applied
- Price updates reactively

Step 2 Delivery:
- Pincode check
- Saved address or new address
- State detected for GST type

Step 3 Payment:
- GST breakdown shown
- Razorpay opens
- Payment success/fail handling

Step 4 Success:
- Order ID shown
- Email sent
- Cart cleared
- Redirect to /order-success/:id

────────────────────────────────────────────────
docs/04-frontend/gst-display.md
────────────────────────────────────────────────
Must explain:
- When GST is calculated (after pincode entered)
- How state is determined from pincode
- Intrastate: show CGST 9% + SGST 9% lines
- Interstate: show IGST 18% line
- Where it shows: cart, checkout, invoice, account
- Which util function to call
- Code example of GSTSummary component usage

────────────────────────────────────────────────
docs/05-backend/getting-started.md
────────────────────────────────────────────────
Step by step from zero:
1. Prerequisites
2. Clone repo
3. npm install
4. MongoDB Atlas setup (with screenshots guide)
5. Gmail App Password setup
6. Razorpay test keys setup
7. Cloudinary setup
8. .env file setup
9. npm run dev
10. Test with Postman
11. Common errors + fixes

────────────────────────────────────────────────
docs/05-backend/gst-calculation.md
────────────────────────────────────────────────
Must document fully:
- India GST basics (simple explanation)
- Why seller state matters (Karnataka)
- Intrastate vs interstate determination
- Formula step by step with numbers:
  Example 1: Karnataka customer
    Subtotal:         ₹1,097
    Shipping:         ₹80
    Coupon discount:  ₹109.70
    Taxable amount:   ₹1,067.30
    CGST 9%:          ₹96.06
    SGST 9%:          ₹96.06
    Total:            ₹1,259.42

  Example 2: Tamil Nadu customer
    Same numbers but:
    IGST 18%:         ₹192.11
- Code example of calculateGST() function
- Where it is called in order flow
- How it appears on invoice (HSN codes)

────────────────────────────────────────────────
docs/05-backend/payment-flow.md
────────────────────────────────────────────────
Must document complete Razorpay flow:
Step 1: Customer clicks Pay
Step 2: Frontend calls POST /api/payments/create-order
Step 3: Backend creates Razorpay order, returns order_id
Step 4: Frontend opens Razorpay checkout UI
Step 5: Customer pays
Step 6: Razorpay returns payment_id + signature
Step 7: Frontend calls POST /api/payments/verify
Step 8: Backend verifies HMAC-SHA256 signature
Step 9: If valid → mark order paid → send email
Step 10: Razorpay webhook backup (payment.captured)
- What happens if payment fails
- Test card numbers for development
- Going live checklist

────────────────────────────────────────────────
docs/05-backend/authentication.md
────────────────────────────────────────────────
Must document:
- Why OTP (no password to remember/store)
- Complete OTP send flow with code
- Complete OTP verify flow with code
- JWT access token (15 min expiry)
- Refresh token (30 days, stored in DB)
- How refresh token is used
- Google OAuth flow
- How admin is different from customer
- Logout (invalidate refresh token)
- Security measures (rate limit, attempt limit)

────────────────────────────────────────────────
docs/06-api/overview.md
────────────────────────────────────────────────
Must include:
- Base URL for all environments
- How to authenticate (Bearer token header)
- Standard response format:
  {
    success: true/false,
    message: "Human readable message",
    data: { ... },
    error: "Error code if failed"
  }
- Standard error codes used
- HTTP status codes used and what they mean
- Rate limiting info (which routes, what limits)
- Pagination format
- How to use Postman collection

────────────────────────────────────────────────
docs/06-api/auth.md (and all other API docs)
────────────────────────────────────────────────
For EVERY endpoint document:
- Method + URL
- Description (one line)
- Authentication required? (yes/no + type)
- Request headers
- Request body (with types + required/optional)
- Success response (with example JSON)
- Error responses (all possible errors)
- Rate limit (if applies)
- Code example (curl or fetch)

────────────────────────────────────────────────
docs/07-database/schemas.md
────────────────────────────────────────────────
For EVERY collection document:
- Purpose of the collection
- Full schema with:
  - Field name
  - Type
  - Required?
  - Default value
  - Description of what it stores
  - Validation rules
- Example document (real looking data)
- Common queries on this collection

────────────────────────────────────────────────
docs/08-deployment/overview.md
────────────────────────────────────────────────
Must include:
- Complete infrastructure diagram (ASCII)
- All 3 apps + where they live
- All services used + purpose
- Cost breakdown (everything free except Razorpay 2%)
- Pre-deployment checklist
- Post-deployment verification checklist

────────────────────────────────────────────────
docs/09-workflows/git-workflow.md
────────────────────────────────────────────────
Must include:
BRANCH STRATEGY:
- main         → production (protected)
- staging      → pre-production testing
- develop      → integration branch
- feature/xxx  → new features
- fix/xxx      → bug fixes
- hotfix/xxx   → urgent production fixes

COMMIT MESSAGE FORMAT:
type(scope): short description

Types: feat, fix, docs, style, refactor,
       test, chore, hotfix

Examples:
feat(cart): add coupon code validation
fix(otp): prevent brute force after 3 attempts
docs(api): update payment endpoint docs
hotfix(payment): fix signature verification bug

PR RULES:
- Min 1 reviewer required
- All tests must pass
- No merge conflicts
- Description must explain what + why

────────────────────────────────────────────────
docs/10-roles/frontend-developer.md
────────────────────────────────────────────────
Must include:
- Your responsibility on this project
- What repos you work in
- Setup guide (link to getting-started.md)
- Coding standards to follow
- How to create a new page
- How to create a new component
- How to add a new API call
- How to update state
- How to write tests
- How to submit work (PR process)
- Who to ask when stuck

────────────────────────────────────────────────
docs/10-roles/backend-developer.md
────────────────────────────────────────────────
Must include:
- Your responsibility on this project
- What repos you work in
- Setup guide (link to getting-started.md)
- How to add a new API endpoint
  (route → controller → service → model)
- Coding standards (asyncHandler, apiResponse)
- How to write validators
- How to write tests
- Database change process
- How to submit work (PR process)
- Who to ask when stuck

────────────────────────────────────────────────
docs/10-roles/tester.md
────────────────────────────────────────────────
Must include:
- Testing environments (dev, staging, prod)
- How to set up Postman collection
- Test accounts and credentials
- Complete manual test checklist:
  ✅ Homepage loads correctly
  ✅ Can browse products
  ✅ Can filter by category
  ✅ OTP login works
  ✅ Design upload works (PNG, JPG, size limit)
  ✅ Add to cart works
  ✅ Pincode check works
  ✅ Coupon applies correctly
  ✅ GST shows correctly (Karnataka vs other)
  ✅ Razorpay test payment works
  ✅ Order confirmation email received
  ✅ Admin can dispatch order
  ✅ Dispatch email received with tracking
  ✅ Track order page works
  ✅ Invoice downloads correctly
- Bug reporting process
- Test data to use

────────────────────────────────────────────────
docs/10-roles/project-manager.md
────────────────────────────────────────────────
Must include:
- Project overview (non-technical)
- All features and their status
- Development phases and timeline
- How to read the CHANGELOG
- How releases work
- How to report and track bugs
- Team roles and responsibilities
- Key contacts

────────────────────────────────────────────────
docs/11-testing/manual-testing.md
────────────────────────────────────────────────
Complete manual test cases for every feature:
Format for each test:
  TEST ID:      TC-001
  FEATURE:      OTP Login
  STEPS:        1. Go to /login
                2. Enter valid email
                3. Click Send OTP
                4. Check email for OTP
                5. Enter OTP in boxes
                6. Click Verify
  EXPECTED:     User logged in, redirected to homepage
  TEST DATA:    Email: test@gmail.com

Cover all critical paths:
- OTP login (success + all error cases)
- Design upload (valid + invalid file + too large)
- Add to cart + update qty + remove
- Coupon valid + expired + wrong code
- Pincode deliverable + not deliverable
- Checkout full flow
- Razorpay test payment
- Order tracking
- Admin dispatch flow
- Invoice download

────────────────────────────────────────────────
docs/12-changelog/ROADMAP.md
────────────────────────────────────────────────
Must include:
PHASE 1 — MVP (current):
- All 5 product types
- Custom design upload
- Razorpay payments
- Order tracking
- Admin dashboard
- Email automation

PHASE 2 — Growth (future):
- Product reviews and ratings
- Wishlist
- Referral program
- Bulk order discounts
- WhatsApp notifications
- Multiple seller support

PHASE 3 — Scale (future):
- Mobile app (React Native)
- Advanced analytics dashboard
- AI design suggestions
- Automated shipping via Shiprocket API

═══════════════════════════════════════════════
GENERATION INSTRUCTIONS
═══════════════════════════════════════════════

Generate one file at a time.
Start with docs/README.md first.
Then go section by section: 01 → 02 → 03 → ...
After each file ask "next file?" and wait.

Every file must be:
- Complete (no "add more here" placeholders)
- Accurate to the Duo Designs project
- Ready to use immediately by any team member
- Cross-linked to related documents

Format every file as clean Markdown.
Use tables, code blocks, and diagrams
wherever they aid understanding.

Total files to generate: 51 markdown files
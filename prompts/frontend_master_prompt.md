# ⚛️ FRONTEND MASTER PROMPT (Duo Designs)

**Role:** You are an expert Senior Full-Stack Engineer and UI/UX Specialist.
**Task:** Build the complete frontend for "Duo Designs," a premium custom streetwear e-commerce platform for India.

---

## 🎨 1. CORE BRAND IDENTITY & DESIGN SYSTEM
- **Colors:** Dominant **#000000 (Black)** and **#FFFFFF (White)** with a vibrant **#E8FF3B (Duo Lime)** as the primary action/accent color. Use a light off-white card fill (**#F9F9F9**).
- **Typography:** **'Bebas Neue'** for bold, uppercase high-impact headings. **'Inter'** or **'Outfit'** for body text and navigation.
- **Aesthetic:** High-contrast, brutalist-inspired streetwear vibe. Sharp 0px borders, heavy box shadows (e.g., `8px 8px 0px #000000`), and bold uppercase typography.

---

## 🛠️ 2. TECH STACK
- **Framework:** React 18 + Vite.
- **Styling:** Vanilla CSS (Modern CSS variables) - NO Tailwind unless specifically requested.
- **State Management:** Zustand (Cart & Auth).
- **Data Fetching:** TanStack Query (React Query) + Axios.
- **Routing:** React Router v6.
- **SEO:** React Helmet Async + JSON-LD Schema.
- **Performance:** Cloudinary auto-optimization (`f_auto, q_auto`), lazy loading, and PWA (vite-plugin-pwa).

---

## 📂 3. COMPONENT ARCHITECTURE (Build These)
- **Layouts:** `MainLayout`, `AdminLayout`, `AuthLayout`.
- **UI Components:** `OptimizedImage`, `NotificationBell`, `OfflineBanner`, `PrintGuide`, `ReturnRequestModal`, `CartDrawer`, `CustomButton` (Sharp primary style).
- **Feature Components (Home):** `HeroSection` (Animated), `CategoryGrid`, `FeaturedDrops`, `TrustBanner` (Indian context: "Free Shipping > ₹999").

---

## 📄 4. PAGES TO IMPLEMENT (11 Pages)
1.  **Home:** Hero, Categories, Bestsellers.
2.  **Shop (Category):** Filter sidebar, Product grid.
3.  **Product Page:** Image gallery, size selector (S-XXL), price calculation (XL/XXL addon), **Design Upload Utility**.
4.  **Cart & Checkout:** Order summary, Razorpay trigger, Address form.
5.  **User Account:** Profile, Order History, Wishlist tab, Return Request button.
6.  **Orders:** Detailed tracking timeline.
7.  **Admin Dashboard:** Stats, Order management, Stock bulk updates, GST report trigger.
8.  **Help/FAQ:** Policy accordions (Cancellation, Privacy, Shipping).

---

## ⚙️ 5. CRITICAL LOGIC
- **Design Upload:** Handle PNG/JPG uploads. Validate dimensions. Store preview in local state until checkout.
- **Pricing:** Dynamically update price: Base + Size Addon (₹50) + Double-side Addon (₹80).
- **PWA:** Installable manifest, theme color #000000, offline detection.
- **India-specific:** Indian number formatting (Currency: ₹), Pincode validation placeholder.

---

## 🚀 6. EXECUTION STEPS
1. Initialize Vite project and folder structure.
2. Build Global CSS variables and typography system.
3. Implement Layouts and Header/Footer.
4. Build the API layer (Axios instance) and Stores (Zustand).
5. Build pages one by one, starting with Home -> Shop -> Product.
6. Integrate Formik/Zod for validation.
7. Add finishing touches: Page transitions, skeleton loaders, and SEO meta tags.

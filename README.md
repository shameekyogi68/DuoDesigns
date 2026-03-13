# Duo Designs — Customer App

## Project Overview
Duo Designs is India's premium custom printing platform. This application allows customers to browse a curated selection of apparel (T-shirts, hoodies, oversized tees) and accessories (mugs, keychains), upload their own designs, and purchase custom-printed products with high-quality DTF (Direct to Film) technology.

## Tech Stack
- **Frontend**: React 19 (Vite)
- **State Management**: Zustand (Persisted)
- **Data Fetching**: React Query (@tanstack/react-query)
- **Routing**: React Router v7
- **Styling**: Vanilla CSS (Global Design System) + TailwindCSS for utility
- **Validation**: React Hook Form
- **Notifications**: React Hot Toast
- **API Client**: Axios

## Folder Structure
```
duo-designs-customer/
├── public/                 # Static assets & Netlify redirects
├── src/
│   ├── api/               # Axios instance & interceptors
│   ├── components/        # Functional components (common, layout, ui)
│   ├── constants/         # Magic strings, ROUTES, etc.
│   ├── data/              # Mock data (temporary)
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Route-level page components
│   ├── store/             # Zustand stores (auth, cart)
│   ├── styles/            # Global CSS & design system
│   └── utils/             # Helper functions (GST, validation)
```

## Getting Started
1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Run Development Server**:
   ```bash
   npm run dev
   ```
3. **Build for Production**:
   ```bash
   npm run build
   ```

## Environment Variables (.env guide)
Create a `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=your_razorpay_key
```

## Page List
- **Home (`/`)**: Hero section & featured categories.
- **Shop (`/shop`)**: Full product listing with filtering.
- **Product (`/product/:id`)**: Detailed product view & design upload.
- **Cart (`/cart`)**: Shopping cart & summary.
- **Auth (`/login`)**: OTP-based login flow.
- **Account (`/account`)**: User profile & order history.
- **Track (`/track`)**: Order status tracking.

## Component List
- **Header**: Navigation, search, and cart/wishlist status.
- **Footer**: Newsletter, shop links, and social icons.
- **DesignUpload**: Canvas-ready image upload component.
- **PageLoader**: Premium "Duo Designs" skeleton loading state.

## State Management Guide
- **AuthStore**: Manages JWT tokens and user profile state.
- **CartStore**: Handles item additions, quantity updates, and summary calculations (Subtotal, GST, Coupons).
- **WishlistStore**: Simple persistence for favorite products.

## API Integration Guide
- Axios interceptors are configured in `src/api/axios.js` to automatically attach Bearer tokens.
- Error handling redirects to `/login` on 401 Unauthorized responses.

## GST Calculation Logic
Found in `src/utils/gst.js`.
- **Intrastate**: 9% CGST + 9% SGST (for Karnataka customers).
- **Interstate**: 18% IGST (for orders outside Karnataka).

## Design System
- **Colors**: Premium Black (`#0a0a0a`), Duo Neon (`#c8ff00`), Chalk White (`#f8f8f4`).
- **Typography**: Bebas Neue (Headings), Inter (UI Text), Barlow (Details).

## Deployment Guide
This app is optimized for Netlify. Ensure the `_redirects` file is present in the `public/` folder to handle SPA routing.

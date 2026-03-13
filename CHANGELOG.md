# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-03-09

### Added
- **Core Architecture**: Initial project setup with React 19, Vite, and React Router v7.
- **Design System**: Global vanilla CSS design system with premium aesthetics, animations (scroll reveal), and glassmorphism.
- **Main Pages**: Implementation of all 12 core pages converted from HTML designs (Home, Shop, Category, Product, Cart, Login, Account, Track, Offers, Help, Wishlist, Order Success).
- **Cart System**: Persisted Zustand store for cart management with real-time summary calculations (Subtotal, GST).
- **Auth System**: Persisted Zustand store for user profiles and JWT token handling.
- **Product Engine**: Dynamic product page with size selection, color swapping, and price calculation (addons for XL/XXL).
- **Design Upload**: Custom `DesignUpload` component for customers to provide their own artwork.
- **GST Utility**: Robust calculation logic handling Intrastate (CGST/SGST) vs Interstate (IGST).
- **Pincode Checker**: Delivery availability validator based on Indian pincode logic.
- **Routing**: Protected route wrappers for secure account pages.
- **Loading State**: Premium `PageLoader` skeleton for lazy-loaded page transitions.
- **Deployment**: Netlify SPA routing configuration (`_redirects`).

### Fixed
- **White Screen Fix**: Resolved application crash caused by missing `DUO_PRODUCTS` import in `Header.jsx`.
- **Categories Visibility**: Fixed Intersection Observer logic in `App.jsx` to re-trigger reveal animations on route changes.
- **URL Mapping**: Corrected incorrect property access in `Product.jsx` (`product.cat` instead of `product.category`).

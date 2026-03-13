/**
 * @file         App.jsx
 * @description  Main Application wrapper for Duo Designs.
 *               Handles global routes, layout wrapping (Header/Footer),
 *               lazy loading, toast notifications, and scroll reveal logic.
 *
 * @module       root/App
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-09
 *
 * @dependencies
 *   - react (Suspense, lazy, useEffect)
 *   - react-router-dom (Routes, Route, useLocation)
 *   - react-hot-toast (Toaster)
 *   - components/layout (Header, Footer, ProtectedRoute)
 *   - components/common (PageLoader, ScrollToTop)
 *   - constants/routes (ROUTES)
 *
 * @notes
 *   - Implements IntersectionObserver for .reveal animations on scroll.
 *   - Observer re-scans DOM on route changes to support single-page navigation.
 */

import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ScrollToTop from './components/common/ScrollToTop';
import PageLoader from './components/common/PageLoader';
import { ROUTES } from './constants/routes';

// Lazy loaded pages from barrel export
import { 
    Home, Category, Categories, CustomDesign, Product, 
    Cart, Login, Account, Track, Offers, Help, 
    Wishlist, OrderSuccess, NotFound 
} from './pages';

// Layouts and Wrappers from barrel export
import { Header, Footer, ProtectedRoute } from './components/layout';

/**
 * @component App
 * @description Root application component managing layout and global state.
 * @returns {JSX.Element} The full application layout with routed content.
 */
function App() {
    const location = useLocation();

    // Initialize IntersectionObserver for scroll reveal animations
    React.useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        // Scan DOM for all .reveal elements
        const scan = () => {
            document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        };

        scan();
        
        // Re-scan after a delay to account for lazy-loaded component mounts
        const timeout = setTimeout(scan, 1000); 
        
        return () => {
            observer.disconnect();
            clearTimeout(timeout);
        };
    }, [location.pathname]); // IMPORTANT: Re-trigger scan on route change

    return (
        <>
            <ScrollToTop />
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">
                    <Suspense fallback={<PageLoader />}>
                        <Routes>
                            {/* Public Routes */}
                            <Route path={ROUTES.HOME} element={<Home />} />
                            <Route path={ROUTES.SHOP} element={<Category />} />
                            <Route path={ROUTES.CATEGORIES} element={<Categories />} />
                            <Route path={ROUTES.CATEGORY} element={<Category />} />
                            <Route path={ROUTES.CUSTOM_DESIGN} element={<CustomDesign />} />
                            <Route path={ROUTES.PRODUCT} element={<Product />} />
                            <Route path={ROUTES.CART} element={<Cart />} />
                            <Route path={ROUTES.CHECKOUT} element={<Cart />} />
                            <Route path={ROUTES.LOGIN} element={<Login />} />
                            <Route path={ROUTES.TRACK_ORDER} element={<Track />} />
                            <Route path={ROUTES.OFFERS} element={<Offers />} />
                            <Route path={ROUTES.HELP} element={<Help />} />
                            <Route path={ROUTES.WISHLIST} element={<Wishlist />} />
                            <Route path={ROUTES.ORDER_SUCCESS} element={<OrderSuccess />} />

                            {/* Protected Routes */}
                            <Route element={<ProtectedRoute />}>
                                <Route path={ROUTES.ACCOUNT} element={<Account />} />
                                <Route path={ROUTES.ORDERS} element={<Account />} />
                                <Route path={ROUTES.PROFILE} element={<Account />} />
                                <Route path={ROUTES.ADDRESSES} element={<Account />} />
                            </Route>

                            {/* 404 Not Found */}
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Suspense>
                </main>
                <Footer />
                <Toaster position="bottom-right" />
            </div>
        </>
    );
}

export default App;

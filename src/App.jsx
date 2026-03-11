import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ROUTES } from './constants/routes';

// Layouts and Wrappers
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/layout/ProtectedRoute';

// Lazy loaded pages
const Home = lazy(() => import('./pages/Home'));
const Category = lazy(() => import('./pages/Category'));
const Categories = lazy(() => import('./pages/Categories'));
const CustomDesign = lazy(() => import('./pages/CustomDesign'));
const Product = lazy(() => import('./pages/Product'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Cart'));
const Login = lazy(() => import('./pages/Login'));
const Account = lazy(() => import('./pages/Account'));
const Track = lazy(() => import('./pages/Track'));
const Offers = lazy(() => import('./pages/Offers'));
const Help = lazy(() => import('./pages/Help'));
const OrderSuccess = lazy(() => import('./pages/OrderSuccess'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Premium Loading Fallback
const PageLoader = () => (
    <div className="page-loader">
        <div className="loader-spinner"></div>
        <div className="loader-text">DUO DESIGNS</div>
    </div>
);

// Scroll to top component
function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [pathname]);
    return null;
}

// Scroll-to-top button
function ScrollToTopButton() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggle = () => {
            setVisible(window.scrollY > 400);
        };
        window.addEventListener('scroll', toggle, { passive: true });
        return () => window.removeEventListener('scroll', toggle);
    }, []);

    return (
        <button
            className={`scroll-to-top ${visible ? 'visible' : ''}`}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
        >
            ↑
        </button>
    );
}

// Intersection Observer for scroll reveal — watches for dynamically added elements
function ScrollRevealObserver() {
    const { pathname } = useLocation();

    useEffect(() => {
        const observed = new WeakSet();

        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
        );

        const scan = () => {
            document.querySelectorAll('.reveal').forEach((el) => {
                if (!observed.has(el)) {
                    observed.add(el);
                    io.observe(el);
                }
            });
        };

        // Initial scan (with a slight delay for lazy-loaded content)
        scan();
        const t1 = setTimeout(scan, 100);
        const t2 = setTimeout(scan, 500);
        const t3 = setTimeout(scan, 1200);

        // Watch for newly added DOM nodes (lazy loaded components)
        const mo = new MutationObserver(scan);
        mo.observe(document.body, { childList: true, subtree: true });

        return () => {
            io.disconnect();
            mo.disconnect();
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, [pathname]); // re-run when route changes

    return null;
}

function App() {
    return (
        <div className="flex flex-col min-h-screen">
            <ScrollToTop />
            <ScrollRevealObserver />
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
                        <Route path={ROUTES.CHECKOUT} element={<Checkout />} />
                        <Route path={ROUTES.LOGIN} element={<Login />} />
                        <Route path={ROUTES.TRACK_ORDER} element={<Track />} />
                        <Route path={ROUTES.OFFERS} element={<Offers />} />
                        <Route path={ROUTES.HELP} element={<Help />} />
                        <Route path={ROUTES.ORDER_SUCCESS} element={<OrderSuccess />} />

                        {/* Protected Routes */}
                        <Route element={<ProtectedRoute />}>
                            <Route path={ROUTES.ACCOUNT} element={<Account />} />
                            <Route path={ROUTES.ORDERS} element={<Account />} />
                            <Route path={ROUTES.PROFILE} element={<Account />} />
                            <Route path={ROUTES.ADDRESSES} element={<Account />} />
                        </Route>

                        {/* 404 Not Found */}
                        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
                    </Routes>
                </Suspense>
            </main>

            <Footer />
            <ScrollToTopButton />
        </div>
    );
}

export default App;

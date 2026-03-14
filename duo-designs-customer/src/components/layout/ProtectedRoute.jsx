/**
 * @file         ProtectedRoute.jsx
 * @description  Route guard component for Duo Designs.
 *               Ensures that certain routes are only accessible to authenticated users.
 *               Redirects unauthenticated users to the login page.
 *
 * @module       components/layout/ProtectedRoute
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-09
 *
 * @dependencies
 *   - react
 *   - react-router-dom (Navigate, Outlet, useLocation)
 *   - store/authStore (useAuthStore)
 *   - constants/routes (ROUTES)
 *
 * @notes
 *   - Captures the current location to redirect back after successful login.
 */

import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { ROUTES } from '../../constants/routes';

/**
 * @component ProtectedRoute
 * @description Higher-order component that restricts access based on authentication status.
 *
 * @returns {JSX.Element} Either the restricted content (Outlet) or a Navigate redirect
 *
 * @example
 *   <Route element={<ProtectedRoute />}>
 *     <Route path="/account" element={<Account />} />
 *   </Route>
 */
export default function ProtectedRoute() {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const location = useLocation();

    if (!isLoggedIn) {
        return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
    }

    return <Outlet />;
}

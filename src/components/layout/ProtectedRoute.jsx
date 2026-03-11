import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { ROUTES } from '../../constants/routes';

export default function ProtectedRoute() {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const location = useLocation();

    if (!isLoggedIn) {
        return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
    }

    return <Outlet />;
}

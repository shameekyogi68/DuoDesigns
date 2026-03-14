/** @file AdminProtectedRoute.jsx */
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAdminAuthStore } from '@/store/auth.store';
import { ROUTES } from '@/constants/routes';
import AdminLayout from '@/components/layout/AdminLayout';

/**
 * @component AdminProtectedRoute
 * @description Protects admin routes, redirects to login if not authenticated.
 */
const AdminProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAdminAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(ROUTES.LOGIN, { state: { from: location.pathname } });
    }
  }, [isAuthenticated, navigate, location]);

  if (!isAuthenticated) return null;

  return <AdminLayout>{children}</AdminLayout>;
};

export default AdminProtectedRoute;

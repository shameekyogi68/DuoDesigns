import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useAdminAuthStore } from '@/store/auth.store';
import { useAdminUIStore } from '@/store/ui.store';
import { ROUTES } from '@/constants/routes';

// Layout
import AdminLayout from '@/components/layout/AdminLayout';

// Pages
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import Orders from '@/pages/Orders';
import OrderDetail from '@/pages/OrderDetail';
import Products from '@/pages/Products';
import AddProduct from '@/pages/AddProduct';
import EditProduct from '@/pages/EditProduct';
import Stock from '@/pages/Stock';
import Customers from '@/pages/Customers';
import CustomerDetail from '@/pages/CustomerDetail';
import Coupons from '@/pages/Coupons';
import Shipping from '@/pages/Shipping';
import Payments from '@/pages/Payments';
import Partners from '@/pages/Partners';
import Settings from '@/pages/Settings';
import NotFound from '@/pages/NotFound';

import AdminProtectedRoute from '@/components/auth/AdminProtectedRoute';

const App = () => {
  return (
    <Routes>
      <Route path={ROUTES.LOGIN} element={<Login />} />
      
      <Route path="/" element={<AdminProtectedRoute><Dashboard /></AdminProtectedRoute>} />
      
      <Route path={ROUTES.ORDERS} element={<AdminProtectedRoute><Orders /></AdminProtectedRoute>} />
      <Route path={ROUTES.ORDER_DETAIL} element={<AdminProtectedRoute><OrderDetail /></AdminProtectedRoute>} />
      
      <Route path={ROUTES.PRODUCTS} element={<AdminProtectedRoute><Products /></AdminProtectedRoute>} />
      <Route path={ROUTES.ADD_PRODUCT} element={<AdminProtectedRoute><AddProduct /></AdminProtectedRoute>} />
      <Route path={ROUTES.EDIT_PRODUCT} element={<AdminProtectedRoute><EditProduct /></AdminProtectedRoute>} />
      
      <Route path={ROUTES.STOCK} element={<AdminProtectedRoute><Stock /></AdminProtectedRoute>} />
      <Route path={ROUTES.CUSTOMERS} element={<AdminProtectedRoute><Customers /></AdminProtectedRoute>} />
      <Route path={ROUTES.CUSTOMER_DETAIL} element={<AdminProtectedRoute><CustomerDetail /></AdminProtectedRoute>} />
      <Route path={ROUTES.COUPONS} element={<AdminProtectedRoute><Coupons /></AdminProtectedRoute>} />
      <Route path={ROUTES.SHIPPING} element={<AdminProtectedRoute><Shipping /></AdminProtectedRoute>} />
      <Route path={ROUTES.PAYMENTS} element={<AdminProtectedRoute><Payments /></AdminProtectedRoute>} />
      <Route path={ROUTES.PARTNERS} element={<AdminProtectedRoute><Partners /></AdminProtectedRoute>} />
      <Route path={ROUTES.SETTINGS} element={<AdminProtectedRoute><Settings /></AdminProtectedRoute>} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;

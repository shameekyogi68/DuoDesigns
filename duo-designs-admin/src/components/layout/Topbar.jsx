/** @file Topbar.jsx */
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { formatDate } from '@/utils/formatters';
import { RefreshCcw, Plus, Download, Save, CreditCard, Users, Tag, Truck } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const TITLES = {
  [ROUTES.DASHBOARD]: 'DASHBOARD',
  [ROUTES.ORDERS]: 'ORDERS',
  [ROUTES.PRODUCTS]: 'PRODUCTS',
  [ROUTES.STOCK]: 'STOCK MANAGEMENT',
  [ROUTES.CUSTOMERS]: 'CUSTOMERS',
  [ROUTES.COUPONS]: 'COUPONS & OFFERS',
  [ROUTES.SHIPPING]: 'SHIPPING ZONES',
  [ROUTES.PAYMENTS]: 'PAYMENTS',
  [ROUTES.PARTNERS]: 'PARTNERSHIP TRACKER',
  [ROUTES.SETTINGS]: 'SETTINGS',
};

const Topbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  let title = TITLES[pathname] || 'ADMIN PANEL';
  if (pathname.includes('/orders/')) title = 'ORDER DETAILS';
  else if (pathname === ROUTES.ADD_PRODUCT) title = 'ADD PRODUCT';
  else if (pathname.includes('/products/') && pathname.endsWith('/edit')) title = 'EDIT PRODUCT';
  else if (pathname.includes('/customers/')) title = 'CUSTOMER DETAILS';

  const getActionBtn = () => {
    switch (pathname) {
      case ROUTES.ORDERS:
        return <button className="topbar-btn primary"><Download size={14}/> Export CSV</button>;
      case ROUTES.PRODUCTS:
      case ROUTES.DASHBOARD:
        return <button className="topbar-btn primary" onClick={() => navigate(ROUTES.ADD_PRODUCT)}><Plus size={14}/> Add Product</button>;
      case ROUTES.CUSTOMERS:
        return <button className="topbar-btn primary"><Users size={14}/> Export CRM</button>;
      case ROUTES.PAYMENTS:
        return <button className="topbar-btn primary"><CreditCard size={14}/> GST Report</button>;
      case ROUTES.COUPONS:
        return <button className="topbar-btn primary"><Tag size={14}/> New Coupon</button>;
      case ROUTES.SHIPPING:
        return <button className="topbar-btn primary"><Truck size={14}/> Add Zone</button>;
      case ROUTES.SETTINGS:
        return <button className="topbar-btn primary" type="submit" form="settings-form"><Save size={14}/> Save All</button>;
      default:
        return null;
    }
  };

  const handleRefresh = async () => {
    await queryClient.invalidateQueries();
    toast.success('System Refreshed');
  };

  return (
    <div className="topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div className="topbar-title">{title}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 12px', background: '#002200', border: '1px solid #004400', borderRadius: '4px' }}>
          <div className="pulse-indicator"></div>
          <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--green)', textTransform: 'uppercase', letterSpacing: '1px' }}>System Live</span>
        </div>
      </div>
      <div className="topbar-right">
        <span className="topbar-date">{formatDate(new Date())}</span>
        <button className="topbar-btn" onClick={handleRefresh}>
          <RefreshCcw size={12} /> ⟳ Refresh
        </button>
        {getActionBtn()}
      </div>
    </div>
  );
};

export default Topbar;

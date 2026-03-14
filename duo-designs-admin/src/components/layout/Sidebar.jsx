/** @file Sidebar.jsx */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { useAdminAuthStore } from '@/store/auth.store';
import { useAdminUIStore } from '@/store/ui.store';
import { 
  LayoutDashboard, Package, Shirt, ClipboardList, 
  Users, Tag, Truck, IndianRupee, Handshake, 
  Settings, Globe, LogOut 
} from 'lucide-react';

const Sidebar = () => {
  const { logout } = useAdminAuthStore();
  const { sidebarOpen, unreadOrdersCount } = useAdminUIStore();

  return (
    <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
      <div className="sidebar-logo">
        <NavLink to={ROUTES.DASHBOARD} className="logo">
          DUO<span>DESIGNS</span>
        </NavLink>
        <span className="badge">Admin Panel</span>
      </div>

      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="nav-section">
          <div className="nav-label">Overview</div>
          <NavLink to={ROUTES.DASHBOARD} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <span className="icon"><LayoutDashboard size={16} /></span> Dashboard
          </NavLink>
        </div>

        <div className="nav-section">
          <div className="nav-label">Store</div>
          <NavLink to={ROUTES.ORDERS} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <span className="icon"><Package size={16} /></span> Orders 
            {unreadOrdersCount > 0 && <span className="badge">{unreadOrdersCount}</span>}
          </NavLink>
          <NavLink to={ROUTES.PRODUCTS} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <span className="icon"><Shirt size={16} /></span> Products
          </NavLink>
          <NavLink to={ROUTES.STOCK} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <span className="icon"><ClipboardList size={16} /></span> Stock
          </NavLink>
          <NavLink to={ROUTES.CUSTOMERS} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <span className="icon"><Users size={16} /></span> Customers
          </NavLink>
        </div>

        <div className="nav-section">
          <div className="nav-label">Marketing</div>
          <NavLink to={ROUTES.COUPONS} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <span className="icon"><Tag size={16} /></span> Coupons & Offers
          </NavLink>
          <NavLink to={ROUTES.SHIPPING} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <span className="icon"><Truck size={16} /></span> Shipping Zones
          </NavLink>
        </div>

        <div className="nav-section">
          <div className="nav-label">Finance</div>
          <NavLink to={ROUTES.PAYMENTS} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <span className="icon"><IndianRupee size={16} /></span> Payments
          </NavLink>
          <NavLink to={ROUTES.PARTNERS} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <span className="icon"><Handshake size={16} /></span> Partnership <span className="badge green">₹</span>
          </NavLink>
        </div>

        <div className="nav-section" style={{ borderBottom: 'none' }}>
          <NavLink to={ROUTES.SETTINGS} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <span className="icon"><Settings size={16} /></span> Settings
          </NavLink>
        </div>
      </nav>

      <div className="sidebar-bottom">
        <a href="https://duodesigns.in" target="_blank" rel="noreferrer" className="nav-link">
          <span className="icon"><Globe size={16} /></span> View Website
        </a>
        <button className="nav-link" onClick={logout} style={{ color: 'var(--red)' }}>
          <span className="icon"><LogOut size={16} /></span> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

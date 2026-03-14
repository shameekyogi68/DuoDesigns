import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  IndianRupee, 
  FileText, 
  Settings, 
  Globe, 
  LogOut 
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

const Sidebar = () => {
  const logout = useAuthStore((state) => state.logout);

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <NavLink to="/" className="logo">
          DUO<span>DESIGNS</span>
        </NavLink>
        <span className="badge">Agency Tracker</span>
      </div>

      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="nav-section">
          <div className="nav-label">Analytics</div>
          <NavLink to="/" className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}>
             <LayoutDashboard size={16} /> Dashboard
          </NavLink>
        </div>

        <div className="nav-section">
          <div className="nav-label">Logs</div>
          <NavLink to="/orders" className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}>
             <Package size={16} /> Revenue Log
          </NavLink>
        </div>

        <div className="nav-section">
          <div className="nav-label">Finance</div>
          <NavLink to="/settlements" className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}>
             <IndianRupee size={16} /> Settlements
          </NavLink>
          <NavLink to="/reports" className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}>
             <FileText size={16} /> Reports
          </NavLink>
        </div>

        <div className="nav-section" style={{ borderBottom: 'none' }}>
          <div className="nav-label">System</div>
          <NavLink to="/settings" className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}>
             <Settings size={16} /> Configuration
          </NavLink>
        </div>
      </nav>

      <div className="sidebar-bottom">
        <a href="https://duodesigns.in" target="_blank" rel="noreferrer" className="nav-link-item">
          <Globe size={16} /> View Website
        </a>
        <button className="nav-link-item" onClick={logout} style={{ color: 'var(--red)' }}>
          <LogOut size={16} /> Exit Portal
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

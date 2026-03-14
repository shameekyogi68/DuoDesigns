import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Calendar, 
  FileText, 
  Settings,
  LogOut,
  Zap
} from 'lucide-react';
import { ROUTES } from '@/constants/app';
import { useAuthStore } from '@/store/authStore';

const Sidebar = () => {
  const logout = useAuthStore(state => state.logout);

  const navItems = [
    { label: 'Intelligence', icon: LayoutDashboard, path: ROUTES.DASHBOARD },
    { label: 'Orders Log', icon: ShoppingBag, path: ROUTES.ORDERS },
    { label: 'Settlements', icon: Calendar, path: ROUTES.MONTHLY },
    { label: 'Invoicing', icon: FileText, path: ROUTES.REPORTS },
    { label: 'System Config', icon: Settings, path: ROUTES.SETTINGS },
  ];

  return (
    <aside className="w-64 min-w-[256px] bg-[#000] border-r border-[#252525] flex flex-col h-screen sticky top-0">
      <div className="p-10 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Zap size={20} className="text-[#e8ff3b] fill-[#e8ff3b]" />
          <h1 className="font-heading text-2xl tracking-wider text-white">DUO AGENCY</h1>
        </div>
        <div className="text-[10px] font-bold text-[#e8ff3b] tracking-[0.2em] uppercase opacity-50">Revenue Engine</div>
      </div>

      <nav className="flex-1 px-6 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 text-lg transition-all
              ${isActive 
                ? 'text-[#e8ff3b] border-l-2 border-[#e8ff3b] bg-[#e8ff3b]/5 pl-6' 
                : 'text-gray-500 hover:text-white hover:pl-6'}
              font-heading uppercase tracking-wide
            `}
          >
            <item.icon size={18} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-8 border-t border-[#252525]">
        <button 
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 text-xs font-bold text-gray-600 hover:text-red-500 transition-colors uppercase tracking-widest"
        >
          <LogOut size={14} />
          Terminal Exit
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

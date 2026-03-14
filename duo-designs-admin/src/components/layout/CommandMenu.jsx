/** @file CommandMenu.jsx */
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { 
  Search, 
  LayoutDashboard, 
  ShoppingBag, 
  Shirt, 
  Users, 
  Ticket, 
  Truck, 
  Settings,
  Package
} from 'lucide-react';

const commands = [
  { label: 'Dashboard', icon: LayoutDashboard, route: ROUTES.DASHBOARD, shortcut: 'G D' },
  { label: 'View Orders', icon: ShoppingBag, route: ROUTES.ORDERS, shortcut: 'G O' },
  { label: 'View Products', icon: Shirt, route: ROUTES.PRODUCTS, shortcut: 'G P' },
  { label: 'Add New Product', icon: Shirt, route: ROUTES.ADD_PRODUCT, shortcut: 'A P' },
  { label: 'Manage Stock', icon: Package, route: ROUTES.STOCK, shortcut: 'G S' },
  { label: 'Customers', icon: Users, route: ROUTES.CUSTOMERS, shortcut: 'G C' },
  { label: 'Coupons', icon: Ticket, route: ROUTES.COUPONS, shortcut: 'G Q' },
  { label: 'Shipping Zones', icon: Truck, route: ROUTES.SHIPPING, shortcut: 'G Z' },
  { label: 'Store Settings', icon: Settings, route: ROUTES.SETTINGS, shortcut: 'G X' },
];

const CommandMenu = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const filteredCommands = commands.filter(cmd => 
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === 'Enter') {
        if (filteredCommands[selectedIndex]) {
          navigate(filteredCommands[selectedIndex].route);
          onClose();
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, navigate, onClose]);

  if (!isOpen) return null;

  return (
    <div className="command-menu-overlay" onClick={onClose}>
      <div className="command-menu" onClick={e => e.stopPropagation()}>
        <input 
          ref={inputRef}
          type="text" 
          className="command-search" 
          placeholder="Type a command or search..." 
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedIndex(0);
          }}
        />
        <div className="command-list">
          {filteredCommands.length === 0 ? (
            <div style={{ padding: '20px', textAlign: 'center', color: '#666', fontSize: '14px' }}>
              No results for "{query}"
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const Icon = cmd.icon;
              return (
                <div 
                  key={cmd.label} 
                  className={`command-item ${idx === selectedIndex ? 'selected' : ''}`}
                  onClick={() => {
                    navigate(cmd.route);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Icon size={16} />
                    <span className="label">{cmd.label}</span>
                  </div>
                  <span className="shortcut">{cmd.shortcut}</span>
                </div>
              );
            })
          )}
        </div>
        <div style={{ padding: '12px 24px', borderTop: '1px solid #222', display: 'flex', gap: '16px', fontSize: '10px', color: '#444', textTransform: 'uppercase', fontWeight: 800 }}>
          <span>↑↓ Navigate</span>
          <span>↵ Open</span>
          <span>esc Close</span>
        </div>
      </div>
    </div>
  );
};

export default CommandMenu;

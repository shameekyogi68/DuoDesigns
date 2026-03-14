/** @file AdminLayout.jsx */
import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useAdminUIStore } from '@/store/ui.store';
import { useNewOrderPolling } from '@/hooks/useNewOrderPolling';
import CommandMenu from './CommandMenu';
import { useState, useEffect } from 'react';

const AdminLayout = ({ children }) => {
  const { sidebarOpen } = useAdminUIStore();
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);
  
  // Start background processes
  useNewOrderPolling();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandMenuOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <Sidebar />
      <div 
        className={`main ${!sidebarOpen ? 'collapsed' : ''}`}
        style={{ marginLeft: sidebarOpen ? 'var(--sidebar-w)' : '0', width: sidebarOpen ? 'calc(100% - var(--sidebar-w))' : '100%' }}
      >
        <Topbar />
        <main className="content">
          {children}
        </main>
        <CommandMenu 
          isOpen={commandMenuOpen} 
          onClose={() => setCommandMenuOpen(false)} 
        />
      </div>
    </>
  );
};

export default AdminLayout;

import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import CommandMenu from './CommandMenu';
import ChatSupport from '@/components/ui/ChatSupport';
import { useAuthStore } from '@/store/authStore';

const AppLayout = () => {
  const { isLoggedIn, checkSession } = useAuthStore();
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isValid = checkSession();
    if (!isValid) navigate('/login');
  }, [checkSession, navigate]);

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
    <div className="flex bg-[#111] min-h-screen">
      <Sidebar />
      <CommandMenu isOpen={commandMenuOpen} onClose={() => setCommandMenuOpen(false)} />
      
      <div className="main-stage">
        <Topbar />
        
        <div className="page-content reveal">
          <Outlet />
        </div>

        <ChatSupport />
      </div>
    </div>
  );
};

export default AppLayout;

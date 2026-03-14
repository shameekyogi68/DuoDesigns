import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { Toaster } from 'react-hot-toast';
import { useAutoSync } from '@/hooks/useAutoSync';

const AppLayout = () => {
  useAutoSync();
  
  return (
    <div className="flex min-h-screen bg-[#0F1117] text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="content-wrapper">
            <Outlet />
          </div>
        </main>
      </div>
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#1a1d27',
            color: '#fff',
            border: '1px solid #2e3347',
          },
        }}
      />
    </div>
  );
};

export default AppLayout;

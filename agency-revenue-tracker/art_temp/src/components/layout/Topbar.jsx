import React from 'react';
import { RefreshCw, Clock, ExternalLink, Activity } from 'lucide-react';
import { useOrdersStore } from '@/store/ordersStore';
import { formatDistanceToNow } from 'date-fns';

const Topbar = () => {
  const { syncOrders, isSyncing, lastSyncedAt } = useOrdersStore();

  return (
    <header className="h-16 border-b border-[#252525] bg-[#0a0a0a]/90 backdrop-blur-xl sticky top-0 z-10 flex items-center justify-center w-full">
      <div className="content-wrapper flex items-center justify-between px-8">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            <Activity size={12} className={isSyncing ? 'text-[#e8ff3b] animate-pulse' : 'text-emerald-500'} />
            Agency Server: {isSyncing ? 'LINKING DATA...' : 'READY'}
          </div>
        </div>

        <div className="flex items-center gap-6">
          {lastSyncedAt && (
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-600 uppercase tracking-widest">
              <Clock size={12} />
              <span>LOGGED {formatDistanceToNow(new Date(lastSyncedAt), { addSuffix: true })}</span>
            </div>
          )}
          
          <button 
            onClick={syncOrders}
            disabled={isSyncing}
            className="text-[11px] font-bold uppercase tracking-widest text-white hover:text-[#e8ff3b] flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            <RefreshCw size={14} className={isSyncing ? 'animate-spin' : ''} />
            Force Sync
          </button>

          <a 
            href="https://duodesigns.in/admin" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn py-1 px-3 text-xs h-8"
          >
            Main Admin
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Topbar;

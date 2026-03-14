import React from 'react';
import { RefreshCw, LayoutTemplate } from 'lucide-react';
import { useOrders } from '@/hooks/useOrders';
import { format } from 'date-fns';

const Topbar = () => {
  const { lastSyncedAt, isRefetching, refetch } = useOrders();

  return (
    <header className="top-strip">
      <div className="flex items-center gap-4">
        <h2 className="font-heading text-2xl tracking-[2px] pt-1">AGENCY PORTAL</h2>
        <div className="h-6 w-[1px] bg-[#222]"></div>
        <span className="text-[12px] text-[var(--gray)] font-semibold uppercase tracking-[1px]">
          Live Analytics
        </span>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-[11px] text-[var(--gray)] font-bold flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-[var(--green)]"></div>
           Last Sync: {lastSyncedAt ? format(new Date(lastSyncedAt), 'HH:mm:ss') : 'N/A'}
        </div>

        <button 
          onClick={refetch}
          disabled={isRefetching}
          className={`btn-action ${isRefetching ? 'opacity-50' : ''}`}
        >
          <RefreshCw size={14} className={isRefetching ? 'animate-spin' : ''} />
          Sync Data
        </button>

        <a 
          href="https://admin.duodesigns.in" 
          target="_blank" 
          rel="noreferrer"
          className="btn-action primary"
        >
          <LayoutTemplate size={14} />
          Full Admin
        </a>
      </div>
    </header>
  );
};

export default Topbar;

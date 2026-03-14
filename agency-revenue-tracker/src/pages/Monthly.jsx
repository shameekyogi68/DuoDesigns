import React from 'react';
import { useOrdersStore } from '@/store/ordersStore';
import { groupOrdersByMonth, getMonthLabel } from '@/utils/commission';
import { formatCurrency } from '@/utils/formatters';
import { 
  ArrowRight,
  History,
  Info,
  Layers,
  ShieldCheck
} from 'lucide-react';

const Monthly = () => {
  const { orders, monthlyPaymentStatus, togglePaymentStatus } = useOrdersStore();
  
  // High-Fidelity Mock Data fallback for review
  const rawOrders = orders.length > 0 ? orders : [
    { _id: 'm1', createdAt: new Date('2025-01-15'), totalAmount: 1400000 },
    { _id: 'm2', createdAt: new Date('2025-02-15'), totalAmount: 3200000 },
    { _id: 'm3', createdAt: new Date('2025-03-15'), totalAmount: 1150000 }
  ];
  
  const grouped = groupOrdersByMonth(rawOrders);
  const months = Object.keys(grouped).sort().reverse();

  return (
    <div className="space-y-12">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
        <div className="space-y-4">
          <div className="nav-label !px-0">Fiscal Archives</div>
          <h1 className="text-6xl font-heading tracking-[5px] text-[var(--white)] leading-none">
            Settlement <br /> Cycles
          </h1>
          <p className="text-[11px] font-bold uppercase tracking-[1px] text-[var(--gray)] max-w-sm flex items-center gap-2">
            <History size={14} className="text-[var(--accent)]" />
            Verified historical distribution logs for agency fees.
          </p>
        </div>
        
        <div className="max-w-xs p-6 bg-[#1a1a1a] border border-[#222] rounded-sm">
           <div className="flex items-start gap-4">
              <div className="p-2 bg-[#111] border border-[#333] rounded text-[var(--accent)]">
                <Info size={18} />
              </div>
              <p className="text-[11px] leading-relaxed text-[var(--gray)] font-bold uppercase tracking-wider">
                Cycle resolution is locked after authorization. Contact system node for re-entry.
              </p>
           </div>
        </div>
      </div>

      {/* Grid-Based Settlement Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-[#222]">
        {months.map((monthKey, idx) => {
          const monthOrders = grouped[monthKey];
          const totalRevenue = monthOrders.reduce((sum, o) => sum + o.totalAmount, 0);
          const commission = totalRevenue * 0.05;
          const status = monthlyPaymentStatus[monthKey] || 'pending';
          const isPaid = status === 'paid';

          return (
            <div key={monthKey} className="p-10 border-r border-b border-[#222] last:border-r-0 relative group">
              {/* Status Ribbon */}
              <div className={`absolute top-0 right-0 px-4 py-1 text-[9px] font-black uppercase tracking-[3px] ${isPaid ? 'bg-[var(--accent)] text-black' : 'bg-black text-white border-b border-l border-[#222]'}`}>
                {status}
              </div>

              <div className="mb-10">
                <h3 className="text-4xl font-heading text-[var(--white)] tracking-[2px] mb-2">{getMonthLabel(monthKey)}</h3>
                <div className="flex items-center gap-3">
                   <Layers size={12} className="text-[#444]" />
                   <p className="text-[9px] text-[#444] uppercase font-black tracking-widest">{monthOrders.length} Verified Units</p>
                </div>
              </div>

              <div className="space-y-6 mb-12">
                <div className="flex justify-between items-center py-4 border-b border-[#222]">
                  <span className="text-[10px] text-[var(--gray)] font-bold uppercase tracking-widest">Market Flow</span>
                  <span className="text-sm font-bold text-[var(--white)]">{formatCurrency(totalRevenue)}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-[var(--accent)] font-bold uppercase tracking-[2px] mb-4 flex items-center gap-2">
                    <ShieldCheck size={12} /> Finalized share
                  </span>
                  <span className="text-6xl font-heading text-[var(--white)] tracking-tight leading-none">{formatCurrency(commission)}</span>
                </div>
              </div>

              <button 
                onClick={() => togglePaymentStatus(monthKey)}
                className={`
                  w-full flex items-center justify-between px-6 py-4 border font-bold text-[11px] uppercase tracking-[3px] transition-all
                  ${isPaid 
                    ? 'bg-[#111] border-[#333] text-[var(--gray)] hover:text-[var(--white)]' 
                    : 'bg-[var(--accent)] border-[var(--accent)] text-black hover:bg-[#d4eb35] shadow-[0_0_20px_rgba(232,255,59,0.1)]'}
                `}
              >
                <span>{isPaid ? 'REOPEN CYCLE' : 'AUTHORIZE SETTLEMENT'}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          );
        })}
      </div>

      {months.length === 0 && (
        <div className="py-24 text-center bg-[#111] border border-dashed border-[#222]">
          <p className="text-[11px] font-black uppercase tracking-[0.4em] text-[#444]">No archived cycles in this node</p>
        </div>
      )}
    </div>
  );
};

export default Monthly;

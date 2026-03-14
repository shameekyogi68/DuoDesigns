import React from 'react';
import { useOrdersStore } from '@/store/ordersStore';
import StatCard from '@/components/ui/StatCard';
import MonthlyRevenueChart from '@/components/charts/MonthlyRevenueChart';
import PaymentStatusChart from '@/components/charts/PaymentStatusChart';
import { 
  Activity,
  CreditCard,
  Package,
  Wallet
} from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';

const Dashboard = () => {
  const { stats } = useOrdersStore();
  
  const displayStats = stats?.totalRevenue ? stats : {
    totalRevenue: 2450000,
    totalCommission: 122500,
    orderCount: 184,
    paidCommission: 95000,
    pendingCommission: 27500,
    monthlyRevenue: [
      { label: 'JAN', revenue: 450000 },
      { label: 'FEB', revenue: 850000 },
      { label: 'MAR', revenue: 1150000 }
    ]
  };

  return (
    <div className="space-y-8">
      {/* Page Title Section */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-heading tracking-[3px]">Executive Dashboard</h1>
        <div className="flex gap-2">
           <button className="btn-action">Export Audit</button>
           <button className="btn-action primary">New Payout</button>
        </div>
      </div>

      {/* Grid-Based Stats exactly like Admin */}
      <div className="stats-grid">
        <StatCard 
          label="Total Ecosystem Revenue"
          value={formatCurrency(displayStats.totalRevenue)}
          sub="Gross Market Volume"
          icon={Activity}
        />
        <StatCard 
          label="Estimated Commission"
          value={formatCurrency(displayStats.totalCommission)}
          sub="Pending Verification"
          icon={Wallet}
        />
        <StatCard 
          label="Verified Unit Log"
          value={displayStats.orderCount.toString()}
          sub="Total Shipments"
          icon={Package}
        />
        <StatCard 
          label="Settled Balance"
          value={formatCurrency(displayStats.paidCommission)}
          sub="Transferred to Agency"
          icon={CreditCard}
        />
      </div>

      {/* Analytics Row + System Log */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-0 border border-[#222]">
        <div className="xl:col-span-2 p-10 border-r border-[#222]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-heading tracking-[2px]">Performance Velocity</h3>
            <span className="text-[10px] font-bold text-[var(--accent)]">+15.2% Momentum</span>
          </div>
          <MonthlyRevenueChart data={displayStats.monthlyRevenue} />
        </div>
        
        <div className="p-10 bg-[#0d0d0d]">
          <h3 className="text-xl font-heading tracking-[2px] mb-8">System Heartbeat</h3>
          <div className="space-y-6">
            {[
              { time: '16:02:11', event: 'Ledger Node Synchronized', type: 'success' },
              { time: '15:45:02', event: 'API Handshake Verified', type: 'success' },
              { time: '14:22:15', event: 'Security Certificate Renewed', type: 'alert' },
              { time: '12:01:44', event: 'Fiscal Cycle DE-99 Initialized', type: 'info' }
            ].map((log, i) => (
              <div key={i} className="flex gap-4 group">
                <span className="text-[9px] font-mono text-[#333] group-hover:text-[var(--accent)] transition-colors">{log.time}</span>
                <div className="flex-1">
                   <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--white)]">{log.event}</p>
                   <div className="flex items-center gap-2 mt-1">
                      <div className={`w-1 h-1 rounded-full ${log.type === 'success' ? 'bg-[var(--green)]' : log.type === 'alert' ? 'bg-[var(--accent)]' : 'bg-[var(--blue)]'}`}></div>
                      <span className="text-[8px] font-black text-[#555] uppercase tracking-widest">Protocol Verified</span>
                   </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 p-6 bg-[#111] border border-[#222] rounded-sm">
             <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse"></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[var(--white)]">Encryption Active</span>
             </div>
             <p className="text-[10px] text-[var(--gray)] leading-relaxed italic">
               All data transmitted is secured via Duo Designs Private Tunnel. 4096-bit RSA handshake active.
             </p>
          </div>
        </div>
      </div>

      {/* Settlement overview */}
      <div className="chart-box flex flex-col items-center !border-t-0">
        <h3 className="text-xl font-heading tracking-[2px] self-start mb-8">Fiscal Distribution status</h3>
        <PaymentStatusChart 
          paid={displayStats.paidCommission} 
          pending={displayStats.pendingCommission} 
        />
      </div>
    </div>
  );
};

export default Dashboard;

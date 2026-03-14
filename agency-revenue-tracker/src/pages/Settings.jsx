import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Save, 
  RefreshCw, 
  Shield, 
  Database, 
  Zap,
  Globe,
  Bell
} from 'lucide-react';
import { useOrdersStore } from '@/store/ordersStore';
import toast from 'react-hot-toast';

const Settings = () => {
  const { commissionRate, setCommissionRate, syncOrders, isSyncing } = useOrdersStore();
  const [localRate, setLocalRate] = useState(commissionRate * 100);

  const handleSaveFee = () => {
    setCommissionRate(localRate / 100);
    toast.success('Fee Protocol Updated', {
      style: {
        background: '#111',
        color: '#e8ff3b',
        border: '1px solid #222'
      }
    });
  };

  const sections = [
    { id: 'fiscal', label: 'Fiscal Architecture', icon: Database },
    { id: 'security', label: 'Node Security', icon: Shield },
    { id: 'network', label: 'Network & Sync', icon: Globe },
    { id: 'alerts', label: 'Notifications', icon: Bell }
  ];

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-heading tracking-[3px]">System Configuration</h1>
          <p className="text-[11px] font-bold text-[var(--gray)] uppercase tracking-[1px]">Manage Internal Governance Protocols</p>
        </div>
        <button 
          onClick={syncOrders} 
          disabled={isSyncing}
          className="btn-action"
        >
          <RefreshCw size={14} className={isSyncing ? 'animate-spin' : ''} />
          Force Sync
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Navigation Column */}
        <div className="space-y-2">
          {sections.map(s => (
            <button 
              key={s.id}
              className={`w-full flex items-center gap-3 px-4 py-3 text-[11px] font-bold uppercase tracking-widest text-left transition-all ${
                s.id === 'fiscal' ? 'bg-[#161600] text-[var(--accent)] border-l-2 border-[var(--accent)]' : 'text-[var(--gray)] hover:bg-[#1a1a1a] hover:text-[var(--white)]'
              }`}
            >
              <s.icon size={16} />
              {s.label}
            </button>
          ))}
        </div>

        {/* Settings Content Column */}
        <div className="md:col-span-3 space-y-8">
          {/* Fiscal Settings */}
          <div className="luxury-card space-y-8">
            <div className="flex items-center gap-4 pb-4 border-b border-[#222]">
               <div className="w-10 h-10 bg-[#1a1a1a] flex items-center justify-center rounded text-[var(--accent)]">
                  <Zap size={20} />
               </div>
               <div>
                  <h3 className="font-bold text-[14px] uppercase tracking-wider">Commission fee Protocol</h3>
                  <p className="text-[11px] text-[var(--gray)]">Adjust the variable fee applied to gross marketplace revenue.</p>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[2px] text-[var(--gray)] ml-1">Current Fee Percentage (%)</label>
                  <div className="flex gap-2">
                    <input 
                      type="number" 
                      className="form-box-input !py-4 text-lg" 
                      value={localRate}
                      onChange={(e) => setLocalRate(e.target.value)}
                    />
                    <button 
                      onClick={handleSaveFee}
                      className="btn-action primary !px-6"
                    >
                      <Save size={18} />
                    </button>
                  </div>
               </div>

               <div className="p-6 bg-[#1a1a1a] border border-dashed border-[#333] flex flex-col justify-center">
                  <p className="text-[10px] text-[var(--gray)] uppercase font-black mb-2 tracking-widest">Calculated Impact</p>
                  <p className="text-[12px] font-bold text-[var(--white)] leading-relaxed italic">
                    "Setting the fee to {localRate}% will result in a projected monthly yield of {formatCurrency(1200000 * (localRate / 100))} based on last cycles volume."
                  </p>
               </div>
            </div>
          </div>

          {/* Infrastructure Health */}
          <div className="luxury-card space-y-6">
            <h3 className="font-bold text-[14px] uppercase tracking-wider pb-4 border-b border-[#222]">Infrastructure Health</h3>
            
            <div className="space-y-4">
              {[
                { name: 'Core DB Node', status: 'Optimal', load: '12%' },
                { name: 'API Tunnel (Duo Main)', status: 'High Latency', load: '88%' },
                { name: 'Auth Hash Node', status: 'Optimal', load: '0.2%' }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-[#1a1a1a] border border-[#222]">
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${item.status === 'Optimal' ? 'bg-[var(--green)]' : 'bg-[var(--accent)]'}`}></div>
                    <span className="text-[12px] font-extrabold uppercase tracking-widest">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-[10px] text-[var(--gray)] font-bold">LOAD: {item.load}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest border border-[#333] px-2 py-0.5">{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

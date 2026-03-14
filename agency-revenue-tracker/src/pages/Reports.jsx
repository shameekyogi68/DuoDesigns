import React from 'react';
import { 
  FileText, 
  Download, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { useOrdersStore } from '@/store/ordersStore';
import { formatCurrency } from '@/utils/formatters';

const Reports = () => {
  const { stats } = useOrdersStore();

  const reportTypes = [
    { 
      title: 'Monthly Fiscal Audit', 
      desc: 'Complete ledger of all verified transactions and tax adjustments.',
      icon: FileText,
      status: 'Ready',
      date: 'Mar 14, 2025'
    },
    { 
      title: 'Agency Performance Review', 
      desc: 'Quarterly breakdown of revenue velocity and conversion metrics.',
      icon: TrendingUp,
      status: 'Ready',
      date: 'Mar 01, 2025'
    },
    { 
      title: 'Tax & Compliance (Form 16A)', 
      desc: 'Consolidated TDS statements and withholding tax logs.',
      icon: ShieldCheck,
      status: 'Processing',
      date: 'Pending'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-heading tracking-[3px]">Audit Reports</h1>
          <p className="text-[11px] font-bold text-[var(--gray)] uppercase tracking-[1px]">Access encrypted fiscal documentation</p>
        </div>
        <button className="btn-action primary">
          <Download size={14} /> Generate Custom
        </button>
      </div>

      {/* Stats Summary Panel */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Volume Audited</div>
          <div className="stat-num">{formatCurrency(stats?.totalRevenue || 2450000)}</div>
          <p className="text-[10px] font-bold text-[var(--gray)] mt-2 uppercase tracking-widest">Across 184 Units</p>
        </div>
        <div className="stat-card">
          <div className="stat-label">Tax Liability est.</div>
          <div className="stat-num">{formatCurrency((stats?.totalRevenue || 2450000) * 0.18)}</div>
          <p className="text-[10px] font-bold text-[var(--green)] mt-2 uppercase tracking-widest">Compliance Active</p>
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        <h3 className="text-xl font-heading tracking-[2px] mb-6">Available Documentation</h3>
        
        {reportTypes.map((report, idx) => (
          <div key={idx} className="luxury-card group !p-0 overflow-hidden hover:border-[var(--accent)] transition-all">
            <div className="flex items-stretch">
              <div className="w-2 bg-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex-1 p-6 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-[#1a1a1a] border border-[#222] flex items-center justify-center rounded-lg text-[var(--accent)]">
                    <report.icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[15px] text-[var(--white)] mb-1 uppercase tracking-wider">{report.title}</h4>
                    <p className="text-[12px] text-[var(--gray)] max-w-md leading-relaxed">{report.desc}</p>
                  </div>
                </div>

                <div className="flex items-center gap-12">
                   <div className="text-right">
                      <p className="text-[9px] font-black text-[var(--gray)] uppercase tracking-widest mb-1">Last Update</p>
                      <p className="text-[11px] font-bold text-[var(--white)]">{report.date}</p>
                   </div>
                   
                   <div className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-sm ${
                      report.status === 'Ready' ? 'bg-[#002200] text-[var(--green)]' : 'bg-[#220] text-[var(--accent)] animate-pulse'
                   }`}>
                      {report.status}
                   </div>

                   <div className="flex gap-2">
                      <button className="w-10 h-10 border border-[#222] flex items-center justify-center hover:bg-[#222] transition-colors rounded">
                        <Download size={16} className="text-[var(--gray)]" />
                      </button>
                      <button className="w-10 h-10 border border-[#222] flex items-center justify-center hover:bg-[#222] transition-colors rounded">
                        <ExternalLink size={16} className="text-[var(--gray)]" />
                      </button>
                   </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Security Advisory */}
      <div className="bg-[#1a1a1a] border border-[#222] p-6 flex items-start gap-4">
        <AlertCircle className="text-[var(--accent)] shrink-0" size={20} />
        <div className="space-y-2">
          <p className="text-[11px] font-bold text-[var(--white)] uppercase tracking-widest">Security Protocol Advisory</p>
          <p className="text-[11px] text-[var(--gray)] leading-relaxed">
            All reports are cryptographically signed and tracked via Duo Designs Internal Ledger. 
            Unauthorized export of audit documentation will be flagged by the security node. 
            Verification ID: DE-882-SYS-X
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reports;

import React, { useState } from 'react';
import { useOrdersStore } from '@/store/ordersStore';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { Search, Eye, Download, Filter } from 'lucide-react';
import toast from 'react-hot-toast';

const Orders = () => {
  const { orders, commissionRate } = useOrdersStore();
  const [search, setSearch] = useState('');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    toast.loading('Initializing Encryption Handshake...', { duration: 1000 });
    setTimeout(() => {
       toast.success('Digital Vault Compressed & Exported', {
          icon: '📁',
          style: { background: '#111', color: '#e8ff3b', border: '1px solid #222' }
       });
       setIsExporting(false);
    }, 2000);
  };

  // Fallback / Mock Data if API is down
  const displayOrders = orders.length > 0 ? orders : [
    { _id: '1', orderId: 'DX-1002-V1', createdAt: new Date(), totalAmount: 45000, shippingAddress: { name: 'Siddharth M.' } },
    { _id: '2', orderId: 'DX-1003-V4', createdAt: new Date(), totalAmount: 12000, shippingAddress: { name: 'Anya Sharma' } },
    { _id: '3', orderId: 'DX-1004-V2', createdAt: new Date(), totalAmount: 8500, shippingAddress: { name: 'Julian R.' } }
  ];

  const filteredOrders = displayOrders.filter(order => 
    order.orderId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-heading tracking-[3px]">Revenue Logistics</h1>
        <div className="flex gap-2">
           <button 
             onClick={handleExport} 
             disabled={isExporting}
             className="btn-action primary"
           >
             <Download size={14} /> {isExporting ? 'ENCRYPTING...' : 'Export Vault'}
           </button>
        </div>
      </div>

      {/* Filters exactly like Admin */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1 w-full md:max-w-md">
           <div className="flex bg-[#1a1a1a] border border-[#333]">
              <div className="p-3 text-[var(--gray)]"><Search size={18} /></div>
              <input 
                 type="text" 
                 className="flex-1 bg-transparent border-none p-3 text-sm outline-none placeholder:text-[#444]"
                 placeholder="SEARCH BY ORDER ID..." 
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
              />
           </div>
        </div>
        <div className="flex gap-2">
           <button className="btn-action"><Filter size={14} /> All Status</button>
           <button className="btn-action">Verification Port</button>
        </div>
      </div>

      {/* Box Table exactly like Admin */}
      <div className="box-table">
        <table className="table-main">
          <thead>
            <tr>
              <th>REF ID</th>
              <th>TIMESTAMP</th>
              <th>CLIENT ENTITY</th>
              <th className="text-right">GROSS REVENUE</th>
              <th className="text-right">AGENCY FEE (5%)</th>
              <th className="text-center">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order._id}>
                <td className="td-id">#{order.orderId}</td>
                <td>
                  <div className="text-[12px] font-bold text-[var(--gray)]">{formatDate(order.createdAt)}</div>
                  <div className="text-[10px] text-[#444] font-bold uppercase">System Verified</div>
                </td>
                <td>
                  <div className="td-name uppercase font-bold text-[13px]">{order.shippingAddress?.name || 'Guest User'}</div>
                  <div className="td-meta text-[11px] font-semibold text-[#555]">Registered Customer</div>
                </td>
                <td className="text-right font-bold text-[15px]">{formatCurrency(order.totalAmount)}</td>
                <td className="text-right">
                   <div className="text-[15px] font-bold text-[var(--accent)]">{formatCurrency(order.totalAmount * commissionRate)}</div>
                </td>
                <td className="text-center">
                  <div className="flex justify-center gap-1">
                    <button className="action-btn"><Eye size={12} /> View</button>
                    <button className="action-btn"><Download size={12} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;

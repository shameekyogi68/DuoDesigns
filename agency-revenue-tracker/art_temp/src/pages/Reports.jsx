import React, { useState } from 'react';
import { useOrdersStore } from '@/store/ordersStore';
import { groupOrdersByMonth, getMonthLabel } from '@/utils/commission';
import { generateMonthlyReport } from '@/utils/pdfGenerator';
import { FileText, Download, Filter, Search, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

const Reports = () => {
  const { orders, monthlyPaymentStatus, commissionRate } = useOrdersStore();
  const grouped = groupOrdersByMonth(orders);
  const months = Object.keys(grouped).sort().reverse();
  
  const agencyDetails = JSON.parse(localStorage.getItem('art_agency_details') || '{}');

  const handleDownload = (monthKey) => {
    const monthOrders = grouped[monthKey];
    const monthLabel = getMonthLabel(monthKey);
    
    try {
      generateMonthlyReport(monthLabel, monthOrders, commissionRate, agencyDetails);
      toast.success(`Report downloaded for ${monthLabel}`);
    } catch (error) {
      console.error(error);
      toast.error('Failed to generate PDF. Check console.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="heading-lg mb-1">Commission Documentation</h2>
          <p className="text-gray-500 text-sm">Professional PDF invoices generated directly from Duo Designs shipments.</p>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Invoice Period</th>
              <th>Order Count</th>
              <th>Total Revenue</th>
              <th>Commission</th>
              <th>Payout Status</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {months.map(monthKey => {
              const monthOrders = grouped[monthKey];
              const totalRevenue = monthOrders.reduce((sum, o) => sum + o.totalAmount, 0);
              const commission = totalRevenue * commissionRate;
              const status = monthlyPaymentStatus[monthKey] || 'pending';

              return (
                <tr key={monthKey}>
                  <td className="font-bold">{getMonthLabel(monthKey)}</td>
                  <td>{monthOrders.length} Shipments</td>
                  <td className="text-gray-400">{formatCurrency(totalRevenue)}</td>
                  <td className="text-emerald-500 font-bold">{formatCurrency(commission)}</td>
                  <td>
                    <span className={`badge ${status === 'paid' ? 'badge-success' : 'badge-warning'}`}>
                      {status}
                    </span>
                  </td>
                  <td className="text-right">
                    <button 
                      onClick={() => handleDownload(monthKey)}
                      className="btn btn-outline py-1.5 px-3 text-xs"
                    >
                      <Download size={14} /> PDF Invoice
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {months.length === 0 && (
          <div className="py-20 text-center text-gray-600 italic">No reports available to generate. Sync data first.</div>
        )}
      </div>

      <div className="card bg-indigo-600/5 border-indigo-600/20">
        <h4 className="text-indigo-400 font-bold text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
          <FileText size={14} /> Documentation Note
        </h4>
        <p className="text-xs text-gray-400 leading-relaxed">
          These reports serve as official proof of work and commission calculation. Each PDF includes a full order-by-order breakdown derived from the Duo Designs backend. If any discrepancies occur, refer to the Order IDs listed in the attachment.
        </p>
      </div>
    </div>
  );
};

export default Reports;

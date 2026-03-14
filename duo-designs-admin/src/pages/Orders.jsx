/** @file Orders.jsx */
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useOrders } from '@/hooks/useOrders';
import { useNavigate } from 'react-router-dom';
import { useAdminOrdersStore } from '@/store/orders.store';
import PageLoader from '@/components/ui/PageLoader';
import EmptyState from '@/components/ui/EmptyState';
import SearchBar from '@/components/ui/SearchBar';
import FilterChips from '@/components/ui/FilterChips';
import StatusBadge from '@/components/ui/StatusBadge';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { Eye, Clock, Download, CheckSquare, Square, Trash2, Printer } from 'lucide-react';
import { useState } from 'react';

const statusOptions = [
  { value: 'all', label: 'All Orders' },
  { value: 'placed', label: 'Placed' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'dispatched', label: 'Dispatched' },
  { value: 'delivered', label: 'Delivered' }
];

const Orders = () => {
  const navigate = useNavigate();
  const { filters, setFilters } = useAdminOrdersStore();
  const { data, isLoading } = useOrders();
  const [selectedOrders, setSelectedOrders] = useState([]);

  const handleSearch = (search) => {
    setFilters({ search });
  };

  const toggleSelect = (id) => {
    setSelectedOrders(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    const orders = data?.orders || [];
    if (selectedOrders.length === orders.length && orders.length > 0) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(orders.map(o => o._id));
    }
  };

  if (isLoading) return <PageLoader />;

  const orders = data?.orders || [];

  return (
    <>
      <Helmet><title>Orders — Duo Admin</title></Helmet>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flex: 1 }}>
          <div style={{ width: '300px' }}>
            <SearchBar 
              value={filters.search || ''} 
              onChange={handleSearch} 
              placeholder="Search ID, name or phone..." 
            />
          </div>
          <FilterChips 
            options={statusOptions} 
            activeValue={filters.status} 
            onChange={(status) => setFilters({ status })} 
          />
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="action-btn" title="Export CSV" onClick={() => toast.success('Exporting orders...')}>
            <Download size={14}/>
          </button>
          <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--gray)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            {data?.total || 0} Total
          </div>
        </div>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th style={{ width: '40px' }}>
                <button 
                  onClick={selectAll} 
                  style={{ background: 'none', border: 'none', color: 'var(--gray)', cursor: 'pointer' }}
                >
                  {selectedOrders.length > 0 && selectedOrders.length === orders.length ? <CheckSquare size={16}/> : <Square size={16}/>}
                </button>
              </th>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Design</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr><td colSpan="9"><EmptyState message="No orders found matching filters" /></td></tr>
            ) : (
              orders.map(order => (
                <tr key={order._id}>
                  <td>
                    <button 
                      onClick={() => toggleSelect(order._id)} 
                      style={{ background: 'none', border: 'none', color: selectedOrders.includes(order._id) ? 'var(--accent)' : 'var(--gray)', cursor: 'pointer' }}
                    >
                      {selectedOrders.includes(order._id) ? <CheckSquare size={16}/> : <Square size={16}/>}
                    </button>
                  </td>
                  <td><div className="td-id">#{order.orderId}</div></td>
                  <td>
                    <div className="td-name">{order.shippingAddress?.name || 'Guest'}</div>
                    <div className="td-meta">{order.shippingAddress?.city}, {order.shippingAddress?.state}</div>
                  </td>
                  <td>{order.items.length} items</td>
                  <td>
                    <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--gray)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {order.items.some(i => i.isCustom) ? '🎨 CUSTOM' : '👕 PRE-MADE'}
                    </span>
                  </td>
                  <td><span style={{ fontWeight: 800 }}>{formatCurrency(order.totalAmount)}</span></td>
                  <td><StatusBadge status={order.status} /></td>
                  <td>
                    <div style={{ fontSize: '13px' }}>{formatDate(order.createdAt)}</div>
                    <div style={{ fontSize: '10px', color: 'var(--gray)' }}>{formatDate(order.createdAt, 'p')}</div>
                  </td>
                  <td>
                    <button className="action-btn" onClick={() => navigate(`/orders/${order._id}`)}>
                      <Eye size={14} style={{ marginRight: '6px' }} /> View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedOrders.length > 0 && (
        <div className="bulk-bar">
          <span>{selectedOrders.length} Orders Selected</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="bulk-btn">Confirm All</button>
            <button className="bulk-btn">Dispatch All</button>
            <button className="bulk-btn"><Printer size={12} style={{marginRight: '4px'}}/> Print Labels</button>
            <button className="bulk-btn" style={{ color: 'var(--red)' }}><Trash2 size={12} style={{marginRight: '4px'}}/> Cancel</button>
          </div>
          <button 
            className="bulk-btn" 
            style={{ marginLeft: 'auto', background: 'none', textDecoration: 'underline' }}
            onClick={() => setSelectedOrders([])}
          >
            Clear Selected
          </button>
        </div>
      )}
    </>
  );
};

export default Orders;

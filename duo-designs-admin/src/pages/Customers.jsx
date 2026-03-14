/** @file Customers.jsx */
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useCustomers } from '@/hooks/useCustomers';
import PageLoader from '@/components/ui/PageLoader';
import EmptyState from '@/components/ui/EmptyState';
import SearchBar from '@/components/ui/SearchBar';
import { formatCurrency, getInitials } from '@/utils/formatters';
import { useNavigate } from 'react-router-dom';

const Customers = () => {
  const [search, setSearch] = useState('');
  const { data, isLoading } = useCustomers({ search });
  const navigate = useNavigate();

  if (isLoading) return <PageLoader />;

  return (
    <>
      <Helmet><title>Customers — Duo Admin</title></Helmet>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div style={{ width: '320px' }}>
          <SearchBar value={search} onChange={setSearch} placeholder="Search names or email..." />
        </div>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Customer</th><th>Email</th><th>Total Spent</th><th>Orders</th><th>Joined</th><th>Action</th></tr>
          </thead>
          <tbody>
            {(data?.customers || []).length === 0 ? (
              <tr><td colSpan="6"><EmptyState /></td></tr>
            ) : (
              data.customers.map((c) => (
                <tr key={c._id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--accent)', color: 'var(--black)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 900 }}>
                        {getInitials(c.name)}
                      </div>
                      <div className="td-name">{c.name}</div>
                    </div>
                  </td>
                  <td>{c.email}</td>
                  <td><span style={{fontWeight: 800}}>{formatCurrency(c.totalOrdersAmount || 0)}</span></td>
                  <td>{c.totalOrdersCount || 0} orders</td>
                  <td style={{fontSize:'12px', color:'var(--gray)'}}>{new Date(c.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button className="action-btn" onClick={() => navigate(`/customers/${c._id}`)}>View History</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Customers;

/** @file Products.jsx */
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useProducts, useDeleteProduct } from '@/hooks/useProducts';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import PageLoader from '@/components/ui/PageLoader';
import EmptyState from '@/components/ui/EmptyState';
import SearchBar from '@/components/ui/SearchBar';
import FilterChips from '@/components/ui/FilterChips';
import { formatCurrency } from '@/utils/formatters';
import { Edit, Trash2, Plus, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';

const categories = [
  { value: 'all', label: 'All Products' },
  { value: 'versatile', label: 'Versatile' },
  { value: 'statement', label: 'Statement' },
  { value: 'comfort', label: 'Comfort' }
];

const Products = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const navigate = useNavigate();
  
  const { data, isLoading } = useProducts({ 
    search, 
    category: category === 'all' ? undefined : category 
  });
  
  const { mutate: deleteProduct } = useDeleteProduct();

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id, {
        onSuccess: () => toast.success('Product deleted')
      });
    }
  };

  if (isLoading) return <PageLoader />;

  const products = data?.products || [];

  return (
    <>
      <Helmet><title>Products — Duo Admin</title></Helmet>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flex: 1 }}>
          <div style={{ width: '320px' }}>
            <SearchBar value={search} onChange={setSearch} placeholder="Search products..." />
          </div>
          <FilterChips 
            options={categories} 
            activeValue={category} 
            onChange={setCategory} 
          />
        </div>
        <button className="btn-form" onClick={() => navigate(ROUTES.ADD_PRODUCT)}>
          <Plus size={14} style={{ marginRight: '8px' }} /> Add Product
        </button>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Product</th><th>Category</th><th>Base Price</th><th>Variants</th><th>Status</th><th>Action</th></tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr><td colSpan="6"><EmptyState message="No products found" /></td></tr>
            ) : (
              products.map((p) => (
                <tr key={p._id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ width: '40px', height: '40px', background: '#111', border: '1px solid #222', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                        {p.images?.[0] ? <img src={p.images[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <ImageIcon size={16} color="#333" />}
                      </div>
                      <div>
                        <div className="td-name">{p.name}</div>
                        <div className="td-meta">Created {new Date(p.createdAt).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </td>
                  <td><div style={{ textTransform: 'uppercase', fontSize: '11px', fontWeight: 700 }}>{p.category}</div></td>
                  <td><span style={{fontWeight: 800}}>{formatCurrency(p.basePrice)}</span></td>
                  <td>{p.variants?.length || 0} variants</td>
                  <td>
                    <span className={`status-badge s-${p.isActive ? 'active' : 'inactive'}`}>
                      {p.isActive ? 'Active' : 'Draft'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button className="action-btn" onClick={() => navigate(`/products/${p._id}/edit`)}>
                        <Edit size={14} />
                      </button>
                      <button className="action-btn danger" onClick={() => handleDelete(p._id)}>
                        <Trash2 size={14} />
                      </button>
                    </div>
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

export default Products;

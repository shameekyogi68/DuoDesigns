/** @file Stock.jsx */
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useProducts, useUpdateProduct } from '@/hooks/useProducts';
import PageLoader from '@/components/ui/PageLoader';
import EmptyState from '@/components/ui/EmptyState';
import { AlertCircle, Edit, Save, X } from 'lucide-react';
import toast from 'react-hot-toast';

const Stock = () => {
  const { data, isLoading } = useProducts();
  const { mutate: updateProduct } = useUpdateProduct();
  const [editingId, setEditingId] = useState(null); // variant SKU
  const [editValue, setEditValue] = useState(0);

  if (isLoading) return <PageLoader />;

  // Flatten products into variants for easier list management
  const variants = (data?.products || []).flatMap(p => 
    p.variants.map(v => ({
      ...v,
      productName: p.name,
      productId: p._id,
      category: p.category,
      allVariants: p.variants
    }))
  );

  const startEdit = (v) => {
    setEditingId(v.sku);
    setEditValue(v.stock);
  };

  const handleSave = (variant) => {
    const updatedVariants = variant.allVariants.map(v => 
      v.sku === variant.sku ? { ...v, stock: editValue } : v
    );
    
    updateProduct({ 
      id: variant.productId, 
      payload: { variants: updatedVariants }
    }, {
      onSuccess: () => {
        setEditingId(null);
        toast.success('Stock updated');
      }
    });
  };

  return (
    <>
      <Helmet><title>Stock Management — Duo Admin</title></Helmet>

      <div className="filter-row">
        <button className="filter-chip active">All Items</button>
        <button className="filter-chip">Low Stock ({variants.filter(v => v.stock < 10).length})</button>
        <button className="filter-chip">Out of Stock ({variants.filter(v => v.stock === 0).length})</button>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Product</th><th>Variant</th><th>SKU</th><th>Stock</th><th>Status</th><th>Action</th></tr>
          </thead>
          <tbody>
            {variants.length === 0 ? (
              <tr><td colSpan="6"><EmptyState /></td></tr>
            ) : (
              variants.map((v, idx) => (
                <tr key={idx} className={v.stock < 10 ? 'row-warning' : ''}>
                  <td><div className="td-name">{v.productName}</div><div className="td-meta">{v.category}</div></td>
                  <td>{v.name}</td>
                  <td><code style={{fontSize:'12px'}}>{v.sku}</code></td>
                  <td>
                    {editingId === v.sku ? (
                      <input 
                        type="number" 
                        className="form-input small" 
                        value={editValue} 
                        onChange={(e) => setEditValue(parseInt(e.target.value))}
                        style={{width: '80px'}}
                      />
                    ) : (
                      <span style={{fontWeight: 800, color: v.stock < 10 ? 'var(--red)' : 'var(--white)'}}>
                        {v.stock}
                      </span>
                    )}
                  </td>
                  <td>
                    {v.stock === 0 ? (
                      <span className="status-badge s-inactive" style={{display:'inline-flex', alignItems:'center', gap:'4px'}}><AlertCircle size={10}/> OOS</span>
                    ) : v.stock < 10 ? (
                      <span className="status-badge s-dispatched" style={{display:'inline-flex', alignItems:'center', gap:'4px'}}>Low Stock</span>
                    ) : (
                      <span className="status-badge s-paid">Healthy</span>
                    )}
                  </td>
                  <td>
                    {editingId === v.sku ? (
                      <div style={{display:'flex', gap:'8px'}}>
                        <button className="action-btn" onClick={() => handleSave(v)}><Save size={14} /></button>
                        <button className="action-btn danger" onClick={() => setEditingId(null)}><X size={14} /></button>
                      </div>
                    ) : (
                      <button className="action-btn" onClick={() => startEdit(v)}><Edit size={14} /></button>
                    )}
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

export default Stock;

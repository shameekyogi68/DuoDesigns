/** @file ColorVariantBuilder.jsx */
import React from 'react';
import { Plus, Trash2, Box } from 'lucide-react';

const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

const ColorVariantBuilder = ({ variants = [], onChange }) => {
  const addVariant = () => {
    const newVariant = {
      name: '',
      color: '#000000',
      stock: { S: 0, M: 0, L: 0, XL: 0, XXL: 0 }
    };
    onChange([...variants, newVariant]);
  };

  const removeVariant = (index) => {
    onChange(variants.filter((_, i) => i !== index));
  };

  const updateVariant = (index, key, value) => {
    const updated = [...variants];
    updated[index][key] = value;
    onChange(updated);
  };

  const updateStock = (vIndex, size, value) => {
    const updated = [...variants];
    updated[vIndex].stock[size] = parseInt(value) || 0;
    onChange(updated);
  };

  return (
    <div className="variant-builder">
      {variants.map((variant, vIdx) => (
        <div key={vIdx} className="form-section" style={{ position: 'relative', background: '#0a0a0a', padding: '16px' }}>
          <button 
            type="button"
            className="action-btn danger" 
            style={{ position: 'absolute', top: '16px', right: '16px' }}
            onClick={() => removeVariant(vIdx)}
          >
            <Trash2 size={12} />
          </button>

          <div className="form-grid" style={{ marginBottom: '16px' }}>
            <div className="form-group">
              <label className="form-label">Color Name</label>
              <input 
                className="form-input" 
                placeholder="e.g. Midnight Black" 
                value={variant.name}
                onChange={(e) => updateVariant(vIdx, 'name', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Hex Code</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input 
                  type="color" 
                  value={variant.color}
                  style={{ width: '42px', height: '42px', background: 'none', border: '1px solid #333', padding: '2px', cursor: 'pointer' }}
                  onChange={(e) => updateVariant(vIdx, 'color', e.target.value)}
                />
                <input 
                  className="form-input" 
                  value={variant.color} 
                  onChange={(e) => updateVariant(vIdx, 'color', e.target.value)}
                />
              </div>
            </div>
          </div>

          <label className="form-label">Stock Inventory</label>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {SIZES.map(size => (
              <div key={size} style={{ flex: 1, minWidth: '60px' }}>
                <div style={{ fontSize: '10px', fontWeight: 800, textAlign: 'center', marginBottom: '4px', color: 'var(--gray)' }}>{size}</div>
                <input 
                  type="number"
                  className="form-input"
                  style={{ textAlign: 'center', padding: '8px' }}
                  value={variant.stock[size]}
                  onChange={(e) => updateStock(vIdx, size, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      <button 
        type="button" 
        className="btn-form outline" 
        style={{ width: '100%' }}
        onClick={addVariant}
      >
        <Plus size={14} style={{ marginRight: '8px' }} /> Add Color Variant
      </button>
    </div>
  );
};

export default ColorVariantBuilder;

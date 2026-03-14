/** @file ProductForm.jsx */
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import ImageUploader from '@/components/ui/ImageUploader';
import ColorVariantBuilder from '@/components/ui/ColorVariantBuilder';
import { Save, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const schema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(10, 'Description is required'),
  basePrice: z.number().min(1, 'Price must be at least 1'),
  isActive: z.boolean().default(true),
  images: z.array(z.string()).min(1, 'At least one image is required'),
  variants: z.array(z.any()).min(1, 'At least one variant is required'),
});

const ProductForm = ({ initialData, onSubmit, isLoading }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialData || {
      name: '',
      category: 'versatile',
      description: '',
      basePrice: 0,
      isActive: true,
      images: [],
      variants: [{ name: 'Default', color: '#000000', stock: { S: 10, M: 10, L: 10, XL: 10, XXL: 10 } }]
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="product-form">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '32px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          <div className="form-section">
            <div className="form-section-title">General Information</div>
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label className="form-label">Product Name</label>
              <input {...register('name')} className="form-input" placeholder="e.g. Midnight Oversized Tee" />
              {errors.name && <span className="form-error">{errors.name.message}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea {...register('description')} className="form-input" style={{ minHeight: '120px' }} placeholder="Crafted from 100% premium cotton..." />
              {errors.description && <span className="form-error">{errors.description.message}</span>}
            </div>
          </div>

          <div className="form-section">
            <div className="form-section-title">Variants & Inventory</div>
            <Controller
              name="variants"
              control={control}
              render={({ field }) => (
                <ColorVariantBuilder variants={field.value} onChange={field.onChange} />
              )}
            />
            {errors.variants && <span className="form-error">{errors.variants.message}</span>}
          </div>

        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          <div className="form-section">
            <div className="form-section-title">Media</div>
            <Controller
              name="images"
              control={control}
              render={({ field }) => (
                <ImageUploader images={field.value} onChange={field.onChange} />
              )}
            />
            {errors.images && <span className="form-error">{errors.images.message}</span>}
          </div>

          <div className="form-section">
            <div className="form-section-title">Pricing & Status</div>
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label className="form-label">Base Price (₹)</label>
              <input 
                type="number" 
                {...register('basePrice', { valueAsNumber: true })} 
                className="form-input" 
              />
              {errors.basePrice && <span className="form-error">{errors.basePrice.message}</span>}
            </div>
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label className="form-label">Category</label>
              <select {...register('category')} className="form-input">
                <option value="versatile">Versatile</option>
                <option value="statement">Statement</option>
                <option value="comfort">Comfort</option>
              </select>
            </div>
            <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <input type="checkbox" {...register('isActive')} id="isActive" />
              <label htmlFor="isActive" className="form-label" style={{ marginBottom: 0 }}>Visible on Website</label>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              type="button" 
              className="btn-form outline" 
              style={{ flex: 1 }} 
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-form" 
              style={{ flex: 1.5 }}
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : <><Save size={14} style={{marginRight:'8px'}}/> {initialData ? 'Update' : 'Publish'}</>}
            </button>
          </div>

        </div>
      </div>
    </form>
  );
};

export default ProductForm;

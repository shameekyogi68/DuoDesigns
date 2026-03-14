/** @file AddProduct.jsx */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ProductForm from '@/components/forms/ProductForm';
import { useCreateProduct } from '@/hooks/useProducts';
import { ROUTES } from '@/constants/routes';
import { ChevronLeft } from 'lucide-react';

const AddProduct = () => {
  const navigate = useNavigate();
  const { mutate: createProduct, isLoading } = useCreateProduct();

  const handleCreate = (data) => {
    createProduct(data, {
      onSuccess: () => navigate(ROUTES.PRODUCTS)
    });
  };

  return (
    <>
      <Helmet><title>Add Product — Duo Admin</title></Helmet>
      <div style={{ marginBottom: '24px' }}>
        <button className="action-btn" onClick={() => navigate(ROUTES.PRODUCTS)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0', background: 'none' }}>
          <ChevronLeft size={16} /> Back to Products
        </button>
      </div>
      <ProductForm onSubmit={handleCreate} isLoading={isLoading} />
    </>
  );
};

export default AddProduct;

/** @file EditProduct.jsx */
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ProductForm from '@/components/forms/ProductForm';
import { useProduct, useUpdateProduct } from '@/hooks/useProducts';
import { ROUTES } from '@/constants/routes';
import { ChevronLeft } from 'lucide-react';
import PageLoader from '@/components/ui/PageLoader';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading: isFetching } = useProduct(id);
  const { mutate: updateProduct, isLoading: isUpdating } = useUpdateProduct();

  const handleUpdate = (data) => {
    updateProduct({ id, payload: data }, {
      onSuccess: () => navigate(ROUTES.PRODUCTS)
    });
  };

  if (isFetching) return <PageLoader />;

  return (
    <>
      <Helmet><title>Edit Product — Duo Admin</title></Helmet>
      <div style={{ marginBottom: '24px' }}>
        <button className="action-btn" onClick={() => navigate(ROUTES.PRODUCTS)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0', background: 'none' }}>
          <ChevronLeft size={16} /> Back to Products
        </button>
      </div>
      <ProductForm initialData={product} onSubmit={handleUpdate} isLoading={isUpdating} />
    </>
  );
};

export default EditProduct;

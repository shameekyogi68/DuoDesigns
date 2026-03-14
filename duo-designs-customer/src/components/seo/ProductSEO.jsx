/**
 * @file         ProductSEO.jsx
 * @description  SEO component for product pages with Structured Data (JSON-LD).
 * @module       components/seo/ProductSEO
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SEO_CONFIG } from '../../constants/seo';

const ProductSEO = ({ product }) => {
  const { name, description, images, basePrice, category, _id, variants } = product;

  const seoTitle = `${name} | Duo Designs`;
  const seoDescription = description || SEO_CONFIG.DEFAULT_DESC;
  const seoUrl = `${SEO_CONFIG.BASE_URL}/product/${_id}`;
  const seoImage = images?.[0] || SEO_CONFIG.DEFAULT_OG_IMAGE;

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": name,
    "image": images,
    "description": seoDescription,
    "sku": `${category.toUpperCase()}-${_id.substring(0,6)}`,
    "brand": {
      "@type": "Brand",
      "name": SEO_CONFIG.SITE_NAME
    },
    "offers": {
      "@type": "Offer",
      "url": seoUrl,
      "priceCurrency": "INR",
      "price": basePrice,
      "availability": variants?.some(v => v.stock > 0) 
        ? "https://schema.org/InStock" 
        : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": SEO_CONFIG.SITE_NAME
      }
    }
  };

  return (
    <Helmet>
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <link rel="canonical" href={seoUrl} />

      {/* OG Tags */}
      <meta property="og:title" content={seoTitle} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:description" content={seoDescription} />
      
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
};

export default ProductSEO;

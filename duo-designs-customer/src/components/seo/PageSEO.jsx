/**
 * @file         PageSEO.jsx
 * @description  SEO component for standard pages using react-helmet-async.
 * @module       components/seo/PageSEO
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SEO_CONFIG } from '../../constants/seo';

const PageSEO = ({ title, description, image, url }) => {
  const seoTitle = title || SEO_CONFIG.DEFAULT_TITLE;
  const seoDescription = description || SEO_CONFIG.DEFAULT_DESC;
  const seoImage = image || SEO_CONFIG.DEFAULT_OG_IMAGE;
  const seoUrl = url ? `${SEO_CONFIG.BASE_URL}${url}` : SEO_CONFIG.BASE_URL;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <link rel="canonical" href={seoUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={seoUrl} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={seoUrl} />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />
      <meta name="twitter:site" content={SEO_CONFIG.TWITTER_HANDLE} />
    </Helmet>
  );
};

export default PageSEO;

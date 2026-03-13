/**
 * @file         sitemap.controller.js
 * @description  Controller to generate a dynamic sitemap.xml for SEO.
 * @module       controllers/sitemap
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */

const Product = require('../models/Product.model');
const { SEO_CONFIG } = require('../constants/seo'); // Note: This is a frontend constant, usually we'd share it or duplicate the URL

exports.generateSitemap = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true }).select('_id updatedAt');
    const baseUrl = 'https://duodesigns.in';

    let xml = `<?xml version="1.0" encoding="UTF-8"?>`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Static Pages
    const staticPages = ['', '/shop', '/track', '/help'];
    staticPages.forEach(page => {
      xml += `
        <url>
          <loc>${baseUrl}${page}</loc>
          <changefreq>daily</changefreq>
          <priority>${page === '' ? '1.0' : '0.8'}</priority>
        </url>`;
    });

    // Dynamic Product Pages
    products.forEach(p => {
      xml += `
        <url>
          <loc>${baseUrl}/product/${p._id}</loc>
          <lastmod>${p.updatedAt.toISOString().split('T')[0]}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.7</priority>
        </url>`;
    });

    xml += `</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (error) {
    res.status(500).end();
  }
};

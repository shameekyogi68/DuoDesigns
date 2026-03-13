/**
 * @file         product.controller.js
 * @description  Product CRUD controller.
 * @module       controllers/product
 * @author       Duo Designs Dev Team
 * @version      1.0.0
 * @created      2025-03-13
 */
const Product = require('../models/Product.model');
const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess, sendError } = require('../utils/apiResponse');

/** GET /api/products — Public listing with filters */
exports.getProducts = asyncHandler(async (req, res) => {
    const { category, featured, sort, search, page = 1, limit = 20 } = req.query;
    const filter = { isActive: true };

    if (category) filter.category = category;
    if (featured === 'true') filter.isFeatured = true;
    if (search) filter.$text = { $search: search };

    let sortObj = { createdAt: -1 };
    if (sort === 'price_asc') sortObj = { basePrice: 1 };
    if (sort === 'price_desc') sortObj = { basePrice: -1 };
    if (sort === 'rating') sortObj = { rating: -1 };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [products, total] = await Promise.all([
        Product.find(filter).sort(sortObj).skip(skip).limit(parseInt(limit)),
        Product.countDocuments(filter),
    ]);

    sendSuccess(res, 200, 'Products fetched', {
        products,
        pagination: { page: parseInt(page), limit: parseInt(limit), total, pages: Math.ceil(total / parseInt(limit)) },
    });
});

/** GET /api/products/:id — Single product */
exports.getProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) return sendError(res, 404, 'Product not found');
    sendSuccess(res, 200, 'Product fetched', product);
});

/** POST /api/products — Admin create */
exports.createProduct = asyncHandler(async (req, res) => {
    const product = await Product.create(req.body);
    sendSuccess(res, 201, 'Product created', product);
});

/** PUT /api/products/:id — Admin update */
exports.updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) return sendError(res, 404, 'Product not found');
    sendSuccess(res, 200, 'Product updated', product);
});

/** DELETE /api/products/:id — Admin delete (soft) */
exports.deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    if (!product) return sendError(res, 404, 'Product not found');
    sendSuccess(res, 200, 'Product deactivated', product);
});

/** PUT /api/products/:id/stock — Admin stock update */
exports.updateStock = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) return sendError(res, 404, 'Product not found');

    const { variantId, stock } = req.body;
    const variant = product.variants.id(variantId);
    if (!variant) return sendError(res, 404, 'Variant not found');

    Object.assign(variant.stock, stock);
    await product.save();
    sendSuccess(res, 200, 'Stock updated', product);
});

/** PUT /api/products/stock/bulk — Admin bulk stock update */
exports.updateBulkStock = asyncHandler(async (req, res) => {
    // Array format: [{ productId, variantId, stock: { S, M, L... } }]
    const updates = req.body;
    
    for (const update of updates) {
        const product = await Product.findById(update.productId);
        if (!product) continue;
        const variant = product.variants.id(update.variantId);
        if (!variant) continue;
        Object.assign(variant.stock, update.stock);
        await product.save();
    }
    
    sendSuccess(res, 200, 'Bulk stock updated successfully');
});

/** GET /api/products/low-stock — Admin view */
exports.getLowStock = asyncHandler(async (req, res) => {
    const products = await Product.find({ isActive: true });
    const lowStock = products.filter(p =>
        p.variants.some(v => Object.values(v.stock.toObject()).some(qty => typeof qty === 'number' && qty > 0 && qty <= 5))
    );
    sendSuccess(res, 200, 'Low stock products', lowStock);
});

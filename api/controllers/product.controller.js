import Product from '../models/Product.js';
import asyncHandler from 'express-async-handler';

// @desc Fetch all products
// @desc route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// @desc Fetch single product
// @desc route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.json(product);
});

// @desc Delete single product
// @desc route DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  await product.remove();
  res.json({ message: 'Product removed' });
});

export { getProducts, getProductById, deleteProduct };

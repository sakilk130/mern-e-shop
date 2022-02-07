import express from 'express';
import {
  createProduct,
  createProductReview,
  deleteProduct,
  getProductById,
  getProducts,
  getTopProducts,
  updateProduct,
} from '../controllers/product.controller.js';
import { admin, protect } from '../middleware/auth.middleware.js';
const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:id/reviews').post(protect, createProductReview);
router.route('/top').get(getTopProducts);
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;

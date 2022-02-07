import asyncHandler from 'express-async-handler';
import Product from '../models/Product';
import { Request, Response } from 'express';
import { IProduct, IReview } from '../types/Product';
import { ObjectId } from 'mongoose';

// @desc Fetch all products
// @desc route GET /api/products
// @access Public
const getProducts = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const pageSize = 10;
    const page: number = Number(req.query.pageNumber) || 1;

    const keyword: any = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {};
    const count: number = await Product.countDocuments({ ...keyword });
    const products: (IProduct & {
      _id: ObjectId;
    })[] = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  }
);

// @desc Fetch single product
// @desc route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const product:
      | (IProduct & {
          _id: ObjectId;
        })
      | null = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }
    res.json(product);
  }
);

// @desc Delete single product
// @desc route DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const product:
      | (IProduct & {
          _id: ObjectId;
        })
      | null = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }
    await product.remove();
    res.json({ message: 'Product removed' });
  }
);

// @desc Create a product
// @desc route POST /api/products
// @access Private/Admin
const createProduct = asyncHandler(
  async (req: any, res: Response): Promise<void> => {
    const product: IProduct & {
      _id: any;
    } = new Product({
      name: 'Sample name',
      price: 0,
      user: req.user._id,
      image: '/images/sample.jpg',
      brand: 'Sample brand',
      category: 'Sample category',
      countInStock: 0,
      numReviews: 0,
      description: 'Sample description',
    });
    const createdProduct: IProduct & {
      _id: ObjectId;
    } = await product.save();
    res.status(201).json(createdProduct);
  }
);

// @desc Update a product
// @desc route PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  product.name = name;
  product.price = price;
  product.description = description;
  product.image = image;
  product.brand = brand;
  product.category = category;
  product.countInStock = countInStock;

  const updatedProduct = await product.save();
  res.json(updatedProduct);
});

// @desc Create new review
// @desc route PUT /api/products/:id/reviews
// @access Private
const createProductReview = asyncHandler(
  async (req: any, res: Response): Promise<void> => {
    const { rating, comment }: { rating: number; comment: string } = req.body;
    const product:
      | (IProduct & {
          _id: ObjectId;
        })
      | null = await Product.findById(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }
    const alreadyReviewed: IReview | undefined = product.reviews.find(
      (r) => r.user.toString() === req.user._id
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }
    const review: any = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;
    await product.save();
    res.status(201).json({
      message: 'Review added',
    });
  }
);

// @desc Get top rated products
// @desc route PUT /api/products/top
// @access Public
const getTopProducts = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const products: (IProduct & {
      _id: ObjectId;
    })[] = await Product.find({}).sort({ rating: -1 }).limit(5);
    res.json(products);
  }
);

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
};

import Order from "../models/Order.js";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { IOrder, IOrderItems, IShippingAddress } from "../types/Order";
import { ObjectId } from "mongoose";

// @desc Create new order
// @desc route POST /api/orders
// @access Private
const addOrderItems = asyncHandler(
  async (req: any, res: Response): Promise<void> => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    }: {
      orderItems: IOrderItems[];
      shippingAddress: IShippingAddress;
      paymentMethod: string;
      itemsPrice: number;
      taxPrice: number;
      shippingPrice: number;
      totalPrice: number;
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error("No order items");
    } else {
      const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });
      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    }
  }
);

// @desc Get order by Id
// @desc route GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const order: any = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!order) {
      res.status(404);
      throw new Error("Order not found");
    }
    res.status(200).json(order);
  }
);

// @desc Update order to paid
// @desc route GET /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const order:
      | (IOrder & {
          _id: ObjectId;
        })
      | null = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };
      const updatedOrder: IOrder & {
        _id: ObjectId;
      } = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  }
);

// @desc Get logged in user orders
// @desc route GET /api/orders/myorders
// @access Private
const getMyOrders = asyncHandler(
  async (req: any, res: Response): Promise<void> => {
    const orders: (IOrder & {
      _id: ObjectId;
    })[] = await Order.find({ user: req.user._id });
    res.json(orders);
  }
);

// @desc Get all orders
// @desc route GET /api/orders
// @access Private/Admin
const getOrders = asyncHandler(async ({}, res: Response): Promise<void> => {
  const orders: any[] = await Order.find().populate("user", "id name");
  res.json(orders);
});

// @desc Update order to delivered
// @desc route GET /api/orders/:id/deliver
// @access Private/Admin
const updateOrderToDelivered = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const order: any = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  }
);

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
};

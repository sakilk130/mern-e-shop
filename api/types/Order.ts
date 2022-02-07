import { Document } from 'mongoose';

export interface IOrderItems extends Document {
  name: string;
  qty: number;
  image: string;
  price: number;
  product: string;
}

export interface IShippingAddress extends Document {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface IPaymentResult extends Document {
  id: any;
  status: any;
  update_time: any;
  email_address: any;
}

export interface IOrder extends Document {
  user: string;
  orderItems: IOrderItems[];
  shippingAddress: IShippingAddress;
  paymentMethod: string;
  paymentResult: IPaymentResult | any;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt: any;
  isDelivered: boolean;
  deliveredAt: any;
}

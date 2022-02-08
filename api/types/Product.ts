import { Document } from 'mongoose';

export interface IReview extends Document {
  name: any;
  rating: number;
  comment: string;
  user: any;
}

export interface IProduct extends Document {
  user: string;
  name: string;
  image: string;
  brand: string;
  category: string;
  description: string;
  rating: number;
  reviews: IReview[];
  countInStock: number;
  numReviews: number;
  price: number;
}

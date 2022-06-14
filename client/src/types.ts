export interface IProduct {
  _id: string;
  brand: string;
  category: string;
  countInStock: number;
  createdAt: string;
  description: string;
  image: string;
  name: string;
  numReviews: number;
  price: number;
  rating: number;
  reviews: any[];
  updatedAt: string;
  user: string;
}

export interface IUserInfo {
  _id: string;
  email: string;
  isAdmin: boolean;
  name: string;
  token: string;
}

export interface ICart {
  countInStock: number;
  image: string;
  name: string;
  price: number;
  product: string;
  qty: number;
}

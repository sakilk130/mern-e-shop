import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Rating from '../Rating/Rating';

export interface IReviews {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  user: string;
  createdAt: string;
  updatedAt: string;
}

export interface IProduct {
  _id: string;
  user: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  numReviews: number;
  brand: string;
  category: string;
  description: string;
  countInStock: number;
  reviews: IReviews[];
  createdAt: string;
  updatedAt: string;
}

export interface IProps {
  product: IProduct;
}

const Product: React.FC<IProps> = ({ product }) => {
  return (
    <Card className="my-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <div className="my-3">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </div>
        </Card.Text>
        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

Rating.defaultProps = {
  color: '#f8e825',
};

export default Product;

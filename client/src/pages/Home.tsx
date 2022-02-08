import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import Product from '../components/Product/Product';
import Loader from '../components/Loader/Loader';
import Message from '../components/Message/Message';
import Paginate from '../components/Paginate/Paginate';
import ProductCarousel from '../components/ProductCarousel/ProductCarousel';
import Meta from '../components/Meta/Meta';

interface IProps {
  match: {
    params: {
      keyword?: string;
      pageNumber?: any;
    };
  };
}

const Home: React.FC<IProps> = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state: any) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant={'danger'}>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product: any) => (
              <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  );
};

export default Home;

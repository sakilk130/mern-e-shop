import React, { FC, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Dispatch } from "redux";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader/Loader";
import Message from "../components/Message/Message";
import Meta from "../components/Meta/Meta";
import Paginate from "../components/Paginate/Paginate";
import Product from "../components/Product/Product";
import ProductCarousel from "../components/ProductCarousel/ProductCarousel";
import { AppState } from "../store";
import { IProduct } from "../types";

interface IProps {
  match: {
    params: {
      keyword?: string;
      pageNumber?: any;
    };
  };
}

const Home: FC<IProps> = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber: any = match.params.pageNumber || 1;

  const dispatch: Dispatch<any> = useDispatch();

  const productList = useSelector((state: AppState) => state.productList);
  const {
    loading,
    error,
    products,
    page,
    pages,
  }: {
    loading: boolean;
    error: string | null;
    products: IProduct[];
    page: number;
    pages: number;
  } = productList;

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
        <Message variant={"danger"}>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product: IProduct) => (
              <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default Home;

import React, { lazy, Suspense } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Loader from "./components/Loader/Loader";
import Cart from "./pages/Cart";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Order = lazy(() => import("./pages/Order"));
const OrderList = lazy(() => import("./pages/OrderList"));
const Payment = lazy(() => import("./pages/Payment"));
const PlaceOrder = lazy(() => import("./pages/PlaceOrder"));
const Product = lazy(() => import("./pages/Product"));
const ProductEdit = lazy(() => import("./pages/ProductEdit"));
const ProductList = lazy(() => import("./pages/ProductList"));
const Profile = lazy(() => import("./pages/Profile"));
const Register = lazy(() => import("./pages/Register"));
const Shipping = lazy(() => import("./pages/Shipping"));
const UserEdit = lazy(() => import("./pages/UserEdit"));
const UserList = lazy(() => import("./pages/UserList"));

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Suspense fallback={<Loader />}>
          <Container>
            <Route path="/admin/orderlist" component={OrderList} exact />
            <Route
              path="/admin/product/:id/edit"
              component={ProductEdit}
              exact
            />
            <Route
              path="/admin/productlist/:pageNumber"
              component={ProductList}
              exact
            />
            <Route path="/admin/productlist" component={ProductList} exact />
            <Route path="/admin/user/:id/edit" component={UserEdit} exact />
            <Route path="/admin/userlist" component={UserList} exact />
            <Route path="/order/:id" component={Order} exact />
            <Route path="/placeorder" component={PlaceOrder} exact />
            <Route path="/payment" component={Payment} exact />
            <Route path="/shipping" component={Shipping} exact />
            <Route path="/profile" component={Profile} exact />
            <Route path="/register" component={Register} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/product/:id" component={Product} exact />
            <Route path="/cart/:id?" component={Cart} />
            <Route path="/search/:keyword" component={Home} exact />
            <Route
              path="/search/:keyword/page/:pageNumber"
              component={Home}
              exact
            />
            <Route path="/page/:pageNumber" component={Home} exact />
            <Route path="/" component={Home} exact />
          </Container>
        </Suspense>
      </main>
      <Footer />
    </Router>
  );
};

export default App;

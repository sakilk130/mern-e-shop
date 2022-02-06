import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';

//components
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Cart from './pages/Cart';

//pages
import Home from './pages/Home';
import Login from './pages/Login';
import Order from './pages/Order';
import OrderList from './pages/OrderList';
import Payment from './pages/Payment';
import PlaceOrder from './pages/PlaceOrder';
import Product from './pages/Product';
import ProductEdit from './pages/ProductEdit';
import ProductList from './pages/ProductList';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Shipping from './pages/Shipping';
import UserEdit from './pages/UserEdit';
import UserList from './pages/UserList';

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/admin/orderlist" component={OrderList} exact />
          <Route path="/admin/product/:id/edit" component={ProductEdit} exact />
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
          <Route path="/" component={Home} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;

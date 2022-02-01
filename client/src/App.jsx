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
import Product from './pages/Product';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Shipping from './pages/Shipping';

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
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

import axios from 'axios';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants';

interface IActions {
  CART_ADD_ITEM: string;
  CART_REMOVE_ITEM: string;
  CART_SAVE_SHIPPING_ADDRESS: string;
  CART_SAVE_PAYMENT_METHOD: string;
}

interface ICart {
  _id?: string;
  product?: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  qty: number;
}
interface IAddToCart {
  type: IActions['CART_ADD_ITEM'];
  payload: ICart;
}

interface IRemoveFromCart {
  type: IActions['CART_REMOVE_ITEM'];
  payload: string;
}

export const addToCart =
  (id: string, qty: number) =>
  async (
    dispatch: (arg: IAddToCart) => IAddToCart,
    getState: any
  ): Promise<void> => {
    const { data }: { data: ICart } = await axios.get(`/api/products/${id}`);
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      },
    });
    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  };

export const removeFromCart =
  (id: string) =>
  (dispatch: (arg: IRemoveFromCart) => IRemoveFromCart, getState: any) => {
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: id,
    });
    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  };

export const saveShippingAddress = (data: any) => (dispatch: any) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });
  localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const savePaymentMethod = (data: any) => (dispatch: any) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });
  localStorage.setItem('paymentMethod', JSON.stringify(data));
};

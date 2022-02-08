import {
  ICart,
  IPaymentMethod,
  IShippingAddress,
} from '../actions/cartActions';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants';

type Action = { type: 'CART_ADD_ITEM'; payload: ICart };

export const cartReducer = (
  state: { cartItems: ICart[]; shippingAddress: IShippingAddress | any } = {
    cartItems: [],
    shippingAddress: {},
  },
  action: Action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item: ICart = action.payload;
      const existItem: ICart | any = state.cartItems.find(
        (x: ICart) => x.product === item.product
      );
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x: ICart) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (x: any) => x.product !== action.payload
        ),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    default:
      return state;
  }
};

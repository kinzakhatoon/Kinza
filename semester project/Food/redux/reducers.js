// reducers.js
import { combineReducers } from 'redux';
import {
  SET_MENU_ITEMS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  UPDATE_DELIVERY_CHARGE,
} from './actions';

const menuItemsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_MENU_ITEMS:
      return action.payload;
    default:
      return state;
  }
};

const cartReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const itemIdToAdd = action.payload;
      return {
        ...state,
        [itemIdToAdd]: (state[itemIdToAdd] || 0) + 1,
      };
    case REMOVE_FROM_CART:
      const itemIdToRemove = action.payload;
      const updatedCart = { ...state };
      if (updatedCart[itemIdToRemove] > 1) {
        updatedCart[itemIdToRemove] -= 1;
      } else {
        delete updatedCart[itemIdToRemove];
      }
      return updatedCart;
    case CLEAR_CART:
      return clearCart(state);
    default:
      return state;
  }
};

const clearCart = (state) => {
  return {};
};

const deliveryReducer = (state = 0, action) => {
  switch (action.type) {
    case UPDATE_DELIVERY_CHARGE:
      return action.payload;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  //Each slice of the state is updated by its corresponding reducer
  menuItems: menuItemsReducer,
  cart: cartReducer,
  deliveryCharge: deliveryReducer,
});

export default rootReducer;

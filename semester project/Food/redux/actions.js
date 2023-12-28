// actions.js
export const SET_MENU_ITEMS = 'SET_MENU_ITEMS';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_DELIVERY_CHARGE = 'UPDATE_DELIVERY_CHARGE';
export const CLEAR_CART = 'CLEAR_CART';

export const setMenuItems = (menuItems) => ({
  type: SET_MENU_ITEMS,
  payload: menuItems,
});

export const clearCart = () => ({
  type: CLEAR_CART,
});

export const addToCart = (itemId) => ({
  type: ADD_TO_CART,
  payload: itemId,
});

export const removeFromCart = (itemId) => ({
  type: REMOVE_FROM_CART,
  payload: itemId,
});

export const updateDeliveryCharge = (charge) => ({
  type: UPDATE_DELIVERY_CHARGE,
  payload: charge,
});

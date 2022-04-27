export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART='REMOVE_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART';
// export const ORDER_TYPE = 'ORDER_TYPE';
// export const ADD_DISCOUNT = 'ADD_DISCOUNT';
// export const REMOVE_DISCOUNT = 'REMOVE_DISCOUNT';
export const SET_TOTAL_AMOUNT = 'SET_TOTAL_AMOUNT'

export const addToCart = (greens) => {
  return { type: ADD_TO_CART, greens: greens};
};

export const removeFromCart = (greens) => {
  return{ type : REMOVE_FROM_CART, greens: greens};
};

export const clearCart = () => {
  return { type: CLEAR_CART }
};

// export const setOrderType = ( orderType ) => {
//   return { type : ORDER_TYPE, orderType: orderType };
// }

// export const applyDiscount = (discountCode) => {
//   return { type: ADD_DISCOUNT, code: discountCode };
// }

// export const removeDiscount = () => {
//   return { type: REMOVE_DISCOUNT };
// }

export const setTotal = (amount) => {
  return { type: SET_TOTAL_AMOUNT, total: amount }
}
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART='REMOVE_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART';
// export const ORDER_TYPE = 'ORDER_TYPE';
// export const ADD_DISCOUNT = 'ADD_DISCOUNT';
// export const REMOVE_DISCOUNT = 'REMOVE_DISCOUNT';
export const SET_TOTAL_AMOUNT = 'SET_TOTAL_AMOUNT'
export const DELETE_ITEM = 'DELETE_ITEM'

export const addToCart = (greens, weight) => {
  return { type: ADD_TO_CART, greens, weight };
};

export const removeFromCart = (greens , weight) => {
  return{ type : REMOVE_FROM_CART, greens, weight};
};

export const clearCart = () => {
  return { type: CLEAR_CART }
};

export const deleteItem = (greens, weight) => {
  return { type: DELETE_ITEM, greens, weight }
}

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
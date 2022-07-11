import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CLEAR_CART,
    REMOVE_DISCOUNT,
    SET_TOTAL_AMOUNT,
    ORDER_TYPE,
    ADD_DISCOUNT,
    DELETE_ITEM
} from '../Action/Cart';

const initialState = {
    id: '',
    items: [],
    orderType: '',
    discount: '',
    totalAmount: 0,
    size: '',
    price: '',
    qty: '',
}
export default (state = initialState, action) => {

    switch (action.type) {
        case ADD_TO_CART:
            const addedGreens = action.greens;
            const addedWeight = action.weight;
            // console.log(addedWeight.id);
            // console.log("\n\nweights                          ",addedWeight)

            //   console.log("\nGreens Redux               \n\n", addedGreens);
            let cartItem;

            if (state.items[addedWeight.id]) {
                cartItem = { ...state.items[addedWeight.id], qty: state.items[addedWeight.id].qty + 1, itemTotal: state.items[addedWeight.id].itemTotal + addedWeight.price }
                // console.log("\nCartItems Redux :          \n\n", cartItem);
            } else {
                cartItem = { ...addedGreens, qty: 1, itemTotal: addedWeight.price, itemSizeId: addedWeight.id }
                //   console.log(cartItem);
            }

            return {
                ...state,
                items: { ...state.items, [addedWeight.id]: cartItem }
            }

        case REMOVE_FROM_CART:

            const GreensRemove = action.greens;
            console.log("REDUCE ", GreensRemove);
            const removeWeight = action.weight;

            //    console.log(removeWeight);

            //  console.log((state.items[removeWeight.id].qty));
            const quantity = state.items[removeWeight.id].qty
                // console.log("REMOVE WEIGHT", removeWeight);
                // console.log("Quat", quantity);

            // const id = removeWeight.id;
            const temp = state.items
            // console.log(state.items);

            let cartItemToRemove;
            let cartItems;

             if (quantity > 1) {
                cartItemToRemove = { ...GreensRemove, qty: state.items[removeWeight.id].qty - 1 , itemTotal: state.items[removeWeight.id].itemTotal - removeWeight.price, itemSizeId: removeWeight.id  }
                //  console.log("CART REMOVE", cartItemToRemove);
                return {
                    ...state,
                    items: { ...state.items, [removeWeight.id]: cartItemToRemove }
                }   
                
            } else {
                cartItems = { ...state.items }
                delete cartItems[removeWeight.id]

                return {
                    ...state, 
                    items: cartItems
                }
                // console.log("DELETE THE WHOLE ITEM");
            }   
              

        case CLEAR_CART:
            return {
                ...initialState
            }

        case DELETE_ITEM:
            const GreensDelete = action.greens;
            const RemoveAll = action.weight;
            
            // console.log(GreensDelete);
            // console.log(RemoveAll);

            let cartItemss

            cartItemss = { ...state.items }
            // console.log(cartItemss);
            delete cartItemss[RemoveAll.id]

            return {
                ...state,
                items: cartItemss
            }

        //     case ORDER_TYPE:
        //         const orderType = action.orderType;
        //         return {
        //             ...state,
        //             orderType: orderType
        //         }

        //     case ADD_DISCOUNT:
        //         const code = action.code;

        //         return{
        //             ...state,
        //             discount: code
        //         }

        //     case REMOVE_DISCOUNT:
        //         return{
        //             ...state,
        //             discount:''
        //         }

        case SET_TOTAL_AMOUNT:
            const total = action.total;
            return {
                ...state,
                totalAmount: total
            }
        default:
            return state;
    }
}
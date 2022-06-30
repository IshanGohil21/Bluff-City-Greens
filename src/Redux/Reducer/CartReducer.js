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
}
export default (state = initialState, action) => {

    switch (action.type) {
        case ADD_TO_CART:
            const addedGreens = action.greens;
            // const addedWeight = action.weight;
            const price = action.price;
            const size = action.size;
            // console.log("\n\nweights                          ", price,  size)

            //  console.log("\nGreens              ", addedGreens);
            let cartItem;

            if (state.items[addedGreens.id]) {
                cartItem = { ...state.items[addedGreens.id], size: state.items[addedGreens.id].size + size , itemTotal: state.items[addedGreens.id].itemTotal + price }
                // console.log("\nCartItems        ", cartItem);
            } else {
                cartItem = { ...addedGreens, size:size, itemTotal: price,}
                  console.log(cartItem);
            }
            return {
                ...state,
                items: { ...state.items, [addedGreens.id]: cartItem }
            }

        case REMOVE_FROM_CART:

            const GreensRemove = action.greens;

            const id = GreensRemove.id;
            const temp = state.items

            const subPrice = action.price;
            const subSize = action.size;

            let cartItemToRemove;
            let cartItems;
            if(temp[id].size <= subSize ) {
                cartItems = { ...state.items }
                delete cartItems[GreensRemove.id]
            } else if (temp[id].size > 1) {
                cartItemToRemove = { ...GreensRemove,  size: state.items[id].size - subSize , itemTotal: state.items[id].itemTotal - subPrice }
                console.log(cartItemToRemove);
                temp[id] = cartItemToRemove
                cartItems = temp
                //cartItems = [ ...temp[id] : cartItemToRemove]
            } else {
                cartItems = { ...state.items }
                delete cartItems[GreensRemove.id]
            }
            return {
                ...state,
                items: cartItems
            }

        case CLEAR_CART:
            return {
                ...initialState
            }

        case DELETE_ITEM:
            const GreensDelete = action.greens;

            const id0 = GreensDelete.id
            const temp0 = state.items

            let cartItemss

                cartItemss = { ...state.items }
                delete cartItemss[GreensDelete.id]
            
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
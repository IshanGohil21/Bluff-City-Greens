import { combineReducers } from "redux";

import authReducer from "./AuthReducer";
import cartReducer from './CartReducer';
import addressReducer from "./AddressReducer";
import cardReducer from "./CardReducer";
import orderReducer from './OrderReducer';

export const rootReducer = combineReducers({
    Auth: authReducer,
    Cart: cartReducer,
    Address: addressReducer,
    Card: cardReducer,
    Order : orderReducer,
})
import { combineReducers } from "redux";

import authReducer from "./AuthReducer";
import cartReducer from './CartReducer';
import addressReducer from "./AddressReducer";

export const rootReducer = combineReducers({
    Auth: authReducer,
    Cart: cartReducer,
    Address: addressReducer,
})
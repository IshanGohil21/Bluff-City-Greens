import { combineReducers } from "redux";

import authReducer from "./AuthReducer";
import cartReducer from './CartReducer';

export const rootReducer = combineReducers({
    Auth: authReducer,
    Cart: cartReducer,
})
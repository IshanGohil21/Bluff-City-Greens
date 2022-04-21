import { combineReducers } from "redux";

import { AuthReducer } from "./Reducer";

export const rootReducer = combineReducers({
    Auth: AuthReducer,
})
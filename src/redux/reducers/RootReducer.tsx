
import { combineReducers } from "redux";
import { CLEAR_APP_STATE } from "../actions/ActionTypes";
import ProductReducer from "./ProductReducer";
import AuthReducer from "./AuthReducer";

const appReducer = combineReducers({
    authReducer: AuthReducer,
    productReducer: ProductReducer
})

const rootReducer = (state: any, action: { type: any, payload: any }) => {
    if (action.type === CLEAR_APP_STATE) {
        return appReducer(undefined, action);
    }
    return appReducer(state, action);
}

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
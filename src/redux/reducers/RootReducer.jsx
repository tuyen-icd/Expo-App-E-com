
import { combineReducers } from "redux";
import { CLEAR_APP_STATE } from "../actions/ActionTypes";
import ProductReducer from "./ProductReducer";
import AuthReducer from "./AuthReducer";
import CartReducer from "./CartReducer";
import AddressReducer from "./AddressReducer";


const appReducer = combineReducers({
    authReducer: AuthReducer,
    productReducer: ProductReducer,
    cartReducer: CartReducer,
    addAddressReducer: AddressReducer,
})

const rootReducer = (state, action) => {
    if (action.type === CLEAR_APP_STATE) {
        return appReducer(undefined, action);
    }
    return appReducer(state, action);
}

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
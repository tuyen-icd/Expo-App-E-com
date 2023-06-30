
import { combineReducers } from "redux";
import { CLEAR_APP_STATE } from "../actions/ActionTypes";
import ProductReducer from "./ProductReducer";
import AuthReducer from "./AuthReducer";
import AddressReducer from "./AddressReducer";
import CartReducer from "./CartReducer";


const appReducer = combineReducers({
    authReducer: AuthReducer,
    productReducer: ProductReducer,
    addAddressReducer: AddressReducer,
    cartReducer: CartReducer,
})

const rootReducer = (state, action) => {
    if (action.type === CLEAR_APP_STATE) {
        return appReducer(undefined, action);
    }
    return appReducer(state, action);
}

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
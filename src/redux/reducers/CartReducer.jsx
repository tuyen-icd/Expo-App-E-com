import { ADD_TO_CART, FAILURE, SUCCESS } from "../actions/ActionTypes";

const initialState = {
    pending: false,
    data: null,
    error: null,
};
export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...state,
                pending: true,
                data: null,
                error: null,
            };
        case ADD_TO_CART + SUCCESS:
            return {
                ...state,
                pending: false,
                data: action.payload,
                error: null,
            };
        case ADD_TO_CART + FAILURE:
            return {
                ...state,
                pending: false,
                data: null,
                error: action.payload.error,
            };
        default:
            return {
                ...state,
            };
    }
}
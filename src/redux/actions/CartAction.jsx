import { ADD_TO_CART, FAILURE, SUCCESS } from "./ActionTypes";

export const addToCart = (payload, callback = (error, data) => {}) => ({
    type: ADD_TO_CART,
    payload,
    callback,
});

export const addToCartSuccess = payload => {
    return {
        type: ADD_TO_CART + SUCCESS,
        payload,
    };
};

export const addToCartFailure = payload => {
    return {
        type: ADD_TO_CART + FAILURE,
        payload,
    };
};
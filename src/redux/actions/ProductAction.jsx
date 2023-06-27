import { FAILURE, GET_PRODUCTS, SUCCESS } from "./ActionTypes";

export const getProduct = (payload, callback = (error, data) => { }) => ({
    type: GET_PRODUCTS,
    payload,
    callback,
})

export const getProductSuccess = (payload) => {

    return {
        type: GET_PRODUCTS + SUCCESS,
        payload,
    };
};

export const getProductFailure = (payload) => {
    return {
        type: GET_PRODUCTS + FAILURE,
        payload,
    };
};
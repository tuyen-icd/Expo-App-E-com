import { FAILURE, GET_PRODUCTS, SUCCESS } from "./ActionTypes";

export const getProduct = (payload: any, callback = (error: any, data: any) => { }) => ({
    type: GET_PRODUCTS,
    payload,
    callback,
})

export const getProductSuccess = (payload: { dataProduct: any; }) => {

    return {
        type: GET_PRODUCTS + SUCCESS,
        payload,
    };
};

export const getProductFailure = (payload: any) => {
    return {
        type: GET_PRODUCTS + FAILURE,
        payload,
    };
};
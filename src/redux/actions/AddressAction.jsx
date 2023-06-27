import { FAILURE, GET_ADDRESS, SUCCESS } from "./ActionTypes";

export const getAddress = (payload, callback = (error, data) => { }) => ({
    type: GET_ADDRESS,
    payload,
    callback,
})

export const getAddressSuccess = (payload) => {

    return {
        type: GET_ADDRESS + SUCCESS,
        payload,
    };
};

export const getAddressFailure = (payload) => {
    return {
        type: GET_ADDRESS + FAILURE,
        payload,
    };
};
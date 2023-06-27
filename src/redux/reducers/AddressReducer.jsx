import { FAILURE, GET_ADDRESS, SUCCESS } from "../actions/ActionTypes";

const initialState = {
    pending: false,
    data: null,
    error: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ADDRESS:
            return {
                ...state,
                pending: true,
                data: null,
                error: null,
            };
        case GET_ADDRESS + SUCCESS:
            return {
                ...state,
                pending: false,
                data: action.payload,
                error: null,
            };
        case GET_ADDRESS + FAILURE:
            return {
                ...state,
                pending: false,
                data: null,
                error: action.payload,
            };
        default:
            return {
                ...state,
            };
    }
}
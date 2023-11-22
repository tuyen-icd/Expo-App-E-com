import { FAILURE, GET_FAVORITE, SUCCESS } from "../actions/ActionTypes"

const initialState = {
    pending: false,
    data: null,
    error: null,
}
export default (state = initialState, action) => {
    switch (action.type) {
        case GET_FAVORITE:
            return {
                ...state,
                pending: true,
                data: null,
                error: null,
            };
        case GET_FAVORITE + SUCCESS:
            return {
                ...state,
                pending: false,
                data: action.payload,
                error: null,
            };
        case GET_FAVORITE + FAILURE:
            return {
                ...state,
                pending: false,
                data: null,
                error: data.payload.error,
            };
        default:
            return {
                ...state,
            };
    }
};
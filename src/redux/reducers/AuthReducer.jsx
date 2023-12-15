import { CHECK_SAVED_TOKEN, DO_LOGIN, DO_REGISTER, FAILURE, SUCCESS } from "../actions/ActionTypes"

const initalState = {
    pending: false,
    data: null,
    error: null
}
export default (state = initalState, action) => {
    switch (action.type) {
        case DO_LOGIN:
            return {
                ...state,
                pending: true,
                data: null,
                error: null
            };
        case DO_LOGIN + SUCCESS:
            return {
                ...state,
                pending: false,
                data: action.payload,
                error: null,
            };
        case DO_LOGIN + FAILURE:
            return {
                ...state,
                pending: true,
                data: null,
                error: action.payload
            };
        case DO_REGISTER:
            return {
                ...state,
                pending: true,
                data: null,
                error: null,
            };
        case CHECK_SAVED_TOKEN:
            return {
                ...state,
                peding: true,
                data: null,
                error : null,
            }
        default:
            return {
                ...state,
            }
    }
}
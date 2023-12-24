import { FAILURE, GET_ORDER, SUCCESS } from "../actions/ActionTypes";

const initialState = {
  pending: false,
  data: null,
  error: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER:
      return {
        ...state,
        pending: true,
        data: null,
        error: null,
      };
    case GET_ORDER + SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.payload,
        error: null,
      };
    case GET_ORDER + FAILURE:
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

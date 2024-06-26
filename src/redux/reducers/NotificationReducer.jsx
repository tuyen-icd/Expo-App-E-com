import { FAILURE, GET_NOTIFICATION, SUCCESS } from "../actions/ActionTypes";

const initialState = {
  pending: false,
  data: null,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTIFICATION:
      return {
        ...state,
        pending: true,
        data: null,
        error: null,
      };
    case GET_NOTIFICATION + SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.payload,
        error: null,
      };
    case GET_NOTIFICATION + FAILURE:
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
};

import { SUCCESS, FAILURE, GET_CART } from "../actions/ActionTypes";

const initialState = {
  pending: false,
  data: null,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      return {
        ...state,
        pending: true,
        data: null,
        error: null,
      };
    case GET_CART + SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.payload,
        error: null,
      };
    case GET_CART + FAILURE:
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
};

import { FAILURE, GET_ORDER, SUCCESS } from "./ActionTypes";

export const getOrderAction = (payload, callback = (error, data) => {}) => {
  return {
    type: GET_ORDER,
    payload,
    callback,
  };
};

export const getOrderSuccess = (payload) => {
  return {
    type: GET_ORDER + SUCCESS,
    payload,
  };
};

export const getOrderFailure = (payload) => ({
  type: GET_ORDER + FAILURE,
  payload,
});

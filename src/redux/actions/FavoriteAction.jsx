import { FAILURE, GET_FAVORITE, SUCCESS } from "./ActionTypes";

export const getFavoriteAction = (payload, callback = (error, data) => { }) => {
  return {
    type: GET_FAVORITE,
    payload,
    callback,
  };
};

export const getFavoriteSuccess = (payload) => {
  return {
    type: GET_FAVORITE + SUCCESS,
    payload,
  };
};

export const getFavoriteFailure = (payload) => ({
  type: GET_FAVORITE + FAILURE,
  payload,
});
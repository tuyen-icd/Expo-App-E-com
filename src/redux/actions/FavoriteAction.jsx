import { FAILURE, GET_FAVORITE, SUCCESS } from "./ActionTypes";

export const getFavoriteAction = (id, callback = (error, data) => { }) => {
  return {
    type: GET_FAVORITE,
    payload: id,
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
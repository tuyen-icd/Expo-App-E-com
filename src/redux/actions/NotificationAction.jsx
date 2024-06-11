import {
  FAILURE,
  GET_NOTIFICATION,
  SUCCESS,
} from "./ActionTypes";

export const getNotificationAction = (payload, callback = (error, data) => {}) => ({
  type: GET_NOTIFICATION,
  payload,
  callback,
});

export const getNotificationSuccess = (payload) => {
  return {
    type: GET_NOTIFICATION + SUCCESS,
    payload,
  };
};

export const getNotificationFailure = (payload) => {
  return {
    type: GET_NOTIFICATION + FAILURE,
    payload,
  };
};
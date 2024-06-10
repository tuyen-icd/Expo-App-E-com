import {
  FAILURE,
  GET_NOTIFICATION,
  SUCCESS,
  UPDATE_NOTIFICATION,
} from "./ActionTypes";

export const getNotification = (payload, callback = (error, data) => {}) => ({
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

export const updateNotification = (
  payload,
  callback = (error, data) => {}
) => ({
  type: UPDATE_NOTIFICATION,
  payload,
  callback,
});

export const updateNotificationSuccess = (payload) => {
  return {
    type: UPDATE_NOTIFICATION + SUCCESS,
    payload,
  };
};

export const updateNotificationFailure = (payload) => {
  return {
    type: UPDATE_NOTIFICATION + FAILURE,
    payload,
  };
};

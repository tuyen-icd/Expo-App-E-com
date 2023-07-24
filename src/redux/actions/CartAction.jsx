import {
  ADD_TO_CART,
  BUY_ONE_SAVING,
  FAILURE,
  GET_CART,
  REMOVE_ITEM_CART,
  SUCCESS,
  UPDATE_SHOPPING_CART,
} from "./ActionTypes";

export const getCartAction = (customerId, callback = (error, data) => {}) => {
  return {
    type: GET_CART,
    payload: customerId,
    callback,
  };
};

export const getCartSuccess = (payload) => {
  return {
    type: GET_CART + SUCCESS,
    payload,
  };
};

export const getCartFailure = (payload) => ({
  type: GET_CART + FAILURE,
  payload,
});

export const updateShoppingCartAction = (
  payload,
  callback = (error, data) => {}
) => ({
  type: UPDATE_SHOPPING_CART,
  payload,
  callback,
});

export const updateShoppingCartSuccess = (payload) => {
  return {
    type: UPDATE_SHOPPING_CART + SUCCESS,
    payload,
  };
};

export const updateShoppingCartFailure = (payload) => {
  return {
    type: UPDATE_SHOPPING_CART + FAILURE,
    payload,
  };
};

export const buyOneSavingAction = (
  payload,
  callback = (error, data) => {}
) => ({
  type: BUY_ONE_SAVING,
  payload,
  callback,
});

export const buyOneSavingCartSuccess = (payload) => {
  return {
    type: BUY_ONE_SAVING + SUCCESS,
    payload,
  };
};

export const buyOneSavingCartFailure = (payload) => {
  return {
    type: BUY_ONE_SAVING + FAILURE,
    payload,
  };
};

export const addToCart = (payload, callback = (error, data) => {}) => ({
  type: ADD_TO_CART,
  payload,
  callback,
});

export const addToCartSuccess = (payload) => {
  return {
    type: ADD_TO_CART + SUCCESS,
    payload,
  };
};

export const addToCartFailure = (payload) => {
  return {
    type: ADD_TO_CART + FAILURE,
    payload,
  };
};

export const inCrement = (payload, callback = (error, data) => {}) => ({
  type: ADD_TO_CART,
  payload,
  callback,
});

export const inCrementSuccess = (payload) => {
  return {
    type: ADD_TO_CART + SUCCESS,
    payload,
  };
};

export const inCrementFailure = (payload) => {
  return {
    type: ADD_TO_CART + FAILURE,
    payload,
  };
};

export const removeItemCartAction = (
  payload,
  callback = (error, data) => {}
) => ({
  type: REMOVE_ITEM_CART,
  payload,
  callback,
});

export const removeItemCartSuccess = (payload) => {
  return {
    type: REMOVE_ITEM_CART + SUCCESS,
    payload,
  };
};

export const removeItemCartFailure = (payload) => {
  return {
    type: REMOVE_ITEM_CART + FAILURE,
    payload,
  };
};

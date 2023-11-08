import { all, put, takeLatest } from "redux-saga/effects";
import { GET_CART, UPDATE_SHOPPING_CART } from "../actions/ActionTypes";
import {
  getCartSuccess,
  updateShoppingCartSuccess,
} from "../actions/CartAction";

function* getCart(action) {
  console.log("getCart_action :>> ", action);
}
function* updateShoppingCart(action) {
  const { items } = action.payload;
  yield put(updateShoppingCartSuccess({ items }));
  yield put(getCartSuccess({ items }));
}

function* cartSaga() {
  yield all([takeLatest(GET_CART, getCart)]);
  yield all([takeLatest(UPDATE_SHOPPING_CART, updateShoppingCart)]);
}

export default cartSaga;

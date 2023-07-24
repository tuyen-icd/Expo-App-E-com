import { all, takeLatest } from "redux-saga/effects";
import { GET_CART, UPDATE_SHOPPING_CART } from "../actions/ActionTypes";

function* getCart(action) {
  console.log("action :>> ", action);
}
function* updateShoppingCart(action) {
  console.log("action :>> ", action);
}

function* cartSaga() {
  yield all([takeLatest(GET_CART, getCart)]);
  yield all([takeLatest(UPDATE_SHOPPING_CART, updateShoppingCart)]);
}

export default cartSaga;

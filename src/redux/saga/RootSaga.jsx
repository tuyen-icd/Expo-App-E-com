import { all, fork } from "redux-saga/effects";
import productSaga from "./ProductSaga";
import authSaga from "./AuthSaga";
import addressSaga from "./AddressSaga";
import cartSaga from "./CartSaga";
import favorite from "./FavoriteSaga"

export function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(productSaga),
    fork(addressSaga),
    fork(cartSaga),
    fork(favorite),
  ]);
}

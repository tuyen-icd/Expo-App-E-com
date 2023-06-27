import { all, fork } from "redux-saga/effects"
import productSaga from "./ProductSaga";
import authSaga from "./AuthSaga";
import cartSaga from "./CartSaga";
import addressSaga from "./AddressSaga";

export function* rootSaga() {
    yield all([
        fork(authSaga),
        fork(productSaga),
        fork(cartSaga),
        fork(addressSaga)
    ]);
}
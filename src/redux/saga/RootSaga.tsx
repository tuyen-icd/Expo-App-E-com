import { all, fork } from "redux-saga/effects"
import productSaga from "./ProductSaga";
import authSaga from "./AuthSaga";

export function* rootSaga() {
    yield all([
        fork(authSaga),
        fork(productSaga),
    ]);
}
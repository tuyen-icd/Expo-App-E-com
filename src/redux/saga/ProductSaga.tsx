import { all, put, takeLatest } from "redux-saga/effects";
import { GET_PRODUCTS } from "../actions/ActionTypes";
import { getProductSuccess } from "../actions/ProductAction";

function* getUserSaga(action: any) {
    const { dataProduct } = action.payload;

    yield put(getProductSuccess({ dataProduct }));
}

function* productSaga() {
    yield all([takeLatest(GET_PRODUCTS, getUserSaga)]);
}

export default productSaga;
import { all, put, takeLatest } from "redux-saga/effects";
import { GET_ORDER } from "../actions/ActionTypes";
import { getOrderSuccess } from "../actions/OrderAction";

function* getOrder(action) {
  yield put(getOrderSuccess(action.payload));
}

function* orderSaga() {
  yield all([takeLatest(GET_ORDER, getOrder)]);
}
export default orderSaga;

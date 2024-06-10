import { all, put, takeLatest } from "redux-saga/effects";
import { GET_ORDER } from "../actions/ActionTypes";
import { getOrderSuccess } from "../actions/OrderAction";

function* getOrder(action) {
  const updatedOrder = {
    dayTime: new Date(),
    items: action.payload,
  };
  yield put(getOrderSuccess([...action.payload, updatedOrder]));
}

function* orderSaga() {
  yield all([takeLatest(GET_ORDER, getOrder)]);
}
export default orderSaga;

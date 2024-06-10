import { all, put, takeLatest } from "redux-saga/effects";
import { GET_NOTIFICATION } from "../actions/ActionTypes";
import { getNotificationSuccess } from "../actions/NotificationAction";

function* getNotificationSaga(action) {
  const { dataNotification } = action.payload;

  yield put(getNotificationSuccess({ dataNotification }));
}

function* NotificationSaga() {
  yield all([takeLatest(GET_NOTIFICATION, getNotificationSaga)]);
}

export default NotificationSaga;

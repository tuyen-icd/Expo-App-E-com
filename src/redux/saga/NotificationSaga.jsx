import { all, put, takeLatest, call } from "redux-saga/effects";
import { GET_NOTIFICATION } from "../actions/ActionTypes";
import { getNotificationFailure, getNotificationSuccess } from "../actions/NotificationAction";
import axios from "axios";
import { API_TEST_APP } from "../../configs";

function* getNotificationSaga(action) {
  try {
    const response = yield call(() => axios.get('http://192.168.1.57:5000/user/get-notification'));
    console.log('response_SAGA', response?.data);
    if (response && response.data) {
      let results = response.data;
      yield put(getNotificationSuccess(results.results));
      action.callback && action.callback(null, results);
    }
  } catch (error) {
    yield put(getNotificationFailure(error.message));
    action.callback && action.callback(error, null);
  }
}

function* notificationSaga() {
  yield all([takeLatest(GET_NOTIFICATION, getNotificationSaga)]);
}

export default notificationSaga;

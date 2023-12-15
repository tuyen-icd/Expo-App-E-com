import { all, call, put, takeLatest } from "redux-saga/effects";
import { CHECK_SAVED_TOKEN, DO_LOGIN, DO_REGISTER, SUCCESS } from "../actions/ActionTypes";
import Credentials from "../../repos/local/Credentials";
import axios from "axios";
import { API_LOGIN, API_REGISTER } from "../../configs";

function* doLoginSaga(action) {
  try {
    const requestData = {
      email: action.userName,
      password: action.password,
    };

    const response = yield call(axios.post, API_LOGIN, requestData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = response.data;
    if (result) {
      yield put({
        type: DO_LOGIN + SUCCESS,
        payload: result,
      });
      action.callback && action.callback(null, result);
      if (result && result.success == true && result.status === 200) {
        // console.log("PINGGO");
        Credentials.saveTokenToStorage(result.token);
      }
    }
  } catch (error) {
    console.log("doLogin Error ===", error);
    action.callback && action.callback(error, null);
  }
}
// function* registerSaga(action: any): Generator<any, void, any>
function* registerSaga(action) {
  try {
    const requestData = action.userData;

    const response = yield call(axios.post, API_REGISTER, requestData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = response.data;
    if (result) {
      action.callback && action.callback(null, result);
    }
  } catch (error) {
    console.log("error", error);
  }
};

function* checkTokenSaga(action) {
  try {
    console.log("tokenLog", action);
  }
  catch(e) {
    console.log("error", e)
  }
}

function* authSaga() {
  yield all([
    takeLatest(DO_LOGIN, doLoginSaga),
    takeLatest(DO_REGISTER, registerSaga),
    takeLatest(CHECK_SAVED_TOKEN, checkTokenSaga),
  ]);
}

export default authSaga;

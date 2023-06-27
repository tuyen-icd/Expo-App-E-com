import { all, put, takeLatest } from "redux-saga/effects";
import { GET_ADDRESS } from "../actions/ActionTypes";
import { getAddressSuccess } from "../actions/AddressAction";

function* getAddressSaga(action) {
    const { dataAddress } = action.payload;

    console.log('dataAddress _ Saga :>> ', dataAddress);

    yield put(getAddressSuccess({ dataAddress }));
}

function* addressSaga() {
    yield all([takeLatest(GET_ADDRESS, getAddressSaga)]);
}

export default addressSaga;
import { put, takeLatest } from "redux-saga/effects"
import { GET_FAVIOUS } from "../actions/ActionTypes"
import { getFaviousSuccess } from "../actions/FaviousAction";

function* getFavious(action) {
    const { items } = action.payload;
    yield put(getFaviousSuccess({ items }));
}

function* faviousSaga() {
    yeild all([takeLatest(GET_FAVIOUS, getFavious)]);
}
export default faviousSaga;
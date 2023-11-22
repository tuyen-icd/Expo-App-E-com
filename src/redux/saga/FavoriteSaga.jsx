import { all, put, takeLatest } from "redux-saga/effects"
import { GET_FAVIOUS, GET_FAVORITE } from "../actions/ActionTypes"
import { getFavoriteSuccess } from "../actions/FavoriteAction";

function* getFavorite(action) {
    const { items } = action.payload;
    yield put(getFavoriteSuccess({ items }));
}

function* favoriteSaga() {
    yield all([takeLatest(GET_FAVORITE, getFavorite)]);
}
export default favoriteSaga;
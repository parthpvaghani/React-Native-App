import { call, put, select } from "redux-saga/effects";
import firebase from "../../firebase";
import * as ACTIONS from "../actions/ActionTypes";
import { promosLoading, addPromos,promosFailed } from "../actions/promosAction";
import { fetchPromos } from "../../api/promos";
function* promosSaga({ type, payload }) {
  switch (type) {
    case ACTIONS.PROMOS_FAILED:
      try {
        yield put(promosFailed());
      } catch (e) {
        alert(e.message);
      }
      break;
    case ACTIONS.FETCH_PROMOS:
      try {
        yield put(promosLoading());
        const promosArr = yield call(fetchPromos);
        yield put(addPromos(promosArr));
      } catch (e) {
        alert(e.message);
      }
      break;
    default:
      return;
  }
}

export default promosSaga;

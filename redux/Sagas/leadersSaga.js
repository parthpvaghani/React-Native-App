import { call, put, select } from "redux-saga/effects";
import firebase from "../../firebase";
import * as ACTIONS from "../actions/ActionTypes";
import { leadersLoading, addLeaders,leadersFailed } from "../actions/leadersAction";
import { fetchLeaders } from "../../api/leaders.js";
function* leadersSaga({ type, payload }) {
  switch (type) {
    case ACTIONS.LEADERS_FAILED:
      try {
        yield put(leadersFailed());
      } catch (e) {
        alert(e.message);
      }
      break;
    case ACTIONS.FETCH_LEADERS:
      try {
        yield put(leadersLoading());
        const leadersArr = yield call(fetchLeaders);
        yield put(addLeaders(leadersArr));
      } catch (e) {
        alert(e.message);
      }
      break;
    default:
      return;
  }
}

export default leadersSaga;

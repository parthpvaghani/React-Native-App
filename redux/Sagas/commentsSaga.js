import { call, put, select } from "redux-saga/effects";
import firebase from "../../firebase";
import * as ACTIONS from "../actions/ActionTypes";
import { addComments,commentsFailed } from "../actions/commentsAction";
import { fetchComments } from "../../api/comments";
function* commentsSaga({ type, payload }) {
  switch (type) {
    case ACTIONS.COMMENTS_FAILED:
      try {
        yield put(commentsFailed());
      } catch (e) {
        alert(e.message);
      }
      break;
    case ACTIONS.FETCH_COMMENTS:
      try {
        const commentsArr = yield call(fetchComments);
        yield put(addComments(commentsArr));
      } catch (e) {
        alert(e.message);
      }
      break;
    default:
      return;
  }
}

export default commentsSaga;

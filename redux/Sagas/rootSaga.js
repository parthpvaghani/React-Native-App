import { takeLatest } from 'redux-saga/effects';
import * as ACTION from '../actions/ActionTypes';
import dishesSaga from '../Sagas/dishesSaga.js';
import commentsSaga from '../Sagas/commentsSaga.js';
import leadersSaga from '../Sagas/leadersSaga.js';
import promosSaga from '../Sagas/promosSaga.js';

function* rootSaga() {
	yield takeLatest([
		ACTION.DISHES_FAILED,
		ACTION.FETCH_DISHES,
	], dishesSaga);
	yield takeLatest([
		ACTION.FETCH_COMMENTS,
		ACTION.COMMENTS_FAILED,
	], commentsSaga);
	yield takeLatest([
		ACTION.LEADERS_FAILED,
		ACTION.FETCH_LEADERS
	], leadersSaga);
	yield takeLatest([
		ACTION.PROMOS_FAILED,
		ACTION.FETCH_PROMOS
	], promosSaga);
}

export default rootSaga;


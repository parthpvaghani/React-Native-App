import { call, put, select } from "redux-saga/effects";
import firebase from "../../firebase";
import * as ACTIONS from "../actions/ActionTypes";
import { dishesLoading, addDishes,dishesFailed } from "../actions/dishesAction";
import { deleteFavoriteDish, fetchDishes,addFavoriteDish } from "../../api/dishes";

function* dishesSaga({ type, payload }) {
  switch (type) {
    case ACTIONS.DISHES_FAILED:
      try {
        yield put(dishesFailed());
      } catch (e) {
        alert(e.message);
      }
      break;
    case ACTIONS.FETCH_DISHES:
      try {
        yield put(dishesLoading());
        const dishesArr = yield call(fetchDishes);
        yield put(addDishes(dishesArr));
      } catch (e) {
        alert(e.message);
      }
      break;
    case ACTIONS.DELETE_FAVORITE:
    try {
      yield call(deleteFavoriteDish,payload);
    } catch (e) {
      alert(e.message);
    }
    break;
    case ACTIONS.ADD_DISH_FAVOURITE:
      try {
        yield call(addFavoriteDish,payload);
      } catch (e) {
        alert(e.message);
      }
      break;
    default:
      return;
  }
}

export default dishesSaga;

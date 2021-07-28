import * as ActionTypes from "../actions/ActionTypes";

export const dishes = (
  state = { isLoading: true, errMess: null, dishes: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_DISHES:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        dishes: action.payload,
      };

    case ActionTypes.DISHES_LOADING:
      return { ...state, isLoading: true, errMess: null, dishes: [] };
    case ActionTypes.FETCH_DISHES:
      return { ...state, isLoading: true, errMess: null };

    case ActionTypes.DISHES_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };
    case ActionTypes.SET_DISH_FAVOURITE:
      return { ...state, isLoading: false, dishes: action.payload };
    default:
      return state;
  }
};

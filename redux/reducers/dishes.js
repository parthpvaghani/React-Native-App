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
    case ActionTypes.ADD_DISH_FAVOURITE:
      return {
        ...state,
        dishes: state.dishes.map((dish, index) => {
          if (dish.docid == action.payload) {
            return {
              ...dish,
              data:{
                ...dish.data,
                favorite:true
              }
            };
          }
          return dish;
        }),
      };
    case ActionTypes.DELETE_FAVORITE:
      return {
        ...state,
        dishes: state.dishes.map((dish, index) => {
          if (dish.docid == action.payload) {
            return {
              ...dish,
              data:{
                ...dish.data,
                favorite:false
              }
            };
          }
          return dish;
        }),
      };
    default:
      return state;
  }
};

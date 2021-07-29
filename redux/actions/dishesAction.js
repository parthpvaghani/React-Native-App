import * as ACTIONS from './ActionTypes'

export const dishesLoading = () => ({
    type: ACTIONS.DISHES_LOADING
});

export const dishesFetching = () => ({
    type: ACTIONS.FETCH_DISHES
});

export const dishesFailed = (errmess) => ({
    type: ACTIONS.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ACTIONS.ADD_DISHES,
    payload: dishes
});

export const deleteFavorite = (dishId) => ({
    type: ACTIONS.DELETE_FAVORITE,
    payload: dishId
}); 

export const setFavourite = (dishes) => ({
    type:ACTIONS.SET_DISH_FAVOURITE,
    payload:dishes
})
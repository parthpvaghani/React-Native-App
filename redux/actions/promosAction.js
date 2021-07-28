import * as ACTIONS from './ActionTypes'

export const promosLoading = () => ({
    type: ACTIONS.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ACTIONS.PROMOS_FAILED,
    payload: errmess
});
export const promosFetching = () => ({
    type: ACTIONS.FETCH_PROMOS
});
export const addPromos = (promos) => ({
    type: ACTIONS.ADD_PROMOS,
    payload: promos
});
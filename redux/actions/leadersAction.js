import * as ACTIONS from './ActionTypes'

export const leadersLoading = () => ({
    type: ACTIONS.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
    type: ACTIONS.LEADERS_FAILED,
    payload: errmess
});
export const leadersFetching = () => ({
    type: ACTIONS.FETCH_LEADERS
});
export const addLeaders = (leaders) => ({
    type: ACTIONS.ADD_LEADERS,
    payload: leaders
});
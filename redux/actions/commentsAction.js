import * as ACTIONS from './ActionTypes'

export const commentsFailed = (errmess) => ({
    type: ACTIONS.COMMENTS_FAILED,
    payload: errmess
});
export const commentsFetching = () => ({
    type: ACTIONS.FETCH_COMMENTS
});
export const addComments = (comments) => ({
    type: ACTIONS.ADD_COMMENTS,
    payload: comments
});

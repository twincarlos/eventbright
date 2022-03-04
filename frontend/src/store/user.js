import { csrfFetch } from "./csrf";

const GET_USER = 'session/getUser';

const getUser = user => {
    return {
        type: GET_USER,
        user
    }
}

export const getOneUser = id => async dispatch => {
    const response = await csrfFetch(`/api/users/${id}`);
    const user = await response.json();
    dispatch(getUser(user));
    return user;
}

const initialState = {};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER:
            return { ...state, user: action.user }
        default:
            return state;
    }
}

export default usersReducer;

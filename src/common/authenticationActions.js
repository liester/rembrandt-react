import {
    USER_SIGNED_IN,
    USER_SIGNED_OUT
} from './authenticationReducer.js';

export const updateUser = (user) => {
    return dispatch => {
        dispatch({ type: USER_SIGNED_IN, payload: user });
        localStorage.setItem('authenticatedUser', JSON.stringify(user))
    };
};
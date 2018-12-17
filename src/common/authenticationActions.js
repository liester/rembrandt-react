import {
  USER_SIGNED_IN,
  USER_SIGNED_OUT,
} from './authenticationReducer.js';

import firebase from '../authentication/firebase.js';

export const signIn = user => {
  return dispatch => {
    dispatch({ type: USER_SIGNED_IN, payload: user });
    localStorage.setItem('authenticatedUser', JSON.stringify(user));
  };
};

export const signOut = () => {
  return dispatch => {
    dispatch({ type: USER_SIGNED_OUT });
    localStorage.setItem('authenticatedUser', null);
    firebase.auth().signOut();
  };
};

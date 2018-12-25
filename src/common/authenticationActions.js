import { USER_SIGNED_IN, USER_SIGNED_OUT } from './authenticationReducer.js';
import appConfig from '../app/appConfig.js';
import firebase from '../authentication/firebase.js';
import axios from 'axios';

export const signIn = (user, attemptCreateProfile) => {
  return dispatch => {
    dispatch({ type: USER_SIGNED_IN, payload: user });
    localStorage.setItem('authenticatedUser', JSON.stringify(user));
    if (attemptCreateProfile) {
      axios.post(`${appConfig.apiBaseUrl}/profile`);
    }
  };
};

export const signOut = () => {
  return dispatch => {
    dispatch({ type: USER_SIGNED_OUT });
    localStorage.setItem('authenticatedUser', null);
    firebase.auth().signOut();
  };
};

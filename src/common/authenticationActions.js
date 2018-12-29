import { USER_SIGNED_IN, USER_SIGNED_OUT,USER_PROFILE_UPDATE } from './authenticationReducer.js';
import appConfig from '../app/appConfig.js';
import firebase from '../authentication/firebase.js';
import axios from 'axios';

export const signIn = (user) => {
  return dispatch => {
    dispatch({ type: USER_SIGNED_IN, payload: user });
    localStorage.setItem('authenticatedUser', JSON.stringify(user));
    axios.post(`${appConfig.apiBaseUrl}/profile`)
      .then(({ data }) => {
        console.log(JSON.stringify(data))
        dispatch({ type: USER_PROFILE_UPDATE, payload: data.profile})
      });
  };
};

export const signOut = () => {
  return dispatch => {
    dispatch({ type: USER_SIGNED_OUT });
    localStorage.setItem('authenticatedUser', null);
    axios.defaults.headers.common['Firebase-Auth'] = null
    firebase.auth().signOut();
  };
};

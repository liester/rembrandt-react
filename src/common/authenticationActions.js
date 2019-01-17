import {
  USER_SIGNED_IN,
  USER_SIGNED_OUT,
  USER_PROFILE_UPDATE,
} from './authenticationReducer.js';
import appConfig from '../app/appConfig.js';
import firebase from '../authentication/firebase.js';
import axios from 'axios';
import { toast } from 'react-toastify';

export const signIn = user => {
  return dispatch => {
    dispatch({ type: USER_SIGNED_IN, payload: user });
    localStorage.setItem('authenticatedUser', JSON.stringify(user));
    axios
      .post(`${appConfig.apiBaseUrl}/profile`)
      .then(({ data }) => {
        dispatch({ type: USER_PROFILE_UPDATE, payload: data.profile });
      })
      .catch(error => {
        const response = error.response.data;
        // Firebase Token Id expired
        if (response.code && response.code === 'auth') {
          signOut()(dispatch);
          toast.info('Session Expired.  Please log in again.');
        }
      });
  };
};

export const signOut = () => {
  return dispatch => {
    dispatch({ type: USER_SIGNED_OUT });
    localStorage.setItem('authenticatedUser', null);
    delete axios.defaults.headers.common['Firebase-Auth'];
    firebase.auth().signOut();
  };
};

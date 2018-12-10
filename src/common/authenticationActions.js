import axios from 'axios';
import {
    USER_SIGNED_IN,
    USER_SIGNED_OUT
} from './authenticationReducer.js';
import appConfig from '../app/appConfig.js';
const authUrl = `${appConfig.apiBaseUrl}/auth`;

export const login = (user) => {
    return dispatch => {
        dispatch({ type: USER_SIGNED_IN, payload: user });
        // return axios
        //     .post(authUrl, {
        //         user
        //     })
        //     .then(response => {
        //         if (response.data && response.data.authenticated) {
        //         } else {
        //             dispatch({ type: USER_SIGNED_OUT, payload: {} });
        //         }
        //     })
        //     .catch(error => {
        //         throw error;
        //     });
    };
};
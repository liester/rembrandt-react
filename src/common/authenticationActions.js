import axios from 'axios';
import {
    USER_SIGNED_IN,
    USER_SIGNED_OUT
} from './authenticationReducer.js';
import appConfig from '../app/appConfig.js';
const authUrl = `${appConfig.apiBaseUrl}/auth`;

export const login = (user) => {
    return dispatch => {
        return axios
            .post(authUrl, {
                user
            })
            .then(response => {
                if (response.data && response.data.authenticated) {
                    dispatch({ type: USER_SIGNED_IN, payload: response.data });
                } else {
                    dispatch({ type: USER_SIGNED_OUT, payload: {} });
                }
            })
            .catch(error => {
                throw error;
            });
    };
};
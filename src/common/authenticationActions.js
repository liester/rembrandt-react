import axios from 'axios';
import {
    USER_SIGNED_IN,
    USER_SIGNED_OUT
} from './authenticationReducer.js';
import appConfig from '../app/appConfig.js';
const userUrl = `${appConfig.apiBaseUrl}/user`;

export const login = (user) => {
    return dispatch => {
        return axios
            .post(userUrl, {
                user
            })
            .then(response => {
                if (response.data) {
                    dispatch({ type: USER_SIGNED_IN, payload: response.data });

                } else {
                    dispatch({ type: USER_SIGNED_OUT, payload: response.data });
                }
            })
            .catch(error => {
                throw error;
            });
    };
};
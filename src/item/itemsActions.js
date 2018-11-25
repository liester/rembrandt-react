import axios from 'axios';
import {
  ITEMS_UPDATED,
} from './itemsReducer.js';
import appConfig from '../app/appConfig.js';
const itemsUrl = `${appConfig.apiBaseUrl}/items`;

export const updateItems = items => {
  return dispatch => {
    dispatch({ type: ITEMS_UPDATED, payload: items });
  };
};

export const getAll = () => {
  return dispatch => {
    return axios
      .get(itemsUrl)
      .then(response => {
        dispatch({ type: ITEMS_UPDATED, payload: response.data });
      })
      .catch(error => {
        throw error;
      });
  };
};

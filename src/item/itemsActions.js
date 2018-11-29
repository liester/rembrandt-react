import axios from 'axios';
import {
  ITEMS_UPDATED,
  UPDATE_SINGLE_ITEM
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

export const getById = (itemId) => {
  return dispatch => {
    return axios
      .get(`${appConfig.apiBaseUrl}/item?itemId=${itemId}`)
      .then(response => {
        dispatch({ type: UPDATE_SINGLE_ITEM, payload: response.data });
      })
      .catch(error => {
        throw error;
      });
  };
};

export const buyItemById = (itemId, buyerId) => {
  return dispatch => {
    return axios
      .post(`${appConfig.apiBaseUrl}/item/buy?itemId=${itemId}&buyerId=${buyerId}`)
      .catch(error => {
        throw error;
      });
  };
};
import axios from 'axios';
import { ITEMS_UPDATED, UPDATE_SINGLE_ITEM } from './itemsReducer.js';
import { USER_PROFILE_UPDATE} from '../common/authenticationReducer.js';
import { history } from '../common/storeConfig.js';
import appConfig from '../app/appConfig.js';
import { toast } from 'react-toastify';
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

export const getById = itemId => {
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

export const buyItemById = itemId => {
  return dispatch => {
    return axios
      .put(`${appConfig.apiBaseUrl}/item/${itemId}/buy`)
      .then(({data}) => {
        dispatch({ type: USER_PROFILE_UPDATE, payload: data.profile });
      })
      .catch(error => {
        const {response} = error;
        if(response.status === 401){
          toast.info('You must be logged in to buy.')
          history.push('/login')
        }else if(response.data && response.data.cause){
          toast.info(response.data.cause)
        }
        throw error;
      });
  };
};

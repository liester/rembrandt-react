import io from 'socket.io-client';
import appConfig from '../app/appConfig.js';
import { ITEM_UPDATED, ITEMS_UPDATED } from '../item/itemsReducer.js';

const socket = io(appConfig.socketUrl);

const setupSocket = dispatch => {
  socket.on('item.updated', item => {
    dispatch({ type: ITEM_UPDATED, payload: item });
  });
  socket.on('items.updated', data => {
    dispatch({ type: ITEMS_UPDATED, payload: data });
  });
  return socket;
};

export default setupSocket;

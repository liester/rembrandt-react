import logger from '../logger';
import { listenForItemChanges } from '../firebase/firestore';

const START_LISTENING_TO_ITEMS = '@item/START_LISTENING_TO_ITEMS';
const ITEMS_UPDATED = '@item/ITEMS_UPDATED';

export const startListeningToItems = () => {
  return dispatch => {
    dispatch({ type: START_LISTENING_TO_ITEMS });
    return listenForItemChanges(items => {
      logger.debug(items);
      if (items) {
        dispatch({ type: ITEMS_UPDATED, payload: items });
      } else {
        dispatch({ type: ITEMS_UPDATED, payload: [] });
      }
    });
  };
};

export const DEFAULT_STATE = {
  allItems: [],
  listeningToItem: false,
  isLoading: true,
};

export default (state = DEFAULT_STATE, { type, payload }) => {
  switch (type) {
    case START_LISTENING_TO_ITEMS:
      return {
        ...state,
        listeningToItems: true,
      };
    case ITEMS_UPDATED:
      return {
        ...state,
        allItems: payload,
      };
    default:
      return state;
  }
};

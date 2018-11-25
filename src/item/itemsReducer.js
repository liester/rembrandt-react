export const ITEMS_UPDATED = '@item/ITEMS_UPDATED';

export const DEFAULT_STATE = {
  allItems: [],
  listeningToItem: false,
  isLoading: true,
};

export default (state = DEFAULT_STATE, { type, payload }) => {
  switch (type) {
    case ITEMS_UPDATED:
      return {
        ...state,
        allItems: payload,
      };
    default:
      return state;
  }
};

export const ITEMS_UPDATED = '@item/ITEMS_UPDATED';
export const ITEM_UPDATED = '@item/ITEM_UPDATED';
export const UPDATE_SINGLE_ITEM = '@item/UPDATE_SINGLE_ITEM';

export const DEFAULT_STATE = {
  allItems: {},
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
    case ITEM_UPDATED:
      return {
        ...state,
        allItems: { ...state.allItems, [payload.id]: payload },
      };
    default:
      return state;
  }
};

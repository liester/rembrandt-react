export const USER_SIGNED_IN = '@user/USER_SIGNED_IN';
export const USER_SIGNED_OUT = '@user/USER_SIGNED_OUT';

export const DEFAULT_STATE = {
    // user: {id: 'levi.liester@proxibid.com'},
    user: null,
};

export default (state = DEFAULT_STATE, { type, payload }) => {
  switch (type) {
    case USER_SIGNED_IN:
      return {
        ...state,
        user: payload
      };
    case USER_SIGNED_OUT:
      return {
        ...state,
        user: null
      }
    default:
      return state;
  }
};

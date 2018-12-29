export const USER_SIGNED_IN = '@user/USER_SIGNED_IN';
export const USER_SIGNED_OUT = '@user/USER_SIGNED_OUT';
export const USER_PROFILE_UPDATE = `@user/USER_PROFILE_UPDATE`;

export const DEFAULT_STATE = {
  user: null,
};

export default (state = DEFAULT_STATE, { type, payload }) => {
  switch (type) {
    case USER_SIGNED_IN:
      return {
        ...state,
        user: payload,
      };
    case USER_SIGNED_OUT:
      return {
        ...state,
        user: null,
      };
    case USER_PROFILE_UPDATE:
      return {
        ...state,
        user: {
          ...state.user,
          profile: payload
        }
      }
    default:
      return state;
  }
};

import { push } from 'react-router-redux';

export const goHome = () => push('/');

export const DEFAULT_STATE = {
  appDrawerOpen: false,
};

export default (state = DEFAULT_STATE, { type }) => {
  switch (type) {
    default:
      return state;
  }
};

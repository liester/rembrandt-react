import { applyMiddleware, createStore, combineReducers } from 'redux';
import createBrowserHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';
import reduxLogger from 'redux-logger';
import appConfig from '../app/appConfig';
import itemDuck from '../item/itemsReducer';
import authentication from '../common/authenticationReducer.js';

const reducers = {
  items: itemDuck,
  authentication
};

const loggerMiddleware = appConfig.reduxLoggerEnabled ? [reduxLogger] : [];

export const history = createBrowserHistory();

const buildCombinedReducers = reducers => combineReducers({
  ...reducers,
  routing: routerReducer,
  form: formReducer,
});

const buildReducer = reducers => {
  const combinedReducers = buildCombinedReducers(reducers);
  return (state, action) => {
    return combinedReducers(state, action);
  };
};

export const storeConfig = createStore(
  buildReducer(reducers),
  composeWithDevTools(
    applyMiddleware(
      thunk,
      ...loggerMiddleware,
      routerMiddleware(history),
    )
  )
);
if (process.env.NODE_ENV !== 'production') {
  window.store = storeConfig;
}

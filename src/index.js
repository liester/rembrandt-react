import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './app/App';
import registerServiceWorker from './registerServiceWorker';
import setupSocket from './sockets/sockets.js';
import { storeConfig } from './common/storeConfig';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './common/theme';

const root = document.getElementById('root');

setupSocket(storeConfig.dispatch);

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <Provider store={storeConfig}>
            <App />
        </Provider>
    </MuiThemeProvider>
    , root);

registerServiceWorker();

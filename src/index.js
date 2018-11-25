import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './app/App';
import registerServiceWorker from './registerServiceWorker';
import setupSocket from './sockets/sockets.js';
import { storeConfig } from './common/storeConfig';
const root = document.getElementById('root');

setupSocket(storeConfig.dispatch);

ReactDOM.render(<App />, root);

registerServiceWorker();

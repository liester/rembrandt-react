import React from 'react';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import ResponsiveDrawer from './ResponsiveDrawer.js'

import { storeConfig } from '../common/storeConfig';
import theme from '../common/theme';
import AllItems from '../item/AllItems';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <Provider store={storeConfig}>
            <ResponsiveDrawer>
              <AllItems/>
            </ResponsiveDrawer>
          </Provider>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;

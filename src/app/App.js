import React from 'react';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import ResponsiveDrawer from './ResponsiveDrawer.js'
import { Switch, Router, BrowserRouter, Route } from 'react-router-dom';
import { history } from '../common/storeConfig.js'

import { storeConfig } from '../common/storeConfig';
import theme from '../common/theme';
import AllItems from '../item/AllItems';
import Item from '../item/Item.js';
import Buyer from '../buyer/Buyer.js';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <Provider store={storeConfig}>
            <ResponsiveDrawer>
              <Router history={history}>
                  <Switch>
                    <Route exact path="/" component={AllItems} />
                    <Route exact path="/item/:id" component={Item} />
                    <Route exact path="/buyer/:buyerId" component={Buyer} />
                  </Switch>
              </Router>
            </ResponsiveDrawer>
          </Provider>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;

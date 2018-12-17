import React from 'react';
import ResponsiveDrawer from './ResponsiveDrawer.js';
import { Switch, Router, Route, Redirect } from 'react-router-dom';
import { history } from '../common/storeConfig.js';

import AllItems from '../item/AllItems';
import Item from '../item/Item.js';
import BuyerPage from '../buyer/BuyerPage.js';
import LoginPage from '../authentication/LoginPage.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authenticationActions from '../common/authenticationActions';
import axios from 'axios';

class App extends React.Component {
  componentWillMount() {
    // authenticatedUser might not exist, but thats ok.
    const authenticatedUser = JSON.parse(localStorage.getItem('authenticatedUser'));
    if (authenticatedUser) {
      axios.defaults.headers.common['Firebase-Auth'] = authenticatedUser.idToken;
    }
    this.props.authenticationActions.signIn(authenticatedUser);
  }

  render() {
    return (
      <ResponsiveDrawer>
        <Router history={ history }>
          <Switch>
            <Route exact path="/" component={ AllItems } />
            <Route exact path="/item/:id" component={ Item } />
            <AuthenticatedRoute exact path="/buyer/:userId" component={ BuyerPage } isAuthenticated={ this.props.isAuthenticated } />
            <Route exact path="/login" component={ LoginPage } />
          </Switch>
        </Router>
      </ResponsiveDrawer>
    );
  }
}

const AuthenticatedRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route { ...rest } render={ props => {
    return (
      isAuthenticated ?
        <Component { ...props } /> :
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location },
        }} />
    );
  } } />
);

const mapDispatchToProps = dispatch => {
  return {
    authenticationActions: bindActionCreators(authenticationActions, dispatch),
  };
};

const mapStateToProps = ({ authentication }) => {
  return {
    isAuthenticated: !!authentication.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

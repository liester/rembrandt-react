import React from 'react';
import ResponsiveDrawer from './ResponsiveDrawer.js'
import { Switch, Router, Route, Redirect } from 'react-router-dom';
import { history } from '../common/storeConfig.js'

import AllItems from '../item/AllItems';
import Item from '../item/Item.js';
import BuyerPage from '../buyer/BuyerPage.js';
import LoginPage from '../authentication/LoginPage.js'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authenticationActions from '../common/authenticationActions';
import axios from 'axios'

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100)
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

class App extends React.Component {

  componentWillMount() {
    //authenticatedUser might not exist, but thats ok.
    const authenticatedUser = JSON.parse(localStorage.getItem('authenticatedUser'));
    axios.defaults.headers.common['Firebase-Auth'] = authenticatedUser.idToken;
    this.props.authenticationActions.updateUser(authenticatedUser);
  }

  render() {
    return (
      <ResponsiveDrawer>
        <Router history={history}>
            <Switch>
              <AuthenticatedRoute exact path="/" component={AllItems} />
              <Route exact path="/item/:id" component={Item} />
              <Route exact path="/buyer/:buyerId" component={BuyerPage} />
              <Route exact path="/login" component={LoginPage}/>
            </Switch>
        </Router>
      </ResponsiveDrawer>
    );
  }
}


const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
      fakeAuth.isAuthenticated === true
          ? <Component {...props} />
          : <Redirect to='/login' />
  )} />
)


const mapDispatchToProps = dispatch => {
  return {
    authenticationActions: bindActionCreators(authenticationActions, dispatch),
  };
};


export default connect(null, mapDispatchToProps)(App);

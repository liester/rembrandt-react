import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as authenticationActions from '../common/authenticationActions.js';
import firebase from './firebase.js';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import axios from 'axios';

const styles = {};
class LoginPage extends React.Component {
    static propTypes = {
      authenticationActions: PropTypes.object,
      location: PropTypes.object,
      isAuthenticated: PropTypes.bool,
    };

    state = { redirectToReferrer: false };

    componentDidMount() {
      this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
        user => {
          if (user) {
            user.getIdToken().then(idToken => {
              user.idToken = idToken;
              axios.defaults.headers.common['Firebase-Auth'] = idToken;
              this.props.authenticationActions.signIn(user);
            });
          }
        });
    }

    render() {
      const { from } = this.props.location.state || { from: { pathname: '/' } };
      const { redirectToReferrer } = this.state;
      const uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // We will display Google and Facebook as auth providers.
        signInOptions: [
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
          // Avoid redirects after sign-in.
          signInSuccessWithAuthResult: () => false,
        },
      };

      if (redirectToReferrer) { return <Redirect to={ from } />; }
      if (this.props.isAuthenticated) { return <Redirect to={ from } />; }
      return (
        <React.Fragment>
          <div>You must log in to view page at: [{from.pathname}].</div>
          <StyledFirebaseAuth uiConfig={ uiConfig } firebaseAuth={ firebase.auth() } />
        </React.Fragment>
      );
    }
}

const mapStateToProps = ({ items, authentication }) => {
  return {
    allItems: items.allItems,
    isAuthenticated: !!authentication.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authenticationActions: bindActionCreators(authenticationActions, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoginPage));

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as authenticationActions from '../common/authenticationActions.js';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import axios from 'axios'
import { history } from '../common/storeConfig.js'

const config = {
    apiKey: 'AIzaSyBMqOH3UH86AX4Sx91eb4apmpIB8V0I3IE',
    authDomain: 'jessica-3a11f.firebaseapp.com',
    // ...
};

const app = firebase.initializeApp(config);
const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: () => {
            history.goBack()
        }
    }
};

const styles = {};
class LoginPage extends React.Component {
    static propTypes = {
    };

    componentDidMount() {
        this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
            (user) => {
                if (user) {
                    user.getIdToken().then((idToken) => {
                        user.idToken = idToken;
                        axios.defaults.headers.common['Firebase-Auth'] = idToken;
                        this.props.authenticationActions.updateUser(user)
                    })
                }
            })
    }

    render() {
        return (
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        )
    }
}

const mapStateToProps = ({ items }) => {
    return {
        allItems: items.allItems,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        authenticationActions: bindActionCreators(authenticationActions, dispatch),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoginPage));

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authenticationActions from '../common/authenticationActions';
import { withRouter } from 'react-router';
import axios from 'axios'

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
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
        signInSuccessWithAuthResult: () => false
    }
};

class EnsureAuthenticated extends React.Component {

    handleValueChange = (e) => {
        this.setState({ user: e.target.value })
    }

    // Listen to the Firebase Auth state and set the local state.
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

    // Make sure we un-register Firebase observers when the component unmounts.
    componentWillUnmount() {
        this.unregisterAuthObserver();
    }

    render() {
        console.log('checking auth')
        if (this.props.user) {
            return (
                <React.Fragment>
                    {this.props.children}
                </React.Fragment>
            );
        } else {
            return (
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
            )

        }
    }
}


const mapStateToProps = ({ authentication }, { match }) => {
    return {
        user: authentication.user,
        isAuthenticated: !!authentication.user
    };
};


const mapDispatchToProps = dispatch => {
    return {
        authenticationActions: bindActionCreators(authenticationActions, dispatch),
    };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EnsureAuthenticated));

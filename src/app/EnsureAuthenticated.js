import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authenticationActions from '../common/authenticationActions';
import { withRouter } from 'react-router';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class EnsureAuthenticated extends React.Component {

    state = {
        user: null
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
                <div style={{display: 'flex', alignContent:'center', flexDirection:'column'}}>
                <TextField
                    id="standard-dense"
                    label="Who Der?"
                    value = {this.state.user}
                    margin="dense"
                onChange={(e)=>{
                    this.setState({user: e.target.value})
                }}/>
                <Button variant='contained' color='primary' onClick={(e)=>{
                    this.props.authenticationActions.login(this.state.user)
                }}>
                Log In
                </Button>
                </div>
            )
        }
    }
}


const mapStateToProps = ({ authentication }, { match }) => {
    const itemId = match.params.id;
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

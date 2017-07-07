import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {loginUser} from '../../redux/actions/authActions';
import Login from './Login';


class LoginForm extends Component {
    render() {
        const {dispatch, isAuthenticated, errorMessage} = this.props;
        return (
            <div>
                {!isAuthenticated &&
                <Login
                    errorMessage={errorMessage}
                    onLoginClick={creds => dispatch(loginUser(creds))}
                />
                }
            </div>
        );
    }
}
LoginForm.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string
};

function mapStateToProps(state) {
    const { auth } = state;
    const { isAuthenticated, errorMessage } = auth;
    return {
        isAuthenticated,
        errorMessage
    };
}

export default connect(mapStateToProps)(LoginForm);

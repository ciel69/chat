import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {EmailSignInForm} from 'redux-auth/material-ui-theme';
import Button from 'react-bootstrap-button-loader';
import {isUserSignedIn} from '../../redux/models/user';

const propTypes = {
    dispatch: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    provider: PropTypes.string.isRequired,
    userSignedIn: PropTypes.object,
};

class OAuthButton extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const {dispatch, provider} = this.props;

        dispatch(EmailSignInForm({provider}));
    }

    render() {
        const {loading, provider, userSignedIn} = this.props;

        if (userSignedIn) {
            return null;
        }

        return <EmailSignInForm />;// <Button loading={loading} onClick={this.handleClick}>{provider}</Button>;
    }
}

OAuthButton.propTypes = propTypes;

function mapStateToProps(state, ownProps) {
    const loading = state.auth.getIn(['EmailSignInForm', ownProps.provider, 'loading']) || false;

    return {userSignedIn: isUserSignedIn(state), loading};
}

export default connect(mapStateToProps)(OAuthButton);

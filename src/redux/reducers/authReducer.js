import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS, CHECK_AUTH
} from '../actions/authActions';
import localStorage from 'localStorage';

const initialState = {
    isFetching: false,
    isAuthenticated: !!localStorage.getItem('id_token')
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false,
                user: action.creds
            });
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: true,
                errorMessage: ''
            });
        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.message
            });
        case LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false
            });
        case CHECK_AUTH:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: action.isAuthenticated
            });
        default:
            return state;
    }
}

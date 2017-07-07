import {combineReducers} from 'redux';
import authReducer from './authReducer';
import counterReducer from './counterReducer';
import timeReducer from './timeReducer';
import chatReducer from './chatReducer';

export default combineReducers({
    auth: authReducer,
    counter: counterReducer,
    time: timeReducer,
    chat: chatReducer
});

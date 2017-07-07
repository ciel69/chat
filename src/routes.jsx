import React from 'react';
import {Route, IndexRoute}  from 'react-router';
import App from './components/App';
import CounterPage from './components/CounterPage';
import HelloWorldPage from './components/HelloWorldPage';
import Chat from './components/ChatNew';
import {LoginForm} from './components/Login';
import TimePage from './components/TimePage';
import {isUserSignedIn} from './redux/models/user';

function requireAuth(nextState, transition, cb) {
    setTimeout(() => {
        if (!isUserSignedIn(store.getState())) {
            transition('/');
        }
        cb();
    }, 0);
}

let store;

export default function routes(storeRef) {
    store = storeRef;

    return (
        <Route component={App} path='/'>
            <IndexRoute component={HelloWorldPage} />
            <Route component={TimePage} path='time' onEnter={requireAuth}/>
            <Route component={Chat} path='chat' onEnter={requireAuth}/>
            <Route component={CounterPage} path='counters'/>
            <Route component={LoginForm} path='login' onEnter={!requireAuth}/>
        </Route>
    );
}

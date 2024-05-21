import React from 'react';
import { render } from 'react-dom';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createStore, applyMiddleware } from 'redux';

import { setDispatch } from './util';
import manageApp from './domains/app';
import App from './components/App';

import './assets/fonts/index.css';
import './assets/styles/base.css';

const history = createBrowserHistory();

const busMiddleWare = (store) => (next) => (action) => {
    //console.log('Action is dispatched', action);
    if (! action.type.startsWith('LOAD_')){
        // bus.push(action);
    }
    return next(action);
};

const initialState = {}; // This is a stub
const loadState = () => new Promise((yay, nay) => setTimeout(() => yay(initialState), 3)); // This is a stub, simulates fetching initial state from somewhere

const makeStore = (preloadedState) => createStore(
    manageApp(history),
    preloadedState,
    composeWithDevTools(
        applyMiddleware(
            routerMiddleware(history),
            busMiddleWare
        )
    )
);

loadState()
    .then(makeStore)
    .then((store) => {
        // The store is ready to .dispatch, additional setup goes here
        // bus.connect((action) => store.dispatch(action));
        setDispatch((store.dispatch));
        render(<App store={store} history={history}/>, document.getElementById('root'));
    });


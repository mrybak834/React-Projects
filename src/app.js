/**
 * For client side routing to work, tell the server to serve index.html for all routes,
 * then react router figures out what components to add.
 * 
 * 
 */

import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter, { history } from './routers/Router';
import { Provider } from 'react-redux';
import configureStore from './redux/store/config';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { startSetExpenses } from './redux/actions/expenses';
import { auth } from './firebase/firebase';


const store = configureStore();

// const unsubscribe = store.subscribe(() => {
//     const state = store.getState();
//     const filteredExpenses = getFilteredExpenses(state.expenses, state.filters);
//     console.log(filteredExpenses);
//     console.log(state.filters);
// });

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

/**
 * Only render the page one time.
 * All other times we simply statically path through, using history.push
 */
let hasRendered = false;
const renderApp = () => {
    if(!hasRendered){
        ReactDOM.render( jsx, document.getElementById('app'));
        hasRendered = true;
    }
};

auth.onAuthStateChanged((user) => {
    if (user){
        store.dispatch(startSetExpenses())
            .then(() => {
                renderApp();

                // If just logged in, redirect to dashboard
                // This makes sure that on hard page refreshes, you are not redirected unnecessarily
                if (history.location.pathname === '/') {
                    history.push('/dashboard');
                }
            })
            .catch(() => {

            });
    }
    else {
        renderApp();
        // Go to login page
        history.push('/');
    }
});
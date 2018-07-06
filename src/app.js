/**
 * For client side routing to work, tell the server to serve index.html for all routes,
 * then react router figures out what components to add.
 * 
 * 
 */

import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/Router';
import { Provider } from 'react-redux';
import configureStore from './redux/store/config';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

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

ReactDOM.render( jsx, document.getElementById('app'));

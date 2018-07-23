import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import SignInPage from '../components/SignInPage';
import DashboardPage from '../components/DashboardPage';
import NewExpensePage from '../components/NewExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import HelpPage from '../components/HelpPage';
import ErrorPage from '../components/ErrorPage';
import PrivateRoute from './PrivateRoute';

/**
 * BrowserRouter creates browserhistory by itself,
 * but it is only accessible to child components.
 * 
 * In order to access history outside, we need to handle it ourselves
 */
export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <Route path='/' component={SignInPage} exact={true} />
                <PrivateRoute path='/dashboard' component={DashboardPage} />
                <PrivateRoute path='/new' component={NewExpensePage} />
                <PrivateRoute path='/edit/:id' component={EditExpensePage} />
                <Route path='/help' component={HelpPage} />
                <Route component={ErrorPage} />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;
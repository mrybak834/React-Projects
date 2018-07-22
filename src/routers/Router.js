import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import SignInPage from '../components/SignInPage';
import Header from '../components/Header';
import DashboardPage from '../components/DashboardPage';
import NewExpensePage from '../components/NewExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import HelpPage from '../components/HelpPage';
import ErrorPage from '../components/ErrorPage';


const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route path='/' component={SignInPage} exact={true} />
                <Route path='/dashboard' component={DashboardPage} />
                <Route path='/new' component={NewExpensePage} />
                <Route path='/edit/:id' component={EditExpensePage} />
                <Route path='/help' component={HelpPage} />
                <Route component={ErrorPage} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;
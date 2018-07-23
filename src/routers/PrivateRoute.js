/**
 * Route for components that should be private until the user is logged in
 * Redirects otherwise
 */
import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';

/**
 * component: Component     Renames component to Component, in order to satisfy React naming standards
 * ...rest                  (can be named anything) takes the rest of the props that were passed in and destructures them
 */
export const PrivateRoute = ({ 
    isAuthenticated, 
    component: Component,
    ...rest
}) => (
    <Route 
        {...rest}
        component={(props) => (
            isAuthenticated ? (
                <div>
                    <Header />
                    <Component {...props} />
                </div>
            ) : (
                <Redirect to="/" />
            )
        )}
    />
);


const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);
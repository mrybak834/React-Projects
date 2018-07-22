import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { startSignOut } from '../redux/actions/auth';

export const Header = (props) => (
    <header>
        <h1>Expensify</h1>
        <NavLink to='/dashboard' activeClassName='is-active' exact={true}>Dashboard </NavLink>
        <NavLink to='/new' activeClassName='is-active' exact={true}>New </NavLink>
        <button onClick={props.startSignOut}>Sign Out</button>
        <br/>
        ------------------------------
    </header>
);

const mapDispatchToProps = (dispatch) => ({
    startSignOut: () => dispatch(startSignOut())
});

export default connect(undefined, mapDispatchToProps)(Header);

import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
    <header>
        <h1>Expensify</h1>
        <NavLink to='/dashboard' activeClassName='is-active' exact={true}>Dashboard </NavLink>
        <NavLink to='/new' activeClassName='is-active' exact={true}>New </NavLink>
        <br/>
        ------------------------------
    </header>
);

export default Header;

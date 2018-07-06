import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
    <header>
        <h1>Expensify</h1>
        <NavLink to='/' activeClassName='is-active' exact={true}>Dashboard </NavLink>
        <NavLink to='/new' activeClassName='is-active' exact={true}>New </NavLink>
        <NavLink to='/edit' activeClassName='is-active' exact={true}>Edit </NavLink>
        <br/>
        ------------------------------
    </header>
);

export default Header;

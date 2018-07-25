import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import getFilteredExpenses from '../redux/selectors/expenses';
import sumExpenses from '../redux/selectors/expenses-total';

export const ExpensesSummary = ({text}) => (
    <div className="page-header">
        <div className="content-container">
            {text}
            <div className="page-header__actions">
                <Link className="button" to="/new">Add Expense</Link>
            </div>
        </div>
    </div>
);

const mapStateToProps = (state) => ({
    text: sumExpenses(getFilteredExpenses(state.expenses, state.filters))
});

export default connect(mapStateToProps)(ExpensesSummary);
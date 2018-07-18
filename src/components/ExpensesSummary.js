import React from 'react';
import { connect } from 'react-redux';
import getFilteredExpenses from '../redux/selectors/expenses';
import sumExpenses from '../redux/selectors/expenses-total';

export const ExpensesSummary = ({text}) => (
    <div>
        {text}
    </div>
);

const mapStateToProps = (state) => ({
    text: sumExpenses(getFilteredExpenses(state.expenses, state.filters))
});

export default connect(mapStateToProps)(ExpensesSummary);
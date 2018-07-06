import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from '../components/ExpenseForm';
import { addExpense } from '../redux/actions/expenses';

export class NewExpensePage extends React.Component {
    onSubmit = (expense) => {
        this.props.addExpense(expense);
        // Redirect home
        this.props.history.push('/');
    };

    render() {
        return (
            <div>
                <h1>Add Expense</h1>
                <ExpenseForm 
                    onSubmit={this.onSubmit}
                />
            </div>
        );
    }
}

/**
 * Maps the dispatch call to a simple function call
 * For testing, this is essentially ignored, and allows a prop to act as a spy function,
 * therefore this variable name doesn't matter, just the prop (for testing).
 * @param {*} dispatch 
 */
const mapDispatchToProps = (dispatch) => ({
    addExpense: (expense) => dispatch(addExpense(expense))
});

export default connect(undefined, mapDispatchToProps)(NewExpensePage);
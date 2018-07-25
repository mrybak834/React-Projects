import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from '../components/ExpenseForm';
import { startAddExpense } from '../redux/actions/expenses';

export class NewExpensePage extends React.Component {
    onSubmit = (expense) => {
        this.props.startAddExpense(expense);
        // Redirect home
        this.props.history.push('/');
    };

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Add Expense</h1>
                    </div>
                </div>
                <div className="content-container">
                    <ExpenseForm
                        onSubmit={this.onSubmit}
                    />
                </div>
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
    startAddExpense: (expense) => dispatch(startAddExpense(expense))
});

export default connect(undefined, mapDispatchToProps)(NewExpensePage);
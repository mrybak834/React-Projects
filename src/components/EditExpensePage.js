import React from 'react';
import ExpenseForm from '../components/ExpenseForm';
import { connect } from 'react-redux';
import { editExpense } from '../redux/actions/expenses';
import { removeExpense } from '../redux/actions/expenses';

export class EditExpensePage extends React.Component {

    onSubmit = (expense) => {
        this.props.editExpense(this.props.expense.id, expense);

        this.props.history.push('/');
    };

    onClick = () => {
        this.props.removeExpense(this.props.expense.id);
        this.props.history.push('/');
    };

    render() {
        return (
            <div>
                <p>Edit Expense: {this.props.expense.description}</p>
                <ExpenseForm 
                    expense={this.props.expense}
                    onSubmit={this.onSubmit}
                />
                <button 
                    onClick={this.onClick}
                >Remove</button>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find((expense) => expense.id === props.match.params.id)
    };
};

const mapDispatchToProps = (dispatch, props) => ({
    editExpense: (id, expense) => dispatch(editExpense(id,expense)),
    removeExpense: (id) => dispatch(removeExpense(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
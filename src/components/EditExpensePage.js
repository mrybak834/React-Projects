import React from 'react';
import ExpenseForm from '../components/ExpenseForm';
import { connect } from 'react-redux';
import { startEditExpense } from '../redux/actions/expenses';
import { startRemoveExpense } from '../redux/actions/expenses';

export class EditExpensePage extends React.Component {

    onSubmit = (expense) => {
        this.props.startEditExpense(this.props.expense.id, expense);

        this.props.history.push('/');
    };

    onClick = () => {
        this.props.startRemoveExpense(this.props.expense.id);
        this.props.history.push('/');
    };

    render() {
        return (

            this.props.expense ? (
                <div>
                    <div className="page-header">
                        <div className="content-container">
                            <h1 className="page-header__title">Edit Expense: {this.props.expense.description}</h1>
                        </div>
                    </div>
                    <div className="content-container">
                        <ExpenseForm
                            expense={this.props.expense}
                            onSubmit={this.onSubmit}
                        />
                        <button
                            className="button button--secondary"
                            onClick={this.onClick}
                        >Remove</button>
                    </div>
                </div>
            ) : (
                    <div className="page-header">
                        <div className="content-container">
                            <h1 className="page-header__title">Invalid Expense</h1>
                        </div>
                    </div>
                )
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find((expense) => expense.id === props.match.params.id)
    };
};

const mapDispatchToProps = (dispatch, props) => ({
    startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
    startRemoveExpense: (id) => dispatch(startRemoveExpense(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
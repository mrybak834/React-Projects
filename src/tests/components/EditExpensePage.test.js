import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';


let history, editExpense, removeExpense, expense, wrapper;

beforeEach(() => {
    history = {
        push: jest.fn()
    };
    editExpense = jest.fn();
    removeExpense = jest.fn();
    expense = expenses[0];
    wrapper = shallow(<EditExpensePage expense={expense} history={history} editExpense={editExpense} removeExpense={removeExpense}/>);
});

test('Render Page', () => {
    expect(wrapper).toMatchSnapshot();
});

test('Expense Form Submitted', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expense);

    expect(editExpense).toHaveBeenLastCalledWith(expense.id, expense);
    expect(history.push).toHaveBeenLastCalledWith('/');
});

test('Remove Button Clicked', () => {
    wrapper.find('button').prop('onClick')();

    expect(removeExpense).toHaveBeenLastCalledWith(expense.id);
    expect(history.push).toHaveBeenLastCalledWith('/');
});
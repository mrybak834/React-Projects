import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';


let history, startEditExpense, startRemoveExpense, expense, wrapper;

beforeEach(() => {
    history = {
        push: jest.fn()
    };
    startEditExpense = jest.fn();
    startRemoveExpense = jest.fn();
    expense = expenses[0];
    wrapper = shallow(<EditExpensePage expense={expense} history={history} startEditExpense={startEditExpense} startRemoveExpense={startRemoveExpense}/>);
});

test('Render Page', () => {
    expect(wrapper).toMatchSnapshot();
});

test('Expense Form Submitted', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expense);

    expect(startEditExpense).toHaveBeenLastCalledWith(expense.id, expense);
    expect(history.push).toHaveBeenLastCalledWith('/');
});

test('Remove Button Clicked', () => {
    wrapper.find('button').prop('onClick')();

    expect(startRemoveExpense).toHaveBeenLastCalledWith(expense.id);
    expect(history.push).toHaveBeenLastCalledWith('/');
});
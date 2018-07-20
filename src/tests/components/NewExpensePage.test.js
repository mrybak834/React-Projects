import React from 'react';
import { shallow } from 'enzyme';
import { NewExpensePage } from '../../components/NewExpensePage';
import expenses from '../fixtures/expenses';

// By resetting before each test, we get fresh variables that are not called / state is not set
let startAddExpense, history, wrapper;

beforeEach(() => {
    startAddExpense = jest.fn();
    history = { push: jest.fn() }

    wrapper = shallow(<NewExpensePage startAddExpense={startAddExpense} history={history}/>);
});

test('Render Page', () => {
    expect(wrapper).toMatchSnapshot();
});

test('OnSubmit', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0]);

    expect(startAddExpense).toHaveBeenCalledWith(expenses[0]);
    expect(history.push).toHaveBeenCalledWith('/');
});
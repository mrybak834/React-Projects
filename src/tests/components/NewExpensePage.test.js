import React from 'react';
import { shallow } from 'enzyme';
import { NewExpensePage } from '../../components/NewExpensePage';
import expenses from '../fixtures/expenses';

// By resetting before each test, we get fresh variables that are not called / state is not set
let addExpense, history, wrapper;

beforeEach(() => {
    addExpense = jest.fn();
    history = { push: jest.fn() }

    wrapper = shallow(<NewExpensePage addExpense={addExpense} history={history}/>);
});

test('Render Page', () => {
    expect(wrapper).toMatchSnapshot();
});

test('OnSubmit', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0]);

    expect(addExpense).toHaveBeenCalledWith(expenses[0]);
    expect(history.push).toHaveBeenCalledWith('/');
});
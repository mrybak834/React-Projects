import { ExpensesSummary } from '../../components/ExpensesSummary';
import getFilteredExpenses from '../../redux/selectors/expenses';
import sumExpenses from '../../redux/selectors/expenses-total';
import expenses from '../fixtures/expenses';
import moment from 'moment';
import React from 'react';
import { shallow } from 'enzyme';

var filters;

afterEach(() => {
    const filteredExpenses = getFilteredExpenses(expenses, filters);
    const text = sumExpenses(filteredExpenses);

    const wrapper = shallow(<ExpensesSummary text={text}/>);

    expect(wrapper).toMatchSnapshot();
});

test('No expenses', () => {
    filters = {
        text: 'Nothing',
        sortBy: 'date',
        startDate: undefined,
        endDate: moment(0)
    }
});

test('One Expense', () => {
    filters = {
        text: 'Rent',
        sortBy: 'date',
        startDate: undefined,
        endDate: moment(0).add(5, 'days')
    }
});

test('Multiple expenses', () => {
    filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    }
});
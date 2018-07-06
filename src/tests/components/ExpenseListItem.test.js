import React from 'react';
import { shallow } from 'enzyme';
import ExpenseListItem from '../../components/ExpenseListItem';
import expenses from '../fixtures/expenses';
import moment from 'moment';

test('Components: ExpenseListItem: Render Expense List Item', () => {
    const wrapper = shallow(<ExpenseListItem {...expenses[0]}/>);

    expect(wrapper).toMatchSnapshot();
});
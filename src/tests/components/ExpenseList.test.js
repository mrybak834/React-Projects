/**
 * Export the unconnected component in order to use it for testing,
 * since we are adding dummy data
 */
import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseList } from '../../components/ExpenseList';
import expenses from '../fixtures/expenses';


test('Components: ExpenseList: Render ExpenseList (populated)', () => {
    const wrapper = shallow(<ExpenseList expenses={expenses}/>);

    expect(wrapper).toMatchSnapshot();
});

test('Components: ExpenseList: Render ExpenseList (empty)', () => {
    const wrapper = shallow(<ExpenseList expenses={[]}/>);

    expect(wrapper).toMatchSnapshot();
});
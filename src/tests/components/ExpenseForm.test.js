import React from 'react';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';
import moment from 'moment';

test('Components: ExpenseForm: Render Expense Form (default)', () => {
    const wrapper = shallow(<ExpenseForm />);

    expect(wrapper).toMatchSnapshot();
});

test('Components: ExpenseForm: Render Expense Form (provided expense)', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} />);

    expect(wrapper).toMatchSnapshot();
});

test('Components: ExpenseForm: Render error for invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm />);

    // Take a snapshot before the error
    expect(wrapper).toMatchSnapshot();

    // Since it's not a real event, you have to add on the event attributes
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });

    // Check if error shows up
    expect(wrapper.state('error').length).toBeGreaterThan(0);

    // Take a snapshot after the error is set
    expect(wrapper).toMatchSnapshot();
});

test('Components: ExpenseForm: Change description on user input', () => {
    const value = 'New Description';

    const wrapper = shallow(<ExpenseForm />);

    expect(wrapper).toMatchSnapshot();
    wrapper.find('#inputDescription').simulate('change', {
        target: {
            value
        }
    });

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.state('description')).toBe(value);
});

test('Components: ExpenseForm: Change note on user input', () => {
    const value = 'New Note';

    const wrapper = shallow(<ExpenseForm />);

    expect(wrapper).toMatchSnapshot();
    wrapper.find('textarea').simulate('change', {
        target: {
            value
        }
    });

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.state('note')).toBe(value);
});

test('Components: ExpenseForm: Change amount on user input (valid)', () => {
    const value = '25.50';

    const wrapper = shallow(<ExpenseForm />);

    expect(wrapper).toMatchSnapshot();
    wrapper.find('#inputAmount').simulate('change', {
        target: {
            value
        }
    });

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.state('amount')).toBe(value);
});

test('Components: ExpenseForm: Don\'t change amount on user input (invalid)', () => {
    const value = '99.239';

    const wrapper = shallow(<ExpenseForm />);

    expect(wrapper).toMatchSnapshot();
    wrapper.find('#inputAmount').simulate('change', {
        target: {
            value
        }
    });

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.state('amount')).toBe('');
});

test('Components: ExpenseForm: Call onSubmit prop on valid form submission', () => {

    // Mock function (spy)
    const onSubmitSpy = jest.fn();

    const expense = expenses[0];

    const wrapper = shallow(<ExpenseForm expense={expense} onSubmit={onSubmitSpy} />);

    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });

    expect(wrapper.state('error')).toBe('');
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expense.description,
        note: expense.note,
        amount: expense.amount,
        timestamp: expense.timestamp
    });
});

test('Components: ExpenseForm: Change date on user input', () => {
    const wrapper = shallow(<ExpenseForm />);

    wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(moment(0));

    expect(wrapper.state('timestamp')).toEqual(moment(0));

});

test('Components: ExpenseForm: Change calendar focus on user input', () => {
    const focused = true;
    
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')(
        {
            focused
        }   
    );

    expect(wrapper.state('calendarFocused')).toBe(focused);
});
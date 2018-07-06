import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import filters from '../fixtures/filters';

let wrapper, setStartDateFilter, setEndDateFilter, setTextFilter, setSortByFilter;

beforeEach(() => {
    setStartDateFilter = jest.fn();
    setEndDateFilter = jest.fn();
    setTextFilter = jest.fn();
    setSortByFilter = jest.fn();
    
    wrapper = shallow(
        <ExpenseListFilters 
            filters={filters}
            setStartDateFilter={setStartDateFilter}
            setEndDateFilter={setEndDateFilter}
            setTextFilter={setTextFilter}
            setSortByFilter={setSortByFilter}
        />
    );
});

test('Render', () => {
    expect(wrapper).toMatchSnapshot();
});

test('Change text filter', () => {
    const value = 'New Filter';

    wrapper.find('input').simulate('change', {
        target: {
            value 
        }
    });

    expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test('Change sort by filter', () => {
    const value = 'New filter';

    wrapper.find('input').simulate('change', {
        target: {
            value 
        }
    });

    expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test('Change calendar focus', () => {
    // null, startDate, endDate
    const value = 'startDate';
    wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')(value);

    expect(wrapper.state('calendarFocused')).toBe(value);
});

test('Change date filters', () => {
    const startDate = moment(0);
    const endDate = moment(0).add(10, 'days');


    wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')({startDate, endDate});

    expect(setStartDateFilter).toHaveBeenLastCalledWith(startDate);
    expect(setEndDateFilter).toHaveBeenLastCalledWith(endDate);
});
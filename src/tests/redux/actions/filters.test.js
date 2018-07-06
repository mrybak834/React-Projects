import { setTextFilter, setSortByFilter, setStartDateFilter, setEndDateFilter } from '../../../redux/actions/filters';
import moment from 'moment';

/**
 * setTextFilter
*/
test('Filter Action Object: setTextFilter', () => {
    const text = 'test';

    const action = setTextFilter(text);

    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text
    });
});

test('Filter Action Object (default): setTextFilter', () => {
    const action = setTextFilter();

    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    });
});


/**
 * setSortByFilter
 */
test('Filter Action Object: setSortByFilter', () => {
    const option = 'test';

    const action = setSortByFilter(option);

    expect(action).toEqual({
        type: 'SET_SORT_BY_FILTER',
        option
    });
});

test('Filter Action Object (default): setSortByFilter', () => {
    const action = setSortByFilter();

    expect(action).toEqual({
        type: 'SET_SORT_BY_FILTER',
        option: 'date'
    });
});


/**
 * setStartDateFilter
 */
test('Filter Action Object: setStartDateFilter', () => {
    const date = moment(1);

    const action = setStartDateFilter(date);

    expect(action).toEqual({
        type: 'SET_START_DATE_FILTER',
        date: moment(1)
    });
});

test('Filter Action Object (default): setStartDateFilter', () => {
    const action = setStartDateFilter();

    expect(action).toEqual({
        type: 'SET_START_DATE_FILTER',
        date: undefined
    });
});


/**
 * setEndDateFilter
 */
test('Filter Action Object: setEndDateFilter', () => {
    const date = moment(1);

    const action = setEndDateFilter(date);

    expect(action).toEqual({
        type: 'SET_END_DATE_FILTER',
        date: moment(1)
    });
});

test('Filter Action Object (default): setEndDateFilter', () => {
    const action = setEndDateFilter();

    expect(action).toEqual({
        type: 'SET_END_DATE_FILTER',
        date: undefined
    });
});


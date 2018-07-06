import filtersReducer from '../../../redux/reducers/filters';
import moment from 'moment';

test('Reducers: Filter: Default', () => {
    const state = filtersReducer(undefined,{ type: '@@INIT' });

    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('Reducers: Filter: text', () => {
    const state = filtersReducer(undefined,
        { 
            type: 'SET_TEXT_FILTER',
            text: 'test'
        });

    expect(state).toEqual({
        text: 'test',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('Reducers: Filter: sortBy date', () => {
    const currentState = {
        text: '',
        sortBy: 'amount',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    }

    const state = filtersReducer(currentState,
        { 
            type: 'SET_SORT_BY_FILTER',
            option: 'date'
        });

    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('Reducers: Filter: sortBy amount', () => {
    const currentState = {
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    }

    const state = filtersReducer(currentState,
        { 
            type: 'SET_SORT_BY_FILTER',
            option: 'randomText'
        });

    expect(state).toEqual({
        text: '',
        sortBy: 'amount',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('Reducers: Filter: startDate', () => {
    const state = filtersReducer(undefined,
        { 
            type: 'SET_START_DATE_FILTER',
            date: moment(0)
        });

    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment(0),
        endDate: moment().endOf('month')
    });
});

test('Reducers: Filter: endDate', () => {
    const state = filtersReducer(undefined,
        { 
            type: 'SET_END_DATE_FILTER',
            date: moment().startOf('month').add(2, 'days')
        });

    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().startOf('month').add(2, 'days')
    });
});
import selectExpenses from '../../../redux/selectors/expenses';
import expenses from '../../fixtures/expenses';
import moment from 'moment';



test('Filter: text', () => {
    const filters = {
        text: 'e',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    }

    const result = selectExpenses(expenses, filters);

    expect(result).toEqual([
        expenses[0], expenses[1], expenses[3]
    ]);
});

test('Filter: startDate', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: moment(0),
        endDate: undefined
    }

    const result = selectExpenses(expenses, filters);

    expect(result).toEqual([
        expenses[0], expenses[1], expenses[2]
    ]);
});

test('Filter: endDate', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: moment(0)
    }

    const result = selectExpenses(expenses, filters);

    expect(result).toEqual([
        expenses[2], expenses[3]
    ]);
});

test('Filter: sortBy(date)', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    }

    const result = selectExpenses(expenses, filters);

    expect(result).toEqual([
        expenses[0], expenses[1], expenses[2], expenses[3]
    ]);
});

test('Filter: sortBy(amount)', () => {
    const filters = {
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    }

    const result = selectExpenses(expenses, filters);

    expect(result).toEqual([
        expenses[2], expenses[1], expenses[3], expenses[0]
    ]);
});


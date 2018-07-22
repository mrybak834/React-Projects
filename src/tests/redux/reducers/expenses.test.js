import expensesReducer from '../../../redux/reducers/expenses';
import expenses from '../../fixtures/expenses';
import moment from 'moment';

test('Reducers: Expenses: Default state', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' });

    expect(state).toEqual([]);
});


test('Reducers: Expenses: addExpense', () => {
    const action = {
        type: 'ADD_EXPENSE',
        expense: {
            id: '5',
            description: 'newExpense',
            note: 'newExpense',
            amount: 80,
            timestamp: moment(0).subtract(10, 'days').valueOf()
        }
    }

    const state = expensesReducer(expenses, action);

    expect(state).toEqual(expenses.concat(action.expense));
});

test('Reducers: Expenses: addExpense (default)', () => {
    const action = {
        type: 'ADD_EXPENSE'
    }

    const state = expensesReducer(expenses, action);

    expect(state).toEqual(expenses);
});

test('Reducers: Expenses: removeExpense (valid)', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    };

    const state = expensesReducer(expenses, action);

    expect(state).toEqual(
        [expenses[0], expenses[2], expenses[3]]
    );
});

test('Reducers: Expenses: removeExpense (invalid)', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '-1'
    };

    const state = expensesReducer(expenses, action);

    expect(state).toEqual(expenses);
});

test('Reducers: Expenses: editExpense (valid)', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: '2',
        updates: {
            description: 'Updated Rent',
            note: 'Updated Rent',
            amount: 69000,
            timestamp: moment(0).add(6, 'days').valueOf()
        }
    }

    const state = expensesReducer(expenses, action);

    let tempExpenses = [...expenses];
    tempExpenses[1] = {
        ...expenses[1],
        ...action.updates
    };

    expect(state).toEqual(tempExpenses);
});

test('Reducers: Expenses: editExpense (invalid)', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: '5',
        updates: {
            description: 'Invalid Update',
            note: 'Invalid Update',
            amount: 999,
            timestamp: moment(0).add(8, 'days').valueOf()
        }
    }

    const state = expensesReducer(expenses, action);

    expect(state).toEqual(expenses);
});

test('setExpenses', () => {
    const action = {
        type: 'SET_EXPENSES',
        expenses: [expenses[0], expenses[1]]
    }

    // Send over dummy data that should be wiped out
    const state = expensesReducer(expenses, action);

    expect(state).toEqual([expenses[0], expenses[1]]);
});
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { addExpense, removeExpense, editExpense, startAddExpense } from '../../../redux/actions/expenses';
import expenses from '../../fixtures/expenses';
import database from '../../../firebase/firebase';

// Create a mock redux store for testing async actions
const createMockStore = configureMockStore([thunk]);

/**
 * addExpense
 */
test('Expense Action Object: addExpense', () => {
    const action = addExpense(expenses[0]);

    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[0]
    });
});

// Call done on the test case when you are finished with the test
// Useful for asynch code, otherwise the test case would finish
// and would not wait for the promise to resolve
test('Add Expense: Asynchronous action (with values)', (done) => {
    const expenseData = {
        description: 'test',
        note: 'test',
        amount: 1,
        timestamp: 2000
    };

    // Create an empty store (passing in default data)
    const store = createMockStore({});

    store.dispatch(startAddExpense(expenseData))
        // Promise chain the result of the returned promise in startAddExpense
        .then(() => {
            // Check if action was correctly dispatched
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: 'ADD_EXPENSE',
                expense: {
                    id: expect.any(String),
                    ...expenseData
                }
            });

            // Check if database was correctly updated
            return database.ref(`expenses/${actions[0].expense.id}`)
                .once('value');
        })
        // Resolves/rejects the returned promise above
        .then((snapshot) => {
            const data = snapshot.val();
            expect(data).toEqual(expenseData);
            done();
        })
        .catch((e) => console.log("Error reading DB: ", e));
});

test('Add Expense: Asynchronous action (with values)', (done) => {
    const store = createMockStore({});

    store.dispatch(startAddExpense())
        .then(() => {
            // Check if the action was correctly dispatched
            const actions = store.getActions();

            expect(actions[0]).toEqual({
                type: 'ADD_EXPENSE',
                expense: {
                    id: expect.any(String),
                    description: '', 
                    note: '', 
                    amount: 0, 
                    timestamp: 0
                }
            });

            return database.ref(`expenses/${actions[0].expense.id}`)
                .once('value');
        })
        .then((snapshot) => {
            const data = snapshot.val();
            expect(data).toEqual({
                description: '', 
                note: '', 
                amount: 0, 
                timestamp: 0
            });
            done();
        })
        .catch((e) => console.log('Error reading DB: ', e));
});


/**
 * removeExpense
 */
test('Expense Action Object: removeExpense', () => {
    const id = 'test';
    const action = removeExpense(id);

    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id
    });
});

test('Expense Action Object (default): removeExpense', () => {
    const action = removeExpense();

    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: undefined
    });
});



/**
 * editExpense
 */
test ('Expense Action Object: editExpense', () => {
    const id = 'test';
    const updates = {
        description: 'test', 
        note: 'test', 
        amount: 1, 
        timestamp: 1
    };

    const action = editExpense(id, updates);

    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id,
        updates
    });
});

test ('Expense Action Object (default): editExpense', () => {
    const action = editExpense();

    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: undefined,
        updates: {}
    });
});
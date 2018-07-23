import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { addExpense, removeExpense, editExpense, startAddExpense, setExpenses, startSetExpenses, startRemoveExpense, startEditExpense } from '../../../redux/actions/expenses';
import expenses from '../../fixtures/expenses';
import database from '../../../firebase/firebase';

const uid = 'testUID';
const authState = { auth: { uid } };
// Create a mock redux store for testing async actions
const createMockStore = configureMockStore([thunk]);


const createTestDB = (done) => {
    const expensesData = {};

    expenses.forEach(({ id, description, note, amount, timestamp}) => {
        // Adds on an id (a unique attribute), and saves this object at that location
        expensesData[id] = { description, note, amount, timestamp};
    });

    database.ref(`users/${uid}/expenses`).set(expensesData);
    done();
};

beforeEach((done) => {
    createTestDB(done);
});

afterAll((done) => {
    createTestDB(done);
});

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

    // Create a store, passing in state
    const store = createMockStore(authState);

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
            return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`)
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

test('Add Expense: Asynchronous action (defaults)', (done) => {
    const store = createMockStore(authState);

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

            return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`)
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

test('Remove Expense Asynchronous Action Generator', (done) => {
    const store = createMockStore(authState);

    store.dispatch(startRemoveExpense(expenses[0].id))
        .then(() => {
            const actions = store.getActions();

            expect(actions[0]).toEqual({
                type: 'REMOVE_EXPENSE',
                id: expenses[0].id
            });

            return database.ref(`users/${uid}/expenses/${expenses[0].id}`)
                .once('value')
        })
        .then((snapshot) => {
            expect(snapshot.exists()).toBeFalsy();
            done();
        })
        .catch((e) => console.log('Error removing expense', e));
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

test('Edit Expense Asynchronous Action Generator', (done) => {
    const store = createMockStore(authState);

    const id = expenses[0].id;
    const updates = {
        description: 'editTest', 
        note: 'editTest', 
        amount: 999, 
        timestamp: 999
    };

    store.dispatch(startEditExpense(id, updates))
        .then(() => {
            const actions = store.getActions();

            expect(actions[0]).toEqual({
                type: 'EDIT_EXPENSE',
                id,
                updates
            });

            return database.ref(`users/${uid}/expenses/${id}`)
                .once('value')
        })
        .then((snapshot) => {
            expect({
                id: snapshot.key, 
                ...snapshot.val()
            }).toEqual({
                id,
                ...updates
            })
            done();
        })
        .catch((e) => console.log('Error editing expense', e));
});





test('Set Expenses Action Generator', () => {
    const action = setExpenses(expenses);

    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    })
});

test('Set Expenses Asynchronous Action Generator', (done) => {
    const store = createMockStore(authState);

    store.dispatch(startSetExpenses())
        .then(() => {
            // Check if the action was correctly dispatched
            const actions = store.getActions();

            expect(actions[0]).toEqual({
                type: 'SET_EXPENSES',
                expenses
            });

            done();
        })
        .catch((e) => console.log('Error reading DB: ', e));
});

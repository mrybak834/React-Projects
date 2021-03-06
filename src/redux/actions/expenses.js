//#region Imports
/**
 * Normal redux actions:
 * Component calls the action generator (these functions)
 * Actinn generator returns the generated object
 * Component dispatches the object
 * Redux store changes/provides info
 * 
 * Asynchronous actions (for interacting with DB):
 * Component calls action generator
 * Action generator returns a function
 * Component dispatches a function (done via redux-thunk)
 * function runs, interacts with db, can do whatever else it wants,
 * including then generating another action to dispatch to the traditional redux store
 */
import uuid from 'uuid';
import database from '../../firebase/firebase';
//#endregion Imports

//#region Add Expense
/**
 * Normal action
 */
export const addExpense = (expense) => (
    {
        type: 'ADD_EXPENSE',
        expense
    }
);

/**
 * Asynchronous action
 * Explanation of syntax:
 * (expenseData = {})          Takes the expense passed in. If none, set to {}
 * 
 * const {...} = expenseData   Creates the variables with the values.
 *                             Any variable that expenseData contains, overrides the LHS variables.
 * 
 * Equivalent to: 
 * const fun = 
 * ( 
 *     {
 *         variables declared
 *     } = {} 
 * ) => { variables available here }
 * 
 */
export const startAddExpense = (expenseData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            description = '', 
            note = '', 
            amount = 0, 
            timestamp = 0
        } = expenseData;
        const expense = { description, note, amount, timestamp };

        // This promise is resolved before returning
        // Since it dispatches to the store, and we are hooked up to a fake store in our test cases
        // We can access the result of the dispatch call in our tests, as a promise
        // Since we return it, this result can be (and is) promise chained for our tests
        return database.ref(`users/${uid}/expenses`)
            .push(expense)
            .then((ref) => {
                dispatch(addExpense({
                    id: ref.key,
                    ...expense
                }));
            })
            .catch((e) => console.log('Adding expense failed: ', e));
    };
}
//#endregion Add Expense

//#region Remove Expense
export const removeExpense = (id = undefined) => (
    {
        type: 'REMOVE_EXPENSE',
        id
    }
);

export const startRemoveExpense = (id) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses/${id}`)
            .remove()
            .then(() => {
                dispatch(removeExpense(id));
            })
            .catch((e) => console.log('Error removing expense: ', e));
    };
};
//#endregion Remove Expense

//#region Edit Expense
export const editExpense = (id = undefined, updates = {}) => (
    {
        type: 'EDIT_EXPENSE',
        id,
        updates
    }
);

export const startEditExpense = (id = undefined, updates = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses/${id}`)
            .update(updates)
            .then(() => {
                dispatch(editExpense(id, updates));
            })
            .catch((e) => console.log('Error editing expense: ', e));
    }
}
//#endregion Edit Expense

//#region Set Expenses

export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});

export const startSetExpenses = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses`)
            .once('value')
            .then((snapshot) => {
                const expenses = [];
                snapshot.forEach((expenseSnapshot) => {
                    expenses.push({
                        id: expenseSnapshot.key,
                        ...expenseSnapshot.val()
                    });
                });

                dispatch(setExpenses(expenses));
            })
            .catch((e) => console.log('Setting expenses failed: ', e));
    };
};

//#endregion Set Expenses

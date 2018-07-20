import uuid from 'uuid';
import database from '../../firebase/firebase';
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

export const addExpense = (expense) => (
    {
        type: 'ADD_EXPENSE',
        expense
    }
);

/**
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
    return (dispatch) => {
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
        return database.ref('expenses')
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

export const removeExpense = (id = undefined) => (
    {
        type: 'REMOVE_EXPENSE',
        id
    }
);

export const editExpense = (id = undefined, updates = {}) => (
    {
        type: 'EDIT_EXPENSE',
        id,
        updates
    }
);
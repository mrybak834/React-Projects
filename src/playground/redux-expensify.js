import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// Expenses reducer
const expensesReducerDefaultState = [];

const expensesReducer = ( state = expensesReducerDefaultState, action ) => {
    switch (action.type){
        case 'ADD_EXPENSE':{
            return state.concat(action.expense);
            // return [...state, action.expense];   // Slower than concat
        }
        case 'REMOVE_EXPENSE':{
            // No id defined, don't remove anything
            if (!action.id){
                return state;
            }

            return state.filter(({id}) => id !== action.id);
        }
        case 'EDIT_EXPENSE':{
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        // Overrides any of the expense properties above
                        ...action.updates
                    }
                }

                return expense;
            });
        }
        default:{
            return state;
        }
    }
};


// Filters reducer
const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type){
        case 'SET_TEXT_FILTER':{
            return {
                ...state,
                text: action.text
            }
        }
        case 'SET_SORT_BY_FILTER':{
            return {
                ...state,
                sortBy: action.option === 'date' ? 'date' : 'amount'
            }
        }
        case 'SET_START_DATE_FILTER':{
            return {
                ...state,
                startDate: action.date
            }
        }
        case 'SET_END_DATE_FILTER':{
            // Check if date range makes sense
            if (state.startDate && (state.startDate > action.date)){
                return state;
            }
            return {
                ...state,
                endDate: action.date
            }
        }
        default:{
            return state;
        }
    }
};

// Filter function
const getFilteredExpenses = (expenses, { text, sortBy, startDate, endDate }) => {

    return expenses.filter( (expense) => {
        // // Filter text
        // if ( text && ((expense.description !== text) && (expense.note !== text)) ){
        //     return false;
        // }
        // // Filter Dates
        // if ( (startDate && (expense.timestamp < startDate)) || (endDate && (expense.timestamp > endDate))){
        //     return false;
        // }

        const textMatch = typeof text !== 'string' || expense.description.toLowerCase().includes(text.toLowerCase());
        const startDateMatch = typeof startDate !== 'number' || expense.timestamp >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.timestamp <= endDate;
        return textMatch && startDateMatch && endDateMatch;
    }).sort( (a,b) => {
        if (sortBy === 'date'){
            console.log("Sorting by date");

            // -1 = a comes first
            return a.timestamp > b.timestamp ? -1 : 1;
        }
        // amount
        else {
            console.log("Sorting by amount");

            return a.amount > b.amount ? -1 : 1;
        }
    });
};


// Store
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

// Run upon every store update
const unsubscribe = store.subscribe(() => {
    const state = store.getState();
    const filteredExpenses = getFilteredExpenses(state.expenses, state.filters)
    console.log(filteredExpenses);
});


// Action generators
const addExpense = ( 
    {
        description = '', 
        note = '', 
        amount = 0, 
        timestamp = 0
    } = {} 
) => (
    {
        type: 'ADD_EXPENSE',
        expense: {
            id: uuid(),
            description,
            note,
            amount,
            timestamp
        }
    }
);

const removeExpense = (id = undefined) => (
    {
        type: 'REMOVE_EXPENSE',
        id
    }
);

const editExpense = (id = undefined, updates = {}) => (
    {
        type: 'EDIT_EXPENSE',
        id,
        updates
    }
);

const setTextFilter = (text = '') => (
    {
        type: 'SET_TEXT_FILTER',
        text
    }
);

const setSortByFilter = (option = 'date') => (
    {
        type: 'SET_SORT_BY_FILTER',
        option
    }
);

const setStartDateFilter = (date) => (
    {
        type: 'SET_START_DATE_FILTER',
        date
    }
);

const setEndDateFilter = (date) => (
    {
        type: 'SET_END_DATE_FILTER',
        date
    }
);

// Modify store
// dispatch returns the action that was dispatched
const expenseID1 = store.dispatch(addExpense({ description: 'Dog', amount: 5000})).expense.id;
const expenseID2 = store.dispatch(addExpense({ description: 'Coffee', amount: 2 })).expense.id;
const expenseID3 = store.dispatch(addExpense({ description: 'rent 2', amount: 50, timestamp: 5 })).expense.id;

// store.dispatch(removeExpense(expenseID1));
// store.dispatch(editExpense(expenseID2, { amount: 500, description: 'Frogu-chan'}));
store.dispatch(editExpense(expenseID2, { amount: 2, description: 'rent', timestamp: 20}));
store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter(''));
// store.dispatch(setSortByFilter('dope'));
store.dispatch(setStartDateFilter(2));
store.dispatch(setEndDateFilter(20));





// Final state we want to represent
// const demoState = {
//     expenses: [{
//         id: '23qfasdf',
//         description: 'Rent',
//         note: 'Final payment for old address',
//         amount: 54500,
//         timestamp: 0
//     }],
//     filters: {
//         text: '(user input)',
//         sortBy: 'date or amount',
//         startDate: undefined,
//         endDate: undefined
//     }
// }
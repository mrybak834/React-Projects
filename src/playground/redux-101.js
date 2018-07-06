// Actions - objects that get sent to the store, usually in order to update it
import { createStore } from 'redux';


// A reducer determines what to do with an action
// 1. Reducers are pure functions (only uses what was given as input, doesn't modify outside variables)
// 2. Never change state or action
// 
const countReducer = (state = {count: 0}, action) => {
    switch (action.type){
        case 'INCREMENT':{
            return {
                count: state.count + action.amount
            }
        }
        case 'DECREMENT':{
            return {
                count: state.count - action.amount
            }
        }
        case 'RESET':{
            return {
                count: 0
            }
        }
        case 'SET':{
            return {
                count: action.value
            }
        }
        default:{
            return state;
        }
    }
};

const store = createStore(countReducer);


// Action generators - functions that return action objects
// If no object is provided, it defaults to the empty object,
// and the empty object still uses the defaults provided for the contents
const increment = ({amount = 1} = {}) => (
    {
        type: 'INCREMENT',
        amount
    }
);

const decrement = ({amount = 1} = {}) => (
    {
        type: 'DECREMENT',
        amount
    }
);

const set = ({value = 100} = {}) => (
    {
        type: 'SET',
        value
    }
);

const reset = () => (
    {
        type: 'RESET'
    }
);


// Subscribe runs the function every time the store changes
// Subscribe returns a function you can call to unsubscribe later on
const unsubscribe = store.subscribe(() => {
    console.log('Store updated');
    console.log(store.getState());
});


// Dispatch an action to the store
store.dispatch(increment({amount: 10}));
store.dispatch(increment());
store.dispatch(increment());
store.dispatch(decrement());
store.dispatch(set());

unsubscribe();

store.dispatch(reset());

console.log(store.getState());



// Set up actions
// type is required, you can add what you want
// const increment = {
//     type: 'INCREMENT',
//     amount: 10
// };

// const decrement = {
//     type: 'DECREMENT',
//     amount: 20
// };

// const set = {
//     type: 'SET',
//     value: 100
// }

// const reset = {
//     type: 'RESET'
// };
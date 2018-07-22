const expensesReducerDefaultState = [];

export default ( state = expensesReducerDefaultState, action ) => {
    switch (action.type){
        case 'ADD_EXPENSE':{
            if (!action.expense){
                return state;
            }
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
        case 'SET_EXPENSES':{
            if (!action.expenses){
                return state;
            }

            // It's actually better to do this than state = [], plus it solves the issue of const arrays
            // https://appendto.com/2016/02/empty-array-javascript/
            // state.length = 0;

            // action.expenses.forEach((expense) => {
            //     state.push(expense);
            // });

            // return state;

            return action.expenses;
        }
        default:{
            return state;
        }
    }
};
import uuid from 'uuid';


export const addExpense = ( 
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
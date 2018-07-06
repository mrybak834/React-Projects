import { addExpense, removeExpense, editExpense } from '../../../redux/actions/expenses';

/**
 * addExpense
 */
 test('Expense Action Object: addExpense', () => {
     const expense = {
        description: 'test', 
        note: 'test', 
        amount: 1, 
        timestamp: 1
     };

     const action = addExpense(expense);

     expect(action).toEqual({
         type: 'ADD_EXPENSE',
         expense: {
             ...expense,
             id: expect.any(String)
         }
     });
 });

 test('Expense Action Object (default): addExpense', () => {
    const action = addExpense();

    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            description: '', 
            note: '', 
            amount: 0, 
            timestamp: 0,
            id: expect.any(String)
        }
    });
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
import selectExpensesTotal from '../../../redux/selectors/expenses-total';
import expenses from '../../fixtures/expenses';
import moment from 'moment';
import React from 'react';

test('No expenses', () => {
    const result = selectExpensesTotal([]);

    expect(result).toEqual((<h1 className="page-header__title">No expenses</h1>));
});

test('1 expense', () => {
    const expense = {
        id: '1',
        description: 'test',
        note: 'test',
        amount: 100,
        timestamp: moment(0).add(10, 'days').valueOf()
    }

    const result = selectExpensesTotal([expense]);

    expect(result).toEqual((<h1 className="page-header__title"><span>1</span> expense totalling <span>$1.00</span></h1>));
});

test('Multiple expenses', () => {
    const result = selectExpensesTotal(expenses);

    expect(result).toEqual((<h1 className="page-header__title"><span>{4}</span> expenses totalling <span>$1,635.01</span></h1>));
});
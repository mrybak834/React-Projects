/**
 * This is wrong, should be styling the data in the component, should only return data in the selector
 */

import React from 'react';
import numeral from 'numeral';

export default (expenses) => {
    if (expenses.length === 0){
        return (<h1 className="page-header__title">No expenses</h1>);
    };

    if (expenses.length === 1){
        return (<h1 className="page-header__title"><span>1</span> expense totalling <span>{numeral(expenses[0].amount / 100).format('$0,0.00')}</span></h1>);
    }

    
    const amount = expenses.reduce(
        (accumulator, currentExpense) => accumulator + currentExpense.amount, 
        0
    );
    return (<h1 className="page-header__title"><span>{expenses.length}</span> expenses totalling <span>{numeral(amount / 100).format('$0,0.00')}</span></h1>);
};
import numeral from 'numeral';


export default (expenses) => {
    if (expenses.length === 0){
        return 'No expenses';
    };

    if (expenses.length === 1){
        return `1 expense totaling ${numeral(expenses[0].amount / 100).format('$0,0.00')}`
    }

    
    const amount = expenses.reduce(
        (accumulator, currentExpense) => accumulator + currentExpense.amount, 
        0
    );
    return `${expenses.length} expenses totaling ${numeral(amount / 100).format('$0,0.00')}`
};
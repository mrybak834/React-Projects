import selectExpensesTotal from '../../../redux/selectors/expenses-total';
import expenses from '../../fixtures/expenses';
import moment from 'moment';


test('No expenses', () => {
    const result = selectExpensesTotal([]);

    expect(result).toEqual('No expenses');
});

test('1 expense', () => {
    const expense =     {
        id: '1',
        description: 'test',
        note: 'test',
        amount: 100,
        timestamp: moment(0).add(10, 'days').valueOf()
    }

    const result = selectExpensesTotal([expense]);

    expect(result).toEqual('1 expense totaling $1.00');
});

test('Multiple expenses', () => {
    const result = selectExpensesTotal(expenses);

    expect(result).toEqual('4 expenses totaling $1,635.01');
});
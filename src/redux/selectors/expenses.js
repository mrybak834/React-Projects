import moment from 'moment';


export default (expenses, { text, sortBy, startDate, endDate }) => {

    return expenses.filter( (expense) => {
        // // Filter text
        // if ( text && ((expense.description !== text) && (expense.note !== text)) ){
        //     return false;
        // }
        // // Filter Dates
        // if ( (startDate && (expense.timestamp < startDate)) || (endDate && (expense.timestamp > endDate))){
        //     return false;
        // }

        const timestampMoment = moment(expense.timestamp);

        const textMatch = typeof text !== 'string' || expense.description.toLowerCase().includes(text.toLowerCase());
        const startDateMatch = startDate ? startDate.isSameOrBefore(timestampMoment, 'day') : true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(timestampMoment, 'day') : true;
        return textMatch && startDateMatch && endDateMatch;
    }).sort( (a,b) => {
        if (sortBy === 'date'){
            // -1 = a comes first
            return a.timestamp > b.timestamp ? -1 : 1;
        }
        // amount
        else {
            return a.amount > b.amount ? -1 : 1;
        }
    });
};
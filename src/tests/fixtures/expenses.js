import moment from 'moment';

export default [
    {
        id: '1',
        description: 'test',
        note: 'test',
        amount: 1,
        timestamp: moment(0).add(10, 'days').valueOf()
    },
    {
        id: '2',
        description: 'Rent',
        note: '',
        amount: 60000,
        timestamp: moment(0).add(5, 'days').valueOf()
    },
    {
        id: '3',
        description: 'Car',
        note: 'Car payment',
        amount: 99000,
        timestamp: moment(0).valueOf()
    },
    {
        id: '4',
        description: 'Credit Card',
        note: 'Mastercard',
        amount: 4500,
        timestamp: moment(0).subtract(5, 'days').valueOf()
    },
];
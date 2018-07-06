import moment from 'moment';

export default {
    text: '',
    sortBy: 'date',
    startDate: moment(0).subtract(5, 'days'),
    endDate: moment(0).add(10, 'days')
};
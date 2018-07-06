import moment from 'moment';


const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
};

export default (state = filtersReducerDefaultState, action) => {
    switch (action.type){
        case 'SET_TEXT_FILTER':{
            return {
                ...state,
                text: action.text
            }
        }
        case 'SET_SORT_BY_FILTER':{
            return {
                ...state,
                sortBy: action.option === 'date' ? 'date' : 'amount'
            }
        }
        case 'SET_START_DATE_FILTER':{
            return {
                ...state,
                startDate: action.date
            }
        }
        case 'SET_END_DATE_FILTER':{
            // Check if date range makes sense
            if (state.startDate && (state.startDate > action.date)){
                return state;
            }
            return {
                ...state,
                endDate: action.date
            }
        }
        default:{
            return state;
        }
    }
};
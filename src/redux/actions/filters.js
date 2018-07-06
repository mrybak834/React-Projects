export const setTextFilter = (text = '') => (
    {
        type: 'SET_TEXT_FILTER',
        text
    }
);

export const setSortByFilter = (option = 'date') => (
    {
        type: 'SET_SORT_BY_FILTER',
        option
    }
);

export const setStartDateFilter = (date) => (
    {
        type: 'SET_START_DATE_FILTER',
        date
    }
);

export const setEndDateFilter = (date) => (
    {
        type: 'SET_END_DATE_FILTER',
        date
    }
);
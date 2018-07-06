import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, setSortByFilter, setStartDateFilter, setEndDateFilter } from '../redux/actions/filters';
import { DateRangePicker } from 'react-dates';

export class ExpenseListFilters extends React.Component {
    
    state = {
        calendarFocused: null
    };

    onTextChange = (e) => {
        this.props.setTextFilter(e.target.value);
    };

    onSelectChange = (e) => {
        this.props.setSortByFilter(e.target.value);
    };

    onFocusChange = (calendarFocused) => {
        this.setState(() => ({ calendarFocused }));
    };

    onDatesChange = ({ startDate, endDate }) => {
        this.props.setStartDateFilter(startDate);
        this.props.setEndDateFilter(endDate);
    };

    render () {
        return (
            <div>
                <input 
                    type="text" 
                    value={this.props.filters.text} 
                    onChange={this.onTextChange}
                />
                
                <select 
                    value={this.props.filters.sortBy}
                    onChange={this.onSelectChange}
                >
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                </select>
                <DateRangePicker 
                    startDate={this.props.filters.startDate}
                    startDateId="start_date"
                    endDate={this.props.filters.endDate}
                    endDateId="end_date"
                    onDatesChange={this.onDatesChange}
                    focusedInput={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    showClearDates={true}
                    numberOfMonths={2}
                    isOutsideRange={() => false}
                />
        
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        filters: state.filters
    };
};

const mapDispatchToProps = (dispatch, props) => ({
    setTextFilter: value => dispatch(setTextFilter(value)),
    setSortByFilter: value => dispatch(setSortByFilter(value)),
    setStartDateFilter: startDate => dispatch(setStartDateFilter(startDate)),
    setEndDateFilter: endDate => dispatch(setEndDateFilter(endDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);
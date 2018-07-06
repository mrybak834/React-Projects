import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

const now = moment();

export default class ExpenseForm extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            description: '',
            note: '',
            ...props.expense,
            amount: props.expense ? (props.expense.amount / 100).toString() : '',
            timestamp: props.expense ? moment(props.expense.timestamp) : moment(),
            calendarFocused: false,
            error: ''
        }
    }

    onDescriptionChange = (e) => {
        const description = e.target.value;

        this.setState(() => ({ description }));
    };

    onNoteChange = (e) => {
        const note = e.target.value;

        this.setState(() => ({ note }));
    };

    onAmountChange = (e) => {
        const amount = e.target.value;

        // Accept no amount or a valid value
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ amount }));
        }
    };

    onCalendarDateChange = (timestamp) => {
        timestamp && this.setState(() => ({ timestamp }));
    };

    onCalendarFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused}));
    };

    onSubmit = (e) => {
        e.preventDefault();

        // Handle input errors
        this.setState(() => ({ error: '' }));
        if (!this.state.description.trim()){
            return this.setState(() => ({ error: 'Please enter a description!'}));
        }
        if (!this.state.amount){
            return this.setState(() => ({ error: 'Please enter an amount!'}));
        }

        this.props.onSubmit({
            description: this.state.description,
            note: this.state.note,
            amount: parseFloat(this.state.amount, 10) * 100,
            timestamp: this.state.timestamp.valueOf()
        });
    };

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input 
                        id="inputDescription"
                        type="text" 
                        placeholder="Description" 
                        autoFocus 
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                    />
                    <input 
                        id="inputAmount"
                        type="text" 
                        placeholder="Amount"
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                    />
                    <SingleDatePicker
                        date={this.state.timestamp}
                        onDateChange={this.onCalendarDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onCalendarFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={(day) => false}
                    />
                    <textarea 
                        placeholder="Add a note for your expense (Optional)" 
                        value={this.state.note}
                        onChange={this.onNoteChange}
                    />
                    <button >Add Expense</button>
                </form>
                {this.state.error && <p>{this.state.error}</p>}
            </div>
        )
    }
}
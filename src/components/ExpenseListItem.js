import React from 'react';
import { Link } from 'react-router-dom'

const ExpenseListItem =  ({ id, description, amount, timestamp }) => (
    <div>
        <h3><Link to={`edit/${id}`}>{description}</Link></h3>
        <p>${amount} - Created At: {timestamp}</p>
    </div>
);

export default ExpenseListItem;
// HOC - A component that renders another component
// Reuse code
// Render hijacking
// Prop manipulation
// Abstract state


import React from 'react';
import ReactDOM from 'react-dom';

// Normal component
const Info = (props) => (
    <div>
    <h1>Info</h1>
    <p>The info is: {props.info}</p>
    </div>
);

const withAdminWarning = (WrappedComponent) => {
    // Higher order component
    return (props) => (
        <div>
            {props.isAdmin && <p> This is private info! </p>}
            
            {/*  Send all props */}
            <WrappedComponent {...props} />
        </div>
    );
};

const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAuthenticated ? <WrappedComponent {...props} /> : <p>Please authenticate</p> }
        </div>
    );
}

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

ReactDOM.render(<AdminInfo isAdmin={true} info='Very secret info' />, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={false} info='Very secret info' />, document.getElementById('app'));
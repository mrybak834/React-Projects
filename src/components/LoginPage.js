import React from 'react';
import { connect } from 'react-redux';

// Stateless functional component
const LoginPage = () => (
    <div>
        <button>Login</button>
    </div>
);

export default LoginPage;

// Class based component with redux
// export class LoginPage extends React.Component {

//     render() {
//         return (
//             <div>
//                 <button>Login</button>
//             </div>
//         );
//     }
// }


// const mapStateToProps = (state, props) => {
//     return {

//     };
// }

// export default connect(mapStateToProps)(LoginPage);
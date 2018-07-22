import React from 'react';
import { connect } from 'react-redux';
import { startSignIn } from '../redux/actions/auth';

export class SignInPage extends React.Component {
    render() {
        return (
            <div>
                <button onClick={this.props.startSignIn}>Log In</button>
            </div>
        );
    }
}


// const mapStateToProps = (state, props) => {
//     return {

//     };
// }

const mapDispatchToProps = (dispatch) => ({
    startSignIn: () => dispatch(startSignIn())
});

export default connect(undefined, mapDispatchToProps)(SignInPage);
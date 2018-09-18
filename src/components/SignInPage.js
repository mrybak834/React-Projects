import React from 'react';
import { connect } from 'react-redux';
import { startSignIn } from '../redux/actions/auth';

export class SignInPage extends React.Component {
    render() {
        return (
            <div className="box-layout">
                <div className="box-layout__box">
                    <h1 className="box-layout__title">Expensify</h1>
                    <p>Easily manage your budget</p>
                    <button className="button" onClick={this.props.startSignIn}>Sign In with Google</button>
                </div>
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
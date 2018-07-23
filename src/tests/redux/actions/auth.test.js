import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { signIn, startSignIn, signOut, startSignOut } from '../../../redux/actions/auth';


const createMockStore = configureMockStore([thunk]);



//#region Sign In
test('Sign In Action Generator', () => {
    const uid = '1';

    const result = signIn(uid);

    expect(result).toEqual({
        type: 'SIGN_IN',
        uid
    });
});

test('Sign In Asynch Action Generator', () => {

});
//#endregion Sign In

//#region Sign Out
test('Sign Out Action Generator', () => {
    const result = signOut();

    expect(result).toEqual({
        type: 'SIGN_OUT'
    });
});

test('Sign Out Asynch Action Generator', () => {
    const store = createMockStore({});
});
//#endregion Sign Out

import { googleAuthProvider, auth } from '../../firebase/firebase';


export const signIn = (uid) => ({
    type: 'SIGN_IN',
    uid
});

/**
 * These are completely seperate from the normal action generators, which are used for obtaining the user id for redux
 */
export const startSignIn = () => {
    return (dispatch) => {
        return auth.signInWithPopup(googleAuthProvider);
    };
};


export const signOut = () => ({
    type: 'SIGN_OUT'
});

export const startSignOut = () => {
    return (dispatch) => {
        return auth.signOut();
    }
}
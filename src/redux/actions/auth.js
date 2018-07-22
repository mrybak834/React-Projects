import { googleAuthProvider, auth } from '../../firebase/firebase';


export const startSignIn = () => {
    return (dispatch) => {
        return auth.signInWithPopup(googleAuthProvider);
    };
};

export const startSignOut = () => {
    return (dispatch) => {
        return auth.signOut();
    }
}
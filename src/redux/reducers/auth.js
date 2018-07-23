export default (state = {}, action) => {
    switch (action.type){
        case 'SIGN_IN': {
            return {
                uid: action.uid
            };
        }
        case 'SIGN_OUT': {
            return {};
        }
        default: {
            return state;
        }
    }
}
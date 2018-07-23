import authReducer from '../../../redux/reducers/auth';

test('Sign In', () => {
    const uid = '1';
    const action = {
        type: 'SIGN_IN',
        uid
    }
    const state = authReducer({}, action);

    expect(state).toEqual({uid});
});

test('Sign Out', () => {
    const action = {
        type: 'SIGN_OUT'
    };

    const state = authReducer({}, action);

    expect(state).toEqual({});
});

test('Default', () => {
    const state = {
        test: 'test'
    };

    const action = {
        type: ''
    };

    const result = authReducer(state, action);

    expect(result).toEqual(state);
})
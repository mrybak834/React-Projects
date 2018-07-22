import React from 'react';
import { shallow } from 'enzyme';
import { SignInPage } from '../../components/SignInPage';

let startSignIn, wrapper;
beforeEach(() => {
    startSignIn = jest.fn();
    wrapper = shallow(<SignInPage startSignIn={startSignIn} />);
});

test('Component Snapshot', () => {

    expect(wrapper).toMatchSnapshot();
})

test('Sign In', () => {
    wrapper.find('button').simulate('click');

    expect(startSignIn).toHaveBeenCalled();
});
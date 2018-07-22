/**
 * Shallow rendering renders only the given component
 * as opposed to full DOM rendering which renders child components
 */
import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header';

let startSignOut, wrapper;
beforeEach(() => {
    startSignOut = jest.fn();
    wrapper = shallow(<Header startSignOut={startSignOut} />);
});

test('Components: Header: Render Header', () => {
    /**
     * Snapshot assertions only work with multiple runs.
     * First run creates a snapshot, all subsequent runs must match the original snapshot
     * Wrappers are serialized and stripped via the serializers in jest.config
     */
    expect(wrapper).toMatchSnapshot();
});

test('Sign out', () => {
    wrapper.find('button').simulate('click');

    expect(startSignOut).toHaveBeenCalled();
});
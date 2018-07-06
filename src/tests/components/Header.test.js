/**
 * Shallow rendering renders only the given component
 * as opposed to full DOM rendering which renders child components
 */
import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../components/Header';




test('Components: Header: Render Header', () => {
    const wrapper = shallow(<Header />);

    /**
     * Snapshot assertions only work with multiple runs.
     * First run creates a snapshot, all subsequent runs must match the original snapshot
     * Wrappers are serialized and stripped via the serializers in jest.config
     */
    expect(wrapper).toMatchSnapshot();

});
import React from 'react';
import { shallow } from 'enzyme';
import ErrorPage from '../../components/ErrorPage';

test('Components: ErrorPage: Render Error Page', () => {
    const wrapper = shallow(<ErrorPage />);

    expect(wrapper).toMatchSnapshot();
});
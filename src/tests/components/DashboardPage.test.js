import React from 'react';
import { shallow } from 'enzyme';
import DashboardPage from '../../components/DashboardPage';

test('Components: DashboardPage: Render Dashboard Page', () => {
    const wrapper = shallow(<DashboardPage />);

    expect(wrapper).toMatchSnapshot();
});
import React from 'react';
import { shallow } from 'enzyme';
import SignUp from '../src/components/Auth/SignUp'; // Corrected component import

describe('SignUp component', () => {
  it('renders name input field', () => {
    const wrapper = shallow(<SignUp />);
    expect(wrapper.find('input[name="name"]').exists()).toBeTruthy();
  });

  it('renders email input field', () => {
    const wrapper = shallow(<SignUp />);
    expect(wrapper.find('input[name="email"]').exists()).toBeTruthy();
  });

  it('renders password input field', () => {
    const wrapper = shallow(<SignUp />);
    expect(wrapper.find('input[name="password"]').exists()).toBeTruthy();
  });

  it('renders user type select field', () => {
    const wrapper = shallow(<SignUp />);
    expect(wrapper.find('select[name="userType"]').exists()).toBeTruthy();
  });
});

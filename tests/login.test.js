// login.test.js
import React from 'react';
import { shallow } from 'enzyme';
import LogIn from '../src/components/Auth/Login';


describe('LogIn component', () => {
  it('renders email input field', () => {
    const wrapper = shallow(<LogIn />);
    const emailInput = wrapper.find({ placeholder: 'Enter your email' });
    expect(emailInput.exists()).toBe(true);
  });

  it('renders password input field', () => {
    const wrapper = shallow(<LogIn />);
    const passwordInput = wrapper.find({ placeholder: 'Enter your password' });
    expect(passwordInput.exists()).toBe(true);
  });
});

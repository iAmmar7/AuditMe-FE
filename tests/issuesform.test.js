import React from 'react';
import { shallow } from 'enzyme';
import IssueForm from '../src/components/Priorities/IssueForm';

describe('IssueForm component', () => {
  const item = {
    _id: 'uniqueId',
    status: 'Pending',
  };

  const tableRef = {
    current: {
      reload: jest.fn(),
    },
  };

  const setFormDisabled = jest.fn();

  const styles = {
    prefixIcon: 'prefix-icon-class',
    issue_image_container: 'image-container-class',
    issue_image: 'image-class',
    issue_delete_btn: 'delete-btn-class',
  };

  it('renders IssueForm component for auditor role', () => {
    localStorage.setItem('user', JSON.stringify({ role: 'auditor' }));
    const wrapper = shallow(<IssueForm item={item} tableRef={tableRef} setFormDisabled={setFormDisabled} styles={styles} />);
    expect(wrapper.find('ProForm').exists()).toBeTruthy();
  });

  it('renders IssueForm component for rm role', () => {
    localStorage.setItem('user', JSON.stringify({ role: 'rm' }));
    const wrapper = shallow(<IssueForm item={item} tableRef={tableRef} setFormDisabled={setFormDisabled} styles={styles} />);
    expect(wrapper.find('ProForm').exists()).toBeTruthy();
  });

  it('renders IssueForm component for am role', () => {
    localStorage.setItem('user', JSON.stringify({ role: 'am' }));
    const wrapper = shallow(<IssueForm item={item} tableRef={tableRef} setFormDisabled={setFormDisabled} styles={styles} />);
    expect(wrapper.find('ProForm').exists()).toBeTruthy();
  });
});

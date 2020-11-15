import React from 'react';
import { LockTwoTone, UserOutlined, MailOutlined } from '@ant-design/icons';
import { ProFormText, ProFormSelect } from '@ant-design/pro-form';

export default function SingUp({ styles }) {
  return (
    <>
      <ProFormText
        name="name"
        fieldProps={{
          size: 'large',
          prefix: <UserOutlined className={styles.prefixIcon} />,
        }}
        placeholder="Enter your name"
        rules={[
          {
            required: true,
            message: 'Name is required',
          },
        ]}
      />
      <ProFormText
        name="email"
        fieldProps={{
          size: 'large',
          prefix: <MailOutlined className={styles.prefixIcon} />,
        }}
        placeholder="Enter your email"
        rules={[
          {
            required: true,
            message: 'Email is required',
          },
        ]}
      />
      <ProFormText.Password
        name="password"
        fieldProps={{
          size: 'large',
          prefix: <LockTwoTone className={styles.prefixIcon} />,
        }}
        placeholder="Enter your password"
        rules={[
          {
            required: true,
            message: 'Password is required',
          },
        ]}
      />
      <ProFormSelect
        name="userType"
        hasFeedback
        valueEnum={{
          admin: 'Admin',
          user: 'User',
        }}
        placeholder="Signup as"
        rules={[{ required: true, message: 'Please select signup as' }]}
      />
    </>
  );
}

import React from 'react';
import { LockTwoTone, UserOutlined, MailOutlined, SecurityScanOutlined } from '@ant-design/icons';
import { ProFormText, ProFormSelect } from '@ant-design/pro-form';

export default function SingUp({ styles }) {
  return (
    <>
      <ProFormText
        type="text"
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
        type="email"
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
        type="password"
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
        fieldProps={{
          size: 'large',
        }}
        hasFeedback
        valueEnum={{
          auditor: 'Auditor',
          rm: 'Regional Manager',
        }}
        placeholder="Signup as"
        rules={[{ required: true, message: 'Please select signup as' }]}
      />
    </>
  );
}

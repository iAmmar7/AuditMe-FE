import { LockTwoTone, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Alert, Tabs } from 'antd';
import React, { useState } from 'react';
import ProForm, { ProFormText, ProFormSelect } from '@ant-design/pro-form';
import { history, connect } from 'umi';
import styles from './index.less';

const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login = (props) => {
  const { userLogin = {}, submitting } = props;
  const { status } = userLogin;
  const [type, setType] = useState('login');

  const handleSubmit = (values) => {
    console.log(values);
    if (type === 'login') {
      // request to server for login
      if (value.authUser === 'admin') {
      }
    }

    if (type === 'signup') {
      // request to server for signup
    }
  };

  return (
    <div className={styles.main}>
      <ProForm
        initialValues={{
          autoLogin: true,
        }}
        submitter={{
          render: (_, dom) => dom.pop(),
          submitButtonProps: {
            loading: submitting,
            size: 'large',
            style: {
              width: '100%',
            },
          },
        }}
        onFinish={async (values) => {
          handleSubmit(values);
        }}
      >
        <Tabs activeKey={type} onChange={setType}>
          <Tabs.TabPane key="login" tab="Login" />
          <Tabs.TabPane key="signup" tab="Signup" />
        </Tabs>

        {status === 'error' && type === 'login' && !submitting && (
          <LoginMessage content="Incorrect email/password" />
        )}
        {type === 'login' && (
          <>
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
              name="authUser"
              hasFeedback
              valueEnum={{
                admin: 'Admin',
                user: 'User',
              }}
              placeholder="Login as"
              rules={[{ required: true, message: 'Please select login as' }]}
            />
          </>
        )}

        {status === 'error' && type === 'signup' && !submitting && (
          <LoginMessage content="Unable to signup" />
        )}
        {type === 'signup' && (
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
              name="authUser"
              hasFeedback
              valueEnum={{
                admin: 'Admin',
                user: 'User',
              }}
              placeholder="Signup as"
              rules={[{ required: true, message: 'Please select signup as' }]}
            />
          </>
        )}
      </ProForm>
    </div>
  );
};

export default connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);

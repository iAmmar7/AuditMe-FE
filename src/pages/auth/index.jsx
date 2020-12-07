import React, { useState } from 'react';
import { Alert, Tabs, Button, message } from 'antd';
import ProForm from '@ant-design/pro-form';
import { history } from 'umi';
import axios from 'axios';

import styles from './index.less';
import SignUp from '../../components/Auth/Signup';
import LogIn from '../../components/Auth/Login';

const URL =
  process.env.NODE_ENV === 'development'
    ? process.env.AUDITME_DEV_BE_URL
    : process.env.AUDITME_PROD_BE_URL;

const AuthMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content || 'Unknown error'}
    type="error"
    showIcon
  />
);

const Auth = () => {
  const [response, setResponse] = useState({
    loading: false,
    success: null,
    data: null,
  });
  const [tab, setTab] = useState('login');

  const handleSubmit = (values) => {
    setResponse({
      ...response,
      loading: true,
    });

    if (tab === 'login') {
      axios
        .post(`${URL}/api/auth/user/login`, {
          batchNumber: values.batchNumber,
          password: values.password,
        })
        .then((res) => {
          if (res.data.success) {
            localStorage.setItem('userType', res.data.user.role);
            localStorage.setItem('userToken', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            message.success('Login successfull');
            history.push('/user/');
          }
        })
        .catch((err) => {
          setResponse({
            loading: false,
            success: false,
            error: err.response?.data?.message,
          });
        });
    }

    if (tab === 'signup') {
      axios
        .post(`${URL}/api/auth/user/signup`, {
          name: values.name,
          batchNumber: values.batchNumber,
          password: values.password,
          role: values.userType,
        })
        .then((res) => {
          if (res.data.success) {
            localStorage.setItem('userType', values.userType);
            message.success('SignUp successfull');
            setResponse({
              ...response,
              loading: false,
            });
            setTab('login');
          }
        })
        .catch((err) => {
          setResponse({
            loading: false,
            success: false,
            error: err.response?.data?.message,
          });
        });
    }
  };

  return (
    <div className={styles.main}>
      <ProForm
        submitter={{
          submitButtonProps: {
            loading: response.loading,
            size: 'large',
            style: {
              width: '100%',
            },
          },
          render: (props) => {
            return (
              <Button
                type="primary"
                loading={response.loading}
                size="large"
                style={{ width: '100%' }}
                onClick={() => props.form.submit()}
              >
                Submit
              </Button>
            );
          },
        }}
        onFinish={async (values) => {
          handleSubmit(values);
        }}
      >
        <Tabs activeKey={tab} onChange={setTab}>
          <Tabs.TabPane key="login" tab="Login" />
          <Tabs.TabPane key="signup" tab="Signup" />
        </Tabs>

        {response.success === false && tab === 'login' && !response.loading && (
          <AuthMessage content={response.error} />
        )}
        {tab === 'login' && <LogIn styles={styles} />}

        {response.success === false && tab === 'signup' && !response.loading && (
          <AuthMessage content={response.error} />
        )}
        {tab === 'signup' && <SignUp styles={styles} />}
      </ProForm>
    </div>
  );
};

export default Auth;

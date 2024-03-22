import ProForm from '@ant-design/pro-form';
import { Alert, Button, message, Tabs } from 'antd';
import { useState } from 'react';
import { history } from 'umi';

import { useAppContext } from '@/contexts/AppContext';
import authService from '@/services/auth';
import LogIn from '../../components/Auth/Login';
import SignUp from '../../components/Auth/Signup';
import styles from './index.less';

const AuthMessage = ({ message }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={message || 'Unknown error'}
      type="error"
      showIcon
    />
  );
};

const Auth = () => {
  const { setUser, setToken } = useAppContext();
  const [response, setResponse] = useState({
    loading: false,
    success: null,
    data: null,
    errors: null,
  });
  const [tab, setTab] = useState('login');

  const handleSubmit = (values) => {
    setResponse({
      ...response,
      loading: true,
      errors: null,
    });

    if (tab === 'login') {
      authService
        .login(values)
        .then((res) => {
          if (res.data.success) {
            setUser(res.data.user);
            setToken(res.data.token);
            localStorage.setItem('userType', res.data.user.role);
            localStorage.setItem('userToken', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            message.success('Login successful');
            history.push('/user/');
          }
        })
        .catch((err) => {
          setResponse({
            loading: false,
            success: false,
            errors: err.response?.data?.errors,
          });
        });
    }

    if (tab === 'signup') {
      authService
        .signup(values)
        .then((res) => {
          if (res.data.success) {
            localStorage.setItem('userType', values.userType);
            message.success('SignUp successful');
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
            errors: err.response?.data?.errors,
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
          <AuthMessage message={response.errors?.[0]?.msg} />
        )}

        {tab === 'login' && <LogIn styles={styles} />}

        {response.success === false && tab === 'signup' && !response.loading && (
          <AuthMessage message={response.errors?.[0]?.msg} />
        )}
        {tab === 'signup' && <SignUp styles={styles} />}
      </ProForm>
    </div>
  );
};

export default Auth;

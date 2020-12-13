import React, { useState } from 'react';
import { Button, Row, Alert, message } from 'antd';
import ProForm, { ProFormText, ProFormSelect } from '@ant-design/pro-form';
import axios from 'axios';

const URL =
  process.env.NODE_ENV === 'development'
    ? process.env.AUDITME_DEV_BE_URL
    : process.env.AUDITME_PROD_BE_URL;

const AddForm = ({ tableRef, modalClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addUser = async (values) => {
    setLoading(true);

    // Send axios request
    axios
      .post(
        `${URL}/api/user/add-user`,
        { ...values },
        {
          headers: { Authorization: localStorage.userToken },
        },
      )
      .then((res) => {
        console.log(res);
        setLoading(false);
        modalClose();
        tableRef.current.reload();
        if (res.data.success) {
          message.success('User has been successfully added!');
        }
      })
      .catch((err) => {
        console.log(err.response);
        setError(err.response?.data?.message);
        setLoading(false);
        message.error('Unable to add user, please try again!', 10);
      });
  };

  return (
    <>
      {error ? (
        <Alert
          style={{
            marginBottom: 24,
          }}
          message={error || 'Unknown error'}
          type="error"
          showIcon
        />
      ) : null}
      <ProForm
        submitter={{
          render: (submitProps) => (
            <Row justify="end">
              <Button
                type="primary"
                loading={loading}
                justify="right"
                disabled={!JSON.parse(localStorage.user).isAdmin}
                onClick={() => submitProps.form.submit()}
              >
                Add
              </Button>
            </Row>
          ),
        }}
        onFinish={addUser}
      >
        <ProFormText
          name="badgeNumber"
          label="Bagde Number"
          placeholder="Enter bagde number"
          rules={[{ required: true, message: 'Please write user badge number!' }]}
        />
        <ProFormText
          name="name"
          label="Name"
          placeholder="Enter name"
          rules={[{ required: true, message: 'Please write user name!' }]}
        />
        <ProFormText
          name="password"
          label="Password"
          placeholder="Enter password"
          rules={[{ required: true, message: 'Please write user name!' }]}
        />
        <ProFormSelect
          name="userType"
          label="User type"
          valueEnum={{
            auditor: 'Auditor',
            rm: 'Regional Manager',
            viewer: 'Viewer',
          }}
          placeholder="Signup as"
          rules={[{ required: true, message: 'Please select signup as' }]}
        />
      </ProForm>
    </>
  );
};

export default AddForm;

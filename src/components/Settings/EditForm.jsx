import React, { useState } from 'react';
import { Button, Row, message } from 'antd';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import axios from 'axios';

const URL =
  process.env.NODE_ENV === 'development'
    ? process.env.AUDITME_DEV_BE_URL
    : process.env.AUDITME_PROD_BE_URL;

const EditForm = ({ form, tableRef, modalClose }) => {
  const [loading, setLoading] = useState(false);
  const [submitDisable, setSubmitDisable] = useState(true);

  const updateUser = async (values) => {
    const userId = form.getFieldValue('id');
    setLoading(true);

    // Send axios request
    axios
      .post(
        `${URL}/api/user/update-user/${userId}`,
        { ...values },
        {
          headers: { Authorization: localStorage.userToken },
        },
      )
      .then((res) => {
        setLoading(false);
        modalClose();
        tableRef.current.reload();
        if (res.data.success) {
          message.success('User has been successfully updated!');
        }
      })
      .catch(() => {
        setLoading(false);
        message.error('Unable to update user, please try later!', 10);
      });
  };

  return (
    <ProForm
      form={form}
      submitter={{
        render: (submitProps) => (
          <Row justify="end">
            <Button
              type="primary"
              loading={loading}
              justify="right"
              disabled={submitDisable || !JSON.parse(localStorage.user).isAdmin}
              onClick={() => submitProps.form.submit()}
            >
              Update
            </Button>
          </Row>
        ),
      }}
      onFinish={updateUser}
      onValuesChange={() => {
        setSubmitDisable(false);
      }}
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
    </ProForm>
  );
};

export default EditForm;

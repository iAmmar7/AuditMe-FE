import React, { useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Form, message } from 'antd';

import axios from 'axios';

import FeedbackForm from '../../components/FeedbackForm';

const URL =
  process.env.NODE_ENV === 'development'
    ? process.env.AUDITME_DEV_BE_URL
    : process.env.AUDITME_PROD_BE_URL;

const AMChecklistForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [feedbackFor, setFeedbackFor] = useState(null);
  const [anonymous, setAnonymous] = useState(false);

  const onSubmit = async (values) => {
    setLoading(true);

    const data = anonymous
      ? {
          isAnonymous: anonymous,
          department: values?.department,
          otherDepartment: values?.otherDepartment,
          subject: values?.subject,
          message: values?.message,
        }
      : {
          name: values?.name,
          badgeNumber: values?.badgeNumber,
          isAnonymous: anonymous,
          department: values?.department,
          otherDepartment: values?.otherDepartment,
          subject: values?.subject,
          message: values?.message,
        };

    axios
      .post(`${URL}/api/user/feedback`, data, {
        headers: { Authorization: localStorage.userToken },
      })
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          message.success('Feedback form has been successfully published!');
          form.resetFields();
        }
      })
      .catch(() => {
        setLoading(false);
        message.error('Unable to publish feedback!', 10);
      });
  };

  return (
    <PageHeaderWrapper content="Voice of Employee">
      <Card>
        <FeedbackForm
          loading={loading}
          onFinish={onSubmit}
          form={form}
          feedbackFor={feedbackFor}
          setFeedbackFor={setFeedbackFor}
          anonymous={anonymous}
          setAnonymous={setAnonymous}
        />
      </Card>
    </PageHeaderWrapper>
  );
};

export default AMChecklistForm;

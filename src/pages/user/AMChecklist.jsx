import React, { useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, message, Alert, Form } from 'antd';
import axios from 'axios';

import AMChecklist from '../../components/AMChecklist';

const URL =
  process.env.NODE_ENV === 'development'
    ? process.env.AUDITME_DEV_BE_URL
    : process.env.AUDITME_PROD_BE_URL;

const AMChecklistForm = () => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState({});
  const [form] = Form.useForm();

  const onSubmit = async (values) => {
    setLoading(true);

    const formData = new FormData();
    Object.keys(values).forEach((item) => {
      let value;
      if (item.includes('question')) {
        value = values[item] === 'Yes';
      } else {
        value = values[item];
      }
      formData.append(item, value);
    });

    Object.entries(images).forEach(([key, value]) => {
      value.forEach((image) => {
        formData.append([key], image);
      });
    });

    axios
      .post(`${URL}/api/am/checklist`, formData, {
        headers: { Authorization: localStorage.userToken },
      })
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          message.success('Checklist form has been successfully published!');
          form.resetFields();
        }
      })
      .catch(() => {
        setLoading(false);
        message.error('Unable to publish checklist!', 10);
      });
  };

  const alertMessage = () => {
    let messageText = null;

    if (JSON.parse(localStorage.getItem('user')).role === 'rm')
      messageText =
        'You have signed up as regional manager, you can not submit a checklist. Please signup as area manager in order to submit a checklist.';

    if (JSON.parse(localStorage.getItem('user')).role === 'sm')
      messageText =
        'You have signed up as station manager, you can not submit a checklist. Please signup as area manager in order to submit a checklist.';

    if (JSON.parse(localStorage.getItem('user')).role === 'auditor')
      messageText =
        'You have signed up as auditor, you can not submit a checklist. Please signup as area manager in order to submit a checklist.';

    if (JSON.parse(localStorage.getItem('user')).role === 'viewer')
      messageText =
        'You have signed up as viewer, you can not submit a checklist. Please signup as area manager, in order to submit a checklist.';

    return (
      messageText && (
        <Alert
          style={{
            marginBottom: 24,
          }}
          message={messageText}
          type="error"
          showIcon
        />
      )
    );
  };

  return (
    <PageHeaderWrapper content="Complete AM checklist using the form below">
      {alertMessage()}
      <Card>
        <AMChecklist
          loading={loading}
          images={images}
          setImages={setImages}
          onFinish={onSubmit}
          form={form}
        />
      </Card>
    </PageHeaderWrapper>
  );
};

export default AMChecklistForm;

import React from 'react';
import { Switch, Space, Button } from 'antd';
import ProForm, { ProFormText, ProFormTextArea, ProFormRadio } from '@ant-design/pro-form';

import styles from './FeedbackForm.less';

const FeedbackForm = ({
  loading,
  onFinish,
  feedbackFor,
  setFeedbackFor,
  anonymous,
  setAnonymous,
  form,
}) => {
  return (
    <ProForm
      form={form}
      submitter={{
        render: (submitProps) => {
          return (
            <>
              <Button
                type="secondary"
                loading={loading}
                style={{ marginRight: '8px' }}
                onClick={() => {
                  setAnonymous(false);
                  setFeedbackFor(null);
                  submitProps?.form?.resetFields();
                }}
              >
                Reset
              </Button>
              <Button type="primary" loading={loading} onClick={() => submitProps?.form?.submit()}>
                Submit
              </Button>
            </>
          );
        },
      }}
      onFinish={onFinish}
      onValuesChange={(changedValues) => {
        if (changedValues?.department) setFeedbackFor(changedValues?.department);
      }}
    >
      <ProForm.Group>
        <ProFormText
          name="name"
          label="Name"
          tooltip="Name"
          placeholder="Enter Name"
          disabled={anonymous}
          rules={[{ required: !anonymous, message: 'Please enter your name' }]}
        />
        <ProFormText
          name="badgeNumber"
          label="Badge #"
          placeholder="Enter your Badge No."
          disabled={anonymous}
          rules={[{ required: !anonymous, message: 'Please enter your badge no.' }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <Space className={styles.switch_group}>
          Do you wish to stay anonymous?
          <Switch
            name="isAnonymous"
            checkedChildren="Yes"
            unCheckedChildren="No"
            checked={anonymous}
            onChange={(checked) => {
              form.setFieldsValue({ name: '', badgeNumber: '' });
              setAnonymous(checked);
            }}
          />
        </Space>
      </ProForm.Group>
      <ProFormRadio.Group
        name="department"
        label="Which department do you have a feedback for?"
        rules={[{ required: true, message: 'Please select department' }]}
        options={[
          {
            label: 'Sales',
            value: 'Sales',
          },
          {
            label: 'Customer Support',
            value: 'Customer Support',
          },
          {
            label: 'Business Development',
            value: 'Business Development',
          },
          {
            label: 'Other',
            value: 'Other',
          },
        ]}
      />
      {feedbackFor === 'Other' && (
        <ProFormText
          wrapperCol={{ xl: 6, sm: 24 }}
          name="otherDepartment"
          placeholder="Enter other department"
          rules={[{ required: true, message: 'Please enter department name' }]}
        />
      )}
      <ProFormText
        wrapperCol={{ xl: 6, sm: 24 }}
        name="subject"
        label="Subject"
        placeholder="Enter subject"
        rules={[{ required: true, message: 'Please enter subject' }]}
      />
      <ProFormTextArea
        name="message"
        label="Your Message"
        placeholder="Enter your message"
        rules={[{ required: true, message: 'Please enter your message' }]}
      />
    </ProForm>
  );
};

export default FeedbackForm;

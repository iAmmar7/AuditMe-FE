import React from 'react';
import { HeartTwoTone, SmileTwoTone } from '@ant-design/icons';
import { Card, Typography, Alert } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

const Landing = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <PageHeaderWrapper content="Summary of your dashboard">
      <Card>
        <Alert
          message={`Welcome back ${user.name}`}
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 48,
          }}
        />
        <Typography.Title
          level={2}
          style={{
            textAlign: 'center',
          }}
        >
          <SmileTwoTone /> Handle your audit reports with ease{' '}
          <HeartTwoTone twoToneColor="#eb2f96" />
        </Typography.Title>
      </Card>
    </PageHeaderWrapper>
  );
};

export default Landing;

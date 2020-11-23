import React from 'react';
import { HeartTwoTone, SmileTwoTone, FormOutlined, TabletOutlined } from '@ant-design/icons';
import { Card, Typography, Alert, Button } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Link } from 'umi';

const Landing = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <PageHeaderWrapper content="Summary of your account">
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
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <Link to="/user/priorities-reports">
            <Button type="primary" icon={<TabletOutlined />} style={{ margin: '4px' }}>
              See reports
            </Button>
          </Link>
          <Link to="/user/priorities-form">
            <Button icon={<FormOutlined />}>Raise an issue</Button>
          </Link>
        </div>
      </Card>
    </PageHeaderWrapper>
  );
};

export default Landing;

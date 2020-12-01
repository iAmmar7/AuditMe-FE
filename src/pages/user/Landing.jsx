import React, { useEffect, useState } from 'react';
import { FormOutlined, TabletOutlined } from '@ant-design/icons';
import { Card, Typography, Alert, Button, Select, Row, Col } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Link } from 'umi';
import axios from 'axios';

import PieChart from '../../components/Charts/PieChart';

const URL =
  process.env.NODE_ENV === 'development'
    ? process.env.AUDITME_DEV_BE_URL
    : process.env.AUDITME_PROD_BE_URL;

const Landing = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [data, setData] = useState({
    stats: [],
    count: 0,
  });

  const getStats = (query) => {
    axios
      .get(`${URL}/api/user/report-chart?filter=${query}`, {
        headers: { Authorization: localStorage.userToken },
      })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          setData({
            stats: res.data.stats,
            count: res.data.count,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        setData({
          stats: [],
          count: 0,
        });
      });
  };

  useEffect(() => {
    getStats('overall');
  }, []);

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
          Handle your audit reports with ease
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
      <Card>
        <Row justify="space-between">
          <Col>
            <Typography.Title level={3}>Report count</Typography.Title>
          </Col>
          <Col align="right">
            <Select
              defaultValue="overall"
              style={{ width: 120 }}
              align="left"
              onChange={(value) => getStats(value)}
            >
              <Select.Option value="Southern">Southern</Select.Option>
              <Select.Option value="CR-East">CR-East</Select.Option>
              <Select.Option value="CR-North">CR-North</Select.Option>
              <Select.Option value="CR-South">CR-South</Select.Option>
              <Select.Option value="ER-North">ER-North</Select.Option>
              <Select.Option value="ER-South">ER-South</Select.Option>
              <Select.Option value="WR-North">WR-North</Select.Option>
              <Select.Option value="WR-South">WR-South</Select.Option>
              <Select.Option value="overall">Overall</Select.Option>
            </Select>
          </Col>
        </Row>
        <PieChart stats={data.stats} total={data.count} />
      </Card>
    </PageHeaderWrapper>
  );
};

export default Landing;

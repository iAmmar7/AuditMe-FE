import React, { useEffect, useState } from 'react';
import {
  CheckCircleOutlined,
  StockOutlined,
  CloseCircleOutlined,
  PauseCircleOutlined,
} from '@ant-design/icons';
import { Card, Typography, Select, Row, Col, Spin, Statistic } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import moment from 'moment';
import axios from 'axios';

import RegionChart from '../../components/Charts/RegionChart';

const URL =
  process.env.NODE_ENV === 'development'
    ? process.env.AUDITME_DEV_BE_URL
    : process.env.AUDITME_PROD_BE_URL;

moment.locale('en');
const monthsList = [
  { value: 'allTime', text: 'All Time' },
  { value: moment().format('YYYY-MM-DD'), text: moment().format('MMMM Y') },
];
for (let i = 1; i <= 11; i += 1) {
  monthsList.push({
    value: moment().subtract(i, 'month').format('YYYY-MM-DD'),
    text: moment().subtract(i, 'month').format('MMMM Y'),
  });
}

const Landing = () => {
  const [data, setData] = useState({
    loading: true,
    regionStats: [],
    overallStats: [],
    count: 0,
  });

  const getStats = (query) => {
    axios
      .get(`${URL}/api/user/report-chart?month=${query}`, {
        headers: { Authorization: localStorage.userToken },
      })
      .then((res) => {
        if (res.data.success) {
          setData({
            loading: false,
            regionStats: res.data.regionStats,
            overallStats: res.data.overallStats,
            total: res.data.total,
          });
        } else {
          setData({
            ...data,
            loading: false,
          });
        }
      })
      .catch(() => {
        setData({
          loading: false,
          regionStats: [],
          overallStats: [],
          total: 0,
        });
      });
  };

  useEffect(() => {
    getStats('allTime');
  }, []);

  let statCards = null;
  if (!data.loading && data.overallStats.length > 0) {
    statCards = data.overallStats.map((item) => {
      let color;
      let icon;
      if (item.status === 'Pending') {
        color = '#f5222d';
        icon = <PauseCircleOutlined />;
      }
      if (item.status === 'Resolved') {
        color = '#a0d911';
        icon = <CheckCircleOutlined />;
      }
      if (item.status === 'Cancelled') {
        color = '#fa8c16';
        icon = <CloseCircleOutlined />;
      }
      return (
        <Col col={6} style={{ width: '150px' }} key={item.status}>
          <Card>
            <Statistic
              title={item.status}
              value={item.count}
              valueStyle={{ color }}
              prefix={icon}
            />
          </Card>
        </Col>
      );
    });
  }

  return (
    <PageHeaderWrapper content="Business Excellence - EDER (Early Detection Early Resolution)">
      <Card>
        <Row justify="space-between">
          <Col>
            <Typography.Title level={3}>Report Statistics</Typography.Title>
          </Col>
          <Col align="right">
            <Select
              defaultValue="allTime"
              style={{ width: 150 }}
              align="left"
              onChange={(value) => getStats(value)}
            >
              {monthsList.map((item) => (
                <Select.Option value={item.value} key={item.value}>
                  {item.text}
                </Select.Option>
              ))}
            </Select>
          </Col>
        </Row>
        {data.loading ? (
          <div style={{ textAlign: 'center', paddingTop: '30px', paddingBottom: '30px' }}>
            <Spin size="large" />
          </div>
        ) : (
          <>
            <RegionChart stats={data.regionStats} total={data.total} />
            <Row gutter={[8, 8]} justify="center" style={{ paddingTop: '30px' }}>
              <Col col={6} style={{ width: '150px' }}>
                <Card>
                  <Statistic
                    title="All"
                    value={data.total}
                    valueStyle={{ color: '#262626' }}
                    prefix={<StockOutlined />}
                  />
                </Card>
              </Col>
              {statCards}
            </Row>
          </>
        )}
      </Card>
    </PageHeaderWrapper>
  );
};

export default Landing;

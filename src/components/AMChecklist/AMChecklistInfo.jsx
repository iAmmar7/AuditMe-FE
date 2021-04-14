import React from 'react';
import { Card, Typography, Select, Row, Col, Spin, Statistic } from 'antd';
import {StockOutlined} from '@ant-design/icons';
import moment from 'moment';

import styles from './AMChecklist.less';

const URL =
  process.env.NODE_ENV === 'development'
    ? process.env.AUDITME_DEV_BE_URL
    : process.env.AUDITME_PROD_BE_URL;

function AMChecklistInfo({ data }) {
  
  let total = data?.length;
  let completed = 0;
  return (
    <>
    <Row gutter={[8, 8]} justify="center" style={{ paddingTop: '30px' }}>
      <Col col={5} style={{ minWidth: '150px' }}>
        <Card>
          {completed = 0, data?.slice(0,4).map((question)=>{
            if (question.status == "true") {
              completed += 1;
            }
          })}
          <Statistic
            title="Housekeeping - Exterior"
            value={completed/4 * 100 + "%"}
            valueStyle={{ color: '#262626' }}
            prefix={<StockOutlined />}
          />
        </Card>
      </Col>
      <Col col={5} style={{ minWidth: '150px' }}>
        <Card>
        {completed = 0, data?.slice(4, 13).map((question)=>{
          if (question.status == "true") {
            completed += 1;
          }
        })}
          <Statistic
            title="Housekeeping - Customer Lounge"
            value={completed/9 * 100 + "%"}
            valueStyle={{ color: '#262626' }}
            prefix={<StockOutlined />}
          />
        </Card>
      </Col>
      <Col col={5} style={{ minWidth: '150px' }}>
        <Card>
          {completed = 0, data?.slice(13,16).map((question)=>{
            if (question.status == "true") {
              completed += 1;
            }
          })}
          <Statistic
            title="Housekeeping - Comfort Room"
            value={completed/3 * 100 + "%"}
            valueStyle={{ color: '#262626' }}
            prefix={<StockOutlined />}
          />
        </Card>
      </Col>
      <Col col={4} style={{ minWidth: '150px' }}>
        <Card>
          {completed = 0, data?.slice(16,28).map((question)=>{
            if (question.status == "true") {
              completed += 1;
            }
          })}
          <Statistic
            title="Housekeeping - Bay Area"
            value={completed/12 * 100 + "%"}
            valueStyle={{ color: '#262626' }}
            prefix={<StockOutlined />}
          />
        </Card>
      </Col>
      <Col col={5} style={{ minWidth: '150px' }}>
        <Card>
          {completed = 0, data?.slice(28,32).map((question)=>{
            if (question.status == "true") {
              completed += 1;
            }
          })}
          <Statistic
            title="Housekeeping - Stock Room"
            value={completed/4 * 100 + "%"}
            valueStyle={{ color: '#262626' }}
            prefix={<StockOutlined />}
          />
        </Card>
      </Col>
    </Row>
    </>
  );
}

export default AMChecklistInfo;

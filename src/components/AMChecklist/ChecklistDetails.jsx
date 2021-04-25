import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { StockOutlined } from '@ant-design/icons';

function ChecklistDetails({ item }) {
  const data = {
    exterior: [item?.question1, item?.question2, item?.question3, item?.question4],
    customerLounge: [
      item?.question5,
      item?.question6,
      item?.question7,
      item?.question8,
      item?.question9,
      item?.question10,
      item?.question11,
      item?.question12,
      item?.question13,
    ],
    comfortArea: [item?.question14, item?.question15, item?.question16],
    bayArea: [
      item?.question17,
      item?.question18,
      item?.question19,
      item?.question20,
      item?.question21,
      item?.question22,
      item?.question23,
      item?.question24,
      item?.question25,
      item?.question26,
      item?.question27,
      item?.question28,
    ],
    stockRoom: [item?.question29, item?.question30, item?.question31, item?.question32],
  };

  return (
    <Card bodyStyle={{ paddingRight: 0, paddingLeft: 0 }}>
      <Row gutter={[8, 8]} justify="center">
        <Col col={4}>
          <Card bodyStyle={{ padding: 20 }}>
            <Statistic
              title="Exterior"
              value={`${(
                (data.exterior.reduce((acc, val) => (val?.answer ? acc + 1 : acc), 0) /
                  data.exterior.length) *
                100
              ).toFixed(2)}%`}
              prefix={<StockOutlined />}
            />
          </Card>
        </Col>
        <Col col={4}>
          <Card bodyStyle={{ padding: 20 }}>
            <Statistic
              title="Customer Lounge"
              value={`${(
                (data.customerLounge.reduce((acc, val) => (val?.answer ? acc + 1 : acc), 0) /
                  data.customerLounge.length) *
                100
              ).toFixed(2)}%`}
              prefix={<StockOutlined />}
            />
          </Card>
        </Col>
        <Col col={4}>
          <Card bodyStyle={{ padding: 20 }}>
            <Statistic
              title="Comfort Area"
              value={`${(
                (data.comfortArea.reduce((acc, val) => (val?.answer ? acc + 1 : acc), 0) /
                  data.comfortArea.length) *
                100
              ).toFixed(2)}%`}
              prefix={<StockOutlined />}
            />
          </Card>
        </Col>
        <Col col={4}>
          <Card bodyStyle={{ padding: 20 }}>
            <Statistic
              title="Bay Area"
              value={`${(
                (data.bayArea.reduce((acc, val) => (val?.answer ? acc + 1 : acc), 0) /
                  data.bayArea.length) *
                100
              ).toFixed(2)}%`}
              prefix={<StockOutlined />}
            />
          </Card>
        </Col>
        <Col col={4}>
          <Card bodyStyle={{ padding: 20 }}>
            <Statistic
              title="Stock Room"
              value={`${(
                (data.stockRoom.reduce((acc, val) => (val?.answer ? acc + 1 : acc), 0) /
                  data.stockRoom.length) *
                100
              ).toFixed(2)}%`}
              prefix={<StockOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </Card>
  );
}

export default ChecklistDetails;

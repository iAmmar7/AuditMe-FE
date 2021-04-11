import React from 'react';
import { Row, Col, Skeleton } from 'antd';

export default function TimelineSkeleton() {
  return (
    <>
      <Row justify="space-around" gutter={[8, 8]}>
        <Col span={6} xs={12} xl={6}>
          <Skeleton.Input style={{ width: '17vw' }} active size="large" />
          {[1, 2, 3, 4].map((item) => (
            <Skeleton key={item} paragraph={{ rows: 1, width: '17vw' }} active />
          ))}
        </Col>
        <Col span={6} xs={12} xl={6}>
          <Skeleton.Input style={{ width: '17vw' }} active size="large" />
          {[1, 2, 3, 4].map((item) => (
            <Skeleton key={item} paragraph={{ rows: 1, width: '17vw' }} active />
          ))}
        </Col>
        <Col span={6} xs={12} xl={6}>
          <Skeleton.Input style={{ width: '17vw' }} active size="large" />
          {[1, 2, 3, 4].map((item) => (
            <Skeleton key={item} paragraph={{ rows: 1, width: '17vw' }} active />
          ))}
        </Col>
        <Col span={6} xs={12} xl={6}>
          <Skeleton.Input style={{ width: '17vw' }} active size="large" />
          {[1, 2, 3, 4].map((item) => (
            <Skeleton key={item} paragraph={{ rows: 1, width: '17vw' }} active />
          ))}
        </Col>
      </Row>
    </>
  );
}

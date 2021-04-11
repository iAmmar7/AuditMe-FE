import React from 'react';
import { Row, Col, Skeleton, Space } from 'antd';

import styles from './AMChecklist.less';

export default function AMSkeleton() {
  return (
    <>
      <Row gutter={[16, 16]} justify="start" className={styles.mb_3}>
        <Col col={24}>
          <Skeleton.Input style={{ width: '68vw' }} active size="small" />
        </Col>
      </Row>
      <Row gutter={[16, 16]} justify="start" className={styles.mb_3}>
        <Col col={24}>
          <Skeleton.Input style={{ width: 200 }} active size="small" />
        </Col>
      </Row>
      <Row gutter={[16, 16]} justify="start" className={styles.mb_3}>
        <Col col={24}>
          <Skeleton.Input style={{ width: 200 }} active size="small" />
        </Col>
      </Row>
      <Row gutter={[16, 16]} justify="start" className={styles.mb_3}>
        <Col col={12}>
          <Skeleton.Input style={{ width: 200 }} active size="small" />
        </Col>
        <Col col={12}>
          <Skeleton.Input style={{ width: 200 }} active size="small" />
        </Col>
      </Row>
      <Row gutter={[16, 16]} justify="start" className={styles.mb_3}>
        <Col col={24}>
          <Skeleton.Input style={{ width: 200 }} active size="small" />
        </Col>
      </Row>
      <Row gutter={[16, 16]} justify="start" className={styles.mb_3}>
        <Col col={24}>
          <Skeleton.Input style={{ width: '68vw' }} active size="small" />
        </Col>
      </Row>
      <Row gutter={[16, 16]} justify="start" className={styles.mb_3}>
        <Col col={24}>
          <Skeleton.Input style={{ width: '68vw' }} active size="small" />
        </Col>
      </Row>
      <Row gutter={[16, 16]} justify="start" className={styles.mb_3}>
        <Col col={24}>
          <Skeleton.Input style={{ width: '68vw' }} active size="small" />
        </Col>
      </Row>
      <Row gutter={[16, 16]} justify="start" className={styles.mb_3}>
        <Col col={24}>
          <Skeleton.Input style={{ width: '68vw' }} active size="small" />
        </Col>
      </Row>
      <Row gutter={[16, 16]} justify="start" className={styles.mb_3}>
        <Col col={24}>
          <Skeleton.Input style={{ width: '68vw' }} active size="small" />
        </Col>
      </Row>
      <Space>
        <Skeleton.Button active size="large" shape="default" />
        <Skeleton.Button active size="large" shape="default" />
      </Space>
    </>
  );
}

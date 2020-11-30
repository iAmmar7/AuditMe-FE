import React from 'react';
import { Row, Col, Typography, Tag, Image } from 'antd';
import moment from 'moment';

import styles from './Priorities.less';

const URL =
  process.env.NODE_ENV === 'development'
    ? process.env.AUDITME_DEV_BE_URL
    : process.env.AUDITME_PROD_BE_URL;

function IssueDetail({ item }) {
  return (
    <>
      <Row style={{ marginTop: '15px' }}>
        <Col col={8} style={{ marginRight: '15px' }}>
          Date:{' '}
          <Typography.Text strong>{moment(item.date).format('Do MMMM, YYYY')}</Typography.Text>
        </Col>
        <Col col={8} style={{ marginRight: '15px' }}>
          Week: <Typography.Text strong>{item.week ? item.week : 'N/A'}</Typography.Text>
        </Col>
        <Col col={8}>
          Region: <Typography.Text strong>{item.region ? item.region : 'N/A'}</Typography.Text>
        </Col>
      </Row>
      <Row style={{ marginTop: '15px' }}>
        <Col col={8} style={{ marginRight: '15px' }}>
          Area Manager:{' '}
          <Typography.Text strong>{item.areaManager ? item.areaManager : 'N/A'}</Typography.Text>
        </Col>
        <Col col={8} style={{ marginRight: '15px' }}>
          Regional Manager:{' '}
          <Typography.Text strong>
            {item.regionalManager ? item.regionalManager : 'N/A'}
          </Typography.Text>
        </Col>
        <Col col={8}>
          Process Specialist:{' '}
          <Typography.Text strong>
            {item.processSpecialist ? item.processSpecialist : 'N/A'}
          </Typography.Text>
        </Col>
      </Row>
      <Row style={{ marginTop: '15px' }}>
        <Col col={24}>
          Issue Details:{' '}
          <Typography.Text strong>{item.issueDetails ? item.issueDetails : 'N/A'}</Typography.Text>
        </Col>
      </Row>
      <Row style={{ marginTop: '15px' }}>
        <Col col={12} style={{ marginRight: '15px' }}>
          Date Identified:{' '}
          <Typography.Text strong>
            {moment(item.dateIdentified).format('Do MMMM, YYYY')}
          </Typography.Text>
        </Col>
        <Col col={12}>
          Station/BE#:{' '}
          <Typography.Text strong>
            {item.stationNumber ? item.stationNumber : 'N/A'}
          </Typography.Text>
        </Col>
      </Row>

      {/* Images Container */}
      <Row style={{ marginTop: '15px' }}>
        {/* Evidences Before */}
        <Col span={12}>
          <Row style={{ marginBottom: '5px' }}>
            <Col>Evidences Before: </Col>
          </Row>
          <Row gutter={[2, 2]}>
            {item.evidencesBefore.length > 0 ? (
              item.evidencesBefore.map((image) => (
                <Col key={image} span={12} className={styles.issue_image_container}>
                  <Image src={URL + image} width="90%" className={styles.issue_image} />
                </Col>
              ))
            ) : (
              <Col span={24}>
                <Typography.Text strong>No image available</Typography.Text>
              </Col>
            )}
          </Row>
        </Col>
        {/* Evidences After */}
        <Col span={12}>
          <Row style={{ marginBottom: '5px' }}>
            <Col>Evidences After: </Col>
          </Row>
          <Row gutter={[2, 2]} className={styles.issue_image_row}>
            {item.evidencesAfter.length > 0 ? (
              item.evidencesAfter.map((image) => (
                <Col key={image} span={12} className={styles.issue_image_container}>
                  <Image src={URL + image} width="90%" className={styles.issue_image} />
                </Col>
              ))
            ) : (
              <Col span={24}>
                <Typography.Text strong>No image available</Typography.Text>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
      <Row style={{ marginTop: '15px' }}>
        <Col col={24}>
          Action Taken:{' '}
          <Typography.Text strong>{item.actionTaken ? item.actionTaken : 'N/A'}</Typography.Text>
        </Col>
      </Row>
      <Row style={{ marginTop: '15px' }}>
        <Col col={24}>
          Feedback from Sales Operation:{' '}
          <Typography.Text strong>{item.feedback ? item.feedback : 'N/A'}</Typography.Text>
        </Col>
      </Row>
      <Row style={{ marginTop: '15px' }}>
        <Col col={8} style={{ marginRight: '15px' }}>
          Days Open:{' '}
          <Typography.Text strong>{item.daysOpen ? item.daysOpen : 'N/A'}</Typography.Text>
        </Col>
        <Col col={8}>
          Date of Closure:{' '}
          <Typography.Text strong>
            {item.dateOfClosure ? moment(item.dateOfClosure).format('Do MMMM, YYYY') : 'N/A'}
          </Typography.Text>
        </Col>
      </Row>
    </>
  );
}

export default IssueDetail;

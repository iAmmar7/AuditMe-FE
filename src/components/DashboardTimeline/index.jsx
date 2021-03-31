import React from 'react';
import { Card, Row, Col, Typography, Tag } from 'antd';
import moment from 'moment';

import styles from './DashboardTimeline.less';

moment.locale('en');

const closed_head_styles = {
  backgroundColor: '#f6ffed',
};

const open_head_styles = {
  backgroundColor: '#FFF8EA',
};

const body_styles = {
  padding: '8px',
  backgroundColor: '#fcfcfc',
};

const DashboardTimeline = ({ data }) => {
  return (
    <Row className={styles.main_board}>
      <Col span={6} sm={24} className={styles.tasks_column_container}>
        <Card title="Open Observations" headStyle={open_head_styles} bodyStyle={body_styles}>
          {(data?.openObservations || []).map((item) => (
            <Card className={styles.task_card_style} key={item.id}>
              <Col>
                Date:{' '}
                <Typography.Text strong>{moment(item.date).format('DD MMM, YYYY')}</Typography.Text>
              </Col>
              <Col>
                Region:{' '}
                <Tag>
                  <Typography.Text strong>{item.region}</Typography.Text>
                </Tag>
              </Col>
              <Col>
                Type:{' '}
                <Tag>
                  <Typography.Text strong>{item.status}</Typography.Text>
                </Tag>
              </Col>
              <Col>
                Issue Details: <Typography.Text strong>{item.issueDetails}</Typography.Text>
              </Col>
            </Card>
          ))}
        </Card>
      </Col>
      <Col span={6} sm={24} className={styles.tasks_column_container}>
        <Card
          title="Closed Observations (Last 30 Days)"
          headStyle={closed_head_styles}
          bodyStyle={body_styles}
        >
          {(data?.closedObservations || []).map((item) => (
            <Card className={styles.task_card_style} key={item.id}>
              <Col>
                Date:{' '}
                <Typography.Text strong>{moment(item.date).format('DD MMM, YYYY')}</Typography.Text>
              </Col>
              <Col>
                Region:{' '}
                <Tag>
                  <Typography.Text strong>{item.region}</Typography.Text>
                </Tag>
              </Col>
              <Col>
                Type:{' '}
                <Tag>
                  <Typography.Text strong>{item.status}</Typography.Text>
                </Tag>
              </Col>
              <Col>
                Issue Details: <Typography.Text strong>{item.issueDetails}</Typography.Text>
              </Col>
            </Card>
          ))}
        </Card>
      </Col>
      <Col span={6} sm={24} className={styles.tasks_column_container}>
        <Card title="Open Issues" headStyle={open_head_styles} bodyStyle={body_styles}>
          {(data?.openIssues || []).map((item) => (
            <Card className={styles.task_card_style} key={item.id}>
              <Col>
                Date:{' '}
                <Typography.Text strong>{moment(item.date).format('DD MMM, YYYY')}</Typography.Text>
              </Col>
              <Col>
                Region:{' '}
                <Tag>
                  <Typography.Text strong>{item.region}</Typography.Text>
                </Tag>
              </Col>
              <Col>
                Type:{' '}
                <Tag>
                  <Typography.Text strong>{item.status}</Typography.Text>
                </Tag>
              </Col>

              <Col>
                Issue Details: <Typography.Text strong>{item.issueDetails}</Typography.Text>
              </Col>
            </Card>
          ))}
        </Card>
      </Col>
      <Col span={6} sm={24} className={styles.tasks_column_container}>
        <Card
          title="Closed Issues (Last 30 Days)"
          headStyle={closed_head_styles}
          bodyStyle={body_styles}
        >
          {(data?.closedIssues || []).map((item) => (
            <Card className={styles.task_card_style} key={item.id}>
              <Col>
                Date:{' '}
                <Typography.Text strong>{moment(item.date).format('DD MMM, YYYY')}</Typography.Text>
              </Col>
              <Col>
                Region:{' '}
                <Tag>
                  <Typography.Text strong>{item.region}</Typography.Text>
                </Tag>
              </Col>
              <Col>
                Type:{' '}
                <Tag>
                  <Typography.Text strong>{item.status}</Typography.Text>
                </Tag>
              </Col>
              <Col>
                Issue Details: <Typography.Text strong>{item.issueDetails}</Typography.Text>
              </Col>
            </Card>
          ))}
        </Card>
      </Col>
    </Row>
  );
};

export default DashboardTimeline;

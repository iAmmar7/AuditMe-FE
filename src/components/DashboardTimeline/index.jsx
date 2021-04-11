/* eslint-disable prefer-template */
import React from 'react';
import { Card, Row, Col, Typography, Tag, Tooltip } from 'antd';
import moment from 'moment';

import TimelineSkeleton from './Timeline.Skeleton';
import styles from './Timeline.less';

const { Title, Text, Paragraph } = Typography;

moment.locale('en');

const open_head_styles = {
  backgroundColor: '#FFF8EA',
};

const body_styles = {
  backgroundColor: '#fcfcfc',
  padding: '0',
};

const detail_card_styles = {
  minHeight: 145,
  paddingBottom: 0,
};

export default ({ loading, data }) => {
  if (loading) return <TimelineSkeleton />;

  const detailsCard = (item) => (
    <Card key={item.id} bodyStyle={detail_card_styles} className={styles.task_card_style}>
      <Row>
        <Col col={24}>
          <Title level={5} strong>
            {item.id}
          </Title>
        </Col>
      </Row>
      <Row gutter={[4, 4]}>
        <Col col={12}>
          <Tag strong>
            <Text strong>{moment(item.date).format('DD MMM, YYYY')}</Text>
          </Tag>
        </Col>
        <Col col={12}>
          <Tag>
            <Text strong>{item.region}</Text>
          </Tag>
        </Col>
      </Row>
      <Col col={24}>
        <Paragraph
          className={styles.ellipsis}
          ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}
        >
          {item.issueDetails}
        </Paragraph>
      </Col>
    </Card>
  );

  return (
    <Row justify="space-around" gutter={[8, 8]}>
      <Col span={6} xs={24} md={12} xl={6}>
        <Card
          title={
            <Tooltip placement="top" title="All Open Observations">
              <Title level={5}>Open Observations ({data?.openObservations?.length || 0})</Title>
            </Tooltip>
          }
          headStyle={open_head_styles}
          bodyStyle={body_styles}
        >
          {(data?.openObservations || []).map((item) => detailsCard(item))}
        </Card>
      </Col>
      <Col span={6} sm={24} md={12} xl={6}>
        <Card
          title={
            <Tooltip placement="top" title="Closed in last 30 days">
              <Title level={5}>Closed Observations ({data?.closedObservations?.length || 0})</Title>
            </Tooltip>
          }
          headStyle={open_head_styles}
          bodyStyle={body_styles}
        >
          {(data?.closedObservations || []).map((item) => detailsCard(item))}
        </Card>
      </Col>
      <Col span={6} sm={24} md={12} xl={6}>
        <Card
          title={
            <Tooltip placement="top" title="All Open Priorities">
              <Title level={5}>Open Priorities ({data?.openIssues?.length || 0})</Title>
            </Tooltip>
          }
          headStyle={open_head_styles}
          bodyStyle={body_styles}
        >
          {(data?.openIssues || []).map((item) => detailsCard(item))}
        </Card>
      </Col>
      <Col span={6} sm={24} md={12} xl={6}>
        <Card
          title={
            <Tooltip placement="top" title="Closed in last 30 days">
              <Title level={5}>Closed Priorities ({data?.closedIssues?.length || 0})</Title>
            </Tooltip>
          }
          headStyle={open_head_styles}
          bodyStyle={body_styles}
        >
          {(data?.closedIssues || []).map((item) => detailsCard(item))}
        </Card>
      </Col>
    </Row>
  );
};

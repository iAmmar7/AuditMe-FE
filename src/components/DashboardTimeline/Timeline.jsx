/* eslint-disable no-plusplus */
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

const Timeline = ({ loading, data }) => {
  const timeRemaining = (createdDate) => {
    // Date after 3 days - skip weekends, friday and saturday
    let add = 3;
    let i = 1;
    let date = moment(createdDate).utcOffset(0);
    let weekendEncounter = false;
    while (i <= 3) {
      if (date.isoWeekday() === 5 || date.isoWeekday() === 6) {
        add++;
        weekendEncounter = true;
      }
      date = date.add(1, 'days');
      ++i;
    }
    add = weekendEncounter ? add : add + 1;
    const dateToCheck = moment(createdDate).utcOffset(0).add(add, 'days').startOf('day');
    const currentDate = moment().utcOffset(0);
    const difference = dateToCheck.diff(currentDate, 'days');

    return difference - 1;
  };

  const timeElapsed = (createdDate) => {
    const date = moment(createdDate).utcOffset(0);
    const currentDate = moment().utcOffset(0);

    const difference = currentDate.diff(date, 'days');

    return difference;
  };

  if (loading) return <TimelineSkeleton />;

  const detailsCard = (item) => (
    <Card key={item.id} bodyStyle={detail_card_styles} className={styles.task_card_style}>
      <Row gutter={[4, 4]}>
        <Col col={24}>
          <Title level={5} strong>
            {item.id}
          </Title>
        </Col>
      </Row>
      <Row gutter={[4, 4]}>
        <Col col={12}>
          <Tag>
            <Text strong>{moment(item.date).format('DD MMM, YYYY')}</Text>
          </Tag>
        </Col>
        <Col col={12}>
          <Tag>
            <Text strong>{item.region}</Text>
          </Tag>
        </Col>
      </Row>
      <Row gutter={[4, 4]}>
        <Col col={24}>
          <Text>
            Raised by: <Text strong>{item.userName}</Text>
          </Text>
        </Col>
      </Row>
      {item.status === 'Pending' && !item.isPrioritized && (
        <Row gutter={[4, 4]}>
          <Col col={24}>
            <Text>
              Days Remaining:{' '}
              <Text strong type="danger">
                {timeRemaining(item.createdAt)}
              </Text>
            </Text>
          </Col>
        </Row>
      )}
      {item.status === 'Pending' && item.isPrioritized && (
        <Row gutter={[4, 4]}>
          <Col col={24}>
            <Text>
              Days Elapsed:{' '}
              <Text strong type="danger">
                {timeElapsed(item.createdAt)}
              </Text>
            </Text>
          </Col>
        </Row>
      )}
      {item.status !== 'Pending' && (
        <Row gutter={[4, 4]}>
          <Col col={24}>
            <Text>
              Closed by: <Text strong>{item.resolvedByName}</Text>
            </Text>
          </Col>
        </Row>
      )}
      <Row gutter={[4, 4]} style={{ marginTop: 10 }}>
        <Col col={24}>
          <Paragraph
            className={styles.ellipsis}
            ellipsis={{ rows: 2, expandable: item.issueDetails.length > 20, symbol: 'more' }}
          >
            {item.issueDetails}
          </Paragraph>
        </Col>
      </Row>
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

export default Timeline;

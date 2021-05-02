import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {
  FormOutlined,
  TabletOutlined,
  FolderViewOutlined,
  // ContactsOutlined,
} from '@ant-design/icons';
import { Card, Row, Col, Typography } from 'antd';
import { Link } from 'umi';

import styles from './Home.less';

const open_head_styles = {
  backgroundColor: '#FFF8EA',
};

const body_styles = {
  backgroundColor: '#fcfcfc',
  padding: '0',
};

const nav_card_body = {
  paddingTop: 14,
  paddingBottom: 14,
};

export default () => {
  return (
    <PageHeaderWrapper>
      <Card>
        <Row gutter={[8, 8]} justify="center">
          <Col xs={24} sm={12} md={12} lg={12} xl={6}>
            <Card
              title={
                <div className={styles.card_header}>
                  <FormOutlined />
                  <Typography.Title level={5}>EDER</Typography.Title>
                </div>
              }
              headStyle={open_head_styles}
              bodyStyle={body_styles}
            >
              {[
                { key: 1, link: '/eder/dashboard', title: 'Dashboard' },
                { key: 2, link: '/eder/timeline', title: 'Timeline' },
                { key: 3, link: '/eder/priorities-form', title: 'Priority Issues' },
                { key: 4, link: '/eder/initiative-form', title: 'Initiatives' },
                { key: 5, link: '/eder/observation-form', title: 'Observation' },
              ].map((item) => (
                <Link key={item.key} to={item.link}>
                  <Card bodyStyle={nav_card_body} hoverable>
                    {item.title}
                  </Card>
                </Link>
              ))}
            </Card>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={6}>
            <Card
              title={
                <div className={styles.card_header}>
                  <TabletOutlined />
                  <Typography.Title level={5}>Reports</Typography.Title>
                </div>
              }
              headStyle={open_head_styles}
              bodyStyle={body_styles}
            >
              {[
                { key: 1, link: '/reports/initiative-reports', title: 'Initiatives' },
                { key: 2, link: '/reports/am-checklist', title: 'Housekeeping Checklist' },
                { key: 3, link: '/reports/priorities-reports', title: 'Priority Issues' },
                { key: 4, link: '/reports/observation-reports', title: 'Observations' },
                { key: 5, link: '/reports/feedback-reports', title: 'Feedback' },
              ].map((item) => (
                <Link key={item.key} to={item.link}>
                  <Card bodyStyle={nav_card_body} hoverable>
                    {item.title}
                  </Card>
                </Link>
              ))}
            </Card>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={6}>
            <Card
              title={
                <div className={styles.card_header}>
                  <FolderViewOutlined />
                  <Typography.Title level={5}>Station Visit</Typography.Title>
                </div>
              }
              headStyle={open_head_styles}
              bodyStyle={body_styles}
            >
              <Link to="/station-visit/checklist">
                <Card bodyStyle={nav_card_body} hoverable>
                  Housekeeping Checklist
                </Card>
              </Link>
            </Card>
          </Col>

          {/* <Col xs={24} sm={12} md={12} lg={12} xl={6}>
            <Card
              title={
                <div className={styles.card_header}>
                  <ContactsOutlined />
                  <Typography.Title level={5}>Employee Feedback</Typography.Title>
                </div>
              }
              headStyle={open_head_styles}
              bodyStyle={body_styles}
            >
              <Link to="/employee-feedback/submission">
                <Card bodyStyle={nav_card_body} hoverable>
                  Feedback Submission
                </Card>
              </Link>
            </Card>
          </Col> */}
        </Row>
      </Card>
    </PageHeaderWrapper>
  );
};

import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {
  FormOutlined,
  TabletOutlined,
  FolderViewOutlined,
  ContactsOutlined,
} from '@ant-design/icons';
import { Card, Row, Col, Menu } from 'antd';
import { Link } from 'umi';

const { SubMenu } = Menu;

export default () => {
  return (
    <PageHeaderWrapper content="Home of Petromin Express">
      <Card>
        <Row gutter={[8, 8]}>
          <Col xs={24} sm={12} md={12} lg={12} xl={6}>
            <Menu theme="light" defaultOpenKeys={['sub1']} mode="inline">
              <SubMenu key="sub1" icon={<FormOutlined />} title="EDER">
                {[
                  { key: 1, link: '/eder/dashboard', title: 'Dashboard' },
                  { key: 2, link: '/eder/timeline', title: 'Timeline' },
                  { key: 3, link: '/eder/priorities-form', title: 'Priority Issues' },
                  { key: 4, link: '/eder/initiative-form', title: 'Initiatives' },
                  { key: 5, link: '/eder/observation-form', title: 'Observation' },
                ].map((item) => (
                  <>
                    <Menu.Item key={item.key}>
                      <Link to={item.link}>{item.title}</Link>
                    </Menu.Item>
                    <Menu.Divider />
                  </>
                ))}
              </SubMenu>
            </Menu>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={6}>
            <Menu theme="light" defaultOpenKeys={['sub2']} mode="inline">
              <SubMenu key="sub2" icon={<TabletOutlined />} title="Reports">
                {[
                  { key: 1, link: '/reports/initiative-reports', title: 'Initiatives' },
                  { key: 2, link: '/reports/am-checklist', title: 'Housekeeping Checklist' },
                  { key: 3, link: '/reports/priorities-reports', title: 'Priority Issues' },
                  { key: 4, link: '/reports/observation-reports', title: 'Observations' },
                  { key: 5, link: '/reports/feedback-reports', title: 'Feedback' },
                ].map((item) => (
                  <>
                    <Menu.Item key={item.key}>
                      <Link to={item.link}>{item.title}</Link>
                    </Menu.Item>
                    <Menu.Divider />
                  </>
                ))}
              </SubMenu>
            </Menu>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={6}>
            <Menu theme="light" defaultOpenKeys={['sub3']} mode="inline">
              <SubMenu key="sub3" icon={<FolderViewOutlined />} title="Station Visit">
                <Menu.Item key="1">
                  <Link to="/station-visit/checklist">Housekeeping Checklist</Link>
                </Menu.Item>
                <Menu.Divider />
              </SubMenu>
            </Menu>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={6}>
            <Menu theme="light" defaultOpenKeys={['sub4']} mode="inline">
              <SubMenu key="sub4" icon={<ContactsOutlined />} title="Employee Feedback">
                <Menu.Item key="1">
                  <Link to="/employee-feedback/submission">Feedback Submission</Link>
                </Menu.Item>
                <Menu.Divider />
              </SubMenu>
            </Menu>
          </Col>
        </Row>
      </Card>
    </PageHeaderWrapper>
  );
};

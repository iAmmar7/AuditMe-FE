/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import {
  Card,
  Row,
  Col,
  Typography,
  Switch,
  Divider,
  Button,
  Tooltip,
  Spin,
  Popconfirm,
  message,
} from 'antd';
import axios from 'axios';

import IssueDetail from './IssueDetail';
import IssueForm from './IssueForm';

const URL =
  process.env.NODE_ENV === 'development'
    ? process.env.AUDITME_DEV_BE_URL
    : process.env.AUDITME_PROD_BE_URL;

function PriorityDetails({ item, tableRef }) {
  const [formDisabled, setFormDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const deleteIssue = () => {
    setLoading(true);
    axios
      .delete(`${URL}/api/user/delete-issue/${item._id}`, {
        headers: {
          Authorization: localStorage.userToken,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setLoading(false);
          message.success('Issue deleted successfully');
          tableRef.current.reload();
        }
      })
      .catch(() => {
        message.error('Unable to delete the issue');
        setLoading(false);
      });
  };

  let editButton = null;

  // If issue has resolved
  if (item.status === 'Resolved') {
    if (JSON.parse(localStorage.user).id.toString() === item.resolvedById.toString()) {
      editButton = (
        <Row justify="center" align="end">
          <Col offset={1} style={{ paddingTop: '2px', marginRight: '4px' }}>
            <Typography.Text>Update Response </Typography.Text>
          </Col>
          <Col>
            <Switch
              checkedChildren="Off"
              unCheckedChildren="On"
              checked={!formDisabled}
              onClick={() => {
                setFormDisabled(!formDisabled);
              }}
            />
          </Col>
        </Row>
      );
    } else {
      editButton = (
        <Row justify="center" align="end">
          <Col offset={1} style={{ paddingTop: '2px', marginRight: '4px' }}>
            <Typography.Text>Update Response </Typography.Text>
          </Col>
          <Col>
            <Tooltip title={`Only ${item.resolvedByName} can update this issue now`}>
              <Switch checkedChildren="Off" unCheckedChildren="On" checked={false} disabled />
            </Tooltip>
          </Col>
        </Row>
      );
    }
  }

  // if issue is pending
  if (item.status === 'Pending') {
    if (JSON.parse(localStorage.user).role === 'rm') {
      editButton = (
        <Row justify="center" align="end">
          <Col offset={1} style={{ paddingTop: '2px', marginRight: '4px' }}>
            <Typography.Text>Update Status </Typography.Text>
          </Col>
          <Col>
            <Switch
              checkedChildren="Off"
              unCheckedChildren="On"
              checked={!formDisabled}
              onClick={() => setFormDisabled(!formDisabled)}
            />
          </Col>
        </Row>
      );
    } else if (JSON.parse(localStorage.user).role === 'am' && !item?.isPrioritized) {
      editButton = (
        <Row justify="center" align="end">
          <Col offset={1} style={{ paddingTop: '2px', marginRight: '4px' }}>
            <Typography.Text>Update Status </Typography.Text>
          </Col>
          <Col>
            <Switch
              checkedChildren="Off"
              unCheckedChildren="On"
              checked={!formDisabled}
              onClick={() => setFormDisabled(!formDisabled)}
            />
          </Col>
        </Row>
      );
    } else if (JSON.parse(localStorage.user).role === 'am' && item?.isPrioritized) {
      editButton = (
        <Row justify="center" align="end">
          <Col offset={1} style={{ paddingTop: '2px', marginRight: '4px' }}>
            <Typography.Text>Update Status </Typography.Text>
          </Col>
          <Col>
            <Tooltip title="Area managers can not update priority issues">
              <Switch checkedChildren="Off" unCheckedChildren="On" checked={false} disabled />
            </Tooltip>
          </Col>
        </Row>
      );
    } else if (item.userId.toString() === JSON.parse(localStorage.user).id.toString()) {
      editButton = (
        <Row justify="center" align="end">
          <Col offset={1} style={{ paddingTop: '2px', marginRight: '4px' }}>
            <Typography.Text>Edit issue </Typography.Text>
          </Col>
          <Col>
            <Switch
              checkedChildren="Off"
              unCheckedChildren="On"
              checked={!formDisabled}
              onClick={() => setFormDisabled(!formDisabled)}
            />
          </Col>
        </Row>
      );
    } else {
      editButton = (
        <Row justify="center" align="end">
          <Col offset={1} style={{ paddingTop: '2px', marginRight: '4px' }}>
            <Typography.Text>Edit issue </Typography.Text>
          </Col>
          <Col>
            <Tooltip title={`Only ${item.userName} can edit this issue`}>
              <Switch checkedChildren="Off" unCheckedChildren="On" checked={false} disabled />
            </Tooltip>
          </Col>
        </Row>
      );
    }
  }

  // if issue is maitenance
  if (item.status === 'Maintenance') {
    if (JSON.parse(localStorage.user).role === 'rm') {
      editButton = (
        <Row justify="center" align="end">
          <Col offset={1} style={{ paddingTop: '2px', marginRight: '4px' }}>
            <Typography.Text>Update Status </Typography.Text>
          </Col>
          <Col>
            <Switch
              checkedChildren="Off"
              unCheckedChildren="On"
              checked={!formDisabled}
              onClick={() => setFormDisabled(!formDisabled)}
            />
          </Col>
        </Row>
      );
    } else if (JSON.parse(localStorage.user).role === 'am' && !item?.isPrioritized) {
      editButton = (
        <Row justify="center" align="end">
          <Col offset={1} style={{ paddingTop: '2px', marginRight: '4px' }}>
            <Typography.Text>Update Status </Typography.Text>
          </Col>
          <Col>
            <Switch
              checkedChildren="Off"
              unCheckedChildren="On"
              checked={!formDisabled}
              onClick={() => setFormDisabled(!formDisabled)}
            />
          </Col>
        </Row>
      );
    } else {
      editButton = (
        <Row justify="center" align="end">
          <Col offset={1} style={{ paddingTop: '2px', marginRight: '4px' }}>
            <Typography.Text>Update issue </Typography.Text>
          </Col>
          <Col>
            <Tooltip title={`Only ${item.resolvedByName} can update this issue now`}>
              <Switch checkedChildren="Off" unCheckedChildren="On" checked={false} disabled />
            </Tooltip>
          </Col>
        </Row>
      );
    }
  }

  // For viewer account
  if (JSON.parse(localStorage.user).role === 'viewer') {
    editButton = (
      <Row justify="center" align="end">
        <Col offset={1} style={{ paddingTop: '2px', marginRight: '4px' }}>
          <Typography.Text>Edit status </Typography.Text>
        </Col>
        <Col>
          <Tooltip title="A viewer can not edit issues">
            <Switch checkedChildren="Off" unCheckedChildren="On" checked={false} disabled />
          </Tooltip>
        </Col>
      </Row>
    );
  }

  let content = formDisabled ? (
    <IssueDetail item={item} />
  ) : (
    <IssueForm item={item} tableRef={tableRef} setFormDisabled={setFormDisabled} />
  );

  if (loading)
    content = (
      <div style={{ textAlign: 'center', paddingTop: '20px', paddingBottom: '20px' }}>
        <Spin />
      </div>
    );

  return (
    <Card>
      <Row justify="center">
        <Col span={12}>
          {JSON.parse(localStorage.user).isAdmin ? (
            <Row>
              <Popconfirm
                title="Are you sure to delete this?"
                onConfirm={deleteIssue}
                okText="Yes"
                cancelText="No"
              >
                <Button danger icon={<DeleteOutlined />}>
                  Delete
                </Button>
              </Popconfirm>
            </Row>
          ) : null}
          {item?.status === 'Resolved' && item?.resolvedByName && (
            <Row style={{ marginTop: '6px' }}>
              <Col span={24}>
                <Typography.Text>
                  Issue is resolved by:{' '}
                  <Typography.Text type="warning" strong>
                    {item.resolvedByName}
                  </Typography.Text>
                </Typography.Text>
              </Col>
            </Row>
          )}
        </Col>
        <Col span={12}>{editButton}</Col>
      </Row>
      <Divider />
      {content}
    </Card>
  );
}

export default PriorityDetails;

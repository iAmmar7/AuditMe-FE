import React, { useState } from 'react';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import {
  Card,
  Row,
  Col,
  Typography,
  Switch,
  Divider,
  Button,
  Modal,
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

  const cancelIssue = () => {
    setLoading(true);
    axios
      .get(`${URL}/api/auditor/cancel-issue/${item._id}`, {
        headers: {
          Authorization: localStorage.userToken,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setLoading(false);
          tableRef.current.reload();
        }
      })
      .catch((error) => {
        message.error('Unable to cancel the issue');
        setLoading(false);
      });
  };

  const deleteItem = () => {
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

  const openModal = (type = 'cancel') => {
    Modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      maskClosable: true,
      content:
        type === 'uncancel' ? (
          <Typography.Text>Are you sure you want to uncancel this issue?</Typography.Text>
        ) : (
          <Typography.Text>Are you sure you want to permanently cancel this issue?</Typography.Text>
        ),
      okText: 'Yes',
      cancelText: 'No',
      onOk: cancelIssue,
    });
  };

  let cancelButton = null;
  let editButton = null;

  // If issue has resolved
  if (item.status === 'Resolved') {
    cancelButton = (
      <Typography.Text>
        Resolved by:{' '}
        <Typography.Text type="warning" strong>
          {item.resolvedByName}
        </Typography.Text>
      </Typography.Text>
    );

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
              onClick={() => setFormDisabled(!formDisabled)}
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
      cancelButton = (
        <Tooltip
          title={`Regional Mangers can not cancel the issue, please ask auditor ${item.userName} to cancel this issue`}
        >
          <Button danger icon={<DeleteOutlined />} disabled>
            Cancel issue
          </Button>
        </Tooltip>
      );
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
    } else if (item.userId.toString() === JSON.parse(localStorage.user).id.toString()) {
      cancelButton = (
        <Button danger icon={<DeleteOutlined />} onClick={openModal}>
          Cancel issue
        </Button>
      );
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
      cancelButton = (
        <Tooltip title={`Only ${item.userName} can cancel this issue`}>
          <Button danger icon={<DeleteOutlined />} disabled>
            Cancel issue
          </Button>
        </Tooltip>
      );
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

  // if issue is cancelled
  if (item.status === 'Cancelled') {
    if (JSON.parse(localStorage.user).role === 'rm') {
      cancelButton = (
        <Tooltip
          title={`Regional Mangers can not uncancel the issue, please ask auditor ${item.userName} to uncancel this issue`}
        >
          <Button danger icon={<DeleteOutlined />} disabled>
            Uncancel issue
          </Button>
        </Tooltip>
      );
      editButton = (
        <Row justify="center" align="end">
          <Col offset={1} style={{ paddingTop: '2px', marginRight: '4px' }}>
            <Typography.Text>Update status </Typography.Text>
          </Col>
          <Col>
            <Tooltip title="A regional manager can not update cancelled issue">
              <Switch checkedChildren="Off" unCheckedChildren="On" checked={false} disabled />
            </Tooltip>
          </Col>
        </Row>
      );
    } else if (JSON.parse(localStorage.user).id.toString() === item.userId.toString()) {
      cancelButton = (
        <Button danger icon={<DeleteOutlined />} onClick={() => openModal('uncancel')}>
          Uncancel issue
        </Button>
      );
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
      cancelButton = (
        <Tooltip title={`Only ${item.userName} can uncancel this issue`}>
          <Button danger icon={<DeleteOutlined />} disabled>
            Uncancel issue
          </Button>
        </Tooltip>
      );
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
        {/* <Col span={12}>{cancelButton}</Col> */}
        <Col span={12}>
          {JSON.parse(localStorage.user).isAdmin ? (
            <Popconfirm
              title="Are you sure to delete this?"
              onConfirm={deleteItem}
              // onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button danger icon={<DeleteOutlined />}>
                Delete
              </Button>
            </Popconfirm>
          ) : null}
        </Col>
        <Col span={12}>{editButton}</Col>
      </Row>
      <Divider />
      {content}
    </Card>
  );
}

export default PriorityDetails;

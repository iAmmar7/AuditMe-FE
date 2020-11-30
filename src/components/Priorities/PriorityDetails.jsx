import React, { useState } from 'react';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Card, Row, Col, Typography, Switch, Divider, Button, Modal, Tooltip, message } from 'antd';
import axios from 'axios';

import IssueDetail from './IssueDetail';
import IssueForm from './IssueForm';

const URL =
  process.env.NODE_ENV === 'development'
    ? process.env.AUDITME_DEV_BE_URL
    : process.env.AUDITME_PROD_BE_URL;

function PriorityDetails({ item, tableRef }) {
  const [formDisabled, setFormDisabled] = useState(true);

  const cancelIssue = () => {
    console.log('Cancel');
    axios
      .get(`${URL}/api/auditor/cancel-issue/${item._id}`, {
        headers: {
          Authorization: localStorage.userToken,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          tableRef.current.reload();
        }
      })
      .catch((error) => {
        console.log(error.response);
        message.error('Unable to cancel the issue');
      });
  };

  const openModal = () => {
    Modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      maskClosable: true,
      content: (
        <Typography.Text>Are you sure you want to permanently cancel this issue?</Typography.Text>
      ),
      okText: 'Yes',
      cancelText: 'No',
      onOk: cancelIssue,
    });
  };

  let cancelButton = (
    <Button
      danger
      icon={<DeleteOutlined />}
      onClick={openModal}
      disabled={item.status === 'Resolved' || item.status === 'Cancelled'}
    >
      Cancel issue
    </Button>
  );

  if (item.userId.toString() !== JSON.parse(localStorage.user).id.toString()) {
    cancelButton = (
      <Tooltip title={`Only ${item.userName} can cancel this issue`}>
        <Button danger icon={<DeleteOutlined />} disabled>
          Cancel issue
        </Button>
      </Tooltip>
    );
  }

  return (
    <Card>
      <Row justify="center">
        <Col span={12}>{cancelButton}</Col>
        <Col span={12}>
          <Row justify="center" align="end">
            <Col offset={1} style={{ paddingTop: '2px', marginRight: '4px' }}>
              <Typography.Text>Edit Mode</Typography.Text>
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
        </Col>
      </Row>
      <Divider />

      {formDisabled ? (
        <IssueDetail item={item} />
      ) : (
        <IssueForm item={item} tableRef={tableRef} setFormDisabled={setFormDisabled} />
      )}
    </Card>
  );
}

export default PriorityDetails;

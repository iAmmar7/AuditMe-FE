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
  message,
} from 'antd';
import axios from 'axios';

import InitiativeInfo from './InitiativeInfo';
import InitiativeEdit from './InitiativeEdit';

const URL =
  process.env.NODE_ENV === 'development'
    ? process.env.AUDITME_DEV_BE_URL
    : process.env.AUDITME_PROD_BE_URL;

function InitiativeDetails({ item, tableRef }) {
  const [formDisabled, setFormDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  let cancelButton = null;
  let editButton = null;

  // If the current user is regional manager
  if (JSON.parse(localStorage.user).role === 'rm') {
    editButton = (
      <Row justify="center" align="end">
        <Col offset={1} style={{ paddingTop: '2px', marginRight: '4px' }}>
          <Typography.Text>Edit initiative </Typography.Text>
        </Col>
        <Col>
          <Tooltip title={`Only ${item.userName} can edit this initiative`}>
            <Switch checkedChildren="Off" unCheckedChildren="On" checked={false} disabled />
          </Tooltip>
        </Col>
      </Row>
    );
  }

  // If the currrent user is the one who added this initiative
  if (JSON.parse(localStorage.user).id.toString() === item.userId.toString()) {
    editButton = (
      <Row justify="center" align="end">
        <Col offset={1} style={{ paddingTop: '2px', marginRight: '4px' }}>
          <Typography.Text>Edit initiative </Typography.Text>
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
  }
  // If the current user is auditor but not the one who added this initiative
  else {
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

  let content = formDisabled ? (
    <InitiativeInfo item={item} />
  ) : (
    <InitiativeEdit item={item} tableRef={tableRef} setFormDisabled={setFormDisabled} />
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
        <Col span={24}>{editButton}</Col>
      </Row>
      <Divider />
      {content}
    </Card>
  );
}

export default InitiativeDetails;

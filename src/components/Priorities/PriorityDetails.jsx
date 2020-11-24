import React, { useState } from 'react';
import { Card, Row, Col, Typography, Switch } from 'antd';

import IssueDetail from './IssueDetail';
import IssueForm from './IssueForm';

function PriorityDetails({ item }) {
  const [formDisabled, setFormDisabled] = useState(true);

  return (
    <Card>
      <Row justify="center" align="end">
        <Col offset={1} style={{ paddingTop: '2px', marginRight: '4px' }}>
          <Typography.Text>Edit Mode</Typography.Text>
        </Col>
        <Col>
          <Switch
            checkedChildren="Off"
            unCheckedChildren="On"
            defaultChecked={false}
            onClick={() => setFormDisabled(!formDisabled)}
          />
        </Col>
      </Row>

      {formDisabled ? <IssueDetail item={item} /> : <IssueForm item={item} />}
    </Card>
  );
}

export default PriorityDetails;

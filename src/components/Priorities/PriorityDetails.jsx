import React, { useState } from 'react';
import { Card, Row, Col, Typography, Switch, Divider } from 'antd';
import moment from 'moment';

import IssueDetail from './IssueDetail';
import IssueForm from './IssueForm';

function PriorityDetails({ item, tableRef }) {
  const [formDisabled, setFormDisabled] = useState(true);

  console.log('Form disabled', formDisabled);
  return (
    <Card>
      <Row justify="center">
        <Col span={12}>
          <Typography.Text>Last updated: </Typography.Text>
          {item.updatedBy.length > 0 ? (
            <>
              <Typography.Text strong type="warning">
                {moment(item.updatedBy[item.updatedBy.length - 1].time)
                  .utcOffset(0)
                  .format('MM/DD/YYYY, hh:mm:ss A')}{' '}
              </Typography.Text>
              <Typography.Text>by </Typography.Text>
              <Typography.Text strong type="warning">
                {item.updatedBy[item.updatedBy.length - 1].name}
              </Typography.Text>
            </>
          ) : (
            <Typography.Text strong type="warning">
              Not updated
            </Typography.Text>
          )}
        </Col>
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

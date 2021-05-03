import React from 'react';
import { Row, Col, Typography } from 'antd';

export default function TimelineHeaderContent() {
  return (
    <>
      {[
        {
          key: 1,
          title: 'Open Observations',
          details: (
            <Typography.Text>
              Raised by the BE Team and waiting for the response. These issues will be moved to
              Priorities issues if not resolved within <Typography.Text strong>3</Typography.Text>{' '}
              working days.
            </Typography.Text>
          ),
        },
        {
          key: 2,
          title: 'Closed Observations',
          details: (
            <Typography.Text>
              Observations that were closed (
              <Typography.Text strong type="success">
                resolved
              </Typography.Text>{' '}
              or sent to{' '}
              <Typography.Text strong type="warning">
                maintenance
              </Typography.Text>
              ) within <Typography.Text strong>3</Typography.Text> working days.
            </Typography.Text>
          ),
        },
        {
          key: 3,
          title: 'Open Priorities',
          details: (
            <Typography.Text>Raised by the BE Team and waiting for the response.</Typography.Text>
          ),
        },
        {
          key: 4,
          title: 'Closed Priorities',
          details: (
            <Typography.Text>
              Issues that have been closed (
              <Typography.Text strong type="success">
                resolved
              </Typography.Text>{' '}
              or sent to{' '}
              <Typography.Text strong type="warning">
                maintenance
              </Typography.Text>
              ).
            </Typography.Text>
          ),
        },
      ].map(({ key, title, details }) => (
        <Row key={key} gutter={[4, 8]}>
          <Col>
            <Typography.Text strong>{title}:</Typography.Text>
          </Col>
          <Col>{details}</Col>
        </Row>
      ))}
    </>
  );
}

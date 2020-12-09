import React from 'react';
import { Row, Typography, Badge } from 'antd';
import { Bar } from '@ant-design/charts';

const RegionChart = ({ stats }) => {
  const data = [
    {
      region: 'Southern',
      status: 'Resolved',
      count: 1,
    },
    {
      region: 'CR-East',
      status: 'Pending',
      count: 1,
    },
    {
      region: 'WR-South',
      status: 'Pending',
      count: 6,
    },
    {
      region: 'Southern',
      status: 'Pending',
      count: 2,
    },
    {
      region: 'ER-North',
      status: 'Resolved',
      count: 1,
    },
    {
      region: 'WR-South',
      status: 'Resolved',
      count: 2,
    },
    {
      region: 'CR-East',
      status: 'Cancelled',
      count: 1,
    },
    {
      region: 'CR-East',
      status: 'Resolved',
      count: 2,
    },
    {
      region: 'CR-South',
      status: 'Resolved',
      count: 2,
    },
    {
      region: 'ER-South',
      status: 'Resolved',
      count: 2,
    },
    {
      region: 'CR-North',
      status: 'Resolved',
      count: 3,
    },
    {
      region: 'CR-South',
      status: 'Pending',
      count: 1,
    },
  ];

  const config = {
    data: stats,
    xField: 'count',
    yField: 'region',
    seriesField: 'status',
    isPercent: false,
    isStack: true,
    color: (_ref) => {
      if (_ref.status === 'Pending') return '#f5222d';
      if (_ref.status === 'Resolved') return '#a0d911';
      if (_ref.status === 'Cancelled') return '#fa8c16';
    },
    label: {
      position: 'middle',
      content: function content(item) {
        return item.count;
      },
      style: { fill: '#fff' },
    },
    tooltip: {
      customContent: (title, values) => {
        console.log(title, values);
        return (
          <div style={{ padding: '2px 6px' }}>
            <Row style={{ margin: '8px 0px' }}>
              <Typography.Text strong>{title}</Typography.Text>
            </Row>
            {values.map((item) => (
              <div style={{ marginBottom: '12px' }} key={item.name}>
                <Row>
                  <Badge
                    color={item.color}
                    text={
                      <Typography.Text>
                        {item.name} <Typography.Text strong>{item.value}</Typography.Text>
                      </Typography.Text>
                    }
                  />
                </Row>
                <Row style={{ margin: '4px 0px', paddingLeft: '12px' }}>
                  <Typography.Text>
                    Customer Experience {item.data['Customer Experience'] ?? 0}
                  </Typography.Text>
                </Row>
                <Row style={{ marginBottom: '4px', paddingLeft: '12px' }}>
                  <Typography.Text>Bay Violation {item.data['Bay Violation'] ?? 0}</Typography.Text>
                </Row>
                <Row style={{ marginBottom: '4px', paddingLeft: '12px' }}>
                  <Typography.Text>Housekeeping {item.data['Housekeeping'] ?? 0}</Typography.Text>
                </Row>
                <Row style={{ marginBottom: '4px', paddingLeft: '12px' }}>
                  <Typography.Text>
                    Customer Mistreatment {item.data['Customer Mistreatment'] ?? 0}
                  </Typography.Text>
                </Row>
                <Row style={{ marginBottom: '4px', paddingLeft: '12px' }}>
                  <Typography.Text>Initiative {item.data['Initiative'] ?? 0}</Typography.Text>
                </Row>
                <Row style={{ marginBottom: '4px', paddingLeft: '12px' }}>
                  <Typography.Text>Admin Issues {item.data['Admin Issues'] ?? 0}</Typography.Text>
                </Row>
                <Row style={{ marginBottom: '4px', paddingLeft: '12px' }}>
                  <Typography.Text>Safety {item.data['Safety'] ?? 0}</Typography.Text>
                </Row>
                <Row style={{ marginBottom: '4px', paddingLeft: '12px' }}>
                  <Typography.Text>Others {item.data['Others'] ?? 0}</Typography.Text>
                </Row>
              </div>
            ))}
          </div>
        );
      },
    },
  };

  return <Bar {...config} />;
};
export default RegionChart;

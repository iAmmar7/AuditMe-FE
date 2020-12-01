import React from 'react';
import { Pie } from '@ant-design/charts';

const PieChart = ({ stats, total }) => {
  const data = [
    {
      status: 'Resolved',
      count: 0,
    },
    {
      status: 'Pending',
      count: 0,
    },
    {
      status: 'Cancelled',
      count: 0,
    },
  ];

  const config = {
    appendPadding: 10,
    data: stats?.length === 0 ? data : stats,
    angleField: 'count',
    colorField: 'status',
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 16,
      },
    },
    interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        formatter: function formatter() {
          return `${total}`;
        },
      },
    },
  };

  return <Pie {...config} />;
};

export default PieChart;

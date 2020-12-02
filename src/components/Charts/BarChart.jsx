import React from 'react';
import { Bar } from '@ant-design/charts';

const BarChart = ({ stats }) => {
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
  };
  return <Bar {...config} />;
};
export default BarChart;

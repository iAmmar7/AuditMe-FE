/* eslint-disable @typescript-eslint/dot-notation */
import React from 'react';
import { Pie } from '@ant-design/charts';

const TypeChart = ({ stats }) => {
  const data = [
    {
      type: 'Customer Experience',
      count: stats.data['Customer Experience'] ?? null,
    },
    {
      type: 'Bay Violation',
      count: stats.data['Bay Violation'] ?? null,
    },
    {
      type: 'Housekeeping',
      count: stats.data['Housekeeping'] ?? null,
    },
    {
      type: 'Customer Mistreatment',
      count: stats.data['Customer Mistreatment'] ?? null,
    },
    {
      type: 'Initiative',
      count: stats.data['Initiative'] ?? null,
    },
    {
      type: 'Admin Issues',
      count: stats.data['Admin Issues'] ?? null,
    },
    {
      type: 'Safety',
      count: stats.data['Safety'] ?? null,
    },
    {
      type: 'Others',
      count: stats.data['Others'] ?? null,
    },
  ];

  const config = {
    height: 400,
    width: 400,
    data,
    angleField: 'count',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      style: {
        fontSize: 16,
        textAlign: 'center',
      },
    },
    legend: {
      flipPage: false,
      itemHeight: 20,
    },
    interactions: [{ type: 'element-active' }],
  };

  return <Pie {...config} />;
};

export default TypeChart;

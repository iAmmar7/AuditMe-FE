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

// import { Bar } from '@ant-design/charts';
// const PieChart = () => {
//   const data = [
//     {
//       country: 'CR-East',
//       year: '1750',
//       value: 502,
//     },
//     {
//       country: 'CR-North',
//       year: '1800',
//       value: 635,
//     },
//     {
//       country: 'Asia',
//       year: '1850',
//       value: 809,
//     },
//     {
//       country: 'Asia',
//       year: '1900',
//       value: 947,
//     },
//     {
//       country: 'Asia',
//       year: '1950',
//       value: 1402,
//     },
//     {
//       country: 'Asia',
//       year: '1999',
//       value: 3634,
//     },
//     {
//       country: 'Asia',
//       year: '2050',
//       value: 5268,
//     },
//     {
//       country: 'Africa',
//       year: '1750',
//       value: 106,
//     },
//     {
//       country: 'Africa',
//       year: '1800',
//       value: 107,
//     },
//     {
//       country: 'Africa',
//       year: '1850',
//       value: 111,
//     },
//     {
//       country: 'Africa',
//       year: '1900',
//       value: 133,
//     },
//     {
//       country: 'Africa',
//       year: '1950',
//       value: 221,
//     },
//     {
//       country: 'Africa',
//       year: '1999',
//       value: 767,
//     },
//     {
//       country: 'Africa',
//       year: '2050',
//       value: 1766,
//     },
//     {
//       country: 'Europe',
//       year: '1750',
//       value: 163,
//     },
//     {
//       country: 'Europe',
//       year: '1800',
//       value: 203,
//     },
//     {
//       country: 'Europe',
//       year: '1850',
//       value: 276,
//     },
//     {
//       country: 'Europe',
//       year: '1900',
//       value: 408,
//     },
//     {
//       country: 'Europe',
//       year: '1950',
//       value: 547,
//     },
//     {
//       country: 'Europe',
//       year: '1999',
//       value: 729,
//     },
//     {
//       country: 'Europe',
//       year: '2050',
//       value: 628,
//     },
//   ];
//   const config = {
//     data,
//     xField: 'value',
//     yField: 'year',
//     seriesField: 'country',
//     isPercent: true,
//     isStack: true,
//     label: {
//       position: 'middle',
//       content: function content(item) {
//         return item.value.toFixed(2);
//       },
//       style: { fill: '#fff' },
//     },
//   };
//   return <Bar {...config} />;
// };
// export default PieChart;

// import { Pie, yuan } from 'ant-design-pro/lib/Charts';

// const salesPieData = [
//   {
//     x: 'Test1',
//     y: 4544,
//   },
//   {
//     x: 'Test2',
//     y: 3321,
//   },
//   {
//     x: 'Test3',
//     y: 3113,
//   },
// ];

// const PieChart = () => {
//   return <Pie data={salesPieData} height={294} />;
// };

// export default PieChart;

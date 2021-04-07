/* eslint-disable no-useless-computed-key */
import React from 'react';
import { ConfigProvider, Typography } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import ProTable from '@ant-design/pro-table';

const columns = [
  {
    title: 'Date',
    width: '14%',
    dataIndex: 'date',
    valueType: 'dateRange',
    sorter: () => null,
    render: (_) => <Typography.Text>{_.props.text}</Typography.Text>,
  },
  {
    title: 'Name',
    width: '14%',
    minWidth: 100,
    dataIndex: 'name',
    render: (_) => <Typography.Text>{_}</Typography.Text>,
  },
  {
    title: 'Badge #',
    width: '14%',
    dataIndex: 'badgeNumber',
    render: (_) => <Typography.Text>{_}</Typography.Text>,
  },
  {
    title: 'Department',
    width: '14%',
    dataIndex: 'department',
    valueType: 'select',
    filters: [
      { text: 'Sales', value: 'Sales' },
      { text: 'Customer Support', value: 'Customer Support' },
      { text: 'Business Development', value: 'Business Development' },
      { text: 'Other', value: 'Other' },
    ],
    valueEnum: {
      Sales: { text: 'Sales', type: 'Sales' },
      ['Customer Support']: { text: 'Customer Support', type: 'Customer Support' },
      ['Business Development']: { text: 'Business Development', type: 'Business Development' },
      Other: { text: 'Other', type: 'Other' },
    },
    render: (_) => <Typography.Text>{_}</Typography.Text>,
  },
  {
    title: 'Other Department',
    width: '14%',
    dataIndex: 'otherDepartment',
    render: (_) => <Typography.Text>{_}</Typography.Text>,
  },
  {
    title: 'Subject',
    width: '14%',
    dataIndex: 'subject',
    render: (_) => <Typography.Text>{_}</Typography.Text>,
  },
  {
    title: 'Message',
    width: '14%',
    dataIndex: 'message',
    render: (_) => <Typography.Text>{_}</Typography.Text>,
  },
];

function FeedbackTable(props) {
  const { onRequest } = props;

  return (
    <ConfigProvider locale={enUS}>
      <ProTable
        columns={columns}
        request={onRequest}
        rowKey="key"
        pagination={{
          showQuickJumper: true,
          pageSize: 10,
          pageSizeOptions: [10, 20, 50],
        }}
        search={{
          labelWidth: 'auto',
        }}
        dateFormatter="string"
        options={{
          density: false,
        }}
        scroll={{ x: '1000px' }}
      />
    </ConfigProvider>
  );
}

export default FeedbackTable;

import React from 'react';
import { Typography, Tag } from 'antd';
import ProTable from '@ant-design/pro-table';

const columns = [
  {
    title: 'Date',
    width: 90,
    dataIndex: 'date',
    valueType: 'date',
    sorter: (a, b) => new Date(a.date) - new Date(b.date),
    sortDirection: 'ascend',
    render: (_) => <Typography.Text>{_.props.text}</Typography.Text>,
  },
  {
    title: 'Added by',
    width: 130,
    dataIndex: 'user',
    render: (_) => <Typography.Text strong>{_}</Typography.Text>,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    initialValue: 'Pending',
    valueType: 'select',
    search: false,
    valueEnum: {
      Resolved: { text: 'Resolved', status: 'Resolved' },
      Pending: { text: 'Pending', status: 'Pending' },
    },
    filters: [
      {
        text: 'Pending',
        value: 'Pending',
      },
      {
        text: 'Resolved',
        value: 'Resolved',
      },
    ],
    render: (_, record) => <Tag color={record.status.color}>{record.status.text}</Tag>,
  },
  {
    title: 'Type',
    dataIndex: 'type',
    render: (_) => <Typography.Text>{_}</Typography.Text>,
  },
  {
    title: 'Details',
    dataIndex: 'issueDetails',
    width: 300,
    align: 'center',
    render: (_) => (
      <Typography.Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}>
        {_}
      </Typography.Paragraph>
    ),
  },
  {
    title: 'Date Identified',
    key: 'dateIdentified',
    dataIndex: 'dateIdentified',
    valueType: 'date',
    sorter: (a, b) => new Date(a.dateIdentified) - new Date(b.dateIdentified),
    render: (_) => <Typography.Text>{_.props.text}</Typography.Text>,
  },
  {
    title: 'Action Taken',
    dataIndex: 'actionTaken',
    width: 250,
    align: 'center',
    render: (_) => (
      <Typography.Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}>
        {_}
      </Typography.Paragraph>
    ),
  },
];

function PriorityTable(props) {
  const { expandedRowRender, onRequest } = props;

  return (
    <ProTable
      columns={columns}
      request={onRequest}
      rowKey="key"
      pagination={{
        showQuickJumper: true,
        pageSize: 10,
      }}
      expandable={{ expandedRowRender }}
      search={{
        labelWidth: 'auto',
      }}
      dateFormatter="string"
      options={{
        reload: false,
      }}
      // postData={(value1, value2, value3) => {
      //   console.log('POST data', value1, value2, value3);
      //   return value1;
      // }}
      // toolBarRender={() => [
      //   <ProForm.Group style={{ paddingTop: '12%' }}>
      //     <ProFormSelect
      //       name="status"
      //       hasFeedback
      //       valueEnum={{
      //         pending: 'Pending',
      //         resolved: 'Resolved',
      //       }}
      //       placeholder="Status"
      //     />
      //     <ProFormSelect
      //       name="region"
      //       hasFeedback
      //       valueEnum={{
      //         region1: 'Region1',
      //         region2: 'Region2',
      //       }}
      //       placeholder="Region"
      //     />
      //   </ProForm.Group>,
      // ]}
    />
  );
}

export default PriorityTable;

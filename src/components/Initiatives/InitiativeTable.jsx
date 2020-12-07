import React from 'react';
import { Typography } from 'antd';
import ProTable from '@ant-design/pro-table';

const columns = [
  {
    title: 'Date',
    width: 90,
    dataIndex: 'date',
    valueType: 'dateRange',
    sorter: () => null,
    render: (_) => <Typography.Text>{_.props.text}</Typography.Text>,
  },
  {
    title: 'Process Specialist',
    width: 120,
    dataIndex: 'user',
    render: (_) => <Typography.Text strong>{_}</Typography.Text>,
  },
  {
    title: 'Type',
    width: 100,
    dataIndex: 'type',
    filters: [
      {
        text: 'Customer Experience',
        value: 'Customer Experience',
      },
      {
        text: 'Bay Violation',
        value: 'Bay Violation',
      },
      {
        text: 'Housekeeping',
        value: 'Housekeeping',
      },
      {
        text: 'Customer Mistreatment',
        value: 'Customer Mistreatment',
      },
      {
        text: 'Initiative',
        value: 'Initiative',
      },
      {
        text: 'Admin Issues',
        value: 'Admin Issues',
      },
      {
        text: 'Safety',
        value: 'Safety',
      },
      {
        text: 'Others',
        value: 'Others',
      },
    ],
    render: (_) => <Typography.Text>{_}</Typography.Text>,
  },
  {
    title: 'Region',
    width: 100,
    dataIndex: 'region',
    filters: [
      {
        text: 'Southern',
        value: 'Southern',
      },
      {
        text: 'CR-East',
        value: 'CR-East',
      },
      {
        text: 'CR-North',
        value: 'CR-North',
      },
      {
        text: 'CR-South',
        value: 'CR-South',
      },
      {
        text: 'ER-North',
        value: 'ER-North',
      },
      {
        text: 'ER-South',
        value: 'ER-South',
      },
      {
        text: 'WR-North',
        value: 'WR-North',
      },
      {
        text: 'WR-South',
        value: 'WR-South',
      },
    ],
    render: (_) => <Typography.Text>{_}</Typography.Text>,
  },
  {
    title: 'Regional Manager',
    width: 120,
    dataIndex: 'regionalManager',
    render: (_) => <Typography.Text>{_}</Typography.Text>,
  },
  {
    title: 'Area Manager',
    width: 120,
    dataIndex: 'areaManager',
    render: (_) => <Typography.Text>{_}</Typography.Text>,
  },
  {
    title: 'Date Identified',
    width: 90,
    key: 'dateIdentified',
    dataIndex: 'dateIdentified',
    valueType: 'dateRange',
    sorter: () => null,
    render: (_) => <Typography.Text>{_.props.text}</Typography.Text>,
  },
  {
    title: 'Station/BE',
    width: 90,
    dataIndex: 'stationNumber',
    render: (_) => <Typography.Text>{_}</Typography.Text>,
  },
];

function InitiativeTable(props) {
  const { expandedRowRender, onRequest, tableRef } = props;

  return (
    <ProTable
      columns={columns}
      request={onRequest}
      actionRef={tableRef}
      rowKey="key"
      pagination={{
        showQuickJumper: true,
        pageSize: 10,
        pageSizeOptions: [10, 20, 50],
      }}
      expandable={{
        expandedRowRender,
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
  );
}

export default InitiativeTable;

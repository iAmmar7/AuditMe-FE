import React from 'react';
import { ConfigProvider, Typography } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import ProTable from '@ant-design/pro-table';

const columns = [
  {
    title: 'Date',
    width: '14%',
    minWidth: 100,
    dataIndex: 'date',
    valueType: 'dateRange',
    sorter: () => null,
    render: (_) => <Typography.Text>{_.props.text}</Typography.Text>,
  },
  {
    title: 'Process Specialist',
    width: '14%',
    dataIndex: 'user',
    render: (_) => <Typography.Text strong>{_}</Typography.Text>,
  },
  {
    title: 'Type',
    width: '14%',
    dataIndex: 'type',
    search: false,
    filters: [
      { text: 'Customer Experience', value: 'Customer Experience' },
      { text: 'Bay Violation', value: 'Bay Violation' },
      { text: 'Housekeeping', value: 'Housekeeping' },
      { text: 'Customer Mistreatment', value: 'Customer Mistreatment' },
      { text: 'Initiative', value: 'Initiative' },
      { text: 'Admin Issues', value: 'Admin Issues' },
      { text: 'Maintenance Issues', value: 'Maintenance Issues' },
      { text: 'IT Issues', value: 'IT Issues' },
      { text: 'Inventory Issues', value: 'Inventory Issues' },
      { text: 'Violation', value: 'Violation' },
      { text: 'Safety', value: 'Safety' },
      { text: 'Others', value: 'Others' },
    ],
    render: (_) => <Typography.Text>{_}</Typography.Text>,
  },
  {
    title: 'Region',
    width: '14%',
    dataIndex: 'region',
    search: false,
    filters: [
      { text: 'Southern', value: 'Southern' },
      { text: 'CR-East', value: 'CR-East' },
      { text: 'CR-North', value: 'CR-North' },
      { text: 'CR-South', value: 'CR-South' },
      { text: 'ER-North', value: 'ER-North' },
      { text: 'ER-South', value: 'ER-South' },
      { text: 'WR-North', value: 'WR-North' },
      { text: 'WR-South', value: 'WR-South' },
    ],
    render: (_) => <Typography.Text>{_}</Typography.Text>,
  },
  {
    title: 'Regional Manager',
    width: '14%',
    dataIndex: 'regionalManager',
    render: (_) => <Typography.Text>{_}</Typography.Text>,
  },
  {
    title: 'Area Manager',
    width: '14%',
    dataIndex: 'areaManager',
    render: (_) => <Typography.Text>{_}</Typography.Text>,
  },
  {
    title: 'Station/BE',
    width: '14%',
    dataIndex: 'stationNumber',
    render: (_) => <Typography.Text>{_}</Typography.Text>,
  },
];

function InitiativeTable(props) {
  const { expandedRowRender, onRequest, tableRef } = props;

  return (
    <ConfigProvider locale={enUS}>
      <ProTable
        columns={columns}
        request={onRequest}
        actionRef={tableRef}
        rowKey="key"
        pagination={{
          showQuickJumper: true,
          pageSize: 20,
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
    </ConfigProvider>
  );
}

export default InitiativeTable;

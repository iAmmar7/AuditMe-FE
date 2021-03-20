/* eslint-disable no-useless-computed-key */
import React, { useRef } from 'react';
import { ConfigProvider, Typography } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import ProTable from '@ant-design/pro-table';

import GenerateInitiativesCSV from '../common/GenerateInitiativesCSV';

const columns = [
  // {
  //   title: 'Initiative ID',
  //   width: '12%',
  //   dataIndex: 'id',
  //   render: (_) => <Typography.Text>{_}</Typography.Text>,
  // },
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
    title: 'BE Team',
    width: '14%',
    dataIndex: 'user',
    render: (_) => <Typography.Text strong>{_}</Typography.Text>,
  },
  {
    title: 'Type',
    width: '14%',
    dataIndex: 'type',
    valueType: 'select',
    filters: [
      { text: 'Customer Experience', value: 'Customer Experience' },
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
    valueEnum: {
      ['Customer Experience']: { text: 'Customer Experience', type: 'Customer Experience' },
      Housekeeping: { text: 'Housekeeping', type: 'Housekeeping' },
      ['Customer Mistreatment']: { text: 'Customer Mistreatment', type: 'Customer Mistreatment' },
      Initiative: { text: 'Initiative', type: 'Initiative' },
      ['Admin Issues']: { text: 'Admin Issues', type: 'Admin Issues' },
      ['Maintenance Issues']: { text: 'Maintenance Issues', type: 'Maintenance Issues' },
      ['IT Issues']: { text: 'IT Issues', type: 'IT Issues' },
      ['Inventory Issues']: { text: 'Inventory Issues', type: 'Inventory Issues' },
      Violation: { text: 'Violation', type: 'Violation' },
      Safety: { text: 'Safety', type: 'Safety' },
      Others: { text: 'Others', type: 'Others' },
    },
    render: (_) => <Typography.Text>{_}</Typography.Text>,
  },
  {
    title: 'Region',
    width: '14%',
    dataIndex: 'region',
    valueType: 'select',
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
    valueEnum: {
      Southern: { text: 'Southern', region: 'Southern' },
      ['CR-East']: { text: 'CR-East', region: 'CR-East' },
      ['CR-North']: { text: 'CR-North', region: 'CR-North' },
      ['CR-South']: { text: 'CR-South', region: 'CR-South' },
      ['ER-North']: { text: 'ER-North', region: 'ER-North' },
      ['ER-South']: { text: 'ER-South', region: 'ER-South' },
      ['WR-North']: { text: 'WR-North', region: 'WR-North' },
      ['WR-South']: { text: 'WR-South', region: 'WR-South' },
    },
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
  const formRef = useRef(null);
  const { expandedRowRender, onRequest, tableRef } = props;

  return (
    <ConfigProvider locale={enUS}>
      <ProTable
        columns={columns}
        request={onRequest}
        actionRef={tableRef}
        formRef={formRef}
        rowKey="key"
        toolBarRender={() => [
          <GenerateInitiativesCSV key="csv" filters={formRef?.current?.getFieldValue()} />,
        ]}
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
    </ConfigProvider>
  );
}

export default InitiativeTable;

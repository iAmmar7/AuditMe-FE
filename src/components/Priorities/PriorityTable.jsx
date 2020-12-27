import React from 'react';
import { ConfigProvider, Typography, Tag } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import ProTable from '@ant-design/pro-table';

import GeneratePrioritiesCSV from '../common/GeneratePrioritiesCSV';
import styles from './Priorities.less';

const columns = [
  {
    title: 'Date',
    width: '9%',
    minWidth: 100,
    dataIndex: 'date',
    valueType: 'dateRange',
    sorter: () => null,
    render: (_) => <Typography.Text>{_.props.text}</Typography.Text>,
  },
  {
    title: 'Process Specialist',
    dataIndex: 'user',
    render: (_) => <Typography.Text strong>{_}</Typography.Text>,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    search: false,
    // valueType: 'select',
    // valueEnum: {
    //   resolved: { text: 'Resolved', status: 'Resolved' },
    //   pending: { text: 'Pending', status: 'Pending' },
    //   cancelled: { text: 'Cancelled', status: 'Cancelled' },
    // },
    filters: [
      {
        text: 'Pending',
        value: 'Pending',
      },
      {
        text: 'Resolved',
        value: 'Resolved',
      },
      {
        text: 'Maintenance',
        value: 'Maintenance',
      },
    ],
    render: (_) =>
      _.text === 'Cancelled' ? (
        <Typography.Text>{_.text}</Typography.Text>
      ) : (
        <Tag color={_.color}>{_.text}</Tag>
      ),
  },
  {
    title: 'Type',
    dataIndex: 'type',
    search: false,
    // valueType: 'select',
    // valueEnum: {
    //   customerExperience: { text: 'Customer Experience', type: 'Customer Experience' },
    //   bayViolation: { text: 'Bay Violation', type: 'Bay Violation' },
    //   housekeeping: { text: 'Housekeeping', type: 'Housekeeping' },
    //   customerMistreatment: { text: 'Customer Mistreatment', type: 'Customer Mistreatment' },
    //   initiative: { text: 'Initiative', type: 'Initiative' },
    //   adminIssues: { text: 'Admin Issues', type: 'Admin Issues' },
    //   safety: { text: 'Safety', type: 'Safety' },
    //   others: { text: 'Others', type: 'Others' },
    // },
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
    width: '9%',
    minWidth: 100,
    dataIndex: 'region',
    search: false,
    // valueType: 'select',
    // valueEnum: {
    //   southern: { text: 'Southern', type: 'Southern' },
    //   cr_east: { text: 'CR-East', type: 'CR-East' },
    //   cr_north: { text: 'CR-North', type: 'CR-North' },
    //   cr_south: { text: 'CR-South', type: 'CR-South' },
    //   er_north: { text: 'ER-North', type: 'ER-North' },
    //   er_south: { text: 'ER-South', type: 'ER-South' },
    //   wr_north: { text: 'WR-North', type: 'WR-North' },
    //   wr_south: { text: 'WR-South', type: 'WR-South' },
    // },
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
    render: (_) => <Tag>{_}</Tag>,
  },
  {
    title: 'Regional Manager',
    dataIndex: 'regionalManager',
    render: (_) => <Typography.Text>{_}</Typography.Text>,
  },
  {
    title: 'Area Manager',
    dataIndex: 'areaManager',
    render: (_) => <Typography.Text>{_}</Typography.Text>,
  },
  {
    title: 'Date Identified',
    width: '9%',
    minWidth: 100,
    key: 'dateIdentified',
    dataIndex: 'dateIdentified',
    valueType: 'dateRange',
    sorter: () => null,
    render: (_) => <Typography.Text>{_.props.text}</Typography.Text>,
  },
  {
    title: 'Station/BE',
    dataIndex: 'stationNumber',
    render: (_) => <Typography.Text>{_}</Typography.Text>,
  },
  {
    title: 'Days Open',
    dataIndex: 'daysOpen',
    search: false,
    render: (_) => <Typography.Text>{_}</Typography.Text>,
  },
  {
    title: 'Resolve Days',
    dataIndex: 'daysResolved',
    search: false,
    render: (_) => <Typography.Text>{_}</Typography.Text>,
  },
  {
    title: 'Log Number',
    dataIndex: 'logNumber',
    render: (_) => <Typography.Text>{_}</Typography.Text>,
  },
];

function PriorityTable(props) {
  const { expandedRowRender, onRequest, tableRef } = props;

  return (
    <ConfigProvider locale={enUS}>
      <ProTable
        columns={columns}
        request={onRequest}
        actionRef={tableRef}
        rowKey="key"
        toolBarRender={() => [<GeneratePrioritiesCSV key="csv" />]}
        pagination={{
          showQuickJumper: true,
          pageSize: 10,
          pageSizeOptions: [10, 20, 50],
        }}
        expandable={{
          expandedRowRender,
          // rowExpandable: (record) => record.status.text !== 'Cancelled',
        }}
        search={{
          labelWidth: 'auto',
        }}
        dateFormatter="string"
        options={{
          density: false,
        }}
        scroll={{ x: '1000px' }}
        rowClassName={(record) => (record.status.text === 'Cancelled' ? styles.cancelledRow : '')}
        // className={styles.issueTable}
        // tableClassName={styles.issueTable}
        tableStyle={{
          zIndex: -1000000,
        }}
        dropdownStyle={{
          zIndex: 1000000,
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
    </ConfigProvider>
  );
}

export default PriorityTable;

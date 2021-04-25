/* eslint-disable no-useless-computed-key */
import React, { useRef, useState } from 'react';
import { ConfigProvider, Typography, Modal, Tag, Tooltip } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import ProTable from '@ant-design/pro-table';
import moment from 'moment';

import ChecklistEditModal from './EditModal';
import ChecklistDetailsModal from './DetailsModal';
// import GenerateInitiativesCSV from '../common/GenerateInitiativesCSV';

moment.locale('en');

function ChecklistTable(props) {
  const formRef = useRef(null);
  const { expandedRowRender, onRequest, tableRef } = props;
  const [detailModal, setDetailModal] = useState({ status: false, data: {} });
  const [editModal, setEditModal] = useState({ status: false, data: {} });

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      valueType: 'dateRange',
      sorter: () => null,
      render: (_) => <Typography.Text>{moment(_.props.text).format('DD-MMM-YY')}</Typography.Text>,
    },
    {
      title: 'Station/BE Name',
      dataIndex: 'stationName',
      render: (_) => <Typography.Text>{_}</Typography.Text>,
    },
    {
      title: 'Region',
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
      render: (_) => <Tag>{_}</Tag>,
    },
    {
      title: 'AM Name',
      dataIndex: 'areaManagerName',
      render: (_) => <Typography.Text>{_}</Typography.Text>,
    },
    {
      title: 'RM Name',
      dataIndex: 'regionalManagerName',
      render: (_) => <Typography.Text>{_}</Typography.Text>,
    },
    {
      title: '',
      valueType: 'option',
      render: (_, record) => {
        const now = moment(new Date()).utcOffset(0);
        const createdAt = moment(record.createdAt).utcOffset(0);
        const timeExceededADay = moment.duration(now.diff(createdAt)).asDays() > 1;
        const loggedInUserId = JSON.parse(localStorage.user).id;
        return [
          <Tooltip
            key="edit"
            title={`Only ${record.areaManagerName} can edit this checklist within a day`}
          >
            <a
              disabled={record.areaManagerId !== loggedInUserId || timeExceededADay}
              onClick={() => {
                setEditModal({ data: record, status: true });
              }}
            >
              Edit
            </a>
          </Tooltip>,
          <a
            key="details"
            onClick={() => {
              setDetailModal({ data: record, status: true });
            }}
          >
            Show Details
          </a>,
        ];
      },
    },
  ];

  return (
    <ConfigProvider locale={enUS}>
      <ProTable
        columns={columns}
        request={onRequest}
        actionRef={tableRef}
        formRef={formRef}
        rowKey="key"
        // toolBarRender={() => [
        //   <GenerateInitiativesCSV key="csv" filters={formRef?.current?.getFieldValue()} />,
        // ]}
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
        scroll={{ x: '800px' }}
      />
      <Modal
        title="Checklist Details"
        visible={detailModal.status}
        onOk={() => setDetailModal({ ...detailModal, status: false })}
        onCancel={() => setDetailModal({ ...detailModal, status: false })}
        footer={null}
        width="75vw"
      >
        <ChecklistDetailsModal data={detailModal?.data} />
      </Modal>
      <Modal
        title="Edit Checklist"
        visible={editModal.status}
        onOk={() => setEditModal({ ...editModal, status: false })}
        onCancel={() => setEditModal({ ...editModal, status: false })}
        footer={null}
        width="75vw"
        destroyOnClose
      >
        <ChecklistEditModal data={editModal?.data} tableRef={tableRef} closeModal={setEditModal} />
      </Modal>
    </ConfigProvider>
  );
}

export default ChecklistTable;

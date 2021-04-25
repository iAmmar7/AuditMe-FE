/* eslint-disable no-useless-computed-key */
import React, { useRef, useState } from 'react';
import { ConfigProvider, Typography, Modal, Tag } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import ProTable from '@ant-design/pro-table';
import moment from 'moment';

import EditChecklistModal from './EditModal';
import ChecklistDetailsModal from './DetailsModal';
// import GenerateInitiativesCSV from '../common/GenerateInitiativesCSV';

moment.locale('en');

function ChecklistTable(props) {
  const formRef = useRef(null);
  const { expandedRowRender, onRequest, tableRef } = props;
  const [detailModal, setDetailModal] = useState(false);
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
        return [
          <a
            key="edit"
            onClick={() => {
              setEditModal({ data: record, status: true });
            }}
          >
            Edit
          </a>,
          <a
            key="details"
            onClick={() => {
              setDetailModal(true);
            }}
          >
            Show Details
          </a>,
        ];
      },
    },
  ];

  const data = [
    {
      key: 'question1',
      question: 'Signage is clean and working properly / Cladding is clean',
      status: false,
      images: [
        'https://i.pinimg.com/originals/84/ab/33/84ab33de474ab2875e9e5decd2b316be.jpg',
        'https://i.pinimg.com/originals/84/ab/33/84ab33de474ab2875e9e5decd2b316be.jpg',
      ],
    },
    {
      key: 'question2',
      question: 'Shutter door is clean',
      status: true,
      images: [],
    },
    {
      key: 'question3',
      question: 'Pillars properly cleaned / no tape marks & stickers on pillars',
      status: true,
      images: [],
    },
    {
      key: 'question4',
      question: 'No squeegee cleaners / mops in front of station (Cleaning material etc.)',
      status: true,
      images: [],
    },
    {
      key: 'question5',
      question:
        'Customer Lounge - Clean, floor is mopped and organized properly / No extra things inside the lounge',
      status: true,
      images: [],
    },
    {
      key: 'question6',
      question: 'Tea - coffee arrangements',
      status: true,
      images: [],
    },
    {
      key: 'question7',
      question: 'Waste Bin is not overfilled - No posters and stickers at walls.',
      status: true,
      images: [],
    },
    {
      key: 'question8',
      question: 'Water Dispenser - Neat and Clean',
      status: true,
      images: [],
    },
    {
      key: 'question9',
      question:
        'Computer table - Clean, no extra things on table, paper work should be properly arranged in folders, no dust behind the system, wires properly arranged',
      status: true,
      images: [],
    },
    {
      key: 'question10',
      question: 'TV - In working condition / No dust on top and behind the screens',
      status: true,
      images: [],
    },
    {
      key: 'question11',
      question: 'Furniture must be properly cleaned / tidy / not damaged',
      status: true,
      images: [],
    },
    {
      key: 'question12',
      question: 'Covid related stckers are well in place.',
      status: false,
      images: [],
    },
    {
      key: 'question13',
      question:
        'VAT certificate has been displayed min. at 2 visible locations - One must be near POS.',
      status: false,
      images: [],
    },
    {
      key: 'question14',
      question: 'CR seat & basin clean and no stains',
      status: true,
      images: [],
    },
    {
      key: 'question15',
      question: 'Soap available',
      status: true,
      images: [],
    },
    {
      key: 'question16',
      question: 'Floor, Mirror and walls clean',
      status: true,
      images: [],
    },
    {
      key: 'question17',
      question: 'Floor & ceiling is clean / No dirty hands on walls',
      status: false,
      images: [],
    },
    {
      key: 'question18',
      question: 'All machines are clean',
      status: false,
      images: [],
    },
    {
      key: 'question19',
      question: 'Pit rollers are clean (Also sides)',
      status: true,
      images: [],
    },
    {
      key: 'question20',
      question: 'Oil & water hoses are clean',
      status: true,
      images: [],
    },
    {
      key: 'question21',
      question: 'Used oil pump & pipes are clean',
      status: true,
      images: [],
    },
    {
      key: 'question22',
      question: 'Tools properly arranged',
      status: true,
      images: [],
    },
    {
      key: 'question23',
      question:
        'No extra things in bay area / nothing should be on top of pit-rollers / no hangers hanged on walls / no cartons placed at top of tools trolley/ nothing should be inside bays(pits)',
      status: false,
      images: [],
    },
    {
      key: 'question24',
      question: 'Tire equipments and tires properly arranged and clean',
      status: true,
      images: [],
    },
    {
      key: 'question25',
      question: 'Battery display as per the SOP (No old batteries )',
      status: true,
      images: [],
    },
    {
      key: 'question26',
      question: 'All wall corners should be properly cleaned. No posters & stikers at walls.',
      status: true,
      images: [],
    },
    {
      key: 'question27',
      question:
        'No used gloves to be used to stop bulk oil nozzles or bulk oil pipes (Should be reported to maintenance)',
      status: false,
      images: [],
    },
    {
      key: 'question28',
      question:
        'Clean fans / Cleaning cloth to be placed inside the tools trolley / Properly clean garbage containers',
      status: true,
      images: [],
    },
    {
      key: 'question29',
      question: 'Stock room properly arranged, cleaned and marked',
      status: true,
      images: [],
    },
    {
      key: 'question30',
      question: 'No dust on bulk oil tank / properly clean',
      status: true,
      images: [],
    },
    {
      key: 'question31',
      question:
        'No extra things at top of the bulk oil tank / remove all old stuff which cannot be used in future',
      status: true,
      images: [],
    },
    {
      key: 'question32',
      question: 'Oil compressor change checklist pasted on compressor',
      status: true,
      images: [],
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
        visible={detailModal}
        onOk={() => setDetailModal(false)}
        onCancel={() => setDetailModal(false)}
        footer={null}
        width="70vw"
      >
        <ChecklistDetailsModal data={data} />
      </Modal>
      <Modal
        title="Edit Checklist"
        visible={editModal.status}
        onOk={() => setEditModal({ ...editModal, status: false })}
        onCancel={() => setEditModal({ ...editModal, status: false })}
        footer={null}
        width="75vw"
      >
        <EditChecklistModal data={editModal?.data} tableRef={tableRef} />
      </Modal>
    </ConfigProvider>
  );
}

export default ChecklistTable;

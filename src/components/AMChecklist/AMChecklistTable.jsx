/* eslint-disable no-useless-computed-key */
import React, { useRef, useState } from 'react';
import { ConfigProvider, Typography, Form, Modal } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import ProTable from '@ant-design/pro-table';

// import GenerateInitiativesCSV from '../common/GenerateInitiativesCSV';



function ChecklistTable(props) {
  const formRef = useRef(null);
  const [form] = Form.useForm();
  const { expandedRowRender, onRequest, tableRef } = props;
  const [modalVisible,setModalVisible] = useState(false);

  const columns = [
    {
      title: 'Date',
      width: '14%',
      dataIndex: 'date',
      valueType: 'date',
      sorter: () => null,
      render: (_) => <Typography.Text strong>{_}</Typography.Text>,
    },
    {
      title: 'Station/BE Name',
      width: '14%',
      dataIndex: 'stationName',
      render: (_) => <Typography.Text strong>{_}</Typography.Text>,
    },
    {
      title: 'Region',
      width: '14%',
      dataIndex: 'region',
      render: (_) => <Typography.Text strong>{_}</Typography.Text>,
    },
    {
      title: 'Area Manager Name',
      width: '14%',
      dataIndex: 'areaManagerName',
      render: (_) => <Typography.Text strong>{_}</Typography.Text>,
    },
    {
      title: 'Regional Manager Name',
      width: '14%',
      dataIndex: 'regionalManagerName',
      render: (_) => <Typography.Text strong>{_}</Typography.Text>,
    },
    {
      title: '',
      width: '14%',
      dataIndex: 'detailsButtton',
      render: (_, record) => [<a
      key="editable"
      onClick={() => {
        form.getFieldsValue({ id: record.id });
        form.getFieldsValue({ name: record.name });
        form.getFieldsValue({ badgeNumber: record.badgeNumber });
        form.getFieldsValue({ password: record.password });
        setModalVisible(true);
      }}
    >
      Show Details
    </a>],
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
        scroll={{ x: '1000px' }}
      />
      <Modal
        title="Checklist Info"
        visible={modalVisible}
        // onOk={editOk}
        // onCancel={editCancel}
        footer={null}
      >
        {/* <EditForm form={form} modalClose={editCancel} tableRef={tableRef} /> */}
        Hello World
      </Modal>
    </ConfigProvider>
  );
}

export default ChecklistTable;

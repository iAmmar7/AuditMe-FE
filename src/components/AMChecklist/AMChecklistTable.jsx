/* eslint-disable no-useless-computed-key */
import React, { useRef, useState } from 'react';
import { ConfigProvider, Typography, Form, Modal, Table, Image, Input, Divider, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import enUS from 'antd/lib/locale/en_US';
import ProTable from '@ant-design/pro-table';
import AMChecklistDetails from '../../components/AMChecklist/AMChecklistDetails';

const { TextArea } = Input;

// import GenerateInitiativesCSV from '../common/GenerateInitiativesCSV';



function ChecklistTable(props) {
  const formRef = useRef(null);
  const { onRequest, tableRef } = props;
  const [detailModal,setDetailModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  

  const columns = [
    {
      title: 'Date',
      width: '14%',
      dataIndex: 'date',
      valueType: 'date',
      sorter: () => null,
      render: (_) => <Typography.Text>{_.props.text}</Typography.Text>,
    },
    {
      title: 'Station/BE Name',
      width: '14%',
      dataIndex: 'BEName',
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
      dataIndex: 'AMName',
      render: (_) => <Typography.Text strong>{_}</Typography.Text>,
    },
    {
      title: 'Regional Manager Name',
      width: '14%',
      dataIndex: 'RMName',
      render: (_) => <Typography.Text strong>{_}</Typography.Text>,
    },
    {
      title: '',
      valueType: 'option',
      width: '14%',
      dataIndex: 'editButtton',
      render: () => [<a
      key="editable"
      onClick={() => {
        setEditModal(true);
      }}
    >
      Edit
    </a>, <a
      key="editable"
      onClick={() => {
        setDetailModal(true);
      }}
    >
      Show Details
    </a>],
    },
  
  ];

  const detailColumns = [
    {
      title: 'Checklist Item',
      width: '60%',
      dataIndex: 'question',
      render: (_) => <Typography.Text strong>{_}</Typography.Text>,
    },
    {
      title: 'Yes',
      width: '10%',
      dataIndex: 'status',
      render: (_) => <Typography.Text strong>{_ == 'true' ? "✓" : ""}</Typography.Text>,
    },
    {
      title: 'No',
      width: '10%',
      dataIndex: 'status',
      render: (_) => <Typography.Text strong>{_ == 'false' ? "✓" : ""}</Typography.Text>,
    },
    {
      title: 'Images',
      width: '30%',
      dataIndex: 'images',
      render: (src) => src?.map((img)=> <Image width={50} src={img}/>),
    }
  ]


  const data = [
    {
      key: 'question1',
      question: 'Signage is clean and working properly / Cladding is clean',
      status: "false",
      images: ["https://i.pinimg.com/originals/84/ab/33/84ab33de474ab2875e9e5decd2b316be.jpg", "https://i.pinimg.com/originals/84/ab/33/84ab33de474ab2875e9e5decd2b316be.jpg"]
    },
    {
      key: 'question2',
      question: 'Shutter door is clean',
      status: "true"
    },
    {
      key: 'question3',
      question: 'Pillars properly cleaned / no tape marks & stickers on pillars',
      status: "true"
    },
    {
      key: 'question4',
      question: 'No squeegee cleaners / mops in front of station (Cleaning material etc.)',
      status: "true"
    },
    {
      key: 'question5',
      question: 'Customer Lounge - Clean, floor is mopped and organized properly / No extra things inside the lounge',
      status: "true"
    },
    {
      key: 'question6',
      question: 'Tea - coffee arrangements',
      status: "true"
    },
    {
      key: 'question7',
      question: 'Waste Bin is not overfilled - No posters and stickers at walls.',
      status: "true"
    },
    {
      key: 'question8',
      question: 'Water Dispenser - Neat and Clean',
      status: "true"
    },
    {
      key: 'question9',
      question: "Computer table - Clean, no extra things on table, paper work should be properly arranged in folders, no dust behind the system, wires properly arranged",
      status: "true"
    },
    {
      key: 'question10',
      question: 'TV - In working condition / No dust on top and behind the screens',
      status: "true"
    },
    {
      key: 'question11',
      question: 'Furniture must be properly cleaned / tidy / not damaged',
      status: "true"
    },
    {
      key: 'question12',
      question: 'Covid related stckers are well in place.',
      status: "false"
    },
    {
      key: 'question13',
      question: 'VAT certificate has been displayed min. at 2 visible locations - One must be near POS.',
      status: "false"
    },
    {
      key: 'question14',
      question: 'CR seat & basin clean and no stains',
      status: "true"
    },
    {
      key: 'question15',
      question: 'Soap available',
      status: "true"
    },
    {
      key: 'question16',
      question: 'Floor, Mirror and walls clean',
      status: "true"
    },
    {
      key: 'question17',
      question: 'Floor & ceiling is clean / No dirty hands on walls',
      status: "false"
    },
    {
      key: 'question18',
      question: 'All machines are clean',
      status: "false"
    },
    {
      key: 'question19',
      question: 'Pit rollers are clean (Also sides)',
      status: "true"
    },
    {
      key: 'question20',
      question: 'Oil & water hoses are clean',
      status: "true"
    },
    {
      key: 'question21',
      question: 'Used oil pump & pipes are clean',
      status: "true"
    },
    {
      key: 'question22',
      question: 'Tools properly arranged',
      status: "true"
    },
    {
      key: 'question23',
      question: 'No extra things in bay area / nothing should be on top of pit-rollers / no hangers hanged on walls / no cartons placed at top of tools trolley/ nothing should be inside bays(pits)',
      status: "false"
    },
    {
      key: 'question24',
      question: 'Tire equipments and tires properly arranged and clean',
      status: "true"
    },
    {
      key: 'question25',
      question: 'Battery display as per the SOP (No old batteries )',
      status: "true"
    },
    {
      key: 'question26',
      question: 'All wall corners should be properly cleaned. No posters & stikers at walls.',
      status: "true"
    },
    {
      key: 'question27',
      question: 'No used gloves to be used to stop bulk oil nozzles or bulk oil pipes (Should be reported to maintenance)',
      status: "false"
    },
    {
      key: 'question28',
      question: 'Clean fans / Cleaning cloth to be placed inside the tools trolley / Properly clean garbage containers',
      status: "true"
    },
    {
      key: 'question29',
      question: 'Stock room properly arranged, cleaned and marked',
      status: "true"
    },
    {
      key: 'question30',
      question: 'No dust on bulk oil tank / properly clean',
      status: "true"
    },
    {
      key: 'question31',
      question: 'No extra things at top of the bulk oil tank / remove all old stuff which cannot be used in future',
      status: "true"
    },
    {
      key: 'question32',
      question: 'Oil compressor change checklist pasted on compressor',
      status: "true"
    },
  ];

  const expandedRowRender = () => {
    return <AMChecklistDetails data={data} />;
  }

  const reviewersCommentProps = {
    name: 'evidencesAfter',
    listType: 'picture',
    // onRemove: (file) => {
    //   const index = evidenceAfterFileList.indexOf(file);
    //   const newFileList = evidenceAfterFileList.slice();
    //   newFileList.splice(index, 1);
    //   setEvidenceAfterFileList(newFileList);
    // },
    // beforeUpload: (file) => {
    //   if (file.type !== 'image/png' && file.type !== 'image/jpg' && file.type !== 'image/jpeg') {
    //     message.error(`Supported image formats are png, jpg and jpeg`);
    //     return;
    //   }
    //   setEvidenceAfterFileList([...evidenceAfterFileList, file]);
    //   // eslint-disable-next-line consistent-return
    //   return false;
    // },
    // evidenceAfterFileList,
  };


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
        visible={detailModal}
        onOk={()=>setDetailModal(false)}
        onCancel={()=>setDetailModal(false)}
        footer={null}
        width="70vw"
      >
        <Table
          columns={detailColumns}
          dataSource={data.slice(0, 4)}
          id="exterior"
          title={()=><th>Housekeeping - Exterior</th>}
          pagination={false}
          // size="small"
        />
        <Table
          columns={detailColumns}
          dataSource={data.slice(4, 13)}
          id="customerLounge"
          title={()=><th>Housekeeping - Customer Lounge</th>}
          pagination={false}
          // size="small"
        />
        <Table
          columns={detailColumns}
          dataSource={data.slice(13, 16)}
          id="comfortRoom"
          title={()=><th>Housekeeping - Comfort Room</th>}
          pagination={false}
          // size="small"
        />
        <Table
          columns={detailColumns}
          dataSource={data.slice(16, 28)}
          id="bayArea"
          title={()=><th>Housekeeping - Bay Area</th>}
          pagination={false}
          // size="small"
        />
        <Table
          columns={detailColumns}
          dataSource={data.slice(28, 32)}
          id="stockRoom"
          title={()=><th>Housekeeping - Stock Room</th>}
          pagination={false}
          // size="small"
        />
        <Divider>Reviewer's Comment</Divider>
        <Form layout="vertical">
          <Form.Item name="comment" label="Enter Comment" rules={[{ required: true, message: "Please enter comment" }]}>
            <TextArea rows={4} />
          </Form.Item>
          <Upload {...reviewersCommentProps}>
            <Button icon={<UploadOutlined />}>Select multiple images</Button>
          </Upload>
          <Form.Item style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Edit Checklist"
        visible={editModal}
        onOk={()=>setEditModal(false)}
        onCancel={()=>setEditModal(false)}
        footer={null}
        width="70vw"
      >
        Edit Modal
      </Modal>
    </ConfigProvider>
  );
}

export default ChecklistTable;

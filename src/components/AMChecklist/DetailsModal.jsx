import React from 'react';
import { Button, Upload, Divider, Table, Form, Input, Typography, Image } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { TextArea } = Input;

function ChecklistDetailsModal({data}) {

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
          render: (_) => <Typography.Text strong>{_ === true ? "✓" : ""}</Typography.Text>,
        },
        {
          title: 'No',
          width: '10%',
          dataIndex: 'status',
          render: (_) => <Typography.Text strong>{_ === false ? "✓" : ""}</Typography.Text>,
        },
        {
          title: 'Images',
          width: '30%',
          dataIndex: 'images',
          render: (src) => src?.map((img)=> <Image width={50} src={img}/>),
        }
      ]

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

return(<>
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
        </Form></>)
}

export default ChecklistDetailsModal;
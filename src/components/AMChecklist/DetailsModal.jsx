/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Row, Col, Button, Upload, Divider, Table, Form, Input, Typography, Image } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const URL =
  process.env.NODE_ENV === 'development'
    ? process.env.AUDITME_DEV_BE_URL
    : process.env.AUDITME_PROD_BE_URL;

const columns = [
  {
    title: 'Question',
    width: '50%',
    dataIndex: 'question',
    render: (_) => <Typography.Text strong>{_}</Typography.Text>,
  },
  {
    title: 'Yes',
    width: '10%',
    dataIndex: 'answer',
    render: (_) => <Typography.Text strong>{_ === true ? '✓' : ''}</Typography.Text>,
  },
  {
    title: 'No',
    width: '10%',
    dataIndex: 'answer',
    render: (_) => <Typography.Text strong>{_ === false ? '✓' : ''}</Typography.Text>,
  },
  {
    title: 'Images',
    width: '40%',
    dataIndex: 'images',
    render: (src) => (
      <Row gutter={[4, 4]}>
        {src?.map((img) => (
          <Col>
            <Image width={100} src={`${URL}${img}`} />
          </Col>
        ))}
      </Row>
    ),
  },
];

function ChecklistDetailsModal({ data }) {
  const questions = Object.keys(data)
    .filter((key) => key.includes('question'))
    .map((key, index) => ({
      key: `question${index + 1}`,
      question: data[key].text,
      answer: data[key].answer,
      images: data[key].images,
    }));

  const reviewersCommentProps = {
    name: 'evidencesAfter',
    listType: 'picture',
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={questions.slice(0, 4)}
        id="exterior"
        title={() => <Typography.Title level={5}>Housekeeping - Exterior</Typography.Title>}
        pagination={false}
      />
      <Table
        columns={columns}
        dataSource={questions.slice(4, 13)}
        id="customerLounge"
        title={() => <Typography.Title level={5}>Housekeeping - Customer Lounge</Typography.Title>}
        pagination={false}
      />
      <Table
        columns={columns}
        dataSource={questions.slice(13, 16)}
        id="comfortRoom"
        title={() => <Typography.Title level={5}>Housekeeping - Comfort Room</Typography.Title>}
        pagination={false}
      />
      <Table
        columns={columns}
        dataSource={questions.slice(16, 28)}
        id="bayArea"
        title={() => <Typography.Title level={5}>Housekeeping - Bay Area</Typography.Title>}
        pagination={false}
      />
      <Table
        columns={columns}
        dataSource={questions.slice(28, 32)}
        id="stockRoom"
        title={() => <Typography.Title level={5}>Housekeeping - Stock Room</Typography.Title>}
        pagination={false}
      />
      <Divider>Reviewer's Comment</Divider>
      <Form layout="vertical">
        <Form.Item
          name="comment"
          label="Enter Comment"
          rules={[{ required: true, message: 'Please enter comment' }]}
        >
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
    </>
  );
}

export default ChecklistDetailsModal;

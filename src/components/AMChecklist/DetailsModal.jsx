/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import {
  Row,
  Col,
  Button,
  Upload,
  Divider,
  Table,
  Form,
  Input,
  Typography,
  Image,
  Tooltip,
  Card,
  message,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';

import styles from './Checklist.less';

moment.locale('en');

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
          <Col key={img} className={styles.image_container}>
            <Image className={styles.image} width={100} height="auto" src={`${URL}${img}`} />
          </Col>
        ))}
      </Row>
    ),
  },
];

function ChecklistDetailsModal({ data, tableRef, closeModal }) {
  const [loading, setLoading] = useState(false);
  const [reviewImages, setReviewImages] = useState([]);

  // Extract all questions from the data
  const questions = Object.keys(data)
    .filter((key) => key.includes('question'))
    .map((key, index) => ({
      key: `question${index + 1}`,
      question: data[key].text,
      answer: data[key].answer,
      images: data[key].images,
    }));

  const imageUploadProps = {
    name: 'review',
    listType: 'picture',
    onRemove: (file) => {
      const index = reviewImages.indexOf(file);
      const newFileList = reviewImages.slice();
      newFileList.splice(index, 1);
      setReviewImages(newFileList);
    },
    beforeUpload: (file) => {
      if (file.type !== 'image/png' && file.type !== 'image/jpg' && file.type !== 'image/jpeg') {
        message.error(`Supported image formats are png, jpg and jpeg`);
        return;
      }
      setReviewImages([...reviewImages, file]);
      // eslint-disable-next-line consistent-return
      return false;
    },
    reviewImages,
  };

  const deleteChecklist = () => {
    setLoading(true);
    axios
      .delete(`${URL}/api/user/delete-checklist/${data._id}`, {
        headers: {
          Authorization: localStorage.userToken,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setLoading(false);
          message.success('Issue deleted successfully');
          closeModal({ status: false, data: {} });
          tableRef.current.reload();
        }
      })
      .catch(() => {
        message.error('Unable to delete the issue');
        setLoading(false);
      });
  };

  const addReview = (value) => {
    setLoading(true);

    const formData = new FormData();
    formData.append('comment', value?.comment);

    for (let i = 0; i < reviewImages.length; i += 1) {
      formData.append('images', reviewImages[i]);
    }

    axios
      .post(`${URL}/api/rm/checklist/add-review/${data._id}`, formData, {
        headers: { Authorization: localStorage.userToken },
      })
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          message.success('Review has been successfully published!');
          closeModal({ status: false, data: {} });
          tableRef.current.reload();
        }
      })
      .catch(() => {
        setLoading(false);
        message.error('Unable to publish review!', 10);
      });
  };

  return (
    <>
      {JSON.parse(localStorage.user).isAdmin && (
        <Row justify="end">
          <Col>
            <Button type="danger" loading={loading} onClick={deleteChecklist}>
              Delete
            </Button>
          </Col>
        </Row>
      )}
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
      {data.review ? (
        <Card>
          <Row gutter={[8, 8]}>
            <Col span={24}>
              Added by: <Typography.Text strong>{data.reviewerName}</Typography.Text>
            </Col>
            <Col span={24}>
              Time:{' '}
              <Typography.Text strong>
                {moment(data.review?.updateTime).format('Do MMMM, YYYY')}
              </Typography.Text>
            </Col>
            <Col span={24}>
              Comment: <Typography.Text strong>{data.review.comment}</Typography.Text>
            </Col>
            <Col span={24}>Images: </Col>
            <Row gutter={[2, 2]} style={{ marginRight: '4px', marginLeft: '4px' }}>
              {data.review?.images?.length > 0 ? (
                data.review?.images?.map((image) => (
                  <Col key={image} span={8} className={styles.image_container}>
                    <Image src={URL + image} width="90%" className={styles.image} />
                  </Col>
                ))
              ) : (
                <Col span={24}>
                  <Typography.Text strong>No image available</Typography.Text>
                </Col>
              )}
            </Row>
          </Row>
        </Card>
      ) : (
        <Form layout="vertical" onFinish={addReview}>
          <Form.Item
            name="comment"
            label="Enter Comment"
            rules={[{ required: true, message: 'Please enter comment' }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Upload {...imageUploadProps}>
            <Button icon={<UploadOutlined />}>Select multiple images</Button>
          </Upload>
          <Form.Item style={{ textAlign: 'right', marginTop: '10px' }}>
            {['rm'].includes(JSON.parse(localStorage.user).role) ? (
              <Button type="primary" htmlType="submit" loading={loading}>
                Submit
              </Button>
            ) : (
              <Tooltip title="Only a regional manager can add a checklist review">
                <Button type="primary" disabled>
                  Submit
                </Button>
              </Tooltip>
            )}
          </Form.Item>
        </Form>
      )}
    </>
  );
}

export default ChecklistDetailsModal;

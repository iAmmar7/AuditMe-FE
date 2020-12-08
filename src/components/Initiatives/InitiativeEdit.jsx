import React, { useState } from 'react';
import { Row, Col, Image, Typography, Tooltip, Upload, Button, message } from 'antd';
import { UploadOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import ProForm, {
  ProFormText,
  ProFormTextArea,
  ProFormDatePicker,
  ProFormSelect,
} from '@ant-design/pro-form';
import axios from 'axios';

import styles from './Initiatives.less';

const URL =
  process.env.NODE_ENV === 'development'
    ? process.env.AUDITME_DEV_BE_URL
    : process.env.AUDITME_PROD_BE_URL;

function InitiativeEdit({ item, tableRef, setFormDisabled }) {
  const [loading, setLoading] = useState(false);
  const [evidenceBeforeFileList, setEvidenceBeforeFileList] = useState([]);
  const [evidenceAfterFileList, setEvidenceAfterFileList] = useState([]);

  const updateInitiative = async (values) => {
    setLoading(true);

    const formData = new FormData();
    Object.keys(values).forEach((value) => {
      // Don't append images
      if (value !== 'evidencesBefore' && value !== 'evidencesAfter')
        formData.append(value, values[value]);
    });

    for (let i = 0; i < evidenceBeforeFileList.length; i += 1) {
      formData.append('evidencesBefore', evidenceBeforeFileList[i]);
    }

    for (let i = 0; i < evidenceAfterFileList.length; i += 1) {
      formData.append('evidencesAfter', evidenceAfterFileList[i]);
    }

    // Send axios request
    axios
      .post(`${URL}/api/auditor/update-initiative/${item._id}`, formData, {
        headers: { Authorization: localStorage.userToken },
      })
      .then((res) => {
        setLoading(false);
        setFormDisabled(true);
        tableRef.current.reload();
        if (res.data.success) {
          message.success('Initiative has been successfully updated!');
        }
      })
      .catch(() => {
        setLoading(false);
        message.error('Unable to update initiative, please try later!', 10);
      });
  };

  const evidencesBeforeProps = {
    name: 'evidencesBefore',
    listType: 'picture',
    onRemove: (file) => {
      const index = evidenceBeforeFileList.indexOf(file);
      const newFileList = evidenceBeforeFileList.slice();
      newFileList.splice(index, 1);
      setEvidenceBeforeFileList(newFileList);
    },
    beforeUpload: (file) => {
      if (file.type !== 'image/png' && file.type !== 'image/jpg' && file.type !== 'image/jpeg') {
        message.error(`Supported image formats are png, jpg and jpeg`);
      }
      setEvidenceBeforeFileList([...evidenceBeforeFileList, file]);
      return false;
    },
    evidenceBeforeFileList,
  };

  const evidencesAfterProps = {
    name: 'evidencesAfter',
    listType: 'picture',
    onRemove: (file) => {
      const index = evidenceAfterFileList.indexOf(file);
      const newFileList = evidenceAfterFileList.slice();
      newFileList.splice(index, 1);
      setEvidenceAfterFileList(newFileList);
    },
    beforeUpload: (file) => {
      if (file.type !== 'image/png' && file.type !== 'image/jpg' && file.type !== 'image/jpeg') {
        message.error(`Supported image formats are png, jpg and jpeg`);
      }
      setEvidenceAfterFileList([...evidenceAfterFileList, file]);
      return false;
    },
    evidenceAfterFileList,
  };

  return (
    <ProForm
      initialValues={{
        ...item,
      }}
      submitter={{
        render: (props) => (
          <Button
            type="primary"
            loading={loading}
            disabled={JSON.parse(localStorage.user).role === 'rm'}
            onClick={() => props.form.submit()}
          >
            Submit
          </Button>
        ),
      }}
      onFinish={updateInitiative}
    >
      <ProForm.Group>
        <ProFormDatePicker
          width="s"
          name="date"
          label="Date"
          placeholder="Select date"
          rules={[{ required: true, message: 'Please select date!' }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          name="region"
          label="Region"
          placeholder="Select region"
          options={[
            { value: 'Southern', label: 'Southern' },
            { value: 'CR-East', label: 'CR-East' },
            { value: 'CR-North', label: 'CR-North' },
            { value: 'CR-South', label: 'CR-South' },
            { value: 'ER-North', label: 'ER-North' },
            { value: 'ER-South', label: 'ER-South' },
            { value: 'WR-North', label: 'WR-North' },
            { value: 'WR-South', label: 'WR-South' },
          ]}
          rules={[{ required: true, message: 'Please select region!' }]}
        />
        <ProFormText
          name="areaManager"
          label="Area Manager"
          placeholder="Enter area manager"
          rules={[{ required: true, message: 'Please write area manager name!' }]}
        />
        <ProFormText
          name="regionalManager"
          label="Regional Manager"
          placeholder="Enter regional manager"
          rules={[{ required: true, message: 'Please write regional manager name!' }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          name="type"
          label="Type"
          placeholder="Select issue type......"
          options={[
            { value: 'Customer Experience', label: 'Customer Experience' },
            { value: 'Bay Violation', label: 'Bay Violation' },
            { value: 'Housekeeping', label: 'Housekeeping' },
            { value: 'Customer Mistreatment', label: 'Customer Mistreatment' },
            { value: 'Initiative', label: 'Initiative' },
            { value: 'Admin Issues', label: 'Admin Issues' },
            { value: 'Safety', label: 'Safety' },
            { value: 'Others', label: 'Others' },
          ]}
          rules={[{ required: true, message: 'Please select issue type!' }]}
        />
        <ProFormText
          name="stationNumber"
          label="Station/BE#"
          placeholder="Enter station"
          rules={[{ required: true, message: 'Please write station!' }]}
        />
      </ProForm.Group>
      <ProFormTextArea
        width=" xl "
        name="details"
        label="Initiatives / Improvements / Action Taken"
        placeholder="Add initiative details"
        rules={[{ required: true, message: 'Please write initiative detail!' }]}
      />
      <Typography.Text>Evidence Before </Typography.Text>
      <Tooltip title="Supported extensions are .jpg .jpeg .png">
        <QuestionCircleOutlined style={{ color: '#959595' }} />
      </Tooltip>{' '}
      <Upload {...evidencesBeforeProps}>
        <Button icon={<UploadOutlined />}>Select multiple images</Button>
      </Upload>
      <Row style={{ margin: '15px 0px' }} gutter={[8, 8]}>
        {item?.evidencesBefore?.length > 0
          ? item?.evidencesBefore?.map((image) => (
              <Col key={image} className={styles.issue_image_container}>
                <Image src={URL + image} className={styles.issue_image} />
              </Col>
            ))
          : null}
      </Row>
      <Typography.Text>Evidence After </Typography.Text>
      <Tooltip title="Supported extensions are .jpg .jpeg .png">
        <QuestionCircleOutlined style={{ color: '#959595' }} />
      </Tooltip>{' '}
      <Upload {...evidencesAfterProps}>
        <Button icon={<UploadOutlined />}>Select multiple images</Button>
      </Upload>
      <Row style={{ margin: '15px 0px' }} gutter={[8, 8]}>
        {item?.evidencesAfter?.length > 0
          ? item?.evidencesAfter?.map((image) => (
              <Col key={image} className={styles.issue_image_container}>
                <Image src={URL + image} className={styles.issue_image} />
              </Col>
            ))
          : null}
      </Row>
    </ProForm>
  );
}

export default InitiativeEdit;

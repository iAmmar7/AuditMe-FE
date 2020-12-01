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

import styles from './Priorities.less';

const URL =
  process.env.NODE_ENV === 'development'
    ? process.env.AUDITME_DEV_BE_URL
    : process.env.AUDITME_PROD_BE_URL;

function IssueForm({ item, tableRef, setFormDisabled }) {
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState(item);
  // const [statusPending, setStatusPending] = useState(true);
  const [evidenceBeforeFileList, setEvidenceBeforeFileList] = useState([]);
  const [evidenceAfterFileList, setEvidenceAfterFileList] = useState([]);

  const updateFormByAuditor = async (values) => {
    setLoading(true);

    const formData = new FormData();
    Object.keys(values).forEach((value) => {
      // Don't append images
      if (value !== 'evidencesBefore') formData.append(value, values[value]);
    });

    for (let i = 0; i < evidenceBeforeFileList.length; i += 1) {
      formData.append('evidencesBefore', evidenceBeforeFileList[i]);
    }

    // Send axios request
    axios
      .post(`${URL}/api/auditor/update-issue/${item._id}`, formData, {
        headers: { Authorization: localStorage.userToken },
      })
      .then((res) => {
        setLoading(false);
        setFormDisabled(true);
        tableRef.current.reload();
        if (res.data.success) {
          message.success('Issue has been successfully updated!');
        }
      })
      .catch((error) => {
        setLoading(false);
        message.error('Unable to update issue, please try later!', 10);
      });
  };

  const updateFormByRM = async (values) => {
    setLoading(true);

    const formData = new FormData();
    Object.keys(values).forEach((value) => {
      // Don't append images
      if (value !== 'evidencesAfter') formData.append(value, values[value]);
    });

    for (let i = 0; i < evidenceAfterFileList.length; i += 1) {
      formData.append('evidencesAfter', evidenceAfterFileList[i]);
    }

    // Send axios request
    axios
      .post(`${URL}/api/rm/update-issue/${item._id}`, formData, {
        headers: { Authorization: localStorage.userToken },
      })
      .then((res) => {
        setLoading(false);
        setFormDisabled(true);
        tableRef.current.reload();
        if (res.data.success) {
          message.success('Issue has been successfully updated!');
        }
      })
      .catch((error) => {
        setLoading(false);
        message.error('Unable to update issue, please try later!', 10);
      });
  };

  if (JSON.parse(localStorage.user).role === 'auditor') {
    const evidencesProps = {
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

    return (
      <ProForm
        initialValues={{
          ...initialValues,
        }}
        submitter={{
          submitButtonProps: {
            loading,
          },
          resetButtonProps: {
            loading,
          },
          onReset: () => setInitialValues({}),
        }}
        onFinish={updateFormByAuditor}
      >
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
          <ProFormText
            name="processSpecialist"
            label="Process Specialist"
            placeholder="Enter process specialist"
            rules={[{ required: true, message: 'Please write process specialist name!' }]}
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
          name="issueDetails"
          label="Priority Issue Details"
          placeholder="Add issue details"
          rules={[{ required: true, message: 'Please select date!' }]}
        />
        <ProForm.Group>
          <ProFormDatePicker
            width="s"
            name="dateIdentified"
            label="Date Identified/Listed"
            placeholder="Select date"
            rules={[{ required: true, message: 'Please select date!' }]}
          />
        </ProForm.Group>
        <Typography.Text>Evidence </Typography.Text>
        <Tooltip title="Supported extensions are .jpg .jpeg .png">
          <QuestionCircleOutlined style={{ color: '#959595' }} />
        </Tooltip>{' '}
        <Upload {...evidencesProps}>
          <Button icon={<UploadOutlined />}>Select Image</Button>
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
      </ProForm>
    );
  }

  if (JSON.parse(localStorage.user).role === 'rm') {
    const evidencesProps = {
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
          ...initialValues,
          status: 'Resolved',
        }}
        submitter={{
          submitButtonProps: {
            loading,
          },
          resetButtonProps: {
            loading,
          },
          onReset: () => setInitialValues({}),
        }}
        onFinish={updateFormByRM}
      >
        <ProForm.Group>
          <ProFormTextArea
            width="l"
            name="actionTaken"
            label="Action Taken"
            placeholder="Write taken action"
            rules={[{ required: true, message: 'Please write taken action!' }]}
          />
          <ProFormTextArea
            width="l"
            name="feedback"
            label="Feedback from Sales Operation"
            placeholder="Write feedback"
            rules={[{ required: true, message: 'Please write feedback!' }]}
          />
        </ProForm.Group>
        <Typography.Text>Evidence </Typography.Text>
        <Tooltip title="Supported extensions are .jpg .jpeg .png">
          <QuestionCircleOutlined style={{ color: '#959595' }} />
        </Tooltip>{' '}
        <Upload {...evidencesProps}>
          <Button icon={<UploadOutlined />}>Select Image</Button>
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
        <ProForm.Group>
          <ProFormSelect
            disabled
            width="s"
            options={[
              {
                value: 'Pending',
                label: 'Pending',
              },
              {
                value: 'Resolved',
                label: 'Resolved',
              },
            ]}
            name="status"
            label="Status"
            placeholder="Select..."
            rules={[{ required: true, message: 'Status is required!' }]}
          />
          <ProFormDatePicker
            width="s"
            name="dateOfClosure"
            label="Date of Closure"
            placeholder="Select date"
            tooltip="If status is resolved, date of closure is required"
            rules={[{ required: true, message: 'Please select date!' }]}
          />
        </ProForm.Group>
      </ProForm>
    );
  }
}

export default IssueForm;

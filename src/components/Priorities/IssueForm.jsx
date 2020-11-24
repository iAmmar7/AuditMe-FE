import React, { useState } from 'react';
import { Row, Col, Image, message } from 'antd';
import ProForm, {
  ProFormText,
  ProFormUploadButton,
  ProFormDigit,
  ProFormTextArea,
  ProFormDatePicker,
  ProFormSelect,
} from '@ant-design/pro-form';
import moment from 'moment';
import axios from 'axios';
import styles from './IssueDetail.less';

const URL =
  process.env.NODE_ENV === 'development'
    ? process.env.AUDITME_DEV_BE_URL
    : process.env.AUDITME_PROD_BE_URL;

function IssueForm({ item }) {
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState(item);
  const [statusPending, setStatusPending] = useState(true);
  const [evidencesBeforeLimitReached, setEvidencesBeforeLimitReached] = useState(
    item?.evidencesBefore?.length === 5,
  );
  const [evidencesAfterLimitReached, setEvidencesAfterLimitReached] = useState(
    item?.evidencesAfter?.length === 5,
  );

  const submitForm = async (values) => {
    setLoading(true);

    const formData = new FormData();
    Object.keys(values).forEach((value) => {
      // Extract week from Date.Week picker
      if (value === 'week') {
        formData.append(value, moment(values[value], 'YYYY-WW').utcOffset(0).week());
      }

      // Don't append images
      else if (value !== 'evidencesBefore' && value !== 'evidencesAfter')
        formData.append(value, values[value]);
    });

    // Append evidenc before images
    if (values.evidencesBefore) {
      for (let i = 0; i < values.evidencesBefore.length; i += 1) {
        formData.append(
          'evidencesBefore',
          values.evidencesBefore[i].originFileObj,
          values.evidencesBefore[i].originFileObj.name,
        );
      }
    }

    // Append evidenc after images
    if (values.evidencesAfter) {
      for (let i = 0; i < values.evidencesAfter.length; i += 1) {
        formData.append(
          'evidencesAfter',
          values.evidencesAfter[i].originFileObj,
          values.evidencesAfter[i].originFileObj.name,
        );
      }
    }

    // Set axios header with token
    axios.defaults.headers.common.Authorization = localStorage.userToken;
    axios
      .post(`${URL}/api/user/priority-report/${item._id}`, formData)
      .then((res) => {
        setLoading(false);
        if (res.data.success) message.success('Issue has been successfully updated!');
      })
      .catch(() => {
        setLoading(false);
        message.error('Unable to unable issue, please try later!', 10);
      });
  };

  return (
    <ProForm
      initialValues={{
        ...initialValues,
        evidencesBefore: [],
        evidencesAfter: [],
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
      onFinish={submitForm}
      onValuesChange={(_, values) => {
        if (values.evidencesBefore?.length + item?.evidencesBefore?.length === 5) {
          setEvidencesBeforeLimitReached(true);
        }

        if (values.evidencesAfter?.length + item?.evidencesAfter?.length === 5) {
          setEvidencesAfterLimitReached(true);
        }

        // If status is resolved then date of closure is required
        if (values.status === 'Resolved') {
          setStatusPending(false);
        } else {
          setStatusPending(true);
        }
      }}
    >
      <ProForm.Group>
        <ProFormDatePicker
          width="s"
          name="date"
          label="Date"
          placeholder="Select date"
          rules={[{ required: true, message: 'Please select date!' }]}
        />
        <ProFormDatePicker.Week width="s" name="week" label="Week" placeholder="Select week" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText name="region" label="Region" placeholder="Enter a region" />
        <ProFormText name="areaManager" label="Area Manager" placeholder="Enter area manager" />
        <ProFormText
          name="regionalManager"
          label="Regional Manager"
          placeholder="Enter regional manager"
        />
        <ProFormText
          name="processSpecialist"
          label="Process Specialist"
          placeholder="Enter process specialist"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          name="type"
          label="Type"
          placeholder="Enter type"
          rules={[{ required: true, message: 'Please enter type!' }]}
        />
        <ProFormText name="stationNumber" label="Station/BE#" placeholder="Enter station" />
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
      <ProFormUploadButton
        disabled={evidencesBeforeLimitReached}
        extra="Support extension: .jpg .jpeg .png"
        label="Evidences Before"
        name="evidencesBefore"
        title="Upload"
        tooltip="You can upload upto 5 images"
      />
      <Row style={{ marginBottom: '15px' }} gutter={[8, 8]}>
        {item?.evidencesBefore?.length > 0
          ? item?.evidencesBefore?.map((image) => (
              <Col key={image} className={styles.issue_image_container}>
                <Image src={URL + image} className={styles.issue_image} />
              </Col>
            ))
          : null}
      </Row>
      <ProFormUploadButton
        disabled={evidencesAfterLimitReached}
        extra="Support extension: .jpg .jpeg .png"
        label="Evidences After"
        name="evidencesAfter"
        title="Upload"
        tooltip="You can upload upto 5 images"
      />
      <Row style={{ marginBottom: '15px' }} gutter={[8, 8]}>
        {item?.evidencesAfter?.length > 0
          ? item?.evidencesAfter?.map((image) => (
              <Col key={image} className={styles.issue_image_container}>
                <Image src={URL + image} className={styles.issue_image} />
              </Col>
            ))
          : null}
      </Row>
      <ProForm.Group>
        <ProFormTextArea
          width="l"
          name="actionTaken"
          label="Action Taken"
          placeholder="Write taken action"
          rules={[{ required: true, message: 'Please select date!' }]}
        />
        <ProFormTextArea
          width="l"
          name="feedback"
          label="Feedback from Sales Operation"
          placeholder="Write feedback"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
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
        <ProFormDigit
          disabled={statusPending}
          name="daysOpen"
          label="Days Open"
          placeholder="Enter days"
          rules={[{ required: !statusPending, message: 'Please select date!' }]}
          tooltip="If status is resolved, please enter days open"
        />
        <ProFormDatePicker
          disabled={statusPending}
          width="s"
          name="dateOfClosure"
          label="Date of Closure"
          placeholder="Select date"
          rules={[{ required: !statusPending, message: 'Please select date!' }]}
          tooltip="If status is resolved, please enter the date of closure"
        />
      </ProForm.Group>
    </ProForm>
  );
}

export default IssueForm;

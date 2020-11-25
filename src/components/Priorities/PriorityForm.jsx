import React from 'react';
import ProForm, {
  ProFormText,
  ProFormUploadButton,
  ProFormDigit,
  ProFormTextArea,
  ProFormDatePicker,
  ProFormSelect,
} from '@ant-design/pro-form';
import { Row, Col } from 'antd';
import { FooterToolbar } from '@ant-design/pro-layout';
import moment from 'moment';

function PriorityForm(props) {
  const {
    loading,
    submitForm,
    statusPending,
    setStatusPending,
    evidencesBeforeLimitReached,
    setEvidencesBeforeLimitReached,
    evidencesAfterLimitReached,
    setEvidencesAfterLimitReached,
  } = props;

  return (
    <ProForm
      initialValues={{
        date: moment().format('YYYY-MM-DD'),
        type: 'Housekeeping',
        issueDetails: 'Test details',
        dateIdentified: '2020-11-19',
        actionTaken: 'None',
      }}
      submitter={{
        render: (_, dom) => <FooterToolbar> {dom} </FooterToolbar>,
        submitButtonProps: {
          loading,
        },
      }}
      onFinish={submitForm}
      onValuesChange={(values) => {
        if (values.evidencesBefore?.length === 5) {
          setEvidencesBeforeLimitReached(true);
        }

        if (values.evidencesAfter?.length === 5) {
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
      <ProFormUploadButton
        disabled={evidencesAfterLimitReached}
        extra="Support extension: .jpg .jpeg .png"
        label="Evidences After"
        name="evidencesAfter"
        title="Upload"
        tooltip="You can upload upto 5 images"
      />
      <Row gutter={16}>
        <Col>
          <ProFormTextArea
            width="l"
            name="actionTaken"
            label="Action Taken"
            placeholder="Write taken action"
            rules={[{ required: true, message: 'Please select date!' }]}
          />
        </Col>
        <Col>
          <ProFormTextArea
            width="l"
            name="feedback"
            label="Feedback from Sales Operation"
            placeholder="Write feedback"
          />
        </Col>
      </Row>
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
          initialValue="Pending"
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
          width="s"
          disabled={statusPending}
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

export default PriorityForm;

import React, { useEffect } from 'react';
import ProForm, {
  ProFormText,
  // ProFormUploadButton,
  ProFormDigit,
  ProFormTextArea,
  ProFormDatePicker,
  ProFormSelect,
} from '@ant-design/pro-form';
import { Row, Col, Upload, Button, Typography, Tooltip, message } from 'antd';
import { UploadOutlined, QuestionCircleOutlined } from '@ant-design/icons';
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
    evidBeforeFileList,
    setEvidBeforeFileList,
    evidAfterFileList,
    setEvidAfterFileList,
  } = props;

  useEffect(() => {
    if (evidBeforeFileList.length === 5) {
      setEvidencesBeforeLimitReached(true);
    }
  }, [evidBeforeFileList]);

  useEffect(() => {
    if (evidAfterFileList.length === 5) {
      setEvidencesAfterLimitReached(true);
    }
  }, [evidAfterFileList]);

  const evidencesBeforeProps = {
    name: 'evidencesBefore',
    listType: 'picture',
    onRemove: (file) => {
      const index = evidBeforeFileList.indexOf(file);
      const newFileList = evidBeforeFileList.slice();
      newFileList.splice(index, 1);
      setEvidBeforeFileList(newFileList);
    },
    beforeUpload: (file) => {
      if (file.type !== 'image/png' && file.type !== 'image/jpg' && file.type !== 'image/jpeg') {
        message.error(`Supported image formats are png, jpg and jpeg`);
      } else {
        setEvidBeforeFileList([...evidBeforeFileList, file]);
        return false;
      }
    },
    evidBeforeFileList,
  };

  // const evidencesAfterProps = {
  //   name: 'evidencesBefore',
  //   listType: 'picture',
  //   onRemove: (file) => {
  //     const index = evidAfterFileList.indexOf(file);
  //     const newFileList = evidAfterFileList.slice();
  //     newFileList.splice(index, 1);
  //     setEvidAfterFileList(newFileList);
  //   },
  //   beforeUpload: (file) => {
  //     if (file.type !== 'image/png' && file.type !== 'image/jpg' && file.type !== 'image/jpeg') {
  //       message.error(`Supported image formats are png, jpg and jpeg`);
  //     } else {
  //       setEvidAfterFileList([...evidAfterFileList, file]);
  //       return false;
  //     }
  //   },
  //   evidAfterFileList,
  // };

  return (
    <ProForm
      initialValues={{
        date: moment().format('YYYY-MM-DD'),
        // type: 'Housekeeping',
        // issueDetails: 'Test details',
        // dateIdentified: '2020-11-19',
        // actionTaken: 'None',
      }}
      submitter={{
        render: (_, dom) => <FooterToolbar> {dom} </FooterToolbar>,
        submitButtonProps: {
          loading,
        },
      }}
      onFinish={submitForm}
    >
      {/* <ProForm.Group>
        <ProFormDatePicker
          width="s"
          name="date"
          label="Date"
          placeholder="Select date"
          rules={[{ required: true, message: 'Please select date!' }]}
        />
        <ProFormDatePicker.Week width="s" name="week" label="Week" placeholder="Select week" />
      </ProForm.Group> */}
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
      {/* <ProFormUploadButton
        onChange={(item) => {
          console.log(item);
        }}
        disabled={evidencesBeforeLimitReached}
        extra="Support extension: .jpg .jpeg .png"
        label="Evidences Before"
        name="evidencesBefore"
        title="Upload"
        tooltip="You can upload upto 5 images"
      /> */}
      <Typography.Text>Evidence </Typography.Text>
      <Tooltip title="Supported extensions are .jpg .jpeg .png">
        <QuestionCircleOutlined style={{ color: '#959595' }} />
      </Tooltip>{' '}
      <Upload {...evidencesBeforeProps}>
        <Button disabled={evidencesBeforeLimitReached} icon={<UploadOutlined />}>
          Select Image
        </Button>
      </Upload>
      {/* <ProFormUploadButton
        disabled={evidencesAfterLimitReached}
        extra="Support extension: .jpg .jpeg .png"
        label="Evidences After"
        name="evidencesAfter"
        title="Upload"
        tooltip="You can upload upto 5 images"
      /> */}
      {/*<div style={{ marginBottom: '20px' }}>
        <Typography.Text>Evidences After </Typography.Text>
        <Tooltip title="You can upload upto 5 images, supported extensions are .jpg .jpeg .png">
          <QuestionCircleOutlined style={{ color: '#959595' }} />
        </Tooltip>{' '}
        <Upload {...evidencesAfterProps}>
          <Button disabled={evidencesAfterLimitReached} icon={<UploadOutlined />}>
            Select Image
          </Button>
        </Upload>
      </div>
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
      </ProForm.Group> */}
    </ProForm>
  );
}

export default PriorityForm;

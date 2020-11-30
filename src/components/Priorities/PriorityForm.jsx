import React from 'react';
import ProForm, {
  ProFormText,
  ProFormTextArea,
  ProFormDatePicker,
  ProFormSelect,
} from '@ant-design/pro-form';
import { Upload, Button, Typography, Tooltip, message } from 'antd';
import { UploadOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { FooterToolbar } from '@ant-design/pro-layout';

function PriorityForm(props) {
  const { loading, submitForm, evidenceFileList, setEvidenceFileList } = props;

  const evidencesProps = {
    name: 'evidences',
    listType: 'picture',
    onRemove: (file) => {
      const index = evidenceFileList.indexOf(file);
      const newFileList = evidenceFileList.slice();
      newFileList.splice(index, 1);
      setEvidenceFileList(newFileList);
    },
    beforeUpload: (file) => {
      if (file.type !== 'image/png' && file.type !== 'image/jpg' && file.type !== 'image/jpeg') {
        message.error(`Supported image formats are png, jpg and jpeg`);
        return;
      }
      setEvidenceFileList([...evidenceFileList, file]);
      return false;
    },
    evidenceFileList,
  };

  return (
    <ProForm
      initialValues={
        {
          // region: 'CR-North',
          // areaManager: 'John Doe AM',
          // regionalManager: 'John Doe RM',
          // processSpecialist: 'John Doe PS',
          // stationNumber: 'Test123',
          // issueDetails: 'Test details',
          // type: 'Initiative',
          // dateIdentified: '2020-11-19',
        }
      }
      submitter={{
        render: (_, dom) => <FooterToolbar> {dom} </FooterToolbar>,
        submitButtonProps: {
          loading,
        },
      }}
      onFinish={submitForm}
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
    </ProForm>
  );
}

export default PriorityForm;

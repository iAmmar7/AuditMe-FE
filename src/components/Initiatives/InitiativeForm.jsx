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

function InitiativeForm(props) {
  const {
    loading,
    submitForm,
    evidenceBeforeFileList,
    setEvidenceBeforeFileList,
    evidenceAfterFileList,
    setEvidenceAfterFileList,
  } = props;

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
        return;
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
        return;
      }
      setEvidenceAfterFileList([...evidenceAfterFileList, file]);
      // eslint-disable-next-line consistent-return
      return false;
    },
    evidenceAfterFileList,
  };

  return (
    <ProForm
      initialValues={
        {
          // date: moment().format('YYYY-MM-DD'),
          // region: 'CR-North',
          // areaManager: 'John Doe AM',
          // regionalManager: 'John Doe RM',
          // stationNumber: 'Test123',
          // details: 'Test initiative details',
          // type: 'Initiative',
          // dateIdentified: '2020-11-19',
          // actionTaken: 'Test action',
        }
      }
      submitter={{
        render: (submitProps) => {
          return (
            <FooterToolbar>
              <Button
                type="secondary"
                loading={loading}
                disabled={JSON.parse(localStorage.user).role === 'rm'}
                onClick={() => submitProps?.form?.resetFields()}
              >
                Reset
              </Button>
              <Button
                type="primary"
                loading={loading}
                disabled={JSON.parse(localStorage.user).role === 'rm'}
                onClick={() => submitProps.form.submit()}
              >
                Submit
              </Button>
            </FooterToolbar>
          );
        },
      }}
      onFinish={submitForm}
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
          placeholder="Select issue type....      ...."
          options={[
            { value: 'Customer Experience', label: 'Customer Experience' },
            { value: 'Bay Violation', label: 'Bay Violation' },
            { value: 'Housekeeping', label: 'Housekeeping' },
            { value: 'Customer Mistreatment', label: 'Customer Mistreatment' },
            { value: 'Initiative', label: 'Initiative' },
            { value: 'Admin Issues', label: 'Admin Issues' },
            { value: 'Maintenance Issues', label: 'Maintenance Issues' },
            { value: 'IT Issues', label: 'IT Issues' },
            { value: 'Inventory Issues', label: 'Inventory Issues' },
            { value: 'Violation', label: 'Violation' },
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
        rules={[{ required: true, message: 'Please write initiative details!' }]}
      />

      <div style={{ marginBottom: '20px' }}>
        <Typography.Text>Evidence Before </Typography.Text>
        <Tooltip title="Supported extensions are .jpg .jpeg .png">
          <QuestionCircleOutlined style={{ color: '#959595' }} />
        </Tooltip>{' '}
        <Upload {...evidencesBeforeProps}>
          <Button icon={<UploadOutlined />}>Select multiple images</Button>
        </Upload>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <Typography.Text>Evidence After </Typography.Text>
        <Tooltip title="Supported extensions are .jpg .jpeg .png">
          <QuestionCircleOutlined style={{ color: '#959595' }} />
        </Tooltip>{' '}
        <Upload {...evidencesAfterProps}>
          <Button icon={<UploadOutlined />}>Select multiple images</Button>
        </Upload>
      </div>
    </ProForm>
  );
}

export default InitiativeForm;

import { useAppContext } from '@/contexts/AppContext';
import { regionSelectOptions } from '@/utils/constants';
import { QuestionCircleOutlined, UploadOutlined } from '@ant-design/icons';
import ProForm, {
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { FooterToolbar } from '@ant-design/pro-layout';
import { Button, message, Tooltip, Typography, Upload } from 'antd';

function InitiativeForm(props) {
  const {
    loading,
    submitForm,
    managers,
    evidenceBeforeFileList,
    setEvidenceBeforeFileList,
    evidenceAfterFileList,
    setEvidenceAfterFileList,
  } = props;
  const { user } = useAppContext();

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
      // eslint-disable-next-line consistent-return
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
          // date: '2023-03-23',
          // region: 'CR-North',
          // areaManager: 'John Doe AM',
          // regionalManager: 'John Doe RM',
          // stationNumber: 'Test123',
          // details: 'Test initiative details',
          // type: 'Initiative',
          // dateIdentified: '2023-03-19',
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
                disabled={user.role !== 'auditor'}
                onClick={() => submitProps?.form?.resetFields()}
              >
                Reset
              </Button>
              <Button
                type="primary"
                loading={loading}
                disabled={user.role !== 'auditor'}
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
          options={regionSelectOptions}
          rules={[{ required: true, message: 'Please select region!' }]}
          style={{ width: '150px' }}
        />
        <ProFormSelect
          name="areaManager"
          label="Area Manager"
          placeholder="Select area manager"
          options={managers.am.map((user) => ({ value: user.name, label: user.name }))}
          rules={[{ required: true, message: 'Please select area manager name!' }]}
          style={{ width: '250px' }}
        />
        <ProFormSelect
          name="regionalManager"
          label="Regional Manager"
          placeholder="Select regional manager"
          options={managers.rm.map((user) => ({ value: user.name, label: user.name }))}
          rules={[{ required: true, message: 'Please select regional manager name!' }]}
          style={{ width: '250px' }}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          name="type"
          label="Type"
          placeholder="Select issue type....      ...."
          options={[
            { value: 'Customer Experience', label: 'Customer Experience' },
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

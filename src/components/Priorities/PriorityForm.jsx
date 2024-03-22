import { useAppContext } from '@/contexts/AppContext';
import { issuePriorityOptions, issueTypeOptions, regionSelectOptions } from '@/utils/constants';
import { QuestionCircleOutlined, UploadOutlined } from '@ant-design/icons';
import ProForm, {
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { FooterToolbar } from '@ant-design/pro-layout';
import { Button, Form, message, Tooltip, Typography, Upload } from 'antd';
import moment from 'moment';

function PriorityForm(props) {
  const { user } = useAppContext();
  const [form] = Form.useForm();
  // const [disabled, setDisabled] = useState([]);

  const { loading, managers, submitForm, evidenceFileList, setEvidenceFileList } = props;

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
      form={form}
      initialValues={{
        // region: 'CR-North',
        // areaManager: 'John Doe AM',
        // regionalManager: 'John Doe RM',
        // processSpecialist: 'John Doe PS',
        // stationNumber: 'Test123',
        // issueDetails: 'Test details',
        // type: 'Initiative',
        // dateIdentified: '2023-03-19',
        // date: '2023-03-23',
        priority: 'Priority',
      }}
      submitter={{
        render: (submitProps) => {
          return (
            <FooterToolbar>
              <Button
                type="secondary"
                loading={loading}
                disabled={!['auditor', 'sm'].includes(user.role)}
                onClick={() => submitProps?.form?.resetFields()}
              >
                Reset
              </Button>
              <Button
                type="primary"
                loading={loading}
                disabled={!['auditor', 'sm'].includes(user.role)}
                onClick={() => submitProps?.form?.submit()}
              >
                Submit
              </Button>
            </FooterToolbar>
          );
        },
      }}
      onFinish={submitForm}
      onValuesChange={(changedValues, allValues) => {
        const { date, dateIdentified } = allValues;

        // If dateIdentified is greater than date then throw error
        if (dateIdentified && moment(date)?.diff(dateIdentified, 'days') < 0) {
          form.setFieldsValue({ dateIdentified: null });
          message.error('Date identified can not be greater than date');
        }

        // If date is 3 days older than today then change issue priority and disabled field
        // if (moment().diff(date, 'days') > 2) {
        //   form.setFieldsValue({ priority: 'Priority' });
        //   setDisabled([...disabled, 'priority']);
        // } else setDisabled([...disabled.filter((item) => item !== 'priority')]);
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
          placeholder="Select issue type"
          options={issueTypeOptions}
          rules={[{ required: true, message: 'Please select issue type!' }]}
          style={{ width: '250px' }}
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
        rules={[{ required: true, message: 'Please write issue details!' }]}
      />
      <ProForm.Group>
        <ProFormDatePicker
          width="s"
          name="dateIdentified"
          label="Date Identified/Listed"
          placeholder="Select date"
          rules={[{ required: true, message: 'Please select date!' }]}
        />
        <ProFormSelect
          width="s"
          name="priority"
          label="Priority"
          placeholder="Select Priority"
          // disabled={disabled.includes('priority')}
          disabled
          options={issuePriorityOptions}
          rules={[{ required: true, message: 'Please select issue priority!' }]}
        />
      </ProForm.Group>
      <Typography.Text>Evidence </Typography.Text>
      <Tooltip title="Supported extensions are .jpg .jpeg .png">
        <QuestionCircleOutlined style={{ color: '#959595' }} />
      </Tooltip>{' '}
      <Upload {...evidencesProps}>
        <Button icon={<UploadOutlined />}>Select multiple images</Button>
      </Upload>
    </ProForm>
  );
}

export default PriorityForm;

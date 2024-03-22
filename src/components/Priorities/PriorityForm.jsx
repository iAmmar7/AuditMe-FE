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

function PriorityForm(props) {
  const { user } = useAppContext();
  const [form] = Form.useForm();
  // const [disabled, setDisabled] = useState([]);

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
      form={form}
      initialValues={{
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
        if (dateIdentified && date?.diff(dateIdentified, 'days') < 0) {
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
          placeholder="Select issue type of this report"
          options={issueTypeOptions}
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

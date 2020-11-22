import React from 'react';
import ProForm, {
  ProFormText,
  ProFormUploadButton,
  ProFormDigit,
  ProFormTextArea,
  ProFormDatePicker,
} from '@ant-design/pro-form';
import { PageHeaderWrapper, FooterToolbar } from '@ant-design/pro-layout';
import { Card } from 'antd';

const PrioritiesForm = () => {
  return (
    <PageHeaderWrapper content="Raise an issue here by completing the form below">
      <Card>
        {/* Form start */}
        <ProForm
          submitter={{
            render: (_, dom) => <FooterToolbar> {dom} </FooterToolbar>,
          }}
          onFinish={async (values) => console.log(values)}
        >
          <ProForm.Group>
            <ProFormDatePicker
              width="s"
              name="date"
              label="Date"
              placeholder="Select date"
              rules={[{ required: true, message: 'Please select date!' }]}
            />
            <ProFormDatePicker.Week
              width="s"
              name="dateWeek"
              label="Week"
              placeholder="Select week"
            />
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
            name="detail"
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
            extra="Support extension: .jpg .jpeg .png"
            label="Evidences Before"
            name="evidencedBefore"
            title="Upload"
            tooltip="You can upload upto 10 files/images"
          />
          <ProFormUploadButton
            extra="Support extension: .jpg .jpeg .png"
            label="Evidences After"
            name="evidencedAfter"
            title="Upload"
            tooltip="You can upload upto 10 files/images"
          />
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
            <ProFormDigit name="daysOpen" label="Days Open" placeholder="Enter days" />
            <ProFormDatePicker
              width="s"
              name="dateOfClosure"
              label="Date of Closure"
              placeholder="Select date"
            />
          </ProForm.Group>
        </ProForm>
        {/* Form end */}
      </Card>
    </PageHeaderWrapper>
  );
};

export default PrioritiesForm;

import React, { useState } from 'react';
import { Card, Row, Col, Typography, Switch } from 'antd';
import ProForm, {
  ProFormText,
  ProFormUploadButton,
  ProFormDigit,
  ProFormTextArea,
  ProFormDatePicker,
  ProFormSelect,
} from '@ant-design/pro-form';
import IssueDetail from './IssueDetail';

function PriorityDetails({ item }) {
  const [formDisabled, setFormDisabled] = useState(true);

  return (
    <Card>
      <Row justify="center" align="end">
        <Col offset={1} style={{ paddingTop: '2px', marginRight: '4px' }}>
          <Typography.Text>Edit Mode</Typography.Text>
        </Col>
        <Col>
          <Switch
            checkedChildren="Off"
            unCheckedChildren="On"
            defaultChecked={false}
            onClick={() => setFormDisabled(!formDisabled)}
          />
        </Col>
      </Row>

      {formDisabled ? (
        <IssueDetail item={item} />
      ) : (
        <ProForm
          initialValues={{
            ...item,
            evidencesBefore: [],
            evidencesAfter: [],
          }}
          submitter={{
            // render: (_, dom) => <FooterToolbar> {dom} </FooterToolbar>,
            submitButtonProps: {
              // loading,
            },
          }}
          // onFinish={submitForm}
          onValuesChange={(values) => {
            console.log(values);
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
            extra="Support extension: .jpg .jpeg .png"
            label="Evidences Before"
            name="evidencesBefore"
            title="Upload"
            tooltip="You can upload upto 5 files/images"
          />
          <ProFormUploadButton
            extra="Support extension: .jpg .jpeg .png"
            label="Evidences After"
            name="evidencesAfter"
            title="Upload"
            tooltip="You can upload upto 5 files/images"
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
              name="daysOpen"
              label="Days Open"
              placeholder="Enter days"
              tooltip="If status is resolved, please enter days open"
            />
            <ProFormDatePicker
              width="s"
              name="dateOfClosure"
              label="Date of Closure"
              placeholder="Select date"
              tooltip="If status is resolved, please enter the date of closure"
            />
          </ProForm.Group>
        </ProForm>
      )}
    </Card>
  );
}

export default PriorityDetails;

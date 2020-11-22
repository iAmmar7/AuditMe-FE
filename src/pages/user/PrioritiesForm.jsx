import React, { useState } from 'react';
import ProForm, {
  ProFormText,
  ProFormUploadButton,
  ProFormDigit,
  ProFormTextArea,
  ProFormDatePicker,
  ProFormSelect,
} from '@ant-design/pro-form';
import { PageHeaderWrapper, FooterToolbar } from '@ant-design/pro-layout';
import { Card, message } from 'antd';
import moment from 'moment';
import axios from 'axios';

const URL =
  process.env.NODE_ENV === 'development'
    ? process.env.AUDITME_DEV_BE_URL
    : process.env.AUDITME_PROD_BE_URL;

const PrioritiesForm = () => {
  const [loading, setLoading] = useState(false);
  const [statusPending, setStatusPending] = useState(true);
  const [evidencesBeforeLimitReached, setEvidencesBeforeLimitReached] = useState(false);
  const [evidencesAfterLimitReached, setEvidencesAfterLimitReached] = useState(false);

  const submitForm = async (values) => {
    setLoading(true);

    const formData = new FormData();
    Object.keys(values).forEach((item) => {
      // Extract week from Date.Week picker
      if (item === 'week') {
        formData.append(item, moment(values[item], 'YYYY-WW').utcOffset(0).week());
      }

      // Don't append images
      else if (item !== 'evidencesBefore' && item !== 'evidencesAfter')
        formData.append(item, values[item]);
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
      .post(`${URL}/api/user/issue-report`, formData)
      .then((res) => {
        setLoading(false);
        if (res.data.success) message.success('Issue has been successfully published!');
      })
      .catch(() => {
        setLoading(false);
        message.error('Unable to publish issue!', 10);
      });
  };

  return (
    <PageHeaderWrapper content="Raise an issue here by completing the form below">
      <Card>
        {/* Form start */}
        <ProForm
          initialValues={{
            date: '2020-11-22',
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
            tooltip="You can upload upto 5 files/images"
          />
          <ProFormUploadButton
            disabled={evidencesAfterLimitReached}
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
        {/* Form end */}
      </Card>
    </PageHeaderWrapper>
  );
};

export default PrioritiesForm;

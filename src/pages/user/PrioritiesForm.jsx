import React, { useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { history } from 'umi';
import { Card, Alert, message } from 'antd';
import axios from 'axios';

import PriorityForm from '../../components/Priorities/PriorityForm';

const URL =
  process.env.NODE_ENV === 'development'
    ? process.env.AUDITME_DEV_BE_URL
    : process.env.AUDITME_PROD_BE_URL;

const PrioritiesForm = () => {
  const [loading, setLoading] = useState(false);
  const [evidenceFileList, setEvidenceFileList] = useState([]);

  const submitForm = async (values) => {
    setLoading(true);

    const formData = new FormData();
    Object.keys(values).forEach((item) => {
      // Don't append images
      if (item !== 'evidences') formData.append(item, values[item]);
    });

    for (let i = 0; i < evidenceFileList.length; i += 1) {
      formData.append('evidences', evidenceFileList[i]);
    }

    axios
      .post(`${URL}/api/auditor/raise-issue`, formData, {
        headers: { Authorization: localStorage.userToken },
      })
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          message.success('Issue has been successfully published!');
          if (res?.data?.report?.isPrioritized) history.push('/user/reports/priorities-reports');
          else history.push('/user/reports/observation-reports');
        }
      })
      .catch(() => {
        setLoading(false);
        message.error('Unable to publish issue!', 10);
      });
  };

  return (
    <PageHeaderWrapper content="Raise an issue here by completing the form below">
      {JSON.parse(localStorage.getItem('user')).role === 'rm' ? (
        <Alert
          style={{
            marginBottom: 24,
          }}
          message="You have signed up as regional manager, you can not submit an issue. Please signup as auditor in order to raise an issue"
          type="error"
          showIcon
        />
      ) : null}
      {JSON.parse(localStorage.getItem('user')).role === 'viewer' ? (
        <Alert
          style={{
            marginBottom: 24,
          }}
          message="You have signed up as viewer, you can not submit an issue. Please signup as auditor in order to raise an issue"
          type="error"
          showIcon
        />
      ) : null}
      <Card>
        <PriorityForm
          loading={loading}
          submitForm={submitForm}
          evidenceFileList={evidenceFileList}
          setEvidenceFileList={setEvidenceFileList}
        />
      </Card>
    </PageHeaderWrapper>
  );
};

export default PrioritiesForm;

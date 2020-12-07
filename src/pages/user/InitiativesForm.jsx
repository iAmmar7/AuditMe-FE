import React, { useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { history } from 'umi';
import { Card, Alert, message } from 'antd';
import axios from 'axios';

import InitiativeForm from '../../components/Initiatives/InitiativeForm';

const URL =
  process.env.NODE_ENV === 'development'
    ? process.env.AUDITME_DEV_BE_URL
    : process.env.AUDITME_PROD_BE_URL;

const InitiativesForm = () => {
  const [loading, setLoading] = useState(false);
  const [evidenceBeforeFileList, setEvidenceBeforeFileList] = useState([]);
  const [evidenceAfterFileList, setEvidenceAfterFileList] = useState([]);

  const submitForm = async (values) => {
    setLoading(true);

    const formData = new FormData();
    Object.keys(values).forEach((item) => {
      // Don't append images
      if (item !== 'evidencesBefore' && item !== 'evidencesAfter')
        formData.append(item, values[item]);
    });

    for (let i = 0; i < evidenceBeforeFileList.length; i += 1) {
      formData.append('evidencesBefore', evidenceBeforeFileList[i]);
    }

    for (let i = 0; i < evidenceAfterFileList.length; i += 1) {
      formData.append('evidencesAfter', evidenceAfterFileList[i]);
    }

    axios
      .post(`${URL}/api/auditor/initiative`, formData, {
        headers: { Authorization: localStorage.userToken },
      })
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          message.success('Initiative has been successfully published!');
          history.push('/user/initiative-reports');
        }
      })
      .catch(() => {
        setLoading(false);
        message.error('Unable to publish initiative!', 10);
      });
  };

  return (
    <PageHeaderWrapper content="Enter initiative details here by completing the form below">
      {JSON.parse(localStorage.getItem('user')).role === 'rm' ? (
        <Alert
          style={{
            marginBottom: 24,
          }}
          message="You have signed up as regional manager, you can not submit an initiative. Please signup as auditor in order to raise an issue"
          type="error"
          showIcon
        />
      ) : null}
      <Card>
        <InitiativeForm
          loading={loading}
          submitForm={submitForm}
          evidenceBeforeFileList={evidenceBeforeFileList}
          setEvidenceBeforeFileList={setEvidenceBeforeFileList}
          evidenceAfterFileList={evidenceAfterFileList}
          setEvidenceAfterFileList={setEvidenceAfterFileList}
        />
      </Card>
    </PageHeaderWrapper>
  );
};

export default InitiativesForm;

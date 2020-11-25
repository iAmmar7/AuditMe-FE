import React, { useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { history } from 'umi';
import { Card, message } from 'antd';
import moment from 'moment';
import axios from 'axios';

import PriorityForm from '../../components/Priorities/PriorityForm';

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
    console.log(values);

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
      .post(`${URL}/api/user/priorities-report`, formData)
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          message.success('Issue has been successfully published!');
          history.push('/user/priorities-reports');
        }
      })
      .catch(() => {
        setLoading(false);
        message.error('Unable to publish issue!', 10);
      });
  };

  return (
    <PageHeaderWrapper content="Raise an issue here by completing the form below">
      <Card>
        <PriorityForm
          loading={loading}
          submitForm={submitForm}
          statusPending={statusPending}
          setStatusPending={setStatusPending}
          evidencesBeforeLimitReached={evidencesBeforeLimitReached}
          setEvidencesBeforeLimitReached={setEvidencesBeforeLimitReached}
          evidencesAfterLimitReached={evidencesAfterLimitReached}
          setEvidencesAfterLimitReached={setEvidencesAfterLimitReached}
        />
      </Card>
    </PageHeaderWrapper>
  );
};

export default PrioritiesForm;

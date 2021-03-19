import React, { useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { history } from 'umi';
import { Card, Alert, message } from 'antd';
import axios from 'axios';

import AMChecklist from '../../components/AMChecklist';

const URL =
  process.env.NODE_ENV === 'development'
    ? process.env.AUDITME_DEV_BE_URL
    : process.env.AUDITME_PROD_BE_URL;

const AMChecklistForm = () => {
  const [loading, setLoading] = useState(false);
  // const [evidenceBeforeFileList, setEvidenceBeforeFileList] = useState([]);
  // const [evidenceAfterFileList, setEvidenceAfterFileList] = useState([]);

  // const submitForm = async (values) => {
  //   setLoading(true);

  //   const formData = new FormData();
  //   Object.keys(values).forEach((item) => {
  //     // Don't append images
  //     if (item !== 'evidencesBefore' && item !== 'evidencesAfter')
  //       formData.append(item, values[item]);
  //   });

  //   for (let i = 0; i < evidenceBeforeFileList.length; i += 1) {
  //     formData.append('evidencesBefore', evidenceBeforeFileList[i]);
  //   }

  //   for (let i = 0; i < evidenceAfterFileList.length; i += 1) {
  //     formData.append('evidencesAfter', evidenceAfterFileList[i]);
  //   }

  //   axios
  //     .post(`${URL}/api/auditor/initiative`, formData, {
  //       headers: { Authorization: localStorage.userToken },
  //     })
  //     .then((res) => {
  //       setLoading(false);
  //       if (res.data.success) {
  //         message.success('Initiative has been successfully published!');
  //         history.push('/user/reports/initiative-reports');
  //       }
  //     })
  //     .catch(() => {
  //       setLoading(false);
  //       message.error('Unable to publish initiative!', 10);
  //     });
  // };

  // const alertMessage = () => {
  //   let messageText = null;

  //   if (JSON.parse(localStorage.getItem('user')).role === 'rm')
  //     messageText =
  //       'You have signed up as regional manager, you can not submit an initiative. Please signup as auditor or station manager in order to submit an initiative.';

  //   if (JSON.parse(localStorage.getItem('user')).role === 'am')
  //     messageText =
  //       'You have signed up as area manager, you can not submit an initiative. Please signup as auditor or station manager in order to submit an initiative.';

  //   if (JSON.parse(localStorage.getItem('user')).role === 'viewer')
  //     messageText =
  //       'You have signed up as viewer, you can not submit an initiative. Please signup as auditor or station manager in order to submit an initiative.';

  //   return (
  //     messageText && (
  //       <Alert
  //         style={{
  //           marginBottom: 24,
  //         }}
  //         message={messageText}
  //         type="error"
  //         showIcon
  //       />
  //     )
  //   );
  // };

  return (
    <PageHeaderWrapper content="Complete AM checklist using the form below">
      {/* {alertMessage()} */}
      <Card>
        <AMChecklist
          loading={loading}
          // submitForm={submitForm}
        />
      </Card>
    </PageHeaderWrapper>
  );
};

export default AMChecklistForm;

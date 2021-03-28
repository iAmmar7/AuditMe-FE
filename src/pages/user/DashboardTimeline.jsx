import React, { useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
// import { history } from 'umi';
import { Card } from 'antd';
// import axios from 'axios';

import DashboardTimeline from '../../components/DashboardTimeline';

// const URL =
//   process.env.NODE_ENV === 'development'
//     ? process.env.AUDITME_DEV_BE_URL
//     : process.env.AUDITME_PROD_BE_URL;

const DashboardTimelinePage = () => {
  const [loading, setLoading] = useState(false);
  

  return (
    <PageHeaderWrapper content="Voice of Employee">
      {/* {alertMessage()} */}
      <Card>
        <DashboardTimeline
          loading={loading}
          // submitForm={submitForm}
        />
      </Card>
    </PageHeaderWrapper>
  );
};

export default DashboardTimelinePage;

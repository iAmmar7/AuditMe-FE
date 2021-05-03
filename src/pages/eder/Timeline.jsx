import React, { useState, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, message } from 'antd';
import axios from 'axios';

import { Timeline, TimelineHeaderContent } from '../../components/DashboardTimeline';

const URL =
  process.env.NODE_ENV === 'development'
    ? process.env.AUDITME_DEV_BE_URL
    : process.env.AUDITME_PROD_BE_URL;

const DashboardTimelinePage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const res = await axios.get(`${URL}/api/user/dashboard-timeline`, {
        headers: { Authorization: localStorage.userToken },
      });

      if (!res?.data?.success) message.error('Unable to fetch data, reload');
      else {
        setData(res.data);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <PageHeaderWrapper content={<TimelineHeaderContent />}>
      <Card>
        <Timeline loading={loading} data={data} />
      </Card>
    </PageHeaderWrapper>
  );
};

export default DashboardTimelinePage;

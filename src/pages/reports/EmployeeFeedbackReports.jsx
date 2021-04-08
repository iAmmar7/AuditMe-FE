/* eslint-disable no-underscore-dangle */
import React from 'react';
import { message } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import moment from 'moment';
import axios from 'axios';

import FeedbackTable from '../../components/FeedbackForm/FeedbackTable';

moment.locale('en');

const URL =
  process.env.NODE_ENV === 'development'
    ? process.env.AUDITME_DEV_BE_URL
    : process.env.AUDITME_PROD_BE_URL;

const FeedbackReports = () => {
  const onRequest = async (parameters, sorter, filter) => {
    const result = await axios.post(
      `${URL}/api/user/feedback-reports`,
      {
        params: parameters,
        sorter: {
          dateSorter: sorter?.date,
        },
        filter: {
          departmentFilter: filter?.department,
        },
      },
      {
        headers: {
          Authorization: localStorage.userToken,
        },
      },
    );

    if (!result) {
      message.error('Unable to fetch data, reload');
    }

    const tableList = [];
    for (let i = 0; i < result.data.reports.length; i += 1) {
      tableList.push({
        key: result.data.reports[i]._id,
        date: moment(result.data.reports[i].createdAt).format('DD-MMM-YY'),
        name: result.data.reports[i].isAnonymous ? 'Anonymous' : result.data.reports[i].name,
        badgeNumber: result.data.reports[i].isAnonymous ? '--' : result.data.reports[i].badgeNumber,
        department: result.data.reports[i].department,
        otherDepartment: result.data.reports[i].otherDepartment ?? '--',
        subject: result.data.reports[i].subject,
        message: result.data.reports[i].message,
      });
    }

    return {
      data: tableList,
      success: true,
      total: result.data.totalReports,
    };
  };

  return (
    <PageHeaderWrapper content="Voice of Employee">
      <FeedbackTable onRequest={onRequest} />
    </PageHeaderWrapper>
  );
};

export default FeedbackReports;

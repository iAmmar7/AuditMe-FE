import React, { useState, useEffect } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { Card, message } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import moment from 'moment';
import axios from 'axios';

import PriorityTable from '../../components/Priorities/PriorityTable';
import PriorityDetails from '../../components/Priorities/PriorityDetails';

moment.locale('en');

const URL =
  process.env.NODE_ENV === 'development'
    ? process.env.AUDITME_DEV_BE_URL
    : process.env.AUDITME_PROD_BE_URL;

const PrioritiesReports = () => {
  const expandedRowRender = (item) => {
    return <PriorityDetails item={item} />;
  };

  const onRequest = async (parameters, sorter, filter) => {
    axios.defaults.headers.common.Authorization = localStorage.userToken;
    const result = await axios.post(`${URL}/api/user/priorities-reports`, {
      params: parameters,
      sorter: { dateSorter: sorter?.date, dateIdentifiedSorter: sorter?.dateIdentified },
      filter: { statusFilter: filter?.status },
    });

    const tableList = [];
    for (let i = 0; i < result.data.reports.length; i += 1) {
      tableList.push({
        key: i,
        date: moment(result.data.reports[i].date).format('DD-MMM-YY'),
        user: result.data.reports[i].user,
        status:
          result.data.reports[i].status === 'Pending'
            ? {
                color: 'red',
                text: result.data.reports[i].status,
              }
            : {
                color: 'green',
                text: result.data.reports[i].status,
              },
        type: result.data.reports[i].type,
        issueDetails: result.data.reports[i].issueDetails,
        dateIdentified: moment(result.data.reports[i].dateIdentified).format('DD-MMM-YY'),
        actionTaken: result.data.reports[i].actionTaken,
      });
    }

    return {
      data: tableList,
      success: true,
      total: result.data.totalReports,
    };
  };

  return (
    <PageHeaderWrapper content="See all issues here">
      <Card>
        <PriorityTable expandedRowRender={expandedRowRender} onRequest={onRequest} />
      </Card>
    </PageHeaderWrapper>
  );
};

export default PrioritiesReports;

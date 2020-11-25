import React, { useRef } from 'react';
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

let allData = [];
const PrioritiesReports = () => {
  const tableRef = useRef(null);

  const onRequest = async (parameters, sorter, filter) => {
    console.log('OnRequest run', parameters, sorter, filter);
    axios.defaults.headers.common.Authorization = localStorage.userToken;
    const result = await axios.post(`${URL}/api/user/priorities-reports`, {
      params: parameters,
      sorter: { dateSorter: sorter?.date, dateIdentifiedSorter: sorter?.dateIdentified },
      filter: { statusFilter: filter?.status },
    });

    if (!result) {
      message.error('Unable to fetch data, reload');
    }

    allData = result.data.reports;

    const tableList = [];
    for (let i = 0; i < result.data.reports.length; i += 1) {
      tableList.push({
        key: result.data.reports[i]._id,
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

    console.log(tableList);

    return {
      data: tableList,
      success: true,
      total: result.data.totalReports,
    };
  };

  const reRunOnRequest = (parameters, sorter, filter) => {
    onRequest(parameters, sorter, filter);
  };

  const expandedRowRender = (item) => {
    const filteredItem = allData.filter((data) => item.key === data._id);

    return (
      <PriorityDetails item={filteredItem[0]} reRunOnRequest={reRunOnRequest} tableRef={tableRef} />
    );
  };

  console.log('Prioriries');

  return (
    <PageHeaderWrapper content="See all issues here">
      <Card>
        <PriorityTable
          expandedRowRender={expandedRowRender}
          onRequest={onRequest}
          tableRef={tableRef}
        />
      </Card>
    </PageHeaderWrapper>
  );
};

export default PrioritiesReports;

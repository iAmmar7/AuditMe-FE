/* eslint-disable no-underscore-dangle */
import React, { useRef } from 'react';
import { message } from 'antd';
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
const ObservationsReports = () => {
  const tableRef = useRef(null);

  const onRequest = async (parameters, sorter, filter) => {
    const result = await axios.post(
      `${URL}/api/user/priorities-reports`,
      {
        isPrioritized: false,
        params: parameters,
        sorter: {
          dateSorter: sorter?.date,
          dateIdentifiedSorter: sorter?.dateIdentified,
          daysOpenSorter: sorter?.daysOpen,
        },
        filter: {
          statusFilter: filter?.status,
          typeFilter: filter?.type,
          regionFilter: filter?.region,
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

    allData = result.data.reports;

    const tableList = [];
    for (let i = 0; i < result.data.reports.length; i += 1) {
      let status;
      if (result.data.reports[i].status === 'Pending') {
        status = {
          color: 'red',
          text: result.data.reports[i].status,
        };
      } else if (result.data.reports[i].status === 'Resolved') {
        status = {
          color: 'green',
          text: result.data.reports[i].status,
        };
      } else {
        status = {
          color: 'gold',
          text: result.data.reports[i].status,
        };
      }

      tableList.push({
        key: result.data.reports[i]._id,
        date: moment(result.data.reports[i].date).format('DD-MMM-YY'),
        user: result.data.reports[i].userName,
        status,
        type: result.data.reports[i].type,
        region: result.data.reports[i].region,
        regionalManager: result.data.reports[i].regionalManager,
        areaManager: result.data.reports[i].areaManager,
        dateIdentified: moment(result.data.reports[i].dateIdentified).format('DD-MMM-YY'),
        stationNumber: result.data.reports[i].stationNumber,
        daysOpen:
          result.data.reports[i].status === 'Resolved' ? null : result.data.reports[i].daysOpen,
        daysResolved:
          result.data.reports[i].status === 'Resolved' ? result.data.reports[i].daysOpen : null,
        logNumber: result.data.reports[i].logNumber,
      });
    }

    return {
      data: tableList,
      success: true,
      total: result.data.totalReports,
    };
  };

  const expandedRowRender = (item) => {
    const filteredItem = allData.filter((data) => item.key === data._id);

    return <PriorityDetails item={filteredItem[0]} tableRef={tableRef} />;
  };

  return (
    <PageHeaderWrapper content="EDER - Early Detection Early Resolution">
      <PriorityTable
        expandedRowRender={expandedRowRender}
        onRequest={onRequest}
        tableRef={tableRef}
      />
    </PageHeaderWrapper>
  );
};

export default ObservationsReports;

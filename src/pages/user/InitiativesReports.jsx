import React, { useRef } from 'react';
import { Card, message } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import moment from 'moment';
import axios from 'axios';

import InitiativeTable from '../../components/Initiatives/InitiativeTable';
import InitiativeDetails from '../../components/Initiatives/InitiativeDetails';

moment.locale('en');

const URL =
  process.env.NODE_ENV === 'development'
    ? process.env.AUDITME_DEV_BE_URL
    : process.env.AUDITME_PROD_BE_URL;

let allData = [];
const InitiativesReports = () => {
  const tableRef = useRef(null);

  const onRequest = async (parameters, sorter, filter) => {
    const result = await axios.post(
      `${URL}/api/user/initiatives-reports`,
      {
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
      tableList.push({
        key: result.data.reports[i]._id,
        date: moment(result.data.reports[i].date).format('DD-MMM-YY'),
        user: result.data.reports[i].userName,
        type: result.data.reports[i].type,
        region: result.data.reports[i].region,
        regionalManager: result.data.reports[i].regionalManager,
        areaManager: result.data.reports[i].areaManager,
        stationNumber: result.data.reports[i].stationNumber,
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

    return <InitiativeDetails item={filteredItem[0]} tableRef={tableRef} />;
  };

  return (
    <PageHeaderWrapper content="Initiative / Imrpovement / Action Taken">
      <Card>
        <InitiativeTable
          expandedRowRender={expandedRowRender}
          onRequest={onRequest}
          tableRef={tableRef}
        />
      </Card>
    </PageHeaderWrapper>
  );
};

export default InitiativesReports;

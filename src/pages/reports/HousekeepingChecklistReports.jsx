/* eslint-disable no-underscore-dangle */
import React, { useRef } from 'react';
import { message } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import axios from 'axios';

import ChecklistTable from '../../components/AMChecklist/ChecklistTable';
import ChecklistDetails from '../../components/AMChecklist/ChecklistDetails';

const URL =
  process.env.NODE_ENV === 'development'
    ? process.env.AUDITME_DEV_BE_URL
    : process.env.AUDITME_PROD_BE_URL;

const HousekeepingChecklistReports = () => {
  const tableRef = useRef(null);

  const onRequest = async (parameters, sorter, filter) => {
    const result = await axios.post(
      `${URL}/api/user/checklist-reports`,
      {
        params: parameters,
        sorter: {
          dateSorter: sorter?.date,
        },
        filter: {
          regionFilter: filter?.region,
        },
      },
      {
        headers: {
          Authorization: localStorage.userToken,
        },
      },
    );

    if (!result || !result?.data?.success) {
      message.error('Unable to fetch data, reload');
    }

    return {
      data: result?.data?.reports || [],
      success: true,
      total: result.data.totalReports,
    };
  };

  const expandedRowRender = (item) => {
    return <ChecklistDetails item={item} />;
  };

  return (
    <PageHeaderWrapper content="Area Manager Checklist">
      <ChecklistTable
        expandedRowRender={expandedRowRender}
        onRequest={onRequest}
        tableRef={tableRef}
      />
    </PageHeaderWrapper>
  );
};

export default HousekeepingChecklistReports;

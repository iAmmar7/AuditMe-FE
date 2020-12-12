/* eslint-disable no-underscore-dangle */
import React, { useRef } from 'react';
import { Alert, message } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import jwt_decode from 'jwt-decode';
import moment from 'moment';
import axios from 'axios';

import UserTable from '../../components/Settings/UserTable';

moment.locale('en');

const URL =
  process.env.NODE_ENV === 'development'
    ? process.env.AUDITME_DEV_BE_URL
    : process.env.AUDITME_PROD_BE_URL;

const Settings = () => {
  const tableRef = useRef();

  const onRequest = async (parameters, sorter, filter) => {
    const result = await axios.post(
      `${URL}/api/user/all-users`,
      {
        params: parameters,
        sorter: {
          nameSorter: sorter?.name,
        },
        filter: {
          roleFilter: filter?.role,
        },
      },
      {
        headers: {
          Authorization: localStorage.userToken,
        },
      },
    );

    if (!result) {
      message.error('Unable to fetch users, reload');
    }

    const tableList = [];
    for (let i = 0; i < result.data.users.length; i += 1) {
      tableList.push({
        id: result.data.users[i]._id,
        name: result.data.users[i].name,
        badgeNumber: result.data.users[i].badgeNumber,
        role: result.data.users[i].role,
        password: result.data.users[i].password,
      });
    }

    return {
      data: tableList,
      total: result?.data?.total,
      success: true,
    };
  };

  const decoded = jwt_decode(localStorage.userToken);

  return (
    <PageHeaderWrapper content="All registered users">
      {!decoded.isAdmin ? (
        <Alert
          style={{
            marginBottom: 24,
          }}
          message="You are not authorized to see the details of this page"
          type="error"
          showIcon
        />
      ) : (
        <UserTable onRequest={onRequest} tableRef={tableRef} />
      )}
    </PageHeaderWrapper>
  );
};

export default Settings;

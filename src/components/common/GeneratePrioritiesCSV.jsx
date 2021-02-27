import React, { useState, useRef } from 'react';
import { CSVLink } from 'react-csv';
import { Spin, message } from 'antd';
import _ from 'lodash';
import axios from 'axios';
import moment from 'moment';

const URL =
  process.env.NODE_ENV === 'development'
    ? process.env.AUDITME_DEV_BE_URL
    : process.env.AUDITME_PROD_BE_URL;

const headers = [
  { label: 'Issue ID', key: 'id' },
  { label: 'Date', key: 'date' },
  { label: 'Week', key: 'week' },
  { label: 'BE Team', key: 'processSpecialist' },
  { label: 'Status', key: 'status' },
  { label: 'Type', key: 'type' },
  { label: 'Region', key: 'region' },
  { label: 'Regional Manager', key: 'regionalManager' },
  { label: 'Area Manager', key: 'areaManager' },
  { label: 'Date Identified', key: 'dateIdentified' },
  { label: 'Station/BE', key: 'stationNumber' },
  { label: 'Issue Details', key: 'issueDetails' },
  { label: 'Log Number', key: 'logNumber' },
  { label: 'Days Open', key: 'daysOpen' },
  { label: 'Resolve Days', key: 'daysResolved' },
  { label: 'Resolved By', key: 'resolvedByName' },
  { label: 'Date Of Closure', key: 'dateOfClosure' },
];

const GeneratePrioritiesCSV = ({ filters, isPrioritized }) => {
  const csvRef = useRef(null);

  const [data, setData] = useState({
    loading: false,
    reports: [],
  });

  const fetchReports = () => {
    setData({ ...data, loading: true });

    let modifiedFilters = filters;
    if (modifiedFilters.date)
      modifiedFilters = {
        ...modifiedFilters,
        date: [
          moment(modifiedFilters.date[0]).format('YYYY-MM-DD'),
          moment(modifiedFilters.date[1]).format('YYYY-MM-DD'),
        ],
      };

    if (modifiedFilters.dateIdentified)
      modifiedFilters = {
        ...modifiedFilters,
        dateIdentified: [
          moment(modifiedFilters.dateIdentified[0]).format('YYYY-MM-DD'),
          moment(modifiedFilters.dateIdentified[1]).format('YYYY-MM-DD'),
        ],
      };

    axios
      .post(
        `${URL}/api/user/csv/priorities-reports`,
        { filters: modifiedFilters, isPrioritized },
        {
          headers: { Authorization: localStorage.userToken },
        },
      )
      .then((res) => {
        setData({
          loading: false,
          reports: res.data.reports,
        });
        if (res.data.reports?.length > 0) csvRef.current.link.click();
        else message.error('No data for CSV!');
      })
      .catch(() => {
        setData({ loading: false, reports: [] });
        message.error('Unable to download CSV');
      });
  };

  if (data.loading)
    return (
      <div style={{ width: '50px', textAlign: 'center' }}>
        <Spin />
      </div>
    );

  return (
    <>
      <a onClick={fetchReports}>Download CSV</a>
      <CSVLink
        target="_blank"
        filename={
          _.isEmpty(filters)
            ? `Priorities Report - ${moment().format('MMMM Do YYYY, h:mm:ss a')}.csv`
            : `Priorities Report - With Filters - ${moment().format('MMMM Do YYYY, h:mm:ss a')}.csv`
        }
        headers={headers}
        data={data.reports}
        style={{ display: 'none' }}
        ref={csvRef}
      >
        Download CSV
      </CSVLink>
    </>
  );
};

export default GeneratePrioritiesCSV;

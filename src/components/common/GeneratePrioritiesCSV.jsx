import React, { useState, useRef } from 'react';
import { CSVLink } from 'react-csv';
import { Spin, message } from 'antd';
import axios from 'axios';

const URL =
  process.env.NODE_ENV === 'development'
    ? process.env.AUDITME_DEV_BE_URL
    : process.env.AUDITME_PROD_BE_URL;

const headers = [
  { label: 'Date', key: 'date' },
  { label: 'Week', key: 'week' },
  { label: 'Process Specialist', key: 'processSpecialist' },
  { label: 'Status', key: 'status' },
  { label: 'Type', key: 'type' },
  { label: 'Region', key: 'region' },
  { label: 'Regional Manager', key: 'regionalManager' },
  { label: 'Area Manager', key: 'areaManager' },
  { label: 'Date Identified', key: 'dateIdentified' },
  { label: 'Station/BE', key: 'stationNumber' },
  { label: 'Log Number', key: 'logNumber' },
  { label: 'Days Open', key: 'daysOpen' },
  { label: 'Resolve Days', key: 'daysResolved' },
  { label: 'Resolved By', key: 'resolvedByName' },
  { label: 'Date Of Closure', key: 'dateOfClosure' },
];

const GeneratePrioritiesCSV = () => {
  const csvRef = useRef(null);

  const [data, setData] = useState({
    loading: false,
    reports: [],
  });

  const fetchReports = () => {
    setData({ ...data, loading: true });

    axios
      .get(`${URL}/api/user/csv/priorities-reports`, {
        headers: { Authorization: localStorage.userToken },
      })
      .then((res) => {
        setData({ loading: false, reports: res.data.reports });
        csvRef.current.link.click();
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
        filename={`priorities-report-${new Date()}.csv`}
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

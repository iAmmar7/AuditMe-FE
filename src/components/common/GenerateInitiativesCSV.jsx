import React, { useState, useRef } from 'react';
import { CSVLink } from 'react-csv';
import { Spin, message } from 'antd';
import axios from 'axios';

const URL =
  process.env.NODE_ENV === 'development'
    ? process.env.AUDITME_DEV_BE_URL
    : process.env.AUDITME_PROD_BE_URL;

const headers = [
  { label: 'Initiative ID', key: 'id' },
  { label: 'Date', key: 'date' },
  { label: 'Week', key: 'week' },
  { label: 'BE Team', key: 'processSpecialist' },
  { label: 'Type', key: 'type' },
  { label: 'Region', key: 'region' },
  { label: 'Regional Manager', key: 'regionalManager' },
  { label: 'Area Manager', key: 'areaManager' },
  { label: 'Details', key: 'details' },
  { label: 'Date Identified', key: 'dateIdentified' },
  { label: 'Station/BE', key: 'stationNumber' },
];

const GenerateInitiativesCSV = () => {
  const csvRef = useRef(null);

  const [data, setData] = useState({
    loading: false,
    reports: [],
  });

  const fetchReports = () => {
    setData({ ...data, loading: true });

    axios
      .get(`${URL}/api/user/csv/initiatives-reports`, {
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
        filename={`initiatives-report-${new Date()}.csv`}
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

export default GenerateInitiativesCSV;

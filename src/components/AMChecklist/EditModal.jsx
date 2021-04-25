/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-destructuring */
import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import axios from 'axios';

import ChecklistForm from './ChecklistForm';

const URL =
  process.env.NODE_ENV === 'development'
    ? process.env.AUDITME_DEV_BE_URL
    : process.env.AUDITME_PROD_BE_URL;

function ChecklistEditModal({ data, tableRef, closeModal }) {
  const [loading, setLoading] = useState(false);
  const [regionalManagers, setRegionalManagers] = useState({ fetching: false, data: [] });
  const [images, setImages] = useState({});

  // Extract all images from the data and set it to state
  const initialImages = {};
  Object.keys(data).forEach((key) => {
    if (key.includes('question')) initialImages[key] = data[key].images;
  });
  const [prevImages, setPrevImages] = useState(initialImages);

  useEffect(() => {
    (async function fetchRegionalManagers() {
      setRegionalManagers({ ...regionalManagers, fetching: true });
      const res = await axios.get(`${URL}/api/user/regional-managers`, {
        headers: { Authorization: localStorage.userToken },
      });

      if (res?.data?.success) {
        setRegionalManagers({
          ...regionalManagers,
          fetching: false,
          data: res.data?.regionalManagers,
        });
      } else message.error('Unable to fetch data, reload');
    })();
  }, [data]);

  // Change data structure according to Checklist Form
  const initialValues = { ...data };
  Object.keys(data).forEach((key) => {
    if (key.includes('question')) initialValues[key] = initialValues[key].answer ? 'Yes' : 'No';
    if (key === 'regionalManagerName') initialValues.RMName = initialValues.regionalManagerName;
  });

  const deleteImage = async (id, questionNumber, url) => {
    setLoading(true);
    const res = await axios.post(
      `${URL}/api/am/checklist/delete-image`,
      {
        id,
        questionNumber,
        url,
      },
      {
        headers: { Authorization: localStorage.userToken },
      },
    );

    if (res?.data?.success) {
      tableRef.current.reload();
      setPrevImages({
        ...prevImages,
        [questionNumber]: prevImages[questionNumber].filter((item) => item !== url),
      });
    } else message.error('Unable to delete the image');

    setLoading(false);
  };

  const onSubmit = async (values) => {
    setLoading(true);

    const formData = new FormData();
    Object.keys(values).forEach((item) => {
      let value;
      if (item.includes('question')) {
        value = values[item] === 'Yes';
      } else {
        value = values[item];
      }
      // Truncate name from RMName value
      if (item === 'RMName') value = values[item].split('id_')[1] ?? data.regionalManagerId;
      formData.append(item, value);
    });

    Object.entries(images).forEach(([key, value]) => {
      value.forEach((image) => {
        formData.append([key], image);
      });
    });

    axios
      .post(`${URL}/api/am/update-checklist/${data._id}`, formData, {
        headers: { Authorization: localStorage.userToken },
      })
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          message.success('Checklist has been successfully updated!');
          setImages({});
          closeModal({ status: false, data: {} });
          tableRef.current.reload();
        }
      })
      .catch(() => {
        setLoading(false);
        message.error('Unable to edit checklist!', 10);
      });
  };

  return (
    <ChecklistForm
      loading={loading}
      initialValues={initialValues}
      initialImages={prevImages}
      regionalManagers={regionalManagers}
      images={images}
      setImages={setImages}
      deleteImage={deleteImage}
      URL={URL}
      onFinish={onSubmit}
    />
  );
}

export default ChecklistEditModal;

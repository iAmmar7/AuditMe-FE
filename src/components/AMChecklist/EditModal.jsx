import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import axios from 'axios';

import ChecklistForm from './ChecklistForm';

const URL =
  process.env.NODE_ENV === 'development'
    ? process.env.AUDITME_DEV_BE_URL
    : process.env.AUDITME_PROD_BE_URL;

function ChecklistEditModal({ data, tableRef }) {
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
    />
  );
}

export default ChecklistEditModal;

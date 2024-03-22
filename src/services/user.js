import axios from 'axios';

const URL = process.env.SERVER_URL;

export function raiseIssue(data) {
  const formData = new FormData();
  Object.keys(data).forEach((item) => {
    // Don't append images
    if (item !== 'evidences') formData.append(item, data[item]);
  });

  for (let i = 0; i < evidenceFileList.length; i += 1) {
    formData.append('evidences', evidenceFileList[i]);
  }

  return axios.post(`${URL}/api/auditor/raise-issue`, formData, {
    headers: { Authorization: localStorage.userToken },
  });
}

import axios from 'axios';

const URL = process.env.SERVER_URL;

export function getUserByRole(role) {
  return axios.get(`${URL}/api/user/roles`, {
    params: {
      role,
    },
    headers: { Authorization: localStorage.userToken },
  });
}

export function raiseIssue(data, fileList) {
  const formData = new FormData();
  Object.keys(data).forEach((item) => {
    // Don't append images
    if (item !== 'evidences') formData.append(item, data[item]);
  });

  for (let i = 0; i < fileList.length; i += 1) {
    formData.append('evidences', fileList[i]);
  }

  return axios.post(`${URL}/api/auditor/raise-issue`, formData, {
    headers: { Authorization: localStorage.userToken },
  });
}

export function raiseInitiative(data, { evidenceBeforeFileList, evidenceAfterFileList }) {
  const formData = new FormData();

  Object.keys(data).forEach((item) => {
    // Don't append images
    if (item !== 'evidencesBefore' && item !== 'evidencesAfter') formData.append(item, data[item]);
  });

  for (let i = 0; i < evidenceBeforeFileList.length; i += 1) {
    formData.append('evidencesBefore', evidenceBeforeFileList[i]);
  }

  for (let i = 0; i < evidenceAfterFileList.length; i += 1) {
    formData.append('evidencesAfter', evidenceAfterFileList[i]);
  }

  return axios.post(`${URL}/api/auditor/initiative`, formData, {
    headers: { Authorization: localStorage.userToken },
  });
}

import { apiClient } from './apiClient';

export function raiseIssue(data, fileList) {
  console.log('raiseIssue', data);
  const formData = new FormData();
  Object.keys(data).forEach((item) => {
    // Don't append images
    if (item !== 'evidences') formData.append(item, data[item]);
  });

  for (let i = 0; i < fileList.length; i += 1) {
    formData.append('evidences', fileList[i]);
  }

  return apiClient.post('/auditor/report', formData);
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

  return apiClient.post('/auditor/initiative', formData);
}

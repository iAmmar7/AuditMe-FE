import { apiClient } from './apiClient';

export function getCurrentUser() {
  return apiClient.get('/user');
}

export function getUserByRole(role) {
  return apiClient.get('/user/roles', {
    params: {
      role,
    },
  });
}

export function updateActivity() {
  return apiClient.post('/user/activity');
}

export function getReportChart(query) {
  return apiClient.get(`/user/report-chart?month=${query}`);
}

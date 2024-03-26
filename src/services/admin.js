import { apiClient } from './apiClient';

export function deleteAuditReport(id) {
  return apiClient.delete(`/admin/audit-report/${id}`);
}

export function deleteInitiativeReport(id) {
  return apiClient.delete(`/admin/initiative/${id}`);
}

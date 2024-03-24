import { apiClient } from './apiClient';

export function deleteAuditReport(id) {
  return apiClient.delete(`/admin/audit-report/${id}`);
}

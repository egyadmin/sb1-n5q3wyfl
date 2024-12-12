```typescript
import apiClient from '../client';
import { API_ENDPOINTS } from '../config';

export interface ReportParams {
  startDate?: string;
  endDate?: string;
  type?: string;
  format?: 'pdf' | 'excel';
  filters?: Record<string, any>;
}

export const reportService = {
  async getStatistics(): Promise<any> {
    const response = await apiClient.get(API_ENDPOINTS.STATISTICS);
    return response.data;
  },

  async getTrafficViolations(params?: ReportParams): Promise<any> {
    const response = await apiClient.get(API_ENDPOINTS.TRAFFIC_VIOLATIONS, { params });
    return response.data;
  },

  async getEmployeeCustody(params?: ReportParams): Promise<any> {
    const response = await apiClient.get(API_ENDPOINTS.EMPLOYEE_CUSTODY, { params });
    return response.data;
  },

  async getEquipmentInquiry(params?: ReportParams): Promise<any> {
    const response = await apiClient.get(API_ENDPOINTS.EQUIPMENT_INQUIRY, { params });
    return response.data;
  },

  async getEmployeesInventory(params?: ReportParams): Promise<any> {
    const response = await apiClient.get(API_ENDPOINTS.EMPLOYEES_INVENTORY, { params });
    return response.data;
  },

  async generateReport(type: string, params: ReportParams): Promise<Blob> {
    const response = await apiClient.get(`${API_ENDPOINTS.REPORTS}/${type}`, {
      params,
      responseType: 'blob'
    });
    return response.data;
  }
};
```
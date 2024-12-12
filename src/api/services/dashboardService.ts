import apiClient from '../client';
import { API_ENDPOINTS } from '../config';

export interface DashboardStats {
  totalAssets: {
    count: number;
    trend: number;
    description: string;
  };
  activeWorkOrders: {
    count: number;
    trend: number;
    description: string;
  };
  lowStockItems: {
    count: number;
    trend: number;
    description: string;
  };
  totalInventoryValue: {
    value: number;
    trend: number;
    description: string;
  };
}

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    // For development, return mock data
    if (process.env.NODE_ENV === 'development') {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            totalAssets: {
              count: 234,
              trend: 12,
              description: 'أصل مسجل في النظام'
            },
            activeWorkOrders: {
              count: 45,
              trend: 8,
              description: 'أمر عمل قيد التنفيذ'
            },
            lowStockItems: {
              count: 12,
              trend: -2,
              description: 'مادة تحت الحد الأدنى'
            },
            totalInventoryValue: {
              value: 142384,
              trend: 5,
              description: 'القيمة الإجمالية للمخزون'
            }
          });
        }, 500);
      });
    }

    const response = await apiClient.get('/dashboard/stats');
    return response.data;
  },

  async getActivityData(): Promise<any> {
    // For development, return mock data
    if (process.env.NODE_ENV === 'development') {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            { month: 'يناير', inventory: 4000, workOrders: 2400, shipments: 2400 },
            { month: 'فبراير', inventory: 3000, workOrders: 1398, shipments: 2210 },
            { month: 'مارس', inventory: 2000, workOrders: 9800, shipments: 2290 },
            { month: 'أبريل', inventory: 2780, workOrders: 3908, shipments: 2000 },
            { month: 'مايو', inventory: 1890, workOrders: 4800, shipments: 2181 },
            { month: 'يونيو', inventory: 2390, workOrders: 3800, shipments: 2500 }
          ]);
        }, 500);
      });
    }

    const response = await apiClient.get('/dashboard/activity');
    return response.data;
  },

  async getDistributionData(): Promise<any> {
    // For development, return mock data
    if (process.env.NODE_ENV === 'development') {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            inventory: [
              { name: 'متوفر', value: 65, color: '#10B981' },
              { name: 'منخفض', value: 25, color: '#F59E0B' },
              { name: 'نفذ', value: 10, color: '#EF4444' }
            ],
            workOrders: [
              { name: 'مكتمل', value: 45, color: '#10B981' },
              { name: 'قيد التنفيذ', value: 35, color: '#3B82F6' },
              { name: 'معلق', value: 20, color: '#F59E0B' }
            ]
          });
        }, 500);
      });
    }

    const response = await apiClient.get('/dashboard/distribution');
    return response.data;
  }
};
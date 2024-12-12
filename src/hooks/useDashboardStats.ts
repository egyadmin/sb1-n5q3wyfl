import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../api/services/dashboardService';

export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboardStats'],
    queryFn: () => dashboardService.getStats(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    refetchOnWindowFocus: false,
    initialData: {
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
    }
  });
}

export function useDashboardActivity() {
  return useQuery({
    queryKey: ['dashboardActivity'],
    queryFn: () => dashboardService.getActivityData(),
    staleTime: 5 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false
  });
}

export function useDashboardDistribution() {
  return useQuery({
    queryKey: ['dashboardDistribution'],
    queryFn: () => dashboardService.getDistributionData(),
    staleTime: 5 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false
  });
}
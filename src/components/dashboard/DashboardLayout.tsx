import React from 'react';
import { Package, TrendingUp, AlertTriangle, ArrowDown, ArrowUp } from 'lucide-react';
import StatCard from './StatCard';
import MonitorCenter from './MonitorCenter';
import { useDashboardStats } from '../../hooks/useDashboardStats';

export default function DashboardLayout() {
  const { data: stats, isLoading, error } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        حدث خطأ في تحميل البيانات
      </div>
    );
  }

  const valueString = stats?.totalInventoryValue?.value?.toLocaleString() || '0';

  return (
    <div className="space-y-6">
      {/* Main KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="إجمالي الأصول"
          value={stats?.totalAssets.count || 0}
          icon={Package}
          trend={{ 
            value: stats?.totalAssets.trend || 0, 
            isPositive: (stats?.totalAssets.trend || 0) > 0 
          }}
          description={stats?.totalAssets.description}
          duration={2500}
        />

        <StatCard
          title="أوامر العمل النشطة"
          value={stats?.activeWorkOrders.count || 0}
          icon={TrendingUp}
          trend={{ 
            value: stats?.activeWorkOrders.trend || 0, 
            isPositive: (stats?.activeWorkOrders.trend || 0) > 0 
          }}
          description={stats?.activeWorkOrders.description}
          duration={2000}
        />

        <StatCard
          title="المواد منخفضة المخزون"
          value={stats?.lowStockItems.count || 0}
          icon={AlertTriangle}
          trend={{ 
            value: stats?.lowStockItems.trend || 0, 
            isPositive: false 
          }}
          description={stats?.lowStockItems.description}
          duration={1500}
        />

        <StatCard
          title="إجمالي قيمة المخزون"
          value={valueString}
          icon={Package}
          trend={{ 
            value: stats?.totalInventoryValue.trend || 0, 
            isPositive: (stats?.totalInventoryValue.trend || 0) > 0 
          }}
          description={stats?.totalInventoryValue.description}
          prefix="﷼ "
          duration={3000}
        />
      </div>

      {/* Featured Image with Title */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="w-full max-w-xl mx-auto">
            <img 
              src="https://www2.0zz0.com/2024/11/20/07/988856043.png"
              alt="Featured Dashboard Image"
              className="w-[50%] mx-auto h-auto object-contain rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
          </div>
          <h3 className="text-xl font-semibold text-blue-600 text-center animate-fade-in">
            System for Developing the Utilization of Warehouses, Production Crushers, and Assets
          </h3>
        </div>
      </div>

      <MonitorCenter />
    </div>
  );
}
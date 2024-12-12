import React from 'react';
import { useDashboardActivity, useDashboardDistribution } from '../../hooks/useDashboardStats';
import ActivityChart from './ActivityChart';
import InventoryDistribution from './InventoryDistribution';

export default function MonitorCenter() {
  const { data: activityData, isLoading: isActivityLoading } = useDashboardActivity();
  const { data: distributionData, isLoading: isDistributionLoading } = useDashboardDistribution();

  if (isActivityLoading || isDistributionLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ActivityChart data={activityData} />
      <InventoryDistribution data={distributionData} />
    </div>
  );
}
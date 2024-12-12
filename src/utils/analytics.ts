import { format, subDays, startOfMonth, endOfMonth } from 'date-fns';
import type { Asset, WorkOrder, InventoryItem } from '../types';

export interface AnalyticsData {
  totalAssets: number;
  activeWorkOrders: number;
  lowStockItems: number;
  inventoryValue: number;
  assetUtilization: number;
  maintenanceEfficiency: number;
  stockTurnover: number;
}

export const calculateAnalytics = (
  assets: Asset[],
  workOrders: WorkOrder[],
  inventory: InventoryItem[]
): AnalyticsData => {
  const now = new Date();
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);

  // Calculate basic metrics
  const totalAssets = assets.length;
  const activeWorkOrders = workOrders.filter(wo => wo.status !== 'completed').length;
  const lowStockItems = inventory.filter(item => item.quantity <= item.minimumStock).length;
  const inventoryValue = inventory.reduce((total, item) => total + (item.quantity * (item.price || 0)), 0);

  // Calculate asset utilization
  const activeAssets = assets.filter(asset => asset.status === 'active').length;
  const assetUtilization = (activeAssets / totalAssets) * 100;

  // Calculate maintenance efficiency
  const completedWorkOrders = workOrders.filter(wo => 
    wo.status === 'completed' && 
    new Date(wo.endDate) >= monthStart && 
    new Date(wo.endDate) <= monthEnd
  );
  const totalWorkOrders = workOrders.filter(wo =>
    new Date(wo.startDate) >= monthStart &&
    new Date(wo.startDate) <= monthEnd
  );
  const maintenanceEfficiency = (completedWorkOrders.length / totalWorkOrders.length) * 100;

  // Calculate stock turnover
  const stockTurnover = calculateStockTurnover(inventory);

  return {
    totalAssets,
    activeWorkOrders,
    lowStockItems,
    inventoryValue,
    assetUtilization,
    maintenanceEfficiency,
    stockTurnover
  };
};

const calculateStockTurnover = (inventory: InventoryItem[]): number => {
  const averageInventory = inventory.reduce((total, item) => total + item.quantity, 0) / inventory.length;
  const consumed = inventory.reduce((total, item) => total + (item.consumed || 0), 0);
  return consumed / averageInventory;
};
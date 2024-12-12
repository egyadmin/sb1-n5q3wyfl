import React from 'react';
import { Package, TrendingUp, AlertTriangle, ArrowDownRight, ArrowUpRight } from 'lucide-react';
import InventoryStats from './InventoryStats';
import LowStockAlert from './LowStockAlert';
import RecentTransactions from './RecentTransactions';
import StockChart from './StockChart';

export default function InventoryDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">لوحة المخزون</h2>
          <p className="mt-1 text-sm text-gray-500">
            نظرة عامة على حالة المخزون والتحركات
          </p>
        </div>
      </div>

      <InventoryStats />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StockChart />
        <LowStockAlert />
      </div>

      <RecentTransactions />
    </div>
  );
}
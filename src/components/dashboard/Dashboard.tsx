import React, { useState } from 'react';
import { Box, Wrench, PackageSearch, AlertTriangle, TrendingUp, Truck, ClipboardList, FileBarChart } from 'lucide-react';
import StatCard from './StatCard';
import RecentActivities from './RecentActivities';
import MonitorCenter from './MonitorCenter';
import WorkOrderForm from '../workorders/WorkOrderForm';
import ShipmentForm from '../shipments/ShipmentForm';
import StockCountForm from '../inventory/StockCountForm';
import CustomReportForm from '../reports/CustomReportForm';
import { useLanguage } from '../../contexts/LanguageContext';

export default function Dashboard() {
  const { t } = useLanguage();
  const [showWorkOrderForm, setShowWorkOrderForm] = useState(false);
  const [showShipmentForm, setShowShipmentForm] = useState(false);
  const [showStockCountForm, setShowStockCountForm] = useState(false);
  const [showReportForm, setShowReportForm] = useState(false);

  const handleWorkOrderSubmit = (data: any) => {
    console.log('New work order:', data);
    setShowWorkOrderForm(false);
  };

  const handleShipmentSubmit = (data: any) => {
    console.log('New shipment:', data);
    setShowShipmentForm(false);
  };

  const handleStockCountSubmit = (data: any) => {
    console.log('Stock count:', data);
    setShowStockCountForm(false);
  };

  const handleReportSubmit = (data: any) => {
    console.log('Custom report:', data);
    setShowReportForm(false);
  };

  const stats = [
    {
      title: t('totalAssets'),
      value: '234',
      icon: Box,
      trend: { value: 12, isPositive: true },
    },
    {
      title: t('activeWorkOrders'),
      value: '45',
      icon: Wrench,
      trend: { value: 8, isPositive: true },
    },
    {
      title: t('lowStockItems'),
      value: '12',
      icon: AlertTriangle,
      trend: { value: 2, isPositive: false },
    },
    {
      title: t('totalInventoryValue'),
      value: '$142,384',
      icon: PackageSearch,
      trend: { value: 5, isPositive: true },
    },
  ];

  const quickActions = [
    { 
      label: t('newWorkOrder'), 
      icon: Wrench,
      color: 'bg-blue-600 hover:bg-blue-700',
      description: t('createNewWorkOrder'),
      onClick: () => setShowWorkOrderForm(true)
    },
    { 
      label: t('createShipment'), 
      icon: Truck,
      color: 'bg-green-600 hover:bg-green-700',
      description: t('manageShipments'),
      onClick: () => setShowShipmentForm(true)
    },
    { 
      label: t('stockCount'), 
      icon: ClipboardList,
      color: 'bg-purple-600 hover:bg-purple-700',
      description: t('performStockCount'),
      onClick: () => setShowStockCountForm(true)
    },
    { 
      label: t('generateReport'), 
      icon: FileBarChart,
      color: 'bg-orange-600 hover:bg-orange-700',
      description: t('createCustomReports'),
      onClick: () => setShowReportForm(true)
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MonitorCenter />
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">{t('quickActions')}</h2>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          <div className="grid gap-4">
            {quickActions.map(({ label, icon: Icon, color, description, onClick }) => (
              <button
                key={label}
                onClick={onClick}
                className={`flex items-center p-4 rounded-lg text-white transition-all transform hover:scale-[1.02] ${color}`}
              >
                <div className="p-2 bg-white/10 rounded-lg">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="mr-4 text-right">
                  <span className="block font-medium">{label}</span>
                  <span className="text-sm opacity-90">{description}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivities />
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">{t('performanceMetrics')}</h2>
          <div className="space-y-4">
            {[
              { label: t('orderAccuracy'), value: '98.5%' },
              { label: t('inventoryTurnover'), value: '4.2x' },
              { label: t('pickingEfficiency'), value: '95.8%' },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-gray-600">{label}</span>
                <span className="font-semibold">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showWorkOrderForm && (
        <WorkOrderForm
          onSubmit={handleWorkOrderSubmit}
          onClose={() => setShowWorkOrderForm(false)}
        />
      )}

      {showShipmentForm && (
        <ShipmentForm
          onSubmit={handleShipmentSubmit}
          onClose={() => setShowShipmentForm(false)}
        />
      )}

      {showStockCountForm && (
        <StockCountForm
          onSubmit={handleStockCountSubmit}
          onClose={() => setShowStockCountForm(false)}
        />
      )}

      {showReportForm && (
        <CustomReportForm
          onSubmit={handleReportSubmit}
          onClose={() => setShowReportForm(false)}
        />
      )}
    </div>
  );
}
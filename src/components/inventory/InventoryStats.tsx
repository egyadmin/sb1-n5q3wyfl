import React from 'react';
import { Package, TrendingUp, AlertTriangle, ArrowDownRight, ArrowUpRight } from 'lucide-react';

const stats = [
  {
    id: 1,
    title: 'إجمالي المخزون',
    value: '2,347',
    change: '+12.5%',
    trend: 'up',
    icon: Package,
  },
  {
    id: 2,
    title: 'قيمة المخزون',
    value: '543,290 ريال',
    change: '+8.2%',
    trend: 'up',
    icon: TrendingUp,
  },
  {
    id: 3,
    title: 'مواد منخفضة',
    value: '12',
    change: '-2.3%',
    trend: 'down',
    icon: AlertTriangle,
  },
  {
    id: 4,
    title: 'معدل الدوران',
    value: '4.2x',
    change: '+0.8x',
    trend: 'up',
    icon: TrendingUp,
  },
];

export default function InventoryStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.id} className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Icon className="w-6 h-6 text-blue-600" />
              </div>
              <span className={`flex items-center text-sm font-medium ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.trend === 'up' ? (
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 mr-1" />
                )}
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
              <p className="text-2xl font-semibold mt-1">{stat.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
import React from 'react';
import { Box, Wrench, AlertTriangle, TrendingUp } from 'lucide-react';

export default function AssetStats() {
  const stats = [
    {
      id: 1,
      name: 'إجمالي الأصول',
      value: '234',
      change: '+12%',
      changeType: 'increase',
      icon: Box,
      description: 'أصل مسجل في النظام'
    },
    {
      id: 2,
      name: 'في الصيانة',
      value: '15',
      change: '+3%',
      changeType: 'increase',
      icon: Wrench,
      description: 'أصل تحت الصيانة'
    },
    {
      id: 3,
      name: 'أصول حرجة',
      value: '8',
      change: '-2%',
      changeType: 'decrease',
      icon: AlertTriangle,
      description: 'تحتاج إلى اهتمام فوري'
    },
    {
      id: 4,
      name: 'معدل الاستخدام',
      value: '85%',
      change: '+5%',
      changeType: 'increase',
      icon: TrendingUp,
      description: 'متوسط استخدام الأصول'
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.id} className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <dt>
              <div className="absolute bg-gradient-to-r from-blue-600 to-blue-700 rounded-md p-3">
                <Icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="mr-16 text-sm font-medium text-gray-500 truncate">
                {stat.name}
              </p>
            </dt>
            <dd className="mr-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              <p className={`mr-2 flex items-baseline text-sm font-semibold ${
                stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </p>
              <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <span className="font-medium text-gray-500">
                    {stat.description}
                  </span>
                </div>
              </div>
            </dd>
          </div>
        );
      })}
    </div>
  );
}
import React, { useState } from 'react';
import { Clock, Package, Wrench, AlertTriangle, TrendingUp, Filter, Search, Calendar } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const allActivities = [
  {
    id: 1,
    type: 'workOrder',
    title: 'تم إكمال أمر العمل #WO-2024-001',
    description: 'صيانة دورية للرافعة الشوكية',
    time: '2024-03-15 14:30',
    icon: Wrench,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    id: 2,
    type: 'inventory',
    title: 'تم استلام شحنة جديدة',
    description: 'تم استلام 50 وحدة من المنتج A1234',
    time: '2024-03-15 12:15',
    icon: Package,
    color: 'bg-green-100 text-green-600',
  },
  {
    id: 3,
    type: 'alert',
    title: 'تنبيه مخزون منخفض',
    description: 'المنتج B5678 وصل للحد الأدنى',
    time: '2024-03-15 10:45',
    icon: AlertTriangle,
    color: 'bg-yellow-100 text-yellow-600',
  },
  {
    id: 4,
    type: 'performance',
    title: 'تحسن في الأداء',
    description: 'ارتفاع معدل دوران المخزون بنسبة 15%',
    time: '2024-03-15 09:30',
    icon: TrendingUp,
    color: 'bg-purple-100 text-purple-600',
  },
  // Add more activities...
];

export default function AllActivities() {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const filteredActivities = allActivities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || activity.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">سجل النشاطات</h2>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="بحث في النشاطات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            
            <div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">جميع النشاطات</option>
                <option value="workOrder">أوامر العمل</option>
                <option value="inventory">المخزون</option>
                <option value="alert">التنبيهات</option>
                <option value="performance">الأداء</option>
              </select>
            </div>

            <div>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {filteredActivities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div
                  key={activity.id}
                  className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                  dir={language === 'ar' ? 'rtl' : 'ltr'}
                >
                  <div className={`p-2 rounded-lg ${activity.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                        <p className="text-sm text-gray-500">{activity.description}</p>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 ml-1" />
                        {new Date(activity.time).toLocaleString('ar-SA')}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
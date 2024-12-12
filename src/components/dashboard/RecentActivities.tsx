import React from 'react';
import { Clock, Package, Wrench, AlertTriangle, TrendingUp } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

const activities = [
  {
    id: 1,
    type: 'workOrder',
    title: 'تم إكمال أمر العمل #WO-2024-001',
    description: 'صيانة دورية للرافعة الشوكية',
    time: '2 ساعة',
    icon: Wrench,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    id: 2,
    type: 'inventory',
    title: 'تم استلام شحنة جديدة',
    description: 'تم استلام 50 وحدة من المنتج A1234',
    time: '4 ساعات',
    icon: Package,
    color: 'bg-green-100 text-green-600',
  },
  {
    id: 3,
    type: 'alert',
    title: 'تنبيه مخزون منخفض',
    description: 'المنتج B5678 وصل للحد الأدنى',
    time: '5 ساعات',
    icon: AlertTriangle,
    color: 'bg-yellow-100 text-yellow-600',
  },
  {
    id: 4,
    type: 'performance',
    title: 'تحسن في الأداء',
    description: 'ارتفاع معدل دوران المخزون بنسبة 15%',
    time: '6 ساعات',
    icon: TrendingUp,
    color: 'bg-purple-100 text-purple-600',
  },
];

export default function RecentActivities() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  const handleViewAll = () => {
    navigate('/activities');
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">النشاطات الأخيرة</h2>
        <Clock className="w-5 h-5 text-gray-400" />
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
            dir={language === 'ar' ? 'rtl' : 'ltr'}
          >
            <div className={`p-2 rounded-lg ${activity.color}`}>
              <activity.icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{activity.title}</p>
              <p className="text-sm text-gray-500">{activity.description}</p>
              <span className="text-xs text-gray-400 mt-1 block">{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
      
      <button 
        onClick={handleViewAll}
        className="mt-4 w-full py-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
      >
        عرض كل النشاطات
      </button>
    </div>
  );
}
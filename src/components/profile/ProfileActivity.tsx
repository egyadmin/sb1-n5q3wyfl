import React from 'react';
import { Clock, Package, Wrench, FileText, User, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

const activities = [
  {
    id: 1,
    type: 'login',
    title: 'تسجيل دخول جديد',
    description: 'تم تسجيل الدخول من متصفح Chrome',
    time: '2024-03-20T10:30:00',
    icon: User,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    id: 2,
    type: 'workOrder',
    title: 'إنشاء أمر عمل',
    description: 'تم إنشاء أمر عمل جديد #WO-2024-001',
    time: '2024-03-20T09:15:00',
    icon: Wrench,
    color: 'bg-green-100 text-green-600'
  },
  {
    id: 3,
    type: 'inventory',
    title: 'تحديث المخزون',
    description: 'تم تحديث كمية المادة A1234',
    time: '2024-03-19T16:45:00',
    icon: Package,
    color: 'bg-purple-100 text-purple-600'
  },
  {
    id: 4,
    type: 'document',
    title: 'إنشاء تقرير',
    description: 'تم إنشاء تقرير المخزون الشهري',
    time: '2024-03-19T14:20:00',
    icon: FileText,
    color: 'bg-yellow-100 text-yellow-600'
  }
];

export default function ProfileActivity() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">النشاطات الأخيرة</h3>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <select className="text-sm border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
            <option value="all">جميع النشاطات</option>
            <option value="login">تسجيل الدخول</option>
            <option value="workOrder">أوامر العمل</option>
            <option value="inventory">المخزون</option>
            <option value="document">المستندات</option>
          </select>
          <select className="text-sm border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
            <option value="7">آخر 7 أيام</option>
            <option value="30">آخر 30 يوم</option>
            <option value="90">آخر 3 أشهر</option>
          </select>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-0 h-1/2 bg-gray-50" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-lg bg-white shadow-sm">
              <div className="p-6 space-y-6">
                <div className="flow-root">
                  <ul className="-mb-8">
                    {activities.map((activity, index) => {
                      const Icon = activity.icon;
                      return (
                        <li key={activity.id}>
                          <div className="relative pb-8">
                            {index !== activities.length - 1 && (
                              <span
                                className="absolute top-5 right-5 -ml-px h-full w-0.5 bg-gray-200"
                                aria-hidden="true"
                              />
                            )}
                            <div className="relative flex items-start space-x-3 rtl:space-x-reverse">
                              <div className="relative">
                                <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${activity.color}`}>
                                  <Icon className="h-5 w-5" />
                                </div>
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="text-sm font-medium text-gray-900">
                                  {activity.title}
                                </div>
                                <div className="mt-1 text-sm text-gray-500">
                                  <p>{activity.description}</p>
                                </div>
                                <div className="mt-2 text-sm text-gray-500">
                                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                    <Calendar className="w-4 h-4" />
                                    <time dateTime={activity.time}>
                                      {format(new Date(activity.time), 'PPpp', { locale: ar })}
                                    </time>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="flex justify-center">
                  <button className="text-sm text-blue-600 hover:text-blue-700">
                    عرض المزيد من النشاطات
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
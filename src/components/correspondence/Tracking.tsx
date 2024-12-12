import React, { useState } from 'react';
import { Search, Map, Clock, User, ArrowRight } from 'lucide-react';
import type { Correspondence } from '../../types';

const mockTracking: Correspondence[] = [
  {
    id: 'COR001',
    subject: 'طلب توريد معدات جديدة',
    type: 'incoming',
    status: 'in-progress',
    priority: 'high',
    sender: 'قسم المشتريات',
    recipient: 'إدارة المستودعات',
    date: '2024-03-20',
    tracking: {
      currentLocation: 'إدارة المستودعات',
      history: [
        {
          location: 'قسم المشتريات',
          date: '2024-03-20 09:00',
          action: 'إنشاء',
          user: 'أحمد محمد'
        },
        {
          location: 'إدارة المراجعة',
          date: '2024-03-20 10:30',
          action: 'مراجعة',
          user: 'خالد عبدالله'
        },
        {
          location: 'إدارة المستودعات',
          date: '2024-03-20 11:45',
          action: 'استلام',
          user: 'محمد علي'
        }
      ]
    }
  }
];

export default function Tracking() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">تتبع المراسلات</h2>
          <p className="mt-1 text-sm text-gray-500">
            متابعة مسار وحركة المراسلات
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="relative max-w-lg">
            <input
              type="text"
              placeholder="ابحث برقم المراسلة..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {mockTracking.map((correspondence) => (
            <div key={correspondence.id} className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {correspondence.subject}
                  </h3>
                  <p className="text-sm text-gray-500">
                    رقم المراسلة: {correspondence.id}
                  </p>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Map className="w-4 h-4 ml-1" />
                  الموقع الحالي: {correspondence.tracking?.currentLocation}
                </div>
              </div>

              <div className="relative">
                <div className="absolute top-0 bottom-0 right-4 w-0.5 bg-gray-200" />
                {correspondence.tracking?.history.map((event, index) => (
                  <div key={index} className="relative flex items-start mb-8 last:mb-0">
                    <div className="absolute right-2 top-2 w-4 h-4 bg-white border-2 border-blue-600 rounded-full transform -translate-x-1/2" />
                    <div className="mr-8 flex-1 bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm font-medium text-gray-900">
                          <ArrowRight className="w-4 h-4 ml-1" />
                          {event.action}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 ml-1" />
                          {event.date}
                        </div>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-sm">
                        <div className="flex items-center text-gray-600">
                          <Map className="w-4 h-4 ml-1" />
                          {event.location}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <User className="w-4 h-4 ml-1" />
                          {event.user}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
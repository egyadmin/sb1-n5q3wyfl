import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import { ar } from 'date-fns/locale';
import { ChevronRight, ChevronLeft, Wrench, Clock } from 'lucide-react';
import type { WorkOrder } from '../../types';

const mockWorkOrders: WorkOrder[] = [
  {
    id: 'WO001',
    type: 'maintenance',
    status: 'pending',
    assetId: 'A1234',
    description: 'صيانة دورية للرافعة الشوكية',
    startDate: '2024-03-20',
    endDate: '2024-03-21',
    resources: ['فني صيانة', 'قطع غيار'],
  },
  {
    id: 'WO002',
    type: 'repair',
    status: 'in-progress',
    assetId: 'A1235',
    description: 'إصلاح عطل في نظام التبريد',
    startDate: '2024-03-19',
    endDate: '2024-03-22',
    resources: ['فني تبريد', 'مواد تبريد'],
  }
];

export default function WorkOrderCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [workOrders] = useState<WorkOrder[]>(mockWorkOrders);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const weekDays = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

  const getWorkOrdersForDay = (date: Date) => {
    return workOrders.filter(order => 
      isSameDay(new Date(order.startDate), date) || 
      isSameDay(new Date(order.endDate), date)
    );
  };

  const getStatusColor = (status: WorkOrder['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">تقويم أوامر العمل</h2>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1))}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold">
              {format(currentDate, 'MMMM yyyy', { locale: ar })}
            </h2>
            <button
              onClick={() => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1))}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-px bg-gray-200">
            {weekDays.map((day) => (
              <div
                key={day}
                className="bg-gray-50 p-2 text-center text-sm font-medium text-gray-500"
              >
                {day}
              </div>
            ))}
            {Array.from({ length: monthStart.getDay() }).map((_, index) => (
              <div key={`empty-${index}`} className="bg-white p-4" />
            ))}
            {days.map((day) => {
              const dayWorkOrders = getWorkOrdersForDay(day);
              return (
                <div
                  key={day.toISOString()}
                  className="bg-white p-4 min-h-[120px] border border-gray-100"
                >
                  <span className={`text-sm font-medium ${
                    isSameDay(day, new Date()) ? 'text-blue-600' : 'text-gray-900'
                  }`}>
                    {format(day, 'd')}
                  </span>
                  <div className="mt-2 space-y-1">
                    {dayWorkOrders.map((order) => (
                      <div
                        key={order.id}
                        className={`p-1 text-xs rounded border ${getStatusColor(order.status)}`}
                      >
                        <div className="flex items-center">
                          <Wrench className="w-3 h-3 ml-1" />
                          <span className="truncate">{order.description}</span>
                        </div>
                        <div className="flex items-center mt-1 text-gray-500">
                          <Clock className="w-3 h-3 ml-1" />
                          <span>{order.assetId}</span>
                        </div>
                      </div>
                    ))}
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
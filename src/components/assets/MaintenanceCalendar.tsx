import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import { ar } from 'date-fns/locale';
import { ChevronRight, ChevronLeft, Wrench, Clock } from 'lucide-react';
import type { MaintenanceEvent } from '../../types';

interface MaintenanceCalendarProps {
  events: MaintenanceEvent[];
}

export default function MaintenanceCalendar({ events }: MaintenanceCalendarProps) {
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const weekDays = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

  const getEventsForDay = (date: Date) => {
    return events.filter(event => isSameDay(new Date(event.date), date));
  };

  const getStatusColor = (status: MaintenanceEvent['status']) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
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
          const dayEvents = getEventsForDay(day);
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
                {dayEvents.map((event) => (
                  <div
                    key={event.id}
                    className={`p-1 text-xs rounded border ${getStatusColor(event.status)}`}
                  >
                    <div className="flex items-center">
                      <Wrench className="w-3 h-3 ml-1" />
                      <span className="truncate">{event.title}</span>
                    </div>
                    <div className="flex items-center mt-1 text-gray-500">
                      <Clock className="w-3 h-3 ml-1" />
                      <span>{event.duration} دقيقة</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { Plus, Filter, Download, Search, Calendar } from 'lucide-react';
import MaintenanceCalendar from './MaintenanceCalendar';
import MaintenanceScheduleForm from './MaintenanceScheduleForm';
import type { MaintenanceEvent } from '../../types';

const mockEvents: MaintenanceEvent[] = [
  {
    id: 'ME001',
    assetId: 'A1234',
    type: 'preventive',
    title: 'صيانة دورية للرافعة الشوكية',
    date: '2024-03-20',
    status: 'scheduled',
    technician: 'أحمد محمد',
    duration: 120,
    notes: 'فحص عام وتغيير الزيت'
  },
  {
    id: 'ME002',
    assetId: 'A1235',
    type: 'corrective',
    title: 'إصلاح نظام التبريد',
    date: '2024-03-21',
    status: 'in-progress',
    technician: 'خالد عبدالله',
    duration: 180,
    notes: 'استبدال وحدة التبريد'
  }
];

export default function MaintenanceSchedule() {
  const [events, setEvents] = useState<MaintenanceEvent[]>(mockEvents);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const handleAddEvent = (data: Omit<MaintenanceEvent, 'id'>) => {
    const newEvent: MaintenanceEvent = {
      id: `ME${events.length + 1}`.padStart(5, '0'),
      ...data
    };
    setEvents([...events, newEvent]);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">جدول الصيانة</h2>
          <p className="mt-1 text-sm text-gray-500">
            إدارة ومتابعة جداول الصيانة للأصول
          </p>
        </div>
        <div className="flex space-x-3 rtl:space-x-reverse">
          <button
            onClick={() => {}}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Download className="w-4 h-4 ml-2" />
            تصدير
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 ml-2" />
            إضافة موعد صيانة
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <input
                  type="text"
                  placeholder="بحث في جدول الصيانة..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="all">جميع الأنواع</option>
                <option value="preventive">صيانة وقائية</option>
                <option value="corrective">صيانة تصحيحية</option>
              </select>
            </div>
          </div>
        </div>

        <MaintenanceCalendar events={events} />
      </div>

      {showForm && (
        <MaintenanceScheduleForm
          onSubmit={handleAddEvent}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
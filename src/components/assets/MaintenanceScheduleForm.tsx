import React, { useState } from 'react';
import { X, Calendar, Clock, Wrench, Users, AlertTriangle, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import type { MaintenanceEvent } from '../../types';

interface MaintenanceScheduleFormProps {
  onSubmit: (data: Omit<MaintenanceEvent, 'id'>) => void;
  onClose: () => void;
}

export default function MaintenanceScheduleForm({ onSubmit, onClose }: MaintenanceScheduleFormProps) {
  const [selectedTechnician, setSelectedTechnician] = useState<string>('');
  const [isManualInput, setIsManualInput] = useState(false);
  const [manualTechnician, setManualTechnician] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    onSubmit({
      assetId: formData.get('assetId') as string,
      type: formData.get('type') as 'preventive' | 'corrective',
      title: formData.get('title') as string,
      date: formData.get('date') as string,
      status: 'scheduled',
      technician: isManualInput ? manualTechnician : selectedTechnician,
      duration: Number(formData.get('duration')),
      notes: formData.get('notes') as string
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold">جدولة صيانة جديدة</h2>
            <p className="mt-1 text-sm text-gray-500">إضافة موعد صيانة للأصول</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">الأصل</label>
              <select
                name="assetId"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">اختر الأصل</option>
                <option value="A1234">رافعة شوكية - FL-2024-001</option>
                <option value="A1235">مكيف مركزي - AC-2024-002</option>
                <option value="A1236">مولد كهربائي - GN-2024-003</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">نوع الصيانة</label>
              <select
                name="type"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="preventive">صيانة وقائية</option>
                <option value="corrective">صيانة تصحيحية</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">عنوان الصيانة</label>
            <input
              type="text"
              name="title"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="مثال: صيانة دورية للمحرك"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">تاريخ الصيانة</label>
              <input
                type="datetime-local"
                name="date"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">المدة (بالدقائق)</label>
              <input
                type="number"
                name="duration"
                required
                min="30"
                step="30"
                defaultValue="60"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الفني المسؤول (اختياري)
            </label>
            <div className="space-y-4">
              {!isManualInput ? (
                <>
                  <select
                    value={selectedTechnician}
                    onChange={(e) => setSelectedTechnician(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">اختر الفني</option>
                    <option value="أحمد محمد">أحمد محمد</option>
                    <option value="خالد عبدالله">خالد عبدالله</option>
                    <option value="محمد علي">محمد علي</option>
                    <option value="سعيد أحمد">سعيد أحمد</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => setIsManualInput(true)}
                    className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
                  >
                    <Plus className="w-4 h-4 ml-1" />
                    إضافة فني جديد
                  </button>
                </>
              ) : (
                <>
                  <input
                    type="text"
                    value={manualTechnician}
                    onChange={(e) => setManualTechnician(e.target.value)}
                    placeholder="ادخل اسم الفني"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setIsManualInput(false);
                      setManualTechnician('');
                    }}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    العودة إلى القائمة
                  </button>
                </>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">ملاحظات</label>
            <textarea
              name="notes"
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="أي ملاحظات إضافية..."
            />
          </div>

          <div className="flex justify-end space-x-3 rtl:space-x-reverse pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              جدولة الصيانة
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
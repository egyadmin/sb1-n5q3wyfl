import React, { useState } from 'react';
import { X, Calendar, Clock, Wrench, User, Package, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import type { WorkOrder } from '../../types';

interface WorkOrderFormProps {
  onSubmit: (data: Omit<WorkOrder, 'id'>) => void;
  onClose: () => void;
}

export default function WorkOrderForm({ onSubmit, onClose }: WorkOrderFormProps) {
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [selectedTechnicians, setSelectedTechnicians] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    onSubmit({
      type: formData.get('type') as WorkOrder['type'],
      status: 'pending',
      assetId: formData.get('assetId') as string,
      description: formData.get('description') as string,
      startDate: formData.get('startDate') as string,
      endDate: formData.get('endDate') as string,
      priority: formData.get('priority') as 'low' | 'medium' | 'high',
      assignedTo: selectedTechnicians,
      resources: selectedAssets,
      notes: formData.get('notes') as string,
      location: formData.get('location') as string,
      department: formData.get('department') as string
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold">أمر عمل جديد</h2>
            <p className="mt-1 text-sm text-gray-500">إنشاء أمر عمل جديد للصيانة أو الإصلاح</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">نوع العمل</label>
              <select
                name="type"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="maintenance">صيانة دورية</option>
                <option value="repair">إصلاح عطل</option>
                <option value="inspection">فحص وتفتيش</option>
                <option value="installation">تركيب</option>
                <option value="upgrade">تحديث/ترقية</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">الأولوية</label>
              <select
                name="priority"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="low">منخفضة</option>
                <option value="medium">متوسطة</option>
                <option value="high">عالية</option>
              </select>
            </div>
          </div>

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
              <label className="block text-sm font-medium text-gray-700">القسم</label>
              <select
                name="department"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">اختر القسم</option>
                <option value="maintenance">قسم الصيانة</option>
                <option value="production">قسم الإنتاج</option>
                <option value="warehouse">قسم المستودعات</option>
                <option value="quality">قسم الجودة</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">الموقع</label>
            <select
              name="location"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">اختر الموقع</option>
              <option value="مستودع أ">مستودع أ</option>
              <option value="مستودع ب">مستودع ب</option>
              <option value="مستودع ج">مستودع ج</option>
              <option value="ورشة الصيانة">ورشة الصيانة</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">وصف العمل</label>
            <textarea
              name="description"
              rows={3}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="وصف تفصيلي للعمل المطلوب..."
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">تاريخ البدء</label>
              <input
                type="datetime-local"
                name="startDate"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">تاريخ الانتهاء المتوقع</label>
              <input
                type="datetime-local"
                name="endDate"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">الفنيين المكلفين</label>
            <div className="mt-2 space-y-2">
              {['أحمد محمد', 'خالد عبدالله', 'محمد علي', 'سعيد أحمد'].map((technician) => (
                <label key={technician} className="inline-flex items-center ml-6">
                  <input
                    type="checkbox"
                    value={technician}
                    checked={selectedTechnicians.includes(technician)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedTechnicians([...selectedTechnicians, technician]);
                      } else {
                        setSelectedTechnicians(selectedTechnicians.filter(t => t !== technician));
                      }
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="mr-2 text-sm text-gray-700">{technician}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">قطع الغيار المطلوبة</label>
            <div className="mt-2 space-y-2">
              {['محرك كهربائي', 'فلتر زيت', 'مضخة هيدروليكية', 'بطارية'].map((part) => (
                <label key={part} className="inline-flex items-center ml-6">
                  <input
                    type="checkbox"
                    value={part}
                    checked={selectedAssets.includes(part)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedAssets([...selectedAssets, part]);
                      } else {
                        setSelectedAssets(selectedAssets.filter(p => p !== part));
                      }
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="mr-2 text-sm text-gray-700">{part}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">ملاحظات إضافية</label>
            <textarea
              name="notes"
              rows={2}
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
              إنشاء أمر العمل
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
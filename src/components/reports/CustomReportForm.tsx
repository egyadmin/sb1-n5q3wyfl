import React from 'react';
import { X, FileText, Calendar, Filter } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface CustomReportFormProps {
  onSubmit: (data: any) => void;
  onClose: () => void;
}

export default function CustomReportForm({ onSubmit, onClose }: CustomReportFormProps) {
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit({
      reportType: formData.get('reportType'),
      dateRange: {
        start: formData.get('startDate'),
        end: formData.get('endDate'),
      },
      filters: {
        location: formData.get('location'),
        category: formData.get('category'),
      },
      format: formData.get('format'),
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold">إنشاء تقرير مخصص</h2>
            <p className="text-sm text-gray-500 mt-1">حدد معايير التقرير</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">نوع التقرير</label>
            <div className="grid grid-cols-2 gap-4">
              {[
                { id: 'inventory', label: 'تقرير المخزون', icon: FileText },
                { id: 'movement', label: 'حركة المخزون', icon: Filter },
                { id: 'expiry', label: 'المواد منتهية الصلاحية', icon: Calendar },
                { id: 'custom', label: 'تقرير مخصص', icon: FileText },
              ].map((type) => (
                <label
                  key={type.id}
                  className="relative flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                >
                  <input
                    type="radio"
                    name="reportType"
                    value={type.id}
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <type.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className="mr-3 font-medium">{type.label}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">تاريخ البداية</label>
              <input
                type="date"
                name="startDate"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">تاريخ النهاية</label>
              <input
                type="date"
                name="endDate"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">الموقع</label>
              <select
                name="location"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="all">جميع المواقع</option>
                <option value="warehouseA">مستودع أ</option>
                <option value="warehouseB">مستودع ب</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">الفئة</label>
              <select
                name="category"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="all">جميع الفئات</option>
                <option value="raw">مواد خام</option>
                <option value="finished">منتجات نهائية</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">تنسيق التقرير</label>
            <div className="mt-2 space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="format"
                  value="pdf"
                  defaultChecked
                  className="form-radio text-blue-600"
                />
                <span className="mr-2">PDF</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="format"
                  value="excel"
                  className="form-radio text-blue-600"
                />
                <span className="mr-2">Excel</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
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
              إنشاء التقرير
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
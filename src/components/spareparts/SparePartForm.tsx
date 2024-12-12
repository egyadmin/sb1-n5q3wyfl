import React, { useState } from 'react';
import { X, Plus, Minus, Package, Wrench, Truck, DollarSign, BarChart2, FileText } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import type { SparePart } from '../../types';

interface SparePartFormProps {
  onSubmit: (data: Omit<SparePart, 'id' | 'status'>) => void;
  onClose: () => void;
}

export default function SparePartForm({ onSubmit, onClose }: SparePartFormProps) {
  const [specifications, setSpecifications] = useState<Record<string, string>>({});
  const { t } = useLanguage();

  const handleAddSpecification = () => {
    const newKey = `spec_${Object.keys(specifications).length + 1}`;
    setSpecifications({ ...specifications, [newKey]: '' });
  };

  const handleRemoveSpecification = (key: string) => {
    const newSpecs = { ...specifications };
    delete newSpecs[key];
    setSpecifications(newSpecs);
  };

  const handleSpecificationChange = (key: string, value: string) => {
    setSpecifications({ ...specifications, [key]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    onSubmit({
      name: formData.get('name') as string,
      partNumber: formData.get('partNumber') as string,
      category: formData.get('category') as SparePart['category'],
      compatibleAssets: (formData.get('compatibleAssets') as string).split(',').map(a => a.trim()),
      quantity: Number(formData.get('quantity')),
      minimumStock: Number(formData.get('minimumStock')),
      supplier: formData.get('supplier') as string,
      location: formData.get('location') as string,
      price: Number(formData.get('price')),
      specifications,
      lastUsed: new Date().toISOString(),
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">إضافة قطعة غيار جديدة</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">اسم القطعة</label>
              <input
                type="text"
                name="name"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">رقم القطعة</label>
              <input
                type="text"
                name="partNumber"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">الفئة</label>
            <select
              name="category"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="mechanical">ميكانيكي</option>
              <option value="electrical">كهربائي</option>
              <option value="hydraulic">هيدروليكي</option>
              <option value="pneumatic">هوائي</option>
              <option value="other">أخرى</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">الأصول المتوافقة</label>
            <input
              type="text"
              name="compatibleAssets"
              required
              placeholder="افصل بين الأصول بفاصلة"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">الكمية</label>
              <input
                type="number"
                name="quantity"
                required
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">الحد الأدنى</label>
              <input
                type="number"
                name="minimumStock"
                required
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">المورد</label>
            <input
              type="text"
              name="supplier"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">الموقع</label>
            <select
              name="location"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="مستودع أ - رف A1">مستودع أ - رف A1</option>
              <option value="مستودع أ - رف A2">مستودع أ - رف A2</option>
              <option value="مستودع ب - رف B1">مستودع ب - رف B1</option>
              <option value="مستودع ب - رف B2">مستودع ب - رف B2</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">السعر</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="number"
                name="price"
                required
                min="0"
                step="0.01"
                className="block w-full pr-12 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">ريال</span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-700">المواصفات</label>
              <button
                type="button"
                onClick={handleAddSpecification}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200"
              >
                <Plus className="w-4 h-4 ml-1" />
                إضافة مواصفة
              </button>
            </div>
            <div className="space-y-3">
              {Object.entries(specifications).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-3 rtl:space-x-reverse">
                  <input
                    type="text"
                    placeholder="المواصفة"
                    value={value}
                    onChange={(e) => handleSpecificationChange(key, e.target.value)}
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSpecification(key)}
                    className="p-2 text-red-600 hover:text-red-700"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
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
              إضافة
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
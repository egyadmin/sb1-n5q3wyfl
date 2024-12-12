import React from 'react';
import { X } from 'lucide-react';
import type { InventoryItem } from '../../types';

interface InventoryFormProps {
  onSubmit: (data: Omit<InventoryItem, 'id'>) => void;
  onClose: () => void;
}

export default function InventoryForm({ onSubmit, onClose }: InventoryFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    onSubmit({
      name: formData.get('name') as string,
      quantity: Number(formData.get('quantity')),
      minimumStock: Number(formData.get('minimumStock')),
      location: formData.get('location') as string,
      category: formData.get('category') as InventoryItem['category'],
      supplier: formData.get('supplier') as string,
      price: Number(formData.get('price'))
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">إضافة مادة جديدة</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">اسم المادة</label>
            <input
              type="text"
              name="name"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
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
            <label className="block text-sm font-medium text-gray-700">الفئة</label>
            <select
              name="category"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="spare-parts">قطع غيار</option>
              <option value="raw-materials">مواد خام</option>
              <option value="packaging">مواد تغليف</option>
            </select>
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
              <option value="مستودع ج - رف C1">مستودع ج - رف C1</option>
              <option value="مستودع ج - رف C2">مستودع ج - رف C2</option>
            </select>
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
            <label className="block text-sm font-medium text-gray-700">السعر</label>
            <input
              type="number"
              name="price"
              required
              min="0"
              step="0.01"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
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
              إضافة
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
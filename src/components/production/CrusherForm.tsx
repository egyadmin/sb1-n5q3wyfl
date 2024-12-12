import React, { useState } from 'react';
import { X, TruckIcon, Wrench, Fuel, Settings } from 'lucide-react';
import type { Crusher } from '../../types/production';

interface CrusherFormProps {
  onSubmit: (data: Omit<Crusher, 'id'>) => void;
  onClose: () => void;
}

export default function CrusherForm({ onSubmit, onClose }: CrusherFormProps) {
  const [fuelConsumption, setFuelConsumption] = useState({
    hourly: 0,
    daily: 0
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    onSubmit({
      name: formData.get('name') as string,
      model: formData.get('model') as string,
      manufacturer: formData.get('manufacturer') as string,
      capacity: Number(formData.get('capacity')),
      currentProduction: 0,
      location: formData.get('location') as string,
      status: 'active',
      maintenanceSchedule: {
        lastMaintenance: new Date().toISOString().split('T')[0],
        nextMaintenance: formData.get('nextMaintenance') as string
      },
      fuelConsumption: {
        hourly: Number(formData.get('hourlyFuel')),
        daily: Number(formData.get('dailyFuel')),
        supplier: 'شركة أرامكو السعودية'
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold">إضافة كسارة جديدة</h2>
            <p className="mt-1 text-sm text-gray-500">إدخال بيانات الكسارة الجديدة</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">اسم الكسارة</label>
              <input
                type="text"
                name="name"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">الموديل</label>
              <input
                type="text"
                name="model"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">الشركة المصنعة</label>
              <input
                type="text"
                name="manufacturer"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">الطاقة الإنتاجية (طن/ساعة)</label>
              <input
                type="number"
                name="capacity"
                required
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">الموقع</label>
            <input
              type="text"
              name="location"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-medium mb-4">استهلاك الوقود</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">الاستهلاك بالساعة (لتر)</label>
                <input
                  type="number"
                  name="hourlyFuel"
                  required
                  min="0"
                  step="0.1"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">الاستهلاك اليومي (لتر)</label>
                <input
                  type="number"
                  name="dailyFuel"
                  required
                  min="0"
                  step="0.1"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-medium mb-4">الصيانة</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">موعد الصيانة القادمة</label>
              <input
                type="date"
                name="nextMaintenance"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 rtl:space-x-reverse">
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
              إضافة الكسارة
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import LocationPicker from '../maps/LocationPicker';
import type { Warehouse, WarehouseSection } from '../../types/warehouse';
import type { LatLngLiteral } from '../../types/maps';

interface WarehouseFormProps {
  onSubmit: (data: Omit<Warehouse, 'id' | 'assets' | 'inventory'>) => void;
  onClose: () => void;
}

export default function WarehouseForm({ onSubmit, onClose }: WarehouseFormProps) {
  const [selectedLocation, setSelectedLocation] = useState<LatLngLiteral | null>(null);
  const [sections, setSections] = useState<Omit<WarehouseSection, 'id' | 'items'>[]>([
    { name: 'منطقة التخزين الرئيسية', type: 'storage', capacity: 0, usedCapacity: 0 }
  ]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    onSubmit({
      name: formData.get('name') as string,
      location: formData.get('location') as string,
      capacity: Number(formData.get('capacity')),
      usedCapacity: 0,
      coordinates: selectedLocation || undefined,
      sections: sections.map((section, index) => ({
        ...section,
        id: `S${index + 1}`,
        name: formData.get(`section-name-${index}`) as string,
        type: formData.get(`section-type-${index}`) as WarehouseSection['type'],
        capacity: Number(formData.get(`section-capacity-${index}`)),
        items: []
      }))
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">إضافة مستودع جديد</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">اسم المستودع</label>
              <input
                type="text"
                name="name"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">السعة الكلية</label>
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
            <label className="block text-sm font-medium text-gray-700">العنوان</label>
            <input
              type="text"
              name="location"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <LocationPicker
            value={selectedLocation || undefined}
            onChange={setSelectedLocation}
            height="300px"
          />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">أقسام المستودع</h3>
              <button
                type="button"
                onClick={() => setSections([...sections, { 
                  name: '', 
                  type: 'storage',
                  capacity: 0,
                  usedCapacity: 0
                }])}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200"
              >
                <Plus className="w-4 h-4 ml-1" />
                إضافة قسم
              </button>
            </div>

            {sections.map((section, index) => (
              <div key={index} className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700">اسم القسم</label>
                  <input
                    type="text"
                    name={`section-name-${index}`}
                    required
                    defaultValue={section.name}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">النوع</label>
                  <select
                    name={`section-type-${index}`}
                    required
                    defaultValue={section.type}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="storage">تخزين</option>
                    <option value="receiving">استلام</option>
                    <option value="shipping">شحن</option>
                    <option value="maintenance">صيانة</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">السعة</label>
                  <input
                    type="number"
                    name={`section-capacity-${index}`}
                    required
                    min="0"
                    defaultValue={section.capacity}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            ))}
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
              إضافة المستودع
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
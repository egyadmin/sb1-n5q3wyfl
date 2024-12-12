import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Truck, Search, Package, TrendingUp } from 'lucide-react';
import type { Warehouse } from '../../types/warehouse';
import { mockWarehouses } from '../../data/mockWarehouses';
import WarehouseForm from './WarehouseForm';

export default function WarehouseList() {
  const [warehouses, setWarehouses] = useState<Warehouse[]>(mockWarehouses);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const handleAddWarehouse = (data: Omit<Warehouse, 'id' | 'assets' | 'inventory'>) => {
    const newWarehouse: Warehouse = {
      id: `WH${warehouses.length + 1}`,
      ...data,
      assets: [],
      inventory: []
    };
    setWarehouses([...warehouses, newWarehouse]);
    setShowForm(false);
  };

  const getCapacityColor = (used: number, total: number) => {
    const percentage = (used / total) * 100;
    if (percentage < 60) return 'text-green-600';
    if (percentage < 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">المستودعات</h2>
          <p className="mt-1 text-sm text-gray-500">
            إدارة ومراقبة المستودعات والمخزون
          </p>
        </div>
        <div className="flex space-x-3 rtl:space-x-reverse">
          <button
            onClick={() => navigate('/warehouses/tracking')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Truck className="w-4 h-4 ml-2" />
            تتبع الشاحنات
          </button>
          <button 
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 ml-2" />
            إضافة مستودع
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {warehouses.map((warehouse) => (
          <div
            key={warehouse.id}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 cursor-pointer"
            onClick={() => navigate(`/warehouses/${warehouse.id}`)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Truck className="w-6 h-6 text-blue-600" />
                </div>
                <div className="mr-3">
                  <h3 className="text-lg font-medium">{warehouse.name}</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <Search className="w-4 h-4 ml-1" />
                    {warehouse.location}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">السعة المستخدمة</span>
                <span className={`font-medium ${getCapacityColor(warehouse.usedCapacity, warehouse.capacity)}`}>
                  {warehouse.usedCapacity} / {warehouse.capacity}
                </span>
              </div>

              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getCapacityColor(warehouse.usedCapacity, warehouse.capacity).replace('text-', 'bg-')}`}
                  style={{ width: `${(warehouse.usedCapacity / warehouse.capacity) * 100}%` }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Package className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                  <span className="text-sm text-gray-600">
                    {warehouse.sections.length} أقسام
                  </span>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-green-600 mx-auto mb-1" />
                  <span className="text-sm text-gray-600">
                    نشط
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <WarehouseForm
          onSubmit={handleAddWarehouse}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
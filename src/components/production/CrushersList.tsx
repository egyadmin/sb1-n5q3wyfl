import React, { useState } from 'react';
import { Plus, Search, Filter, TruckIcon, Wrench, AlertTriangle, Fuel, Settings } from 'lucide-react';
import { mockCrushers } from '../../data/mockProduction';
import type { Crusher } from '../../types/production';
import CrusherForm from './CrusherForm';

export default function CrushersList() {
  const [crushers, setCrushers] = useState<Crusher[]>(mockCrushers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showForm, setShowForm] = useState(false);

  const handleAddCrusher = (data: Omit<Crusher, 'id'>) => {
    const newCrusher: Crusher = {
      id: `CR${crushers.length + 1}`.padStart(5, '0'),
      ...data
    };
    setCrushers([...crushers, newCrusher]);
    setShowForm(false);
  };

  const getStatusColor = (status: Crusher['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
    }
  };

  const getStatusText = (status: Crusher['status']) => {
    switch (status) {
      case 'active':
        return 'نشط';
      case 'maintenance':
        return 'في الصيانة';
      case 'inactive':
        return 'متوقف';
    }
  };

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 90) return 'text-green-600';
    if (efficiency >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const calculateEfficiency = (current: number, capacity: number) => {
    return Math.round((current / capacity) * 100);
  };

  const filteredCrushers = crushers.filter(crusher => {
    const matchesSearch = 
      crusher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crusher.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || crusher.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">الكسارات</h2>
          <p className="mt-1 text-sm text-gray-500">
            إدارة ومتابعة الكسارات والإنتاج
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 ml-2" />
          إضافة كسارة
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="بحث في الكسارات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">جميع الحالات</option>
                <option value="active">نشط</option>
                <option value="maintenance">في الصيانة</option>
                <option value="inactive">متوقف</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {filteredCrushers.map((crusher) => {
            const efficiency = calculateEfficiency(crusher.currentProduction, crusher.capacity);
            return (
              <div key={crusher.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <TruckIcon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="mr-3">
                        <h3 className="text-lg font-medium text-gray-900">{crusher.name}</h3>
                        <p className="text-sm text-gray-500">{crusher.model}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(crusher.status)}`}>
                      {getStatusText(crusher.status)}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">الطاقة الإنتاجية</span>
                      <span className="font-medium">{crusher.capacity} طن/ساعة</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">الإنتاج الحالي</span>
                      <span className={`font-medium ${getEfficiencyColor(efficiency)}`}>
                        {crusher.currentProduction} طن/ساعة ({efficiency}%)
                      </span>
                    </div>

                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          efficiency >= 90 ? 'bg-green-500' :
                          efficiency >= 70 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${efficiency}%` }}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Fuel className="w-4 h-4 text-gray-400" />
                        <div className="text-sm">
                          <p className="text-gray-500">استهلاك الوقود</p>
                          <p className="font-medium">{crusher.fuelConsumption?.daily} لتر/يوم</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Settings className="w-4 h-4 text-gray-400" />
                        <div className="text-sm">
                          <p className="text-gray-500">الصيانة القادمة</p>
                          <p className="font-medium">{crusher.maintenanceSchedule.nextMaintenance}</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-gray-500">
                          <Wrench className="w-4 h-4 ml-1" />
                          <span>آخر صيانة: {crusher.maintenanceSchedule.lastMaintenance}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showForm && (
        <CrusherForm
          onSubmit={handleAddCrusher}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
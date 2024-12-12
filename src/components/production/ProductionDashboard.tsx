import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TruckIcon, Package, BarChart2, Clock, AlertTriangle } from 'lucide-react';
import { mockCrushers } from '../../data/mockProduction';

export default function ProductionDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">إدارة الإنتاج والكسارات</h2>
          <p className="mt-1 text-sm text-gray-500">
            متابعة وإدارة عمليات الإنتاج والكسارات
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-blue-50 rounded-lg">
              <TruckIcon className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-green-600">+12%</span>
          </div>
          <h3 className="mt-4 text-lg font-medium">الكسارات النشطة</h3>
          <p className="text-2xl font-semibold mt-1">8</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-green-50 rounded-lg">
              <Package className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm font-medium text-green-600">+8%</span>
          </div>
          <h3 className="mt-4 text-lg font-medium">إجمالي الإنتاج</h3>
          <p className="text-2xl font-semibold mt-1">15,240 طن</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-sm font-medium text-yellow-600">95%</span>
          </div>
          <h3 className="mt-4 text-lg font-medium">كفاءة التشغيل</h3>
          <p className="text-2xl font-semibold mt-1">95%</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-red-50 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <span className="text-sm font-medium text-red-600">2</span>
          </div>
          <h3 className="mt-4 text-lg font-medium">الأعطال النشطة</h3>
          <p className="text-2xl font-semibold mt-1">2</p>
        </div>
      </div>

      {/* Production Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">الكسارات النشطة</h3>
          <div className="space-y-4">
            {mockCrushers.slice(0, 4).map((crusher) => (
              <div key={crusher.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <TruckIcon className="w-5 h-5 text-blue-600 ml-3" />
                  <div>
                    <h4 className="font-medium">{crusher.name}</h4>
                    <p className="text-sm text-gray-500">{crusher.location}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{crusher.currentProduction} طن/ساعة</p>
                  <p className="text-xs text-gray-500">الإنتاج الحالي</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">المواد المنتجة</h3>
          <div className="space-y-4">
            {[
              { name: 'بحص مقاس 3/4', quantity: '2,500 طن', efficiency: '98%' },
              { name: 'بحص مقاس 3/8', quantity: '1,800 طن', efficiency: '95%' },
              { name: 'صلبوخ', quantity: '3,200 طن', efficiency: '97%' },
              { name: 'رمل', quantity: '4,500 طن', efficiency: '96%' }
            ].map((material, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Package className="w-5 h-5 text-green-600 ml-3" />
                  <div>
                    <h4 className="font-medium">{material.name}</h4>
                    <p className="text-sm text-gray-500">{material.quantity}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-600">{material.efficiency}</p>
                  <p className="text-xs text-gray-500">كفاءة الإنتاج</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
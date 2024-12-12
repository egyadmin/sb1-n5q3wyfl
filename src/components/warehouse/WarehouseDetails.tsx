import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Package, 
  TrendingUp, 
  Users, 
  Truck,
  MapPin,
  BarChart2,
  ArrowRight
} from 'lucide-react';
import { mockWarehouses } from '../../data/mockWarehouses';
import MapProvider from '../maps/MapProvider';
import GoogleMapComponent from '../maps/GoogleMapComponent';

export default function WarehouseDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const warehouse = mockWarehouses.find(w => w.id === id);

  if (!warehouse) {
    return <div>المستودع غير موجود</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-semibold">{warehouse.name}</h2>
          <div className="flex items-center mt-1 text-gray-500">
            <MapPin className="w-4 h-4 ml-1" />
            {warehouse.location}
          </div>
        </div>
        <button
          onClick={() => navigate(`/warehouses/${id}/inventory`)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Package className="w-4 h-4 ml-2" />
          عرض المخزون
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <span className={`text-sm font-medium ${
              warehouse.usedCapacity / warehouse.capacity > 0.8 
                ? 'text-red-600' 
                : 'text-green-600'
            }`}>
              {Math.round((warehouse.usedCapacity / warehouse.capacity) * 100)}%
            </span>
          </div>
          <h3 className="mt-4 text-lg font-medium">السعة المستخدمة</h3>
          <p className="text-gray-500">{warehouse.usedCapacity} / {warehouse.capacity}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-green-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <h3 className="mt-4 text-lg font-medium">عدد الأقسام</h3>
          <p className="text-gray-500">{warehouse.sections.length} قسم</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <Truck className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <h3 className="mt-4 text-lg font-medium">المواد المخزنة</h3>
          <p className="text-gray-500">{warehouse.inventory.length} مادة</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden h-[400px]">
            <MapProvider>
              <GoogleMapComponent
                center={warehouse.coordinates}
                zoom={15}
                markers={[
                  {
                    lat: warehouse.coordinates?.lat || 0,
                    lng: warehouse.coordinates?.lng || 0,
                    title: warehouse.name
                  }
                ]}
              />
            </MapProvider>
          </div>
        </div>

        <div className="space-y-4">
          {warehouse.sections.map((section) => (
            <div
              key={section.id}
              className="bg-white rounded-lg shadow-sm p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{section.name}</h3>
                <span className={`text-sm ${
                  section.usedCapacity / section.capacity > 0.8
                    ? 'text-red-600'
                    : 'text-green-600'
                }`}>
                  {Math.round((section.usedCapacity / section.capacity) * 100)}%
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    section.usedCapacity / section.capacity > 0.8
                      ? 'bg-red-600'
                      : 'bg-green-600'
                  }`}
                  style={{
                    width: `${(section.usedCapacity / section.capacity) * 100}%`
                  }}
                />
              </div>
              <div className="mt-2 text-sm text-gray-500">
                السعة: {section.usedCapacity} / {section.capacity}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
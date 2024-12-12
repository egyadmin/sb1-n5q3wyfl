import React, { useState } from 'react';
import { X, MapPin } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { Icon } from 'leaflet';
import type { Asset } from '../../types';
import 'leaflet/dist/leaflet.css';

// Fix default marker icon
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

interface AssetFormProps {
  asset?: Asset;
  onSubmit: (data: Omit<Asset, 'id' | 'lastUpdated'>) => void;
  onClose: () => void;
}

function LocationMarker({ position, onLocationSelect }: { 
  position?: { lat: number; lng: number }; 
  onLocationSelect: (lat: number, lng: number) => void;
}) {
  const map = useMapEvents({
    click(e) {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });

  return position ? <Marker position={position} /> : null;
}

export default function AssetForm({ asset, onSubmit, onClose }: AssetFormProps) {
  const [selectedLocation, setSelectedLocation] = useState<{lat: number; lng: number} | null>(
    asset?.coordinates || null
  );

  const handleLocationSelect = (lat: number, lng: number) => {
    setSelectedLocation({ lat, lng });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    onSubmit({
      name: formData.get('name') as string,
      serialNumber: formData.get('serialNumber') as string,
      category: formData.get('category') as Asset['category'],
      location: formData.get('location') as string,
      status: formData.get('status') as Asset['status'],
      specifications: {
        model: formData.get('model') as string,
        brand: formData.get('brand') as string,
        capacity: formData.get('capacity') as string
      },
      purchaseDate: formData.get('purchaseDate') as string,
      warrantyEnd: formData.get('warrantyEnd') as string,
      value: Number(formData.get('value')),
      department: formData.get('department') as string,
      coordinates: selectedLocation || undefined
    });
  };

  const defaultCenter = { lat: 24.7136, lng: 46.6753 }; // Riyadh coordinates

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">{asset ? 'تعديل أصل' : 'إضافة أصل جديد'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">اسم الأصل</label>
              <input
                type="text"
                name="name"
                defaultValue={asset?.name}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">الرقم التسلسلي</label>
              <input
                type="text"
                name="serialNumber"
                defaultValue={asset?.serialNumber}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">الفئة</label>
              <select
                name="category"
                defaultValue={asset?.category}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="equipment">معدات</option>
                <option value="devices">أجهزة</option>
                <option value="real-estate">عقارات</option>
                <option value="farms">مزارع</option>
                <option value="crushers">كسارات</option>
                <option value="office">أصول مكتبية</option>
                <option value="printers">طابعات</option>
                <option value="mobile">أجهزة محمولة</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">الحالة</label>
              <select
                name="status"
                defaultValue={asset?.status || 'active'}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="active">نشط</option>
                <option value="maintenance">في الصيانة</option>
                <option value="inactive">غير نشط</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">الموقع</label>
            <div className="mt-1 relative">
              <input
                type="text"
                name="location"
                defaultValue={asset?.location}
                required
                className="block w-full pr-10 pl-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <div className="p-4 bg-gray-50 border-b">
              <h3 className="font-medium text-gray-900">تحديد الموقع على الخريطة</h3>
              <p className="mt-1 text-sm text-gray-500">انقر على الخريطة لتحديد موقع الأصل</p>
            </div>
            <div className="h-[300px]">
              <MapContainer
                center={selectedLocation || defaultCenter}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <LocationMarker 
                  position={selectedLocation || undefined}
                  onLocationSelect={handleLocationSelect}
                />
              </MapContainer>
            </div>
            {selectedLocation && (
              <div className="p-4 bg-gray-50 border-t">
                <p className="text-sm text-gray-600">
                  الإحداثيات: {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
                </p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">الموديل</label>
              <input
                type="text"
                name="model"
                defaultValue={asset?.specifications?.model}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">العلامة التجارية</label>
              <input
                type="text"
                name="brand"
                defaultValue={asset?.specifications?.brand}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">السعة/القدرة</label>
              <input
                type="text"
                name="capacity"
                defaultValue={asset?.specifications?.capacity}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">تاريخ الشراء</label>
              <input
                type="date"
                name="purchaseDate"
                defaultValue={asset?.purchaseDate}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">نهاية الضمان</label>
              <input
                type="date"
                name="warrantyEnd"
                defaultValue={asset?.warrantyEnd}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">القيمة</label>
              <input
                type="number"
                name="value"
                defaultValue={asset?.value}
                required
                min="0"
                step="0.01"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">القسم</label>
            <input
              type="text"
              name="department"
              defaultValue={asset?.department}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
              {asset ? 'حفظ التغييرات' : 'إضافة الأصل'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
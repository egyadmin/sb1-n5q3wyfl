import React, { useState } from 'react';
import { MapPin, Search, Filter, Building2 } from 'lucide-react';
import MapProvider from '../maps/MapProvider';
import AssetTracker from '../maps/AssetTracker';
import type { Asset } from '../../types';

const mockAssets: Asset[] = [
  {
    id: 'A1234',
    name: 'رافعة شوكية',
    serialNumber: 'FL-2024-001',
    category: 'equipment',
    location: 'مستودع أ',
    status: 'active',
    lastUpdated: '2024-03-15',
    coordinates: {
      lat: 24.7136,
      lng: 46.6753
    }
  },
  {
    id: 'A1235',
    name: 'مكيف مركزي',
    serialNumber: 'AC-2024-002',
    category: 'devices',
    location: 'مستودع ب',
    status: 'maintenance',
    lastUpdated: '2024-03-14',
    coordinates: {
      lat: 24.7236,
      lng: 46.6853
    }
  }
];

export default function AssetLocations() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  const filteredAssets = mockAssets.filter(asset => {
    const matchesSearch = 
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || asset.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">مواقع الأصول</h2>
          <p className="mt-1 text-sm text-gray-500">
            عرض وتتبع مواقع الأصول على الخريطة
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden h-[600px]">
            <MapProvider>
              <AssetTracker
                assets={filteredAssets}
                selectedAsset={selectedAsset || undefined}
              />
            </MapProvider>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="relative">
              <input
                type="text"
                placeholder="بحث عن أصل..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="mt-3 block w-full rounded-lg border border-gray-300 py-2 pl-3 pr-10 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">جميع الفئات</option>
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

          <div className="bg-white rounded-lg shadow-sm divide-y">
            {filteredAssets.map((asset) => (
              <div
                key={asset.id}
                className={`p-4 cursor-pointer transition-colors ${
                  selectedAsset?.id === asset.id ? 'bg-blue-50' : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedAsset(asset)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="mr-3">
                      <h3 className="font-medium text-gray-900">{asset.name}</h3>
                      <p className="text-sm text-gray-500">{asset.serialNumber}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <Building2 className="w-4 h-4 ml-1" />
                  {asset.location}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
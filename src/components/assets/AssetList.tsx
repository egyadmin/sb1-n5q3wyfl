import React, { useState } from 'react';
import { Plus, Filter, Download, Search, Box } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import type { Asset } from '../../types';
import AssetForm from './AssetForm';

const mockAssets: Asset[] = [
  {
    id: 'A1234',
    name: 'رافعة شوكية',
    serialNumber: 'FL-2024-001',
    category: 'equipment',
    location: 'مستودع أ',
    status: 'active',
    lastUpdated: '2024-03-15',
    specifications: {
      model: 'Toyota 8FD25',
      capacity: '2.5 طن',
      height: '3 متر'
    },
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
    specifications: {
      brand: 'Carrier',
      capacity: '5 طن تبريد',
      type: 'سبليت'
    }
  }
];

export default function AssetList() {
  const { t } = useLanguage();
  const [assets, setAssets] = useState<Asset[]>(mockAssets);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const handleAddAsset = (data: Omit<Asset, 'id' | 'lastUpdated'>) => {
    const newAsset: Asset = {
      id: `A${assets.length + 1000}`,
      lastUpdated: new Date().toISOString(),
      ...data
    };
    setAssets([...assets, newAsset]);
    setShowForm(false);
  };

  const getStatusColor = (status: Asset['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
    }
  };

  const getStatusText = (status: Asset['status']) => {
    switch (status) {
      case 'active':
        return 'نشط';
      case 'maintenance':
        return 'في الصيانة';
      case 'inactive':
        return 'غير نشط';
    }
  };

  const filteredAssets = assets.filter(asset => {
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
          <h2 className="text-2xl font-semibold">الأصول</h2>
          <p className="mt-1 text-sm text-gray-500">
            إدارة وتتبع الأصول والمعدات
          </p>
        </div>
        <div className="flex space-x-3 rtl:space-x-reverse">
          <button
            onClick={() => {}}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Download className="w-4 h-4 ml-2" />
            تصدير
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 ml-2" />
            إضافة أصل
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <input
                  type="text"
                  placeholder="بحث في الأصول..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
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
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الأصل
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الرقم التسلسلي
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الموقع
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الحالة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  آخر تحديث
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAssets.map((asset) => (
                <tr key={asset.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Box className="w-5 h-5 text-gray-400 ml-2" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{asset.name}</div>
                        <div className="text-sm text-gray-500">{asset.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {asset.serialNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {asset.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(asset.status)}`}>
                      {getStatusText(asset.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(asset.lastUpdated).toLocaleDateString('ar-SA')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <AssetForm
          onSubmit={handleAddAsset}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
import React, { useState } from 'react';
import { AlertTriangle, Search, Filter, Download, Package } from 'lucide-react';

interface LowStockItem {
  id: string;
  name: string;
  current: number;
  minimum: number;
  location: string;
  supplier: string;
  lastOrder: string;
}

const mockItems: LowStockItem[] = [
  {
    id: 'LSI001',
    name: 'قطع غيار محركات',
    current: 5,
    minimum: 10,
    location: 'مستودع أ',
    supplier: 'المورد الأول',
    lastOrder: '2024-03-01'
  },
  {
    id: 'LSI002',
    name: 'مواد خام',
    current: 8,
    minimum: 15,
    location: 'مستودع ب',
    supplier: 'المورد الثاني',
    lastOrder: '2024-03-05'
  },
  {
    id: 'LSI003',
    name: 'مواد تغليف',
    current: 12,
    minimum: 20,
    location: 'مستودع ج',
    supplier: 'المورد الثالث',
    lastOrder: '2024-03-10'
  }
];

export default function LowStock() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLocation, setFilterLocation] = useState('all');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">المواد منخفضة المخزون</h2>
          <p className="mt-1 text-sm text-gray-500">
            متابعة المواد التي وصلت للحد الأدنى
          </p>
        </div>
        <button
          onClick={() => {}}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <Download className="w-4 h-4 ml-2" />
          تصدير
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <input
                  type="text"
                  placeholder="بحث في المواد..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <select
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="all">جميع المواقع</option>
                <option value="warehouse-a">مستودع أ</option>
                <option value="warehouse-b">مستودع ب</option>
                <option value="warehouse-c">مستودع ج</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  المادة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  المخزون الحالي
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الحد الأدنى
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الموقع
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  المورد
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  آخر طلب
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Package className="w-5 h-5 text-gray-400 ml-2" />
                      <span className="text-sm font-medium text-gray-900">
                        {item.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <AlertTriangle className={`w-4 h-4 ml-2 ${
                        item.current <= item.minimum / 2 ? 'text-red-500' : 'text-yellow-500'
                      }`} />
                      <span className="text-sm text-gray-900">{item.current}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.minimum}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.supplier}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.lastOrder}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { Search, Filter, Download, ArrowUpDown, Package, Camera, Save } from 'lucide-react';
import QRScanner from './QRScanner';
import StockCountForm from './StockCountForm';
import { parseQRData } from '../../utils/qrGenerator';
import { exportStockCountToExcel } from '../../utils/excelExport';
import type { StockItem } from '../../types';

interface StockCountGroup {
  id: string;
  name: string;
  items: StockItem[];
  totalExpected: number;
  totalActual: number;
  difference: number;
  status: 'pending' | 'in-progress' | 'completed';
}

export default function StockCount() {
  const [showForm, setShowForm] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  // Group mock data by location
  const stockGroups: StockCountGroup[] = [
    {
      id: 'G1',
      name: 'مستودع أ - رف 1',
      items: [
        {
          id: 'SI001',
          name: 'قطع غيار محركات',
          expected: 100,
          actual: 98,
          location: 'مستودع أ - رف 1',
          lastCount: '2024-03-10',
          status: 'completed'
        },
        {
          id: 'SI002',
          name: 'فلاتر زيت',
          expected: 50,
          actual: 48,
          location: 'مستودع أ - رف 1',
          lastCount: '2024-03-10',
          status: 'completed'
        }
      ],
      totalExpected: 150,
      totalActual: 146,
      difference: -4,
      status: 'completed'
    },
    {
      id: 'G2',
      name: 'مستودع ب - رف 2',
      items: [
        {
          id: 'SI003',
          name: 'مواد خام',
          expected: 200,
          actual: 0,
          location: 'مستودع ب - رف 2',
          lastCount: '2024-03-12',
          status: 'pending'
        }
      ],
      totalExpected: 200,
      totalActual: 0,
      difference: -200,
      status: 'pending'
    }
  ];

  const handleExport = () => {
    try {
      const allItems = stockGroups.flatMap(group => group.items);
      exportStockCountToExcel(allItems);
    } catch (error) {
      console.error('Error exporting to Excel:', error);
    }
  };

  const handleScan = (decodedText: string) => {
    try {
      const scannedItem = parseQRData(decodedText);
      // Update the relevant group and item
      // Implementation would go here
      setShowScanner(false);
    } catch (error) {
      console.error('Error processing QR code:', error);
    }
  };

  const getStatusColor = (status: StockCountGroup['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusText = (status: StockCountGroup['status']) => {
    switch (status) {
      case 'completed':
        return 'مكتمل';
      case 'in-progress':
        return 'قيد التنفيذ';
      case 'pending':
        return 'قيد الانتظار';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">جرد المخزون</h2>
          <p className="mt-1 text-sm text-gray-500">
            إدارة وتتبع عمليات جرد المخزون
          </p>
        </div>
        <div className="flex space-x-3 rtl:space-x-reverse">
          <button
            onClick={handleExport}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Download className="w-4 h-4 ml-2" />
            تصدير Excel
          </button>
          <button
            onClick={() => setShowScanner(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Camera className="w-4 h-4 ml-2" />
            مسح QR
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <ArrowUpDown className="w-4 h-4 ml-2" />
            جرد جديد
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">جميع الحالات</option>
              <option value="pending">قيد الانتظار</option>
              <option value="in-progress">قيد التنفيذ</option>
              <option value="completed">مكتمل</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stock Groups */}
      <div className="space-y-6">
        {stockGroups.map((group) => (
          <div key={group.id} className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <Package className="w-6 h-6 text-gray-400" />
                  <div>
                    <h3 className="text-lg font-medium">{group.name}</h3>
                    <p className="text-sm text-gray-500">
                      {group.items.length} مادة • المتوقع: {group.totalExpected} • الفعلي: {group.totalActual}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(group.status)}`}>
                    {getStatusText(group.status)}
                  </span>
                  <button
                    onClick={() => setSelectedGroup(selectedGroup === group.id ? null : group.id)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    {selectedGroup === group.id ? 'إخفاء' : 'عرض التفاصيل'}
                  </button>
                </div>
              </div>
            </div>

            {selectedGroup === group.id && (
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          المادة
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          العدد المتوقع
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          العدد الفعلي
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          الفرق
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          آخر جرد
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {group.items.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Package className="w-5 h-5 text-gray-400 ml-2" />
                              <span className="text-sm font-medium text-gray-900">
                                {item.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.expected}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.actual}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              item.actual - item.expected === 0
                                ? 'bg-green-100 text-green-800'
                                : item.actual - item.expected > 0
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {item.actual - item.expected}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.lastCount}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => {/* Save group count */}}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <Save className="w-4 h-4 ml-2" />
                    حفظ الجرد
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {showScanner && (
        <QRScanner
          onScan={handleScan}
          onClose={() => setShowScanner(false)}
        />
      )}

      {showForm && (
        <StockCountForm
          onSubmit={(data) => {
            console.log('Stock count data:', data);
            setShowForm(false);
          }}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
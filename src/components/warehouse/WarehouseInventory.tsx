import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Package, 
  Search, 
  Filter, 
  AlertTriangle, 
  ArrowLeftRight, 
  Plus,
  BarChart2,
  Download,
  QrCode,
  ArrowRight
} from 'lucide-react';
import { mockWarehouses } from '../../data/mockWarehouses';
import TransferForm from '../inventory/TransferForm';
import QRScanner from '../inventory/QRScanner';
import { exportToExcel } from '../../utils/export';

export default function WarehouseInventory() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const warehouse = mockWarehouses.find(w => w.id === id);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showTransferForm, setShowTransferForm] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [selectedView, setSelectedView] = useState<'list' | 'grid'>('list');

  if (!warehouse) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        المستودع غير موجود
      </div>
    );
  }

  const filteredInventory = warehouse.inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleExport = () => {
    const data = filteredInventory.map(item => ({
      'اسم المادة': item.name,
      'الكمية': item.quantity,
      'الحد الأدنى': item.minimumStock,
      'الموقع': item.location,
      'الحالة': item.quantity <= item.minimumStock ? 'منخفض' : 'متوفر'
    }));

    exportToExcel(data, `مخزون_${warehouse.name}`);
  };

  const handleQRScan = (result: string) => {
    console.log('QR Scan Result:', result);
    setShowQRScanner(false);
    // Handle QR scan result
  };

  const getInventoryStats = () => {
    const total = filteredInventory.length;
    const lowStock = filteredInventory.filter(item => item.quantity <= item.minimumStock).length;
    const categories = new Set(filteredInventory.map(item => item.category)).size;
    
    return { total, lowStock, categories };
  };

  const stats = getInventoryStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <button
              onClick={() => navigate(`/warehouses/${id}`)}
              className="inline-flex items-center text-gray-500 hover:text-gray-700"
            >
              <ArrowRight className="w-5 h-5 ml-1" />
              عودة للمستودع
            </button>
            <div>
              <h2 className="text-2xl font-semibold">مخزون {warehouse.name}</h2>
              <p className="text-sm text-gray-500">إدارة المخزون في {warehouse.name}</p>
            </div>
          </div>
          <div className="flex space-x-3 rtl:space-x-reverse">
            <button
              onClick={() => setShowQRScanner(true)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <QrCode className="w-4 h-4 ml-2" />
              مسح QR
            </button>
            <button
              onClick={handleExport}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Download className="w-4 h-4 ml-2" />
              تصدير
            </button>
            <button
              onClick={() => setShowTransferForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <ArrowLeftRight className="w-4 h-4 ml-2" />
              تحويل مخزون
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-blue-600">إجمالي المواد</span>
            </div>
            <p className="mt-2 text-2xl font-semibold">{stats.total}</p>
          </div>

          <div className="bg-yellow-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
              </div>
              <span className="text-sm font-medium text-yellow-600">مواد منخفضة</span>
            </div>
            <p className="mt-2 text-2xl font-semibold">{stats.lowStock}</p>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-green-100 rounded-lg">
                <Filter className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm font-medium text-green-600">الفئات</span>
            </div>
            <p className="mt-2 text-2xl font-semibold">{stats.categories}</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div className="flex-1 max-w-lg">
            <div className="relative">
              <input
                type="text"
                placeholder="بحث في المخزون..."
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
              <option value="spare-parts">قطع غيار</option>
              <option value="raw-materials">مواد خام</option>
              <option value="packaging">مواد تغليف</option>
            </select>
            <div className="flex border rounded-lg overflow-hidden">
              <button
                onClick={() => setSelectedView('list')}
                className={`px-3 py-2 ${
                  selectedView === 'list' 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'bg-white text-gray-600'
                }`}
              >
                <Package className="w-5 h-5" />
              </button>
              <button
                onClick={() => setSelectedView('grid')}
                className={`px-3 py-2 ${
                  selectedView === 'grid' 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'bg-white text-gray-600'
                }`}
              >
                <BarChart2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Inventory List/Grid */}
      {selectedView === 'list' ? (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    المادة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الكمية
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الحد الأدنى
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الموقع
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الحالة
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInventory.map((item) => (
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
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.minimumStock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.quantity <= item.minimumStock ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          <AlertTriangle className="w-4 h-4 ml-1" />
                          منخفض
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          متوفر
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInventory.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Package className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="mr-3">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.location}</p>
                  </div>
                </div>
                {item.quantity <= item.minimumStock && (
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                )}
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">الكمية الحالية</span>
                  <span className="font-medium">{item.quantity}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">الحد الأدنى</span>
                  <span className="font-medium">{item.minimumStock}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      item.quantity <= item.minimumStock ? 'bg-red-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min((item.quantity / (item.minimumStock * 2)) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showTransferForm && (
        <TransferForm
          sourceWarehouse={warehouse}
          onSubmit={(data) => {
            console.log('Transfer data:', data);
            setShowTransferForm(false);
          }}
          onClose={() => setShowTransferForm(false)}
        />
      )}

      {showQRScanner && (
        <QRScanner
          onScan={handleQRScan}
          onClose={() => setShowQRScanner(false)}
        />
      )}
    </div>
  );
}
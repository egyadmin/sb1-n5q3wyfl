import React, { useState } from 'react';
import { Search, Filter, Download, Trash2, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

interface DisposalRecord {
  id: string;
  itemName: string;
  quantity: number;
  reason: string;
  disposalDate: string;
  approvedBy: string;
  location: string;
  method: string;
  status: 'pending' | 'approved' | 'completed';
}

const mockDisposals: DisposalRecord[] = [
  {
    id: 'D001',
    itemName: 'مواد تالفة',
    quantity: 50,
    reason: 'منتهية الصلاحية',
    disposalDate: '2024-03-15',
    approvedBy: 'أحمد محمد',
    location: 'مستودع أ',
    method: 'إتلاف',
    status: 'completed'
  },
  {
    id: 'D002',
    itemName: 'قطع غيار معطلة',
    quantity: 25,
    reason: 'غير صالحة للاستخدام',
    disposalDate: '2024-03-14',
    approvedBy: 'خالد عبدالله',
    location: 'مستودع ب',
    method: 'إعادة تدوير',
    status: 'pending'
  }
];

export default function DisposalReport() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const getStatusColor = (status: DisposalRecord['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
    }
  };

  const getStatusText = (status: DisposalRecord['status']) => {
    switch (status) {
      case 'pending':
        return 'قيد الانتظار';
      case 'approved':
        return 'معتمد';
      case 'completed':
        return 'مكتمل';
    }
  };

  const filteredDisposals = mockDisposals.filter(disposal => {
    const matchesSearch = 
      disposal.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      disposal.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || disposal.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">تقرير الإتلاف</h2>
          <p className="mt-1 text-sm text-gray-500">
            متابعة وإدارة عمليات إتلاف المواد
          </p>
        </div>
        <button
          onClick={() => {}}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <Download className="w-4 h-4 ml-2" />
          تصدير التقرير
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="بحث..."
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
                <option value="approved">معتمد</option>
                <option value="completed">مكتمل</option>
              </select>
            </div>

            <div>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                className="w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                className="w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  رقم العملية
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  المادة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الكمية
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  السبب
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  التاريخ
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  معتمد من
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الحالة
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDisposals.map((disposal) => (
                <tr key={disposal.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {disposal.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Trash2 className="w-5 h-5 text-gray-400 ml-2" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {disposal.itemName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {disposal.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {disposal.quantity} وحدة
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {disposal.reason}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 ml-1" />
                      {format(new Date(disposal.disposalDate), 'PPP', { locale: ar })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {disposal.approvedBy}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(disposal.status)}`}>
                      {getStatusText(disposal.status)}
                    </span>
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
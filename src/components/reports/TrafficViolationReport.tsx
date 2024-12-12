import React, { useState } from 'react';
import { Calendar, Search, Filter, Download, Car, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

interface ViolationRecord {
  id: string;
  vehicleId: string;
  driverName: string;
  violationType: string;
  date: string;
  location: string;
  status: 'pending' | 'resolved' | 'escalated';
  fine: number;
}

const mockViolations: ViolationRecord[] = [
  {
    id: 'V001',
    vehicleId: 'FL-2024-001',
    driverName: 'أحمد محمد',
    violationType: 'تجاوز السرعة',
    date: '2024-03-15',
    location: 'المنطقة الصناعية',
    status: 'pending',
    fine: 500
  },
  {
    id: 'V002',
    vehicleId: 'TR-2024-002',
    driverName: 'خالد عبدالله',
    violationType: 'وقوف خاطئ',
    date: '2024-03-14',
    location: 'مستودع أ',
    status: 'resolved',
    fine: 200
  }
];

export default function TrafficViolationReport() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const getStatusColor = (status: ViolationRecord['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'escalated':
        return 'bg-red-100 text-red-800';
    }
  };

  const getStatusText = (status: ViolationRecord['status']) => {
    switch (status) {
      case 'pending':
        return 'قيد المعالجة';
      case 'resolved':
        return 'تمت المعالجة';
      case 'escalated':
        return 'تم التصعيد';
    }
  };

  const filteredViolations = mockViolations.filter(violation => {
    const matchesSearch = 
      violation.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      violation.vehicleId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || violation.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">تقرير مخالفات المرور</h2>
          <p className="mt-1 text-sm text-gray-500">
            متابعة وإدارة مخالفات المرور للمركبات
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
                <option value="pending">قيد المعالجة</option>
                <option value="resolved">تمت المعالجة</option>
                <option value="escalated">تم التصعيد</option>
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
                  رقم المخالفة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  المركبة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  السائق
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  نوع المخالفة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  التاريخ
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الغرامة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الحالة
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredViolations.map((violation) => (
                <tr key={violation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {violation.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Car className="w-5 h-5 text-gray-400 ml-2" />
                      <span className="text-sm text-gray-900">{violation.vehicleId}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {violation.driverName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <AlertTriangle className="w-4 h-4 text-yellow-500 ml-2" />
                      <span className="text-sm text-gray-900">{violation.violationType}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(violation.date), 'PPP', { locale: ar })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {violation.fine} ريال
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(violation.status)}`}>
                      {getStatusText(violation.status)}
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
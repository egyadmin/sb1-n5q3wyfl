import React, { useState } from 'react';
import { Search, Download, User, Package, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

interface CustodyRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  itemName: string;
  itemType: string;
  assignDate: string;
  returnDate?: string;
  status: 'active' | 'returned' | 'damaged';
  condition: string;
}

const mockCustodies: CustodyRecord[] = [
  {
    id: 'C001',
    employeeId: 'EMP001',
    employeeName: 'أحمد محمد',
    department: 'الصيانة',
    itemName: 'حاسب محمول',
    itemType: 'أجهزة',
    assignDate: '2024-01-15',
    status: 'active',
    condition: 'ممتاز'
  },
  {
    id: 'C002',
    employeeId: 'EMP002',
    employeeName: 'خالد عبدالله',
    department: 'المستودع',
    itemName: 'سيارة شحن',
    itemType: 'مركبات',
    assignDate: '2024-02-01',
    returnDate: '2024-03-01',
    status: 'returned',
    condition: 'جيد'
  }
];

export default function EmployeeCustodyReport() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const getStatusColor = (status: CustodyRecord['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'returned':
        return 'bg-blue-100 text-blue-800';
      case 'damaged':
        return 'bg-red-100 text-red-800';
    }
  };

  const getStatusText = (status: CustodyRecord['status']) => {
    switch (status) {
      case 'active':
        return 'نشط';
      case 'returned':
        return 'تم الإرجاع';
      case 'damaged':
        return 'تالف';
    }
  };

  const filteredCustodies = mockCustodies.filter(custody => {
    const matchesSearch = 
      custody.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      custody.itemName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || custody.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">تقرير عهد الموظفين</h2>
          <p className="mt-1 text-sm text-gray-500">
            متابعة وإدارة العهد المسلمة للموظفين
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <option value="active">نشط</option>
                <option value="returned">تم الإرجاع</option>
                <option value="damaged">تالف</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الموظف
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  القسم
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  العهدة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  تاريخ التسليم
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  تاريخ الإرجاع
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الحالة
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustodies.map((custody) => (
                <tr key={custody.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User className="w-5 h-5 text-gray-400 ml-2" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{custody.employeeName}</div>
                        <div className="text-sm text-gray-500">{custody.employeeId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {custody.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Package className="w-5 h-5 text-gray-400 ml-2" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{custody.itemName}</div>
                        <div className="text-sm text-gray-500">{custody.itemType}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(custody.assignDate), 'PPP', { locale: ar })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {custody.returnDate ? format(new Date(custody.returnDate), 'PPP', { locale: ar }) : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(custody.status)}`}>
                      {getStatusText(custody.status)}
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
import React, { useState } from 'react';
import { Search, Filter, Download, Calendar, DollarSign, ArrowDownLeft, ArrowUpRight, FileText, Building2 } from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import type { SupplierTransaction } from '../../types/warehouse';
import TransactionForm from './TransactionForm';
import { mockSuppliers } from '../../data/mockSuppliers';

const mockTransactions: SupplierTransaction[] = [
  {
    id: 'TRN001',
    date: '2024-03-15',
    type: 'purchase',
    amount: 25000,
    reference: 'PO-2024-001',
    status: 'completed',
    notes: 'توريد معدات'
  },
  {
    id: 'TRN002',
    date: '2024-03-14',
    type: 'payment',
    amount: 15000,
    reference: 'PAY-2024-001',
    status: 'completed',
    notes: 'دفعة جزئية'
  }
];

export default function SupplierTransactions() {
  const [transactions, setTransactions] = useState<SupplierTransaction[]>(mockTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const handleAddTransaction = (data: Omit<SupplierTransaction, 'id'>) => {
    const newTransaction: SupplierTransaction = {
      id: `TRN${transactions.length + 1}`.padStart(6, '0'),
      ...data
    };
    setTransactions([newTransaction, ...transactions]);
    setShowForm(false);
  };

  const getStatusColor = (status: SupplierTransaction['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: SupplierTransaction['status']) => {
    switch (status) {
      case 'pending':
        return 'قيد المعالجة';
      case 'completed':
        return 'مكتمل';
      case 'cancelled':
        return 'ملغي';
      default:
        return status;
    }
  };

  const getTypeIcon = (type: SupplierTransaction['type']) => {
    switch (type) {
      case 'purchase':
        return ArrowUpRight;
      case 'payment':
        return ArrowDownLeft;
      case 'return':
        return ArrowDownLeft;
      default:
        return FileText;
    }
  };

  const getTypeText = (type: SupplierTransaction['type']) => {
    switch (type) {
      case 'purchase':
        return 'شراء';
      case 'payment':
        return 'دفع';
      case 'return':
        return 'مرتجع';
      default:
        return type;
    }
  };

  const getTypeColor = (type: SupplierTransaction['type']) => {
    switch (type) {
      case 'purchase':
        return 'text-red-600';
      case 'payment':
        return 'text-green-600';
      case 'return':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.notes?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || transaction.type === filterType;
    
    let matchesDate = true;
    if (dateRange.start && dateRange.end) {
      const transactionDate = new Date(transaction.date);
      const start = new Date(dateRange.start);
      const end = new Date(dateRange.end);
      matchesDate = transactionDate >= start && transactionDate <= end;
    }
    
    return matchesSearch && matchesType && matchesDate;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">معاملات الموردين</h2>
          <p className="mt-1 text-sm text-gray-500">
            إدارة وتتبع المعاملات المالية مع الموردين
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
            <DollarSign className="w-4 h-4 ml-2" />
            إضافة معاملة
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="بحث في المعاملات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            
            <div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">جميع المعاملات</option>
                <option value="purchase">شراء</option>
                <option value="payment">دفع</option>
                <option value="return">مرتجع</option>
              </select>
            </div>

            <div>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                className="w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="من تاريخ"
              />
            </div>

            <div>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                className="w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="إلى تاريخ"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  المورد
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  نوع المعاملة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  المبلغ
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  التاريخ
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  المرجع
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الحالة
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => {
                const TypeIcon = getTypeIcon(transaction.type);
                return (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Building2 className="w-5 h-5 text-gray-400 ml-2" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            شركة التوريدات الأولى
                          </div>
                          <div className="text-sm text-gray-500">SP-2024-001</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <TypeIcon className={`w-5 h-5 ml-2 ${getTypeColor(transaction.type)}`} />
                        <span className="text-sm font-medium">
                          {getTypeText(transaction.type)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {transaction.amount.toLocaleString()} ريال
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 ml-1" />
                        {format(new Date(transaction.date), 'PPP', { locale: ar })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.reference}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                        {getStatusText(transaction.status)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <TransactionForm
          suppliers={mockSuppliers}
          onSubmit={handleAddTransaction}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
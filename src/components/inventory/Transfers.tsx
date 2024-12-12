import React, { useState } from 'react';
import { ArrowLeftRight, Search, Filter, Plus, Package, Building2, Printer, Eye } from 'lucide-react';
import TransferForm from './TransferForm';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

interface Transfer {
  id: string;
  sourceWarehouse: string;
  targetWarehouse: string;
  items: Array<{
    name: string;
    quantity: number;
  }>;
  status: 'pending' | 'in-progress' | 'completed';
  date: string;
  reference: string;
  requestedBy: string;
  approvedBy?: string;
}

const mockTransfers: Transfer[] = [
  {
    id: 'T001',
    sourceWarehouse: 'مستودع أ',
    targetWarehouse: 'مستودع ب',
    items: [
      { name: 'قطع غيار محركات', quantity: 50 },
      { name: 'مواد خام', quantity: 30 }
    ],
    status: 'pending',
    date: '2024-03-15',
    reference: 'TRF-2024-001',
    requestedBy: 'أحمد محمد'
  },
  {
    id: 'T002',
    sourceWarehouse: 'مستودع ب',
    targetWarehouse: 'مستودع ج',
    items: [
      { name: 'مواد تغليف', quantity: 100 }
    ],
    status: 'completed',
    date: '2024-03-14',
    reference: 'TRF-2024-002',
    requestedBy: 'خالد عبدالله',
    approvedBy: 'محمد علي'
  }
];

export default function Transfers() {
  const [transfers, setTransfers] = useState<Transfer[]>(mockTransfers);
  const [showTransferForm, setShowTransferForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTransfer, setSelectedTransfer] = useState<Transfer | null>(null);

  const handleAddTransfer = (data: any) => {
    const newTransfer: Transfer = {
      id: `T${transfers.length + 1}`.padStart(3, '0'),
      sourceWarehouse: data.sourceWarehouse,
      targetWarehouse: data.targetWarehouse,
      items: data.items,
      status: 'pending',
      date: format(new Date(), 'yyyy-MM-dd'),
      reference: data.transferNumber,
      requestedBy: data.requestedBy
    };
    setTransfers([newTransfer, ...transfers]);
    setShowTransferForm(false);
  };

  const handlePrintTransfer = (transfer: Transfer) => {
    setSelectedTransfer(transfer);
    setTimeout(() => {
      window.print();
      setSelectedTransfer(null);
    }, 100);
  };

  const getStatusColor = (status: Transfer['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
    }
  };

  const getStatusText = (status: Transfer['status']) => {
    switch (status) {
      case 'pending':
        return 'قيد الانتظار';
      case 'in-progress':
        return 'قيد التنفيذ';
      case 'completed':
        return 'مكتمل';
    }
  };

  const filteredTransfers = transfers.filter(transfer => {
    const matchesSearch = 
      transfer.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transfer.sourceWarehouse.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transfer.targetWarehouse.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || transfer.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">تحويلات المخزون</h2>
          <p className="mt-1 text-sm text-gray-500">
            إدارة تحويلات المواد بين المستودعات
          </p>
        </div>
        <button
          onClick={() => setShowTransferForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <ArrowLeftRight className="w-4 h-4 ml-2" />
          تحويل جديد
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="بحث في التحويلات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
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

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  رقم التحويل
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  المستودعات
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  المواد
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  التاريخ
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الحالة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransfers.map((transfer) => (
                <tr key={transfer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {transfer.reference}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Building2 className="w-5 h-5 text-gray-400 ml-2" />
                      <div className="text-sm">
                        <p className="font-medium text-gray-900">{transfer.sourceWarehouse}</p>
                        <p className="text-gray-500">إلى: {transfer.targetWarehouse}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      {transfer.items.map((item, index) => (
                        <div key={index} className="flex items-center text-sm">
                          <Package className="w-4 h-4 text-gray-400 ml-1" />
                          <span className="text-gray-900">{item.name}</span>
                          <span className="text-gray-500 mr-2">({item.quantity} وحدة)</span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(transfer.date), 'PPP', { locale: ar })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(transfer.status)}`}>
                      {getStatusText(transfer.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <button
                        onClick={() => handlePrintTransfer(transfer)}
                        className="text-blue-600 hover:text-blue-800"
                        title="طباعة"
                      >
                        <Printer className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setSelectedTransfer(transfer)}
                        className="text-gray-600 hover:text-gray-800"
                        title="معاينة"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showTransferForm && (
        <TransferForm
          onSubmit={handleAddTransfer}
          onClose={() => setShowTransferForm(false)}
        />
      )}

      {/* Print Preview */}
      {selectedTransfer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 print:hidden">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-lg font-medium">معاينة إذن النقل</h3>
              <div className="flex space-x-2 rtl:space-x-reverse">
                <button
                  onClick={() => handlePrintTransfer(selectedTransfer)}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Printer className="w-4 h-4 ml-1" />
                  طباعة
                </button>
                <button
                  onClick={() => setSelectedTransfer(null)}
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  إغلاق
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-2">معلومات التحويل</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">رقم التحويل</p>
                    <p className="font-medium">{selectedTransfer.reference}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">التاريخ</p>
                    <p className="font-medium">
                      {format(new Date(selectedTransfer.date), 'PPP', { locale: ar })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-2">المستودعات</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">المستودع المصدر</p>
                    <p className="font-medium">{selectedTransfer.sourceWarehouse}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">المستودع المستلم</p>
                    <p className="font-medium">{selectedTransfer.targetWarehouse}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">المواد المنقولة</h4>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">المادة</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">الكمية</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedTransfer.items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 text-sm text-gray-900">{item.name}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
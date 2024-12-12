import React from 'react';
import { ArrowDownLeft, ArrowUpRight, Package, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

const transactions = [
  {
    id: 1,
    type: 'in',
    item: 'قطع غيار محركات',
    quantity: 50,
    date: '2024-03-15',
    location: 'مستودع أ',
    reference: 'PO-2024-001'
  },
  {
    id: 2,
    type: 'out',
    item: 'مواد خام',
    quantity: 30,
    date: '2024-03-14',
    location: 'مستودع ب',
    reference: 'WO-2024-015'
  },
  {
    id: 3,
    type: 'in',
    item: 'مواد تغليف',
    quantity: 100,
    date: '2024-03-13',
    location: 'مستودع ج',
    reference: 'PO-2024-002'
  }
];

export default function RecentTransactions() {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">آخر التحركات</h3>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            عرض الكل
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                النوع
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                المادة
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                الكمية
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                التاريخ
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                الموقع
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                المرجع
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    transaction.type === 'in' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {transaction.type === 'in' ? (
                      <ArrowDownLeft className="w-4 h-4 ml-1" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4 ml-1" />
                    )}
                    {transaction.type === 'in' ? 'وارد' : 'صادر'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Package className="w-5 h-5 text-gray-400 ml-2" />
                    <span className="text-sm font-medium text-gray-900">
                      {transaction.item}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.quantity} وحدة
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 ml-1" />
                    {format(new Date(transaction.date), 'PPP', { locale: ar })}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.reference}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
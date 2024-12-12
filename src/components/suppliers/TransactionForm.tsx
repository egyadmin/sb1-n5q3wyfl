import React, { useState } from 'react';
import { X, DollarSign, Calendar, FileText } from 'lucide-react';
import type { Supplier, SupplierTransaction } from '../../types/warehouse';

interface TransactionFormProps {
  suppliers: Supplier[];
  onSubmit: (data: Omit<SupplierTransaction, 'id'>) => void;
  onClose: () => void;
}

export default function TransactionForm({ suppliers, onSubmit, onClose }: TransactionFormProps) {
  const [selectedSupplier, setSelectedSupplier] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    onSubmit({
      date: formData.get('date') as string,
      type: formData.get('type') as SupplierTransaction['type'],
      amount: Number(formData.get('amount')),
      reference: formData.get('reference') as string,
      status: 'pending',
      notes: formData.get('notes') as string
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold">إضافة معاملة جديدة</h2>
            <p className="mt-1 text-sm text-gray-500">تسجيل معاملة مالية جديدة مع المورد</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">المورد</label>
            <select
              value={selectedSupplier}
              onChange={(e) => setSelectedSupplier(e.target.value)}
              name="supplierId"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">اختر المورد</option>
              {suppliers.map((supplier) => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.name} ({supplier.code})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">نوع المعاملة</label>
              <select
                name="type"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="purchase">شراء</option>
                <option value="payment">دفع</option>
                <option value="return">مرتجع</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">التاريخ</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="date"
                  name="date"
                  required
                  className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">المبلغ</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="number"
                  name="amount"
                  required
                  min="0"
                  step="0.01"
                  className="block w-full pr-10 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">رقم المرجع</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="text"
                  name="reference"
                  required
                  className="block w-full pr-10 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <FileText className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">ملاحظات</label>
            <textarea
              name="notes"
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="أي ملاحظات إضافية..."
            />
          </div>

          <div className="flex justify-end space-x-3 rtl:space-x-reverse">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              إضافة المعاملة
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
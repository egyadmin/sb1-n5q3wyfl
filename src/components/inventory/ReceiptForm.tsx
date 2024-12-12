import React, { useState } from 'react';
import { X, Plus, Minus, Package, Printer, QrCode, Save, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { mockWarehouses } from '../../data/mockWarehouses';

interface ReceiptFormProps {
  onSubmit: (data: any) => void;
  onClose: () => void;
  targetWarehouse?: any;
}

export default function ReceiptForm({ onSubmit, onClose, targetWarehouse }: ReceiptFormProps) {
  const [items, setItems] = useState<Array<{ id: string; name: string; quantity: number; received: number }>>([
    { id: '1', name: '', quantity: 0, received: 0 }
  ]);
  const [showPrintPreview, setShowPrintPreview] = useState(false);

  const handleAddItem = () => {
    setItems([...items, { id: Date.now().toString(), name: '', quantity: 0, received: 0 }]);
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const receiptData = {
      receiptNumber: `REC-${Date.now()}`,
      date: format(new Date(), 'yyyy-MM-dd'),
      sourceWarehouse: formData.get('sourceWarehouse'),
      targetWarehouse: formData.get('targetWarehouse'),
      items: items.map(item => ({
        name: formData.get(`item-name-${item.id}`),
        quantity: Number(formData.get(`item-quantity-${item.id}`)),
        received: Number(formData.get(`item-received-${item.id}`))
      })),
      notes: formData.get('notes'),
      receivedBy: formData.get('receivedBy'),
      checkedBy: formData.get('checkedBy')
    };

    onSubmit(receiptData);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center">
            <Package className="w-6 h-6 text-blue-600 ml-2" />
            <div>
              <h2 className="text-xl font-semibold">نموذج استلام مواد</h2>
              <p className="text-sm text-gray-500">استلام وفحص المواد المنقولة</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <button
              onClick={handlePrint}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <Printer className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Header Information */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">المستودع المرسل</label>
              <select
                name="sourceWarehouse"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">اختر المستودع</option>
                {mockWarehouses
                  .filter(w => w.id !== targetWarehouse?.id)
                  .map(warehouse => (
                    <option key={warehouse.id} value={warehouse.id}>
                      {warehouse.name}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">المستودع المستلم</label>
              <select
                name="targetWarehouse"
                defaultValue={targetWarehouse?.id}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">اختر المستودع</option>
                {mockWarehouses.map(warehouse => (
                  <option key={warehouse.id} value={warehouse.id}>
                    {warehouse.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Items */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">المواد المستلمة</h3>
              <button
                type="button"
                onClick={handleAddItem}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200"
              >
                <Plus className="w-4 h-4 ml-1" />
                إضافة مادة
              </button>
            </div>

            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="grid grid-cols-12 gap-4 items-start">
                  <div className="col-span-5">
                    <label className="block text-sm font-medium text-gray-700">اسم المادة</label>
                    <input
                      type="text"
                      name={`item-name-${item.id}`}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="col-span-3">
                    <label className="block text-sm font-medium text-gray-700">الكمية المتوقعة</label>
                    <input
                      type="number"
                      name={`item-quantity-${item.id}`}
                      required
                      min="1"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="col-span-3">
                    <label className="block text-sm font-medium text-gray-700">الكمية المستلمة</label>
                    <input
                      type="number"
                      name={`item-received-${item.id}`}
                      required
                      min="0"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  {items.length > 1 && (
                    <div className="col-span-1 pt-7">
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Additional Information */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">استلم بواسطة</label>
              <input
                type="text"
                name="receivedBy"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">فحص بواسطة</label>
              <input
                type="text"
                name="checkedBy"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">ملاحظات</label>
            <textarea
              name="notes"
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Actions */}
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
              <CheckCircle2 className="w-4 h-4 ml-2 inline-block" />
              تأكيد الاستلام
            </button>
          </div>
        </form>

        {/* Print Template */}
        <div className="hidden print:block p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">نموذج استلام مواد</h1>
            <p className="text-sm text-gray-500 mt-2">
              رقم الاستلام: REC-{Date.now()} | التاريخ: {format(new Date(), 'PPP', { locale: ar })}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-medium mb-2">المستودع المرسل</h3>
              <p>{/* Source warehouse name */}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">المستودع المستلم</h3>
              <p>{targetWarehouse?.name}</p>
            </div>
          </div>

          <table className="w-full mb-8">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-right">المادة</th>
                <th className="py-2 text-right">الكمية المتوقعة</th>
                <th className="py-2 text-right">الكمية المستلمة</th>
                <th className="py-2 text-right">الفرق</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2">{item.name}</td>
                  <td className="py-2">{item.quantity}</td>
                  <td className="py-2">{item.received}</td>
                  <td className="py-2">{item.received - item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="grid grid-cols-2 gap-8 mt-12">
            <div>
              <p className="font-medium mb-8">استلم بواسطة: _________________</p>
              <p className="font-medium">التوقيع: _________________</p>
            </div>
            <div>
              <p className="font-medium mb-8">فحص بواسطة: _________________</p>
              <p className="font-medium">التوقيع: _________________</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
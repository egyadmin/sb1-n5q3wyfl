import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Package, Printer, QrCode, Save } from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { mockWarehouses } from '../../data/mockWarehouses';
import { generateQRCode } from '../../utils/qrGenerator';

interface TransferFormProps {
  onSubmit: (data: any) => void;
  onClose: () => void;
  sourceWarehouse?: any;
}

export default function TransferForm({ onSubmit, onClose, sourceWarehouse }: TransferFormProps) {
  const [items, setItems] = useState<Array<{ id: string; name: string; quantity: number }>>([
    { id: '1', name: '', quantity: 0 }
  ]);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [transferNumber] = useState(`TRF-${Date.now()}`);

  useEffect(() => {
    const generateQR = async () => {
      try {
        const qrData = {
          id: transferNumber,
          type: 'transfer',
          timestamp: new Date().toISOString()
        };
        const qrUrl = await generateQRCode(qrData);
        setQrCodeUrl(qrUrl);
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };
    generateQR();
  }, [transferNumber]);

  const handleAddItem = () => {
    setItems([...items, { id: Date.now().toString(), name: '', quantity: 0 }]);
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const transferData = {
      transferNumber,
      date: format(new Date(), 'yyyy-MM-dd'),
      sourceWarehouse: formData.get('sourceWarehouse'),
      targetWarehouse: formData.get('targetWarehouse'),
      items: items.map(item => ({
        name: formData.get(`item-name-${item.id}`),
        quantity: Number(formData.get(`item-quantity-${item.id}`))
      })),
      notes: formData.get('notes'),
      requestedBy: formData.get('requestedBy'),
      approvedBy: formData.get('approvedBy')
    };

    onSubmit(transferData);
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
              <h2 className="text-xl font-semibold">نموذج إذن نقل مواد</h2>
              <p className="text-sm text-gray-500">إنشاء إذن نقل مواد بين المستودعات</p>
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
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">المستودع المصدر</label>
              <select
                name="sourceWarehouse"
                defaultValue={sourceWarehouse?.id}
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
            <div>
              <label className="block text-sm font-medium text-gray-700">المستودع المستلم</label>
              <select
                name="targetWarehouse"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">اختر المستودع</option>
                {mockWarehouses
                  .filter(w => w.id !== sourceWarehouse?.id)
                  .map(warehouse => (
                    <option key={warehouse.id} value={warehouse.id}>
                      {warehouse.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">المواد المنقولة</h3>
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
                  <div className="col-span-7">
                    <label className="block text-sm font-medium text-gray-700">اسم المادة</label>
                    <input
                      type="text"
                      name={`item-name-${item.id}`}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="col-span-4">
                    <label className="block text-sm font-medium text-gray-700">الكمية</label>
                    <input
                      type="number"
                      name={`item-quantity-${item.id}`}
                      required
                      min="1"
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

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">طلب بواسطة</label>
              <input
                type="text"
                name="requestedBy"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">اعتماد بواسطة</label>
              <input
                type="text"
                name="approvedBy"
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
              <Save className="w-4 h-4 ml-2 inline-block" />
              حفظ وطباعة
            </button>
          </div>
        </form>

        {/* Print Template */}
        <div className="hidden print:block p-8">
          <div className="max-w-4xl mx-auto">
            {/* Header with Logo and Title */}
            <div className="text-center mb-8">
              <img 
                src="https://www2.0zz0.com/2024/11/20/07/988856043.png" 
                alt="Logo" 
                className="w-32 mx-auto mb-4"
              />
              <div className="border-b-2 border-blue-600 pb-4">
                <h1 className="text-2xl font-bold text-blue-800 mb-2">إذن نقل مواد</h1>
                <div className="flex justify-between text-sm text-gray-600">
                  <p>رقم الإذن: {transferNumber}</p>
                  <p>التاريخ: {format(new Date(), 'PPP', { locale: ar })}</p>
                </div>
              </div>
            </div>

            {/* QR Code */}
            <div className="absolute top-8 left-8">
              {qrCodeUrl && (
                <img 
                  src={qrCodeUrl} 
                  alt="QR Code" 
                  className="w-24 h-24"
                />
              )}
            </div>

            {/* Warehouses Information */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-gray-700 mb-2">المستودع المصدر</h3>
                <p className="text-gray-600">{sourceWarehouse?.name}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-gray-700 mb-2">المستودع المستلم</h3>
                <p className="text-gray-600">{/* Target warehouse name */}</p>
              </div>
            </div>

            {/* Items Table */}
            <table className="w-full mb-8">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 text-right border">المادة</th>
                  <th className="py-2 px-4 text-right border">الكمية</th>
                  <th className="py-2 px-4 text-right border">ملاحظات</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index} className="border">
                    <td className="py-2 px-4 border">{item.name}</td>
                    <td className="py-2 px-4 border">{item.quantity}</td>
                    <td className="py-2 px-4 border"></td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Signatures */}
            <div className="grid grid-cols-2 gap-8 mt-12">
              <div>
                <p className="font-bold mb-8">طلب بواسطة: _________________</p>
                <p className="font-bold">التوقيع: _________________</p>
              </div>
              <div>
                <p className="font-bold mb-8">اعتماد بواسطة: _________________</p>
                <p className="font-bold">التوقيع: _________________</p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-4 border-t text-center text-sm text-gray-500">
              <p>نظام إدارة المستودعات - {format(new Date(), 'yyyy')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
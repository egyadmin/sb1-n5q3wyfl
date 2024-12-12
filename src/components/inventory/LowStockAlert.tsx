import React from 'react';
import { AlertTriangle, Package, ArrowRight } from 'lucide-react';

const lowStockItems = [
  { id: 1, name: 'قطع غيار محركات', current: 5, minimum: 10, location: 'مستودع أ' },
  { id: 2, name: 'مواد خام', current: 8, minimum: 15, location: 'مستودع ب' },
  { id: 3, name: 'مواد تغليف', current: 12, minimum: 20, location: 'مستودع ج' },
];

export default function LowStockAlert() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">تنبيهات المخزون المنخفض</h3>
        <AlertTriangle className="w-5 h-5 text-yellow-500" />
      </div>

      <div className="space-y-4">
        {lowStockItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg"
          >
            <div className="flex items-center">
              <Package className="w-5 h-5 text-yellow-600 mr-3" />
              <div>
                <h4 className="font-medium text-gray-900">{item.name}</h4>
                <p className="text-sm text-gray-500">{item.location}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-yellow-600">
                {item.current} / {item.minimum}
              </p>
              <p className="text-xs text-gray-500">الكمية الحالية / الحد الأدنى</p>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-6 w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-yellow-600 bg-yellow-50 hover:bg-yellow-100">
        عرض كل التنبيهات
        <ArrowRight className="w-4 h-4 mr-2" />
      </button>
    </div>
  );
}
import React from 'react';
import { Database, Table, Key, RefreshCw } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';

const tables = [
  {
    name: 'wms_assets',
    description: 'جدول الأصول والمعدات',
    columns: [
      { name: 'id', type: 'VARCHAR2(36)', isPrimary: true, description: 'معرف فريد للأصل' },
      { name: 'name', type: 'VARCHAR2(255)', description: 'اسم الأصل' },
      { name: 'serial_number', type: 'VARCHAR2(100)', description: 'الرقم التسلسلي' },
      { name: 'category', type: 'VARCHAR2(50)', description: 'فئة الأصل' },
      { name: 'status', type: 'VARCHAR2(20)', description: 'حالة الأصل' }
    ]
  },
  {
    name: 'wms_local_content_metrics',
    description: 'جدول مقاييس المحتوى المحلي',
    columns: [
      { name: 'id', type: 'VARCHAR2(36)', isPrimary: true, description: 'معرف فريد للقياس' },
      { name: 'total_percentage', type: 'NUMBER(5,2)', description: 'النسبة الإجمالية' },
      { name: 'suppliers_percentage', type: 'NUMBER(5,2)', description: 'نسبة الموردين' },
      { name: 'materials_percentage', type: 'NUMBER(5,2)', description: 'نسبة المواد' }
    ]
  }
];

export default function DatabaseSchema() {
  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' }
  });

  return (
    <animated.div style={fadeIn} className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">مخطط قاعدة البيانات</h2>
          <p className="mt-1 text-sm text-gray-500">
            هيكل الجداول والعلاقات في قاعدة البيانات Oracle
          </p>
        </div>
        <div className="p-2 bg-blue-50 rounded-lg">
          <Database className="w-6 h-6 text-blue-600" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tables.map((table) => (
          <div key={table.name} className="bg-white rounded-lg shadow-sm">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Table className="w-5 h-5 text-blue-600 ml-2" />
                  <div>
                    <h3 className="font-medium text-gray-900">{table.name}</h3>
                    <p className="text-sm text-gray-500">{table.description}</p>
                  </div>
                </div>
                <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                  <RefreshCw className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              <div className="mt-4">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">العمود</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">النوع</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">الوصف</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {table.columns.map((column) => (
                      <tr key={column.name} className="hover:bg-gray-50">
                        <td className="px-4 py-2 text-sm">
                          <div className="flex items-center">
                            {column.isPrimary && (
                              <Key className="w-4 h-4 text-yellow-500 ml-1" />
                            )}
                            {column.name}
                          </div>
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-500">{column.type}</td>
                        <td className="px-4 py-2 text-sm text-gray-500">{column.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>
    </animated.div>
  );
}
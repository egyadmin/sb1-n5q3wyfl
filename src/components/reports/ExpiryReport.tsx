import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { AlertTriangle, Calendar, Package, Clock } from 'lucide-react';

const expiryData = [
  { period: '0-30 يوم', count: 15, value: 45000 },
  { period: '31-60 يوم', count: 25, value: 75000 },
  { period: '61-90 يوم', count: 20, value: 60000 },
  { period: 'أكثر من 90 يوم', count: 10, value: 30000 },
];

const categoryData = [
  { name: 'مواد خام', value: 35, color: '#3B82F6' },
  { name: 'منتجات نهائية', value: 25, color: '#10B981' },
  { name: 'مواد تغليف', value: 20, color: '#F59E0B' },
  { name: 'قطع غيار', value: 20, color: '#6366F1' },
];

const criticalItems = [
  { name: 'مادة أ', daysLeft: 5, quantity: 100, location: 'مستودع 1' },
  { name: 'مادة ب', daysLeft: 7, quantity: 150, location: 'مستودع 2' },
  { name: 'مادة ج', daysLeft: 10, quantity: 75, location: 'مستودع 1' },
  { name: 'مادة د', daysLeft: 15, quantity: 200, location: 'مستودع 3' },
];

export default function ExpiryReport() {
  return (
    <div className="space-y-6">
      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-red-50 rounded-lg p-6">
          <div className="flex items-center">
            <AlertTriangle className="w-8 h-8 text-red-600 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-red-900">15 مادة</h3>
              <p className="text-sm text-red-700">تنتهي خلال 30 يوم</p>
            </div>
          </div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-6">
          <div className="flex items-center">
            <Calendar className="w-8 h-8 text-yellow-600 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-900">25 مادة</h3>
              <p className="text-sm text-yellow-700">تنتهي خلال 60 يوم</p>
            </div>
          </div>
        </div>
        <div className="bg-blue-50 rounded-lg p-6">
          <div className="flex items-center">
            <Package className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-blue-900">210,000 ريال</h3>
              <p className="text-sm text-blue-700">قيمة المواد المنتهية</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">توزيع المواد حسب فترة الصلاحية</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={expiryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis yAxisId="left" orientation="left" stroke="#94A3B8" />
                <YAxis yAxisId="right" orientation="right" stroke="#64748B" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="count" name="عدد المواد" fill="#3B82F6" />
                <Bar yAxisId="right" dataKey="value" name="القيمة (ريال)" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">توزيع المواد حسب الفئة</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Critical Items Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold">المواد الحرجة</h3>
          <p className="mt-1 text-sm text-gray-500">المواد التي تنتهي صلاحيتها قريباً</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  المادة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الأيام المتبقية
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الكمية
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الموقع
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {criticalItems.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-red-500 ml-2" />
                      <span className="text-sm font-medium text-gray-900">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.daysLeft <= 7 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.daysLeft} يوم
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.quantity} وحدة
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.location}
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
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Package, TrendingUp, AlertTriangle, ArrowDown, ArrowUp } from 'lucide-react';

const inventoryData = [
  { category: 'مواد خام', current: 450, optimal: 500, minimum: 200 },
  { category: 'قطع غيار', current: 320, optimal: 400, minimum: 150 },
  { category: 'منتجات نهائية', current: 280, optimal: 300, minimum: 100 },
  { category: 'مواد تغليف', current: 180, optimal: 200, minimum: 80 },
];

const stockStatus = [
  { name: 'مستوى جيد', value: 65, color: '#10B981' },
  { name: 'مستوى متوسط', value: 25, color: '#F59E0B' },
  { name: 'مستوى منخفض', value: 10, color: '#EF4444' },
];

const metrics = [
  {
    title: 'إجمالي المخزون',
    value: '1,230',
    change: '+5.3%',
    trend: 'up',
    icon: Package,
  },
  {
    title: 'معدل الدوران',
    value: '4.2x',
    change: '+0.8x',
    trend: 'up',
    icon: TrendingUp,
  },
  {
    title: 'مواد تحت الحد الأدنى',
    value: '8',
    change: '-2',
    trend: 'down',
    icon: AlertTriangle,
  },
];

export default function InventoryReport() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.title} className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <span className={`flex items-center text-sm font-medium ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.trend === 'up' ? (
                    <ArrowUp className="w-4 h-4 mr-1" />
                  ) : (
                    <ArrowDown className="w-4 h-4 mr-1" />
                  )}
                  {metric.change}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold">{metric.value}</h3>
              <p className="text-gray-500 text-sm">{metric.title}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">مستويات المخزون حسب الفئة</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={inventoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="current" name="المستوى الحالي" fill="#3B82F6" />
                <Bar dataKey="optimal" name="المستوى الأمثل" fill="#10B981" />
                <Bar dataKey="minimum" name="الحد الأدنى" fill="#F59E0B" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">توزيع حالة المخزون</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stockStatus}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {stockStatus.map((entry, index) => (
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
    </div>
  );
}
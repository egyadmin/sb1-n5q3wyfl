import React from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { TrendingUp, Package, Wrench, AlertTriangle } from 'lucide-react';

const monthlyData = [
  { month: 'يناير', inventory: 4500, workOrders: 120, maintenance: 45 },
  { month: 'فبراير', inventory: 4800, workOrders: 135, maintenance: 52 },
  { month: 'مارس', inventory: 5200, workOrders: 142, maintenance: 48 },
  { month: 'أبريل', inventory: 5100, workOrders: 128, maintenance: 55 },
  { month: 'مايو', inventory: 5400, workOrders: 145, maintenance: 50 },
  { month: 'يونيو', inventory: 5600, workOrders: 150, maintenance: 58 },
];

const inventoryDistribution = [
  { name: 'قطع غيار', value: 35, color: '#3B82F6' },
  { name: 'مواد خام', value: 25, color: '#10B981' },
  { name: 'معدات', value: 20, color: '#F59E0B' },
  { name: 'مستهلكات', value: 20, color: '#6366F1' },
];

const maintenanceTypes = [
  { name: 'وقائية', value: 45, color: '#10B981' },
  { name: 'تصحيحية', value: 35, color: '#F59E0B' },
  { name: 'طارئة', value: 20, color: '#EF4444' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
      <p className="font-medium text-gray-900 mb-2">{label}</p>
      {payload.map((entry: any) => (
        <div key={entry.name} className="flex items-center space-x-2 rtl:space-x-reverse">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-gray-600">{entry.name}:</span>
          <span className="font-medium">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export default function StatisticsReport() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">الإحصائيات والتقارير</h2>
          <p className="mt-1 text-sm text-gray-500">
            تحليل شامل لأداء المستودع والصيانة
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-green-600">+8.2%</span>
          </div>
          <h3 className="mt-4 text-lg font-medium">إجمالي المخزون</h3>
          <p className="text-2xl font-semibold mt-1">5,600</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-green-50 rounded-lg">
              <Wrench className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm font-medium text-green-600">+12.5%</span>
          </div>
          <h3 className="mt-4 text-lg font-medium">أوامر العمل</h3>
          <p className="text-2xl font-semibold mt-1">150</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-sm font-medium text-red-600">-2.3%</span>
          </div>
          <h3 className="mt-4 text-lg font-medium">المواد المنخفضة</h3>
          <p className="text-2xl font-semibold mt-1">12</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-purple-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-green-600">+5.8%</span>
          </div>
          <h3 className="mt-4 text-lg font-medium">معدل الدوران</h3>
          <p className="text-2xl font-semibold mt-1">4.2x</p>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-6">الاتجاهات الشهرية</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="month" 
                stroke="#6B7280"
                tick={{ fill: '#6B7280' }}
              />
              <YAxis 
                stroke="#6B7280"
                tick={{ fill: '#6B7280' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="inventory"
                name="المخزون"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="workOrders"
                name="أوامر العمل"
                stroke="#10B981"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="maintenance"
                name="الصيانة"
                stroke="#F59E0B"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Distribution Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-6">توزيع المخزون</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={inventoryDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {inventoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-6">أنواع الصيانة</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={maintenanceTypes}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {maintenanceTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-6">مؤشرات الأداء</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'دقة المخزون', value: '98.5%', trend: '+2.1%', isPositive: true },
            { label: 'كفاءة التحضير', value: '95.8%', trend: '+1.5%', isPositive: true },
            { label: 'معدل إكمال الصيانة', value: '94.2%', trend: '+3.2%', isPositive: true },
          ].map((metric) => (
            <div key={metric.label} className="p-4 border rounded-lg">
              <h4 className="text-sm font-medium text-gray-500">{metric.label}</h4>
              <div className="mt-2 flex items-end justify-between">
                <span className="text-2xl font-semibold text-gray-900">{metric.value}</span>
                <span className={`text-sm ${
                  metric.isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.trend}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
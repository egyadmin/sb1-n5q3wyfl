import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Package, TrendingUp, Building2, Users } from 'lucide-react';

interface LocalContentChartsProps {
  data: any;
}

const COLORS = {
  blue: ['#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE'],
  green: ['#10B981', '#34D399', '#6EE7B7', '#A7F3D0'],
  yellow: ['#F59E0B', '#FBBF24', '#FCD34D', '#FDE68A'],
  purple: ['#8B5CF6', '#A78BFA', '#C4B5FD', '#DDD6FE']
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;

  return (
    <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
      <p className="font-medium text-gray-900 mb-1">{label}</p>
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center space-x-2 rtl:space-x-reverse text-sm">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-gray-600">{entry.name}:</span>
          <span className="font-medium">{entry.value}%</span>
        </div>
      ))}
    </div>
  );
};

export default function LocalContentCharts({ data }: LocalContentChartsProps) {
  // Distribution by Category
  const categoryData = [
    { name: 'المواد الأولية', value: 45, color: COLORS.blue[0] },
    { name: 'المعدات والآلات', value: 30, color: COLORS.green[0] },
    { name: 'الخدمات', value: 15, color: COLORS.yellow[0] },
    { name: 'القوى العاملة', value: 10, color: COLORS.purple[0] }
  ];

  // Monthly Progress
  const monthlyProgress = [
    { month: 'يناير', target: 40, achieved: 35 },
    { month: 'فبراير', target: 40, achieved: 38 },
    { month: 'مارس', target: 40, achieved: 42 },
    { month: 'أبريل', target: 40, achieved: 45 },
    { month: 'مايو', target: 40, achieved: 43 },
    { month: 'يونيو', target: 40, achieved: 47 }
  ];

  // Supplier Distribution
  const supplierData = [
    { category: 'موردين محليين', current: 65, target: 60 },
    { category: 'موردين إقليميين', current: 25, target: 30 },
    { category: 'موردين دوليين', current: 10, target: 10 }
  ];

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-green-600">+8.2%</span>
          </div>
          <h3 className="mt-4 text-lg font-medium">المواد المحلية</h3>
          <p className="text-2xl font-semibold mt-1">45%</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-green-50 rounded-lg">
              <Building2 className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm font-medium text-green-600">+12.5%</span>
          </div>
          <h3 className="mt-4 text-lg font-medium">الموردين المحليين</h3>
          <p className="text-2xl font-semibold mt-1">65%</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <Users className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-sm font-medium text-green-600">+5.3%</span>
          </div>
          <h3 className="mt-4 text-lg font-medium">التوظيف المحلي</h3>
          <p className="text-2xl font-semibold mt-1">82%</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-purple-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-green-600">+3.8%</span>
          </div>
          <h3 className="mt-4 text-lg font-medium">النمو السنوي</h3>
          <p className="text-2xl font-semibold mt-1">15.2%</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribution by Category */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-6">توزيع المحتوى المحلي حسب الفئة</h3>
          <div className="h-[300px]">
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
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value) => <span className="text-sm text-gray-600">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Progress */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-6">تطور المحتوى المحلي</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyProgress}>
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
                  dataKey="achieved"
                  name="النسبة المحققة"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  name="النسبة المستهدفة"
                  stroke="#10B981"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Supplier Distribution */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-6">توزيع الموردين</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={supplierData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="category" 
                  stroke="#6B7280"
                  tick={{ fill: '#6B7280' }}
                />
                <YAxis 
                  stroke="#6B7280"
                  tick={{ fill: '#6B7280' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar 
                  dataKey="current" 
                  name="النسبة الحالية" 
                  fill="#3B82F6" 
                  radius={[4, 4, 0, 0]} 
                />
                <Bar 
                  dataKey="target" 
                  name="النسبة المستهدفة" 
                  fill="#10B981" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Achievement Progress */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-6">نسب الإنجاز حسب المتطلبات</h3>
          <div className="space-y-6">
            {[
              { label: 'المواد الأولية', target: 40, current: 45, color: 'bg-blue-600' },
              { label: 'المعدات والآلات', target: 25, current: 30, color: 'bg-green-600' },
              { label: 'قطع الغيار', target: 30, current: 28, color: 'bg-yellow-600' },
              { label: 'الخدمات', target: 50, current: 55, color: 'bg-purple-600' }
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">{item.label}</span>
                  <span className={`${
                    item.current >= item.target ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {item.current}% / {item.target}%
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${item.color}`}
                    style={{ width: `${(item.current / item.target) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
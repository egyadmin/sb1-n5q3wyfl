import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Package, TrendingUp } from 'lucide-react';

const inventoryStatus = [
  { name: 'متوفر', value: 65, color: '#10B981' },
  { name: 'منخفض', value: 25, color: '#F59E0B' },
  { name: 'نفذ', value: 10, color: '#EF4444' },
];

const workOrderStatus = [
  { name: 'مكتمل', value: 45, color: '#10B981' },
  { name: 'قيد التنفيذ', value: 35, color: '#3B82F6' },
  { name: 'معلق', value: 20, color: '#F59E0B' },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload) return null;

  return (
    <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <div 
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: payload[0]?.payload?.color }}
        />
        <span className="text-gray-600">{payload[0]?.name}:</span>
        <span className="font-medium">{payload[0]?.value}%</span>
      </div>
    </div>
  );
};

export default function InventoryDistribution() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Inventory Status Distribution */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Package className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">توزيع حالة المخزون</h3>
            <p className="text-sm text-gray-500">نسب توزيع المخزون حسب الحالة</p>
          </div>
        </div>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={inventoryStatus}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {inventoryStatus.map((entry, index) => (
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

      {/* Work Orders Status Distribution */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
          <div className="p-2 bg-green-50 rounded-lg">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">توزيع أوامر العمل</h3>
            <p className="text-sm text-gray-500">نسب توزيع أوامر العمل حسب الحالة</p>
          </div>
        </div>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={workOrderStatus}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {workOrderStatus.map((entry, index) => (
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
    </div>
  );
}
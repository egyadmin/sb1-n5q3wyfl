import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ArrowDownRight, ArrowUpRight, TrendingUp } from 'lucide-react';

const movementData = [
  { month: 'يناير', incoming: 120, outgoing: 95 },
  { month: 'فبراير', incoming: 140, outgoing: 110 },
  { month: 'مارس', incoming: 160, outgoing: 140 },
  { month: 'أبريل', incoming: 180, outgoing: 160 },
  { month: 'مايو', incoming: 200, outgoing: 180 },
  { month: 'يونيو', incoming: 220, outgoing: 200 },
];

const topMovements = [
  { item: 'قطع غيار محركات', quantity: 150, trend: 'up' },
  { item: 'مواد خام أساسية', quantity: 120, trend: 'down' },
  { item: 'معدات صيانة', quantity: 90, trend: 'up' },
  { item: 'مواد تغليف', quantity: 80, trend: 'down' },
];

export default function MovementReport() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">حركة المواد الشهرية</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={movementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="incoming"
                  name="وارد"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="outgoing"
                  name="صادر"
                  stroke="#EF4444"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">المواد الأكثر حركة</h3>
          <div className="space-y-4">
            {topMovements.map((item) => (
              <div
                key={item.item}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${
                    item.trend === 'up' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {item.trend === 'up' ? (
                      <ArrowUpRight className={`w-4 h-4 ${
                        item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`} />
                    ) : (
                      <ArrowDownRight className={`w-4 h-4 ${
                        item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`} />
                    )}
                  </div>
                  <span className="font-medium">{item.item}</span>
                </div>
                <span className="text-sm text-gray-600">
                  {item.quantity} وحدة
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-6">تحليل الحركة حسب الفئة</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={[
              { category: 'قطع غيار', incoming: 300, outgoing: 250 },
              { category: 'مواد خام', incoming: 250, outgoing: 200 },
              { category: 'معدات', incoming: 150, outgoing: 120 },
              { category: 'مواد تغليف', incoming: 100, outgoing: 80 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="incoming" name="وارد" fill="#10B981" />
              <Bar dataKey="outgoing" name="صادر" fill="#EF4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
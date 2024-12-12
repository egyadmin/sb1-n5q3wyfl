import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, TrendingUp } from 'lucide-react';

const activityData = [
  { month: 'يناير', inventory: 4000, workOrders: 2400, shipments: 2400 },
  { month: 'فبراير', inventory: 3000, workOrders: 1398, shipments: 2210 },
  { month: 'مارس', inventory: 2000, workOrders: 9800, shipments: 2290 },
  { month: 'أبريل', inventory: 2780, workOrders: 3908, shipments: 2000 },
  { month: 'مايو', inventory: 1890, workOrders: 4800, shipments: 2181 },
  { month: 'يونيو', inventory: 2390, workOrders: 3800, shipments: 2500 },
];

interface ActivityChartProps {
  className?: string;
}

export default function ActivityChart({ className }: ActivityChartProps) {
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');
  const [activeMetrics, setActiveMetrics] = useState<string[]>(['inventory', 'workOrders', 'shipments']);

  const metrics = [
    { id: 'inventory', label: 'المخزون', color: '#3B82F6' },
    { id: 'workOrders', label: 'أوامر العمل', color: '#10B981' },
    { id: 'shipments', label: 'الشحنات', color: '#F59E0B' },
  ];

  const toggleMetric = (metricId: string) => {
    setActiveMetrics(prev => 
      prev.includes(metricId) 
        ? prev.filter(id => id !== metricId)
        : [...prev, metricId]
    );
  };

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
            <span className="font-medium">{entry.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm p-6 ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="p-2 bg-blue-50 rounded-lg">
            <TrendingUp className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">نشاط المستودع</h3>
            <p className="text-sm text-gray-500">تحليل حركة المستودع</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setChartType('line')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                chartType === 'line'
                  ? 'bg-white text-blue-600 shadow'
                  : 'text-gray-600'
              }`}
            >
              خط بياني
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                chartType === 'bar'
                  ? 'bg-white text-blue-600 shadow'
                  : 'text-gray-600'
              }`}
            >
              أعمدة
            </button>
          </div>

          <div className="flex gap-2">
            {metrics.map(({ id, label, color }) => (
              <button
                key={id}
                onClick={() => toggleMetric(id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 rtl:space-x-reverse ${
                  activeMetrics.includes(id)
                    ? 'bg-gray-100'
                    : 'bg-gray-50 text-gray-400'
                }`}
              >
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: activeMetrics.includes(id) ? color : '#CBD5E1' }}
                />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="month" 
                stroke="#6B7280"
                tick={{ fill: '#6B7280' }}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <YAxis 
                stroke="#6B7280"
                tick={{ fill: '#6B7280' }}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              {activeMetrics.includes('inventory') && (
                <Line
                  type="monotone"
                  dataKey="inventory"
                  name="المخزون"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              )}
              {activeMetrics.includes('workOrders') && (
                <Line
                  type="monotone"
                  dataKey="workOrders"
                  name="أوامر العمل"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              )}
              {activeMetrics.includes('shipments') && (
                <Line
                  type="monotone"
                  dataKey="shipments"
                  name="الشحنات"
                  stroke="#F59E0B"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              )}
            </LineChart>
          ) : (
            <BarChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="month" 
                stroke="#6B7280"
                tick={{ fill: '#6B7280' }}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <YAxis 
                stroke="#6B7280"
                tick={{ fill: '#6B7280' }}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              {activeMetrics.includes('inventory') && (
                <Bar dataKey="inventory" name="المخزون" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              )}
              {activeMetrics.includes('workOrders') && (
                <Bar dataKey="workOrders" name="أوامر العمل" fill="#10B981" radius={[4, 4, 0, 0]} />
              )}
              {activeMetrics.includes('shipments') && (
                <Bar dataKey="shipments" name="الشحنات" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              )}
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
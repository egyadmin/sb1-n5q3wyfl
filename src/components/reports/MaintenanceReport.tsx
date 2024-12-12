import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Wrench, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';

const maintenanceData = [
  { month: 'يناير', preventive: 45, corrective: 15 },
  { month: 'فبراير', preventive: 50, corrective: 12 },
  { month: 'مارس', preventive: 48, corrective: 18 },
  { month: 'أبريل', preventive: 52, corrective: 14 },
  { month: 'مايو', preventive: 55, corrective: 10 },
  { month: 'يونيو', preventive: 58, corrective: 8 },
];

const statusData = [
  { name: 'مكتملة', value: 65, color: '#10B981' },
  { name: 'قيد التنفيذ', value: 25, color: '#3B82F6' },
  { name: 'متأخرة', value: 10, color: '#EF4444' },
];

const teamPerformance = [
  { name: 'الفريق أ', completed: 85, onTime: 95 },
  { name: 'الفريق ب', completed: 78, onTime: 88 },
  { name: 'الفريق ج', completed: 92, onTime: 96 },
];

export default function MaintenanceReport() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">تقرير الصيانة</h2>
          <p className="mt-1 text-sm text-gray-500">
            تحليل أداء الصيانة وكفاءة الفرق
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Wrench className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-green-600">+12%</span>
          </div>
          <h3 className="mt-4 text-lg font-medium">معدل إنجاز الصيانة</h3>
          <p className="text-2xl font-semibold mt-1">92%</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-green-50 rounded-lg">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm font-medium text-green-600">-8%</span>
          </div>
          <h3 className="mt-4 text-lg font-medium">متوسط وقت الإنجاز</h3>
          <p className="text-2xl font-semibold mt-1">2.5 يوم</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-sm font-medium text-red-600">+5%</span>
          </div>
          <h3 className="mt-4 text-lg font-medium">الصيانة المتأخرة</h3>
          <p className="text-2xl font-semibold mt-1">8%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-6">توزيع أنواع الصيانة</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={maintenanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="preventive"
                  name="صيانة وقائية"
                  stroke="#3B82F6"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="corrective"
                  name="صيانة تصحيحية"
                  stroke="#EF4444"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-6">حالة أوامر الصيانة</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
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

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold">أداء فرق الصيانة</h3>
        </div>
        <div className="p-6">
          <div className="grid gap-6">
            {teamPerformance.map((team) => (
              <div key={team.name} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">{team.name}</h4>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span className="text-sm text-gray-500">معدل الإنجاز:</span>
                    <span className="font-medium text-green-600">{team.completed}%</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>الالتزام بالوقت</span>
                      <span className="font-medium">{team.onTime}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600"
                        style={{ width: `${team.onTime}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>جودة العمل</span>
                      <span className="font-medium">{team.completed}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-600"
                        style={{ width: `${team.completed}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
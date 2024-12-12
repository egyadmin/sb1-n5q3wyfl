import React, { useState } from 'react';
import { Fuel, TrendingUp, DollarSign, Calendar, Plus, Download, Upload, Calculator, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import FuelConsumptionForm from './FuelConsumptionForm';
import { mockCrushers, fuelConsumption } from '../../data/mockProduction';
import { useSpring, animated } from '@react-spring/web';

function FuelConsumption() {
  const [showForm, setShowForm] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('daily');

  // Animated statistics
  const totalConsumptionSpring = useSpring({
    from: { number: 0 },
    to: { number: 2280 },
    delay: 200,
    config: { duration: 1000 }
  });

  const efficiencySpring = useSpring({
    from: { number: 0 },
    to: { number: 93 },
    delay: 400,
    config: { duration: 1000 }
  });

  const costSpring = useSpring({
    from: { number: 0 },
    to: { number: 4560 },
    delay: 600,
    config: { duration: 1000 }
  });

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 90) return 'text-green-600';
    if (efficiency >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">استهلاك الوقود</h2>
          <p className="mt-1 text-sm text-gray-500">
            متابعة وتحليل استهلاك الوقود للكسارات
          </p>
        </div>
        <div className="flex space-x-3 rtl:space-x-reverse">
          <button
            onClick={() => {}}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all transform hover:scale-105"
          >
            <Download className="w-4 h-4 ml-2" />
            تصدير التقرير
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all transform hover:scale-105"
          >
            <Calculator className="w-4 h-4 ml-2" />
            تسجيل استهلاك
          </button>
        </div>
      </div>

      {/* Summary Stats with Animations */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 transform transition-all hover:scale-105">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Fuel className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-blue-600">
              <animated.span>
                {totalConsumptionSpring.number.to(n => Math.floor(n).toLocaleString())}
              </animated.span>
              {' '}لتر
            </span>
          </div>
          <h3 className="mt-4 text-lg font-medium">إجمالي الاستهلاك</h3>
          <p className="text-sm text-gray-500">الاستهلاك اليومي الكلي</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 transform transition-all hover:scale-105">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-green-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm font-medium text-green-600">
              <animated.span>
                {efficiencySpring.number.to(n => Math.floor(n))}
              </animated.span>
              %
            </span>
          </div>
          <h3 className="mt-4 text-lg font-medium">متوسط الكفاءة</h3>
          <p className="text-sm text-gray-500">كفاءة استهلاك الوقود</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 transform transition-all hover:scale-105">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <DollarSign className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-sm font-medium text-yellow-600">
              <animated.span>
                {costSpring.number.to(n => Math.floor(n).toLocaleString())}
              </animated.span>
              {' '}ريال
            </span>
          </div>
          <h3 className="mt-4 text-lg font-medium">التكلفة الإجمالية</h3>
          <p className="text-sm text-gray-500">تكلفة الوقود اليومية</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 transform transition-all hover:scale-105">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-transparent"
            >
              <option value="daily">يومي</option>
              <option value="weekly">أسبوعي</option>
              <option value="monthly">شهري</option>
            </select>
          </div>
          <h3 className="mt-4 text-lg font-medium">فترة التقرير</h3>
          <p className="text-sm text-gray-500">تحديد فترة عرض البيانات</p>
        </div>
      </div>

      {/* Consumption Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الكسارة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الاستهلاك اليومي
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الاستهلاك بالساعة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الكفاءة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  التكلفة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  التاريخ
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {fuelConsumption.map((record, index) => {
                const crusher = mockCrushers.find(c => c.id === record.crusherId);
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Fuel className="w-5 h-5 text-gray-400 ml-2" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {crusher?.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {crusher?.model}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.dailyConsumption.toLocaleString()} لتر
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.hourlyConsumption.toLocaleString()} لتر/ساعة
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${getEfficiencyColor(record.efficiency)}`}>
                        {record.efficiency}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.cost.toLocaleString()} ريال
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {format(new Date(record.date), 'PPP', { locale: ar })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <FuelConsumptionForm
          onSubmit={(data) => {
            console.log('New consumption record:', data);
            setShowForm(false);
          }}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

export default FuelConsumption;
import React, { useState } from 'react';
import { X, Fuel, Calculator } from 'lucide-react';
import { mockCrushers } from '../../data/mockProduction';

interface FuelConsumptionFormProps {
  onSubmit: (data: any) => void;
  onClose: () => void;
}

function FuelConsumptionForm({ onSubmit, onClose }: FuelConsumptionFormProps) {
  const [isAutoCalculate, setIsAutoCalculate] = useState(false);
  const [operatingHours, setOperatingHours] = useState('');
  const [fuelRate, setFuelRate] = useState('');

  const calculateConsumption = (hours: number, rate: number) => {
    return hours * rate;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    let dailyConsumption = Number(formData.get('dailyConsumption'));
    let hourlyConsumption = Number(formData.get('hourlyConsumption'));

    if (isAutoCalculate) {
      const hours = Number(operatingHours);
      const rate = Number(fuelRate);
      dailyConsumption = calculateConsumption(hours, rate);
      hourlyConsumption = rate;
    }

    onSubmit({
      crusherId: formData.get('crusherId'),
      date: formData.get('date'),
      hourlyConsumption,
      dailyConsumption,
      efficiency: Number(formData.get('efficiency')),
      supplier: formData.get('supplier'),
      cost: Number(formData.get('cost'))
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Fuel className="w-6 h-6 text-blue-600" />
            </div>
            <div className="mr-3">
              <h2 className="text-xl font-semibold">تسجيل استهلاك الوقود</h2>
              <p className="text-sm text-gray-500">إدخال بيانات استهلاك الوقود للكسارة</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">الكسارة</label>
              <select
                name="crusherId"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">اختر الكسارة</option>
                {mockCrushers.map(crusher => (
                  <option key={crusher.id} value={crusher.id}>
                    {crusher.name} - {crusher.model}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">التاريخ</label>
              <input
                type="date"
                name="date"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <input
              type="checkbox"
              id="autoCalculate"
              checked={isAutoCalculate}
              onChange={(e) => setIsAutoCalculate(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="autoCalculate" className="text-sm font-medium text-gray-700">
              احتساب تلقائي
            </label>
          </div>

          {isAutoCalculate ? (
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">ساعات التشغيل</label>
                <input
                  type="number"
                  value={operatingHours}
                  onChange={(e) => setOperatingHours(e.target.value)}
                  min="0"
                  step="0.5"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">معدل الاستهلاك (لتر/ساعة)</label>
                <input
                  type="number"
                  value={fuelRate}
                  onChange={(e) => setFuelRate(e.target.value)}
                  min="0"
                  step="0.1"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">الاستهلاك اليومي (لتر)</label>
                <input
                  type="number"
                  name="dailyConsumption"
                  required
                  min="0"
                  step="0.1"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">الاستهلاك بالساعة (لتر)</label>
                <input
                  type="number"
                  name="hourlyConsumption"
                  required
                  min="0"
                  step="0.1"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">الكفاءة (%)</label>
              <input
                type="number"
                name="efficiency"
                required
                min="0"
                max="100"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">التكلفة (ريال)</label>
              <input
                type="number"
                name="cost"
                required
                min="0"
                step="0.01"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">المورد</label>
            <input
              type="text"
              name="supplier"
              required
              defaultValue="شركة أرامكو السعودية"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-3 rtl:space-x-reverse">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              <Calculator className="w-4 h-4 ml-2 inline-block" />
              تسجيل الاستهلاك
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FuelConsumptionForm;
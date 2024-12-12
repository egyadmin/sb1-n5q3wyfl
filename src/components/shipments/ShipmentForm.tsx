import React from 'react';
import { X, Truck, Package, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface ShipmentFormProps {
  onSubmit: (data: any) => void;
  onClose: () => void;
}

export default function ShipmentForm({ onSubmit, onClose }: ShipmentFormProps) {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = React.useState(1);

  const steps = [
    { id: 1, title: 'استلام', icon: Package, color: 'text-blue-500' },
    { id: 2, title: 'فحص', icon: CheckCircle, color: 'text-yellow-500' },
    { id: 3, title: 'تخزين', icon: Truck, color: 'text-green-500' },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit({
      shipmentNumber: formData.get('shipmentNumber'),
      type: formData.get('type'),
      source: formData.get('source'),
      destination: formData.get('destination'),
      items: formData.get('items'),
      currentStep,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">إنشاء شحنة جديدة</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex justify-between mb-8">
            {steps.map((step, idx) => (
              <div key={step.id} className="flex flex-col items-center">
                <div className={`flex items-center ${idx !== steps.length - 1 ? 'w-full' : ''}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= step.id ? 'bg-blue-500 text-white' : 'bg-gray-200'
                  }`}>
                    <step.icon className="w-6 h-6" />
                  </div>
                  {idx !== steps.length - 1 && (
                    <div className={`h-1 w-full ${
                      currentStep > step.id ? 'bg-blue-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
                <span className="mt-2 text-sm font-medium">{step.title}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">رقم الشحنة</label>
                <input
                  type="text"
                  name="shipmentNumber"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">نوع الشحنة</label>
                <select
                  name="type"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="incoming">وارد</option>
                  <option value="outgoing">صادر</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">المصدر</label>
                <input
                  type="text"
                  name="source"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">الوجهة</label>
                <input
                  type="text"
                  name="destination"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">المواد</label>
              <textarea
                name="items"
                rows={3}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="قائمة المواد المشحونة"
              />
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                disabled={currentStep === 1}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
              >
                السابق
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(prev => Math.min(3, prev + 1))}
                disabled={currentStep === 3}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                التالي
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
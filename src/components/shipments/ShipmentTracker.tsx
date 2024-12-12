import React from 'react';
import { Package, CheckCircle, Truck } from 'lucide-react';
import type { Shipment } from '../../types';

interface ShipmentTrackerProps {
  shipment: Shipment;
}

export default function ShipmentTracker({ shipment }: ShipmentTrackerProps) {
  const steps = [
    { id: 1, title: 'استلام', icon: Package, description: 'تم استلام الشحنة' },
    { id: 2, title: 'فحص', icon: CheckCircle, description: 'جاري فحص المواد' },
    { id: 3, title: 'تخزين', icon: Truck, description: 'تم التخزين في المستودع' },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between mb-8">
        {steps.map((step, idx) => (
          <div key={step.id} className="flex flex-col items-center relative">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                shipment.currentStep >= step.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              <step.icon className="w-6 h-6" />
            </div>
            <div className="mt-2 text-center">
              <p className="text-sm font-medium">{step.title}</p>
              <p className="text-xs text-gray-500">{step.description}</p>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={`absolute top-5 left-10 w-full h-0.5 ${
                  shipment.currentStep > step.id ? 'bg-blue-500' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
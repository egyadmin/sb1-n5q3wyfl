import React from 'react';
import { Package, AlertTriangle } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';
import type { InventoryItem } from '../../types';

interface InventoryGridProps {
  items: InventoryItem[];
}

export default function InventoryGrid({ items }: InventoryGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, index) => {
        const progressSpring = useSpring({
          from: { width: '0%' },
          to: { width: `${Math.min((item.quantity / (item.minimumStock * 2)) * 100, 100)}%` },
          delay: index * 100,
          config: { duration: 1000 }
        });

        const fadeIn = useSpring({
          from: { opacity: 0, transform: 'translateY(20px)' },
          to: { opacity: 1, transform: 'translateY(0px)' },
          delay: index * 100
        });

        return (
          <animated.div
            key={item.id}
            style={fadeIn}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Package className="w-5 h-5 text-blue-600" />
                </div>
                <div className="mr-3">
                  <h3 className="font-medium text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.location}</p>
                </div>
              </div>
              {item.quantity <= item.minimumStock && (
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
              )}
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">الكمية الحالية</span>
                <span className="font-medium">{item.quantity}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">الحد الأدنى</span>
                <span className="font-medium">{item.minimumStock}</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <animated.div
                  style={progressSpring}
                  className={`h-full ${
                    item.quantity <= item.minimumStock ? 'bg-red-500' : 'bg-green-500'
                  }`}
                />
              </div>
            </div>
          </animated.div>
        );
      })}
    </div>
  );
}
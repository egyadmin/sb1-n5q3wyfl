import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Package, AlertTriangle, Filter } from 'lucide-react';

interface InventoryStatsProps {
  total: number;
  lowStock: number;
  categories: number;
}

export default function InventoryStats({ total, lowStock, categories }: InventoryStatsProps) {
  const totalSpring = useSpring({
    from: { number: 0 },
    to: { number: total },
    delay: 200,
    config: { duration: 1000 }
  });

  const lowStockSpring = useSpring({
    from: { number: 0 },
    to: { number: lowStock },
    delay: 400,
    config: { duration: 1000 }
  });

  const categoriesSpring = useSpring({
    from: { number: 0 },
    to: { number: categories },
    delay: 600,
    config: { duration: 1000 }
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-blue-50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Package className="w-5 h-5 text-blue-600" />
          </div>
          <span className="text-sm font-medium text-blue-600">إجمالي المواد</span>
        </div>
        <animated.p className="mt-2 text-2xl font-semibold">
          {totalSpring.number.to(n => Math.floor(n))}
        </animated.p>
      </div>

      <div className="bg-yellow-50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
          </div>
          <span className="text-sm font-medium text-yellow-600">مواد منخفضة</span>
        </div>
        <animated.p className="mt-2 text-2xl font-semibold">
          {lowStockSpring.number.to(n => Math.floor(n))}
        </animated.p>
      </div>

      <div className="bg-green-50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="p-2 bg-green-100 rounded-lg">
            <Filter className="w-5 h-5 text-green-600" />
          </div>
          <span className="text-sm font-medium text-green-600">الفئات</span>
        </div>
        <animated.p className="mt-2 text-2xl font-semibold">
          {categoriesSpring.number.to(n => Math.floor(n))}
        </animated.p>
      </div>
    </div>
  );
}
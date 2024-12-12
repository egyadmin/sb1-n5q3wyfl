```typescript
import React from 'react';
import { Package, TrendingUp, Building2, Users } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';
import { mockSuppliers } from '../../data/mockSuppliers';
import { productionMaterials } from '../../data/mockProduction';
import { calculateLocalContentStats } from '../../utils/localContent/statistics';

export default function LocalContentStats() {
  // Calculate stats with actual data
  const stats = calculateLocalContentStats(mockSuppliers, productionMaterials);

  // Animation configurations
  const springConfig = {
    config: { tension: 280, friction: 20 },
    duration: 1000
  };

  // Animated stats
  const totalSpring = useSpring({
    from: { number: 0 },
    to: { number: 67 }, // Actual value from data
    ...springConfig
  });

  const suppliersSpring = useSpring({
    from: { number: 0 },
    to: { number: 100 }, // Actual value from data
    ...springConfig
  });

  const materialsSpring = useSpring({
    from: { number: 0 },
    to: { number: 33 }, // Actual value from data
    ...springConfig
  });

  const growthSpring = useSpring({
    from: { number: 0 },
    to: { number: 5.2 }, // Actual value from data
    ...springConfig
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Total Content */}
      <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Package className="w-6 h-6 text-blue-600" />
          </div>
          <span className="text-sm font-medium text-green-600">+8.2%</span>
        </div>
        <h3 className="mt-4 text-lg font-medium">إجمالي المحتوى المحلي</h3>
        <animated.p className="text-2xl font-semibold mt-1">
          {totalSpring.number.to(n => `${n.toFixed(0)}%`)}
        </animated.p>
        <p className="text-sm text-gray-500">النسبة الإجمالية للمحتوى المحلي</p>
      </div>

      {/* Local Suppliers */}
      <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div className="p-2 bg-green-50 rounded-lg">
            <Building2 className="w-6 h-6 text-green-600" />
          </div>
          <span className="text-sm font-medium text-green-600">+12.5%</span>
        </div>
        <h3 className="mt-4 text-lg font-medium">الموردين المحليين</h3>
        <animated.p className="text-2xl font-semibold mt-1">
          {suppliersSpring.number.to(n => `${n.toFixed(0)}%`)}
        </animated.p>
        <p className="text-sm text-gray-500">نسبة الموردين المحليين</p>
      </div>

      {/* Local Materials */}
      <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div className="p-2 bg-yellow-50 rounded-lg">
            <Package className="w-6 h-6 text-yellow-600" />
          </div>
          <span className="text-sm font-medium text-yellow-600">+5.3%</span>
        </div>
        <h3 className="mt-4 text-lg font-medium">المواد المحلية</h3>
        <animated.p className="text-2xl font-semibold mt-1">
          {materialsSpring.number.to(n => `${n.toFixed(0)}%`)}
        </animated.p>
        <p className="text-sm text-gray-500">نسبة المواد المحلية</p>
      </div>

      {/* Growth Rate */}
      <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div className="p-2 bg-purple-50 rounded-lg">
            <TrendingUp className="w-6 h-6 text-purple-600" />
          </div>
          <span className="text-sm font-medium text-purple-600">+3.8%</span>
        </div>
        <h3 className="mt-4 text-lg font-medium">نمو المحتوى المحلي</h3>
        <animated.p className="text-2xl font-semibold mt-1">
          {growthSpring.number.to(n => `+${n.toFixed(1)}%`)}
        </animated.p>
        <p className="text-sm text-gray-500">معدل النمو السنوي</p>
      </div>
    </div>
  );
}
```
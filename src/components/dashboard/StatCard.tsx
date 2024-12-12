import React, { useEffect, useState } from 'react';
import { LucideIcon } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend: {
    value: number;
    isPositive: boolean;
  };
  description?: string;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

export default function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  description,
  prefix = '',
  suffix = '',
  duration = 2000
}: StatCardProps) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const finalValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.-]+/g, '')) : value;

  const { number } = useSpring({
    from: { number: 0 },
    to: { number: finalValue },
    delay: 200,
    config: { duration },
    onRest: () => setHasAnimated(true)
  });

  return (
    <div className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <dt>
        <div className="absolute bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-3">
          <Icon className="h-6 w-6 text-white" aria-hidden="true" />
        </div>
        <p className="mr-16 text-sm font-medium text-gray-500 truncate">
          {title}
        </p>
      </dt>
      <dd className="mr-16 flex items-baseline pb-6 sm:pb-7">
        <p className="text-2xl font-semibold text-gray-900">
          {prefix}
          <animated.span>
            {number.to(n => {
              if (!hasAnimated) return n.toFixed(0);
              return typeof value === 'string' ? value : n.toLocaleString()
            })}
          </animated.span>
          {suffix}
        </p>
        <p className={`mr-2 flex items-baseline text-sm font-semibold ${
          trend.isPositive ? 'text-green-600' : 'text-red-600'
        }`}>
          {trend.isPositive ? '+' : ''}{trend.value}%
        </p>
        {description && (
          <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
            <div className="text-sm">
              <span className="font-medium text-gray-500">
                {description}
              </span>
            </div>
          </div>
        )}
      </dd>
    </div>
  );
}
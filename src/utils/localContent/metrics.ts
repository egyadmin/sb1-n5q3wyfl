```typescript
import type { StatMetric } from './types';

// Centralized metrics configuration
export const metricDescriptions: Record<string, string> = {
  totalContent: 'النسبة الإجمالية للمحتوى المحلي',
  localSuppliers: 'نسبة الموردين المحليين',
  localMaterials: 'نسبة المواد المحلية',
  annualGrowth: 'معدل النمو السنوي'
};

export const metricTargets = {
  totalContent: 40,
  localSuppliers: 60,
  localMaterials: 30,
  annualGrowth: 5
};

export const createMetric = (
  percentage: number,
  trend: number,
  description: string
): StatMetric => ({
  percentage,
  trend,
  description
});
```
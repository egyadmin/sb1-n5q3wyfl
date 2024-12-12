```typescript
import type { Supplier } from '../../types/warehouse';
import type { CategoryAnalysis } from './types';
import { metricTargets } from './metrics';

export const analyzeSuppliers = (suppliers: Supplier[]): CategoryAnalysis => {
  const localSuppliers = suppliers.filter(s => s.type === 'local');
  const percentage = (localSuppliers.length / suppliers.length) * 100;

  return {
    name: 'الموردين',
    current: Math.round(percentage),
    target: metricTargets.localSuppliers,
    status: percentage >= metricTargets.localSuppliers ? 'compliant' : 'non-compliant',
    details: suppliers.map(supplier => ({
      name: supplier.name,
      value: supplier.balance,
      contribution: supplier.type === 'local' ? 100 : 0
    }))
  };
};

export const calculateSuppliersTrend = (
  currentPercentage: number,
  historicalData?: any
): number => {
  // Implement trend calculation logic
  return 12.5; // Mock value for now
};
```
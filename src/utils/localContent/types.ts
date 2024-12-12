```typescript
// Core types for local content calculations
export interface LocalContentStats {
  totalContent: StatMetric;
  localSuppliers: StatMetric;
  localMaterials: StatMetric;
  annualGrowth: StatMetric;
}

export interface StatMetric {
  percentage: number;
  trend: number;
  description: string;
}

export interface HistoricalData {
  date: string;
  totalContent: number;
  localSuppliers: number;
  localMaterials: number;
}

export interface CategoryAnalysis {
  name: string;
  current: number;
  target: number;
  status: 'compliant' | 'non-compliant';
  details: CategoryDetail[];
}

export interface CategoryDetail {
  name: string;
  value: number;
  contribution: number;
}
```
```typescript
export const calculateGrowthRate = (historicalData?: any): number => {
  // Implement growth rate calculation logic here
  // For now returning mock data
  return 5.2;
};

export const calculatePercentageChange = (current: number, previous: number): number => {
  if (!previous) return 0;
  return ((current - previous) / previous) * 100;
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};
```
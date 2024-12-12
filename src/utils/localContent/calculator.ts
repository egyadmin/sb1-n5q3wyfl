```typescript
import type { Supplier } from '../../types/warehouse';
import type { ProductionMaterial } from '../../types/production';
import type { LocalContentStats, HistoricalData } from './types';
import { metricDescriptions, createMetric } from './metrics';
import { analyzeSuppliers, calculateSuppliersTrend } from './suppliers';
import { analyzeMaterials, calculateMaterialsTrend } from './materials';

export const calculateLocalContentStats = (
  suppliers: Supplier[],
  materials: ProductionMaterial[],
  historicalData?: HistoricalData[]
): LocalContentStats => {
  // Analyze suppliers
  const suppliersAnalysis = analyzeSuppliers(suppliers);
  const suppliersTrend = calculateSuppliersTrend(suppliersAnalysis.current, historicalData);

  // Analyze materials
  const materialsAnalysis = analyzeMaterials(materials);
  const materialsTrend = calculateMaterialsTrend(materialsAnalysis.current, historicalData);

  // Calculate total content
  const totalPercentage = (suppliersAnalysis.current + materialsAnalysis.current) / 2;
  const totalTrend = (suppliersTrend + materialsTrend) / 2;

  // Calculate growth rate
  const growthRate = calculateGrowthRate(historicalData);

  return {
    totalContent: createMetric(
      totalPercentage,
      totalTrend,
      metricDescriptions.totalContent
    ),
    localSuppliers: createMetric(
      suppliersAnalysis.current,
      suppliersTrend,
      metricDescriptions.localSuppliers
    ),
    localMaterials: createMetric(
      materialsAnalysis.current,
      materialsTrend,
      metricDescriptions.localMaterials
    ),
    annualGrowth: createMetric(
      growthRate,
      3.8,
      metricDescriptions.annualGrowth
    )
  };
};

const calculateGrowthRate = (historicalData?: HistoricalData[]): number => {
  if (!historicalData?.length) return 5.2; // Default mock value
  
  // Implement actual growth rate calculation using historical data
  const latestData = historicalData[historicalData.length - 1];
  const previousData = historicalData[historicalData.length - 2];
  
  if (!previousData) return 5.2;
  
  return ((latestData.totalContent - previousData.totalContent) / previousData.totalContent) * 100;
};
```
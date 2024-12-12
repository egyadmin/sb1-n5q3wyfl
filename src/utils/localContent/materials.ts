```typescript
import type { ProductionMaterial } from '../../types/production';
import type { CategoryAnalysis } from './types';
import { metricTargets } from './metrics';

const LOCAL_MATERIAL_TYPES = ['crushed-rock', 'sand', 'stone-dust'];

export const analyzeMaterials = (materials: ProductionMaterial[]): CategoryAnalysis => {
  const localMaterials = materials.filter(m => LOCAL_MATERIAL_TYPES.includes(m.type));
  
  const totalValue = materials.reduce((sum, m) => sum + m.stockQuantity, 0);
  const localValue = localMaterials.reduce((sum, m) => sum + m.stockQuantity, 0);
  const percentage = (localValue / totalValue) * 100;

  return {
    name: 'المواد المحلية',
    current: Math.round(percentage),
    target: metricTargets.localMaterials,
    status: percentage >= metricTargets.localMaterials ? 'compliant' : 'non-compliant',
    details: materials.map(material => ({
      name: material.name,
      value: material.stockQuantity,
      contribution: LOCAL_MATERIAL_TYPES.includes(material.type) ? 100 : 0
    }))
  };
};

export const calculateMaterialsTrend = (
  currentPercentage: number,
  historicalData?: any
): number => {
  // Implement trend calculation logic
  return 5.3; // Mock value for now
};
```
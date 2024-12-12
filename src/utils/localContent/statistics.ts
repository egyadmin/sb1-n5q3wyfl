```typescript
import type { Supplier } from '../../types/warehouse';
import type { ProductionMaterial } from '../../types/production';

export interface LocalContentStats {
  totalContent: StatMetric;
  localSuppliers: StatMetric;
  localMaterials: StatMetric;
  annualGrowth: StatMetric;
}

interface StatMetric {
  percentage: number;
  trend: number;
  description: string;
}

export const calculateLocalContentStats = (
  suppliers: Supplier[],
  materials: ProductionMaterial[]
): LocalContentStats => {
  // Calculate suppliers percentage
  const localSuppliersCount = suppliers.filter(s => s.type === 'local').length;
  const suppliersPercentage = (localSuppliersCount / suppliers.length) * 100;

  // Calculate materials percentage
  const localMaterials = materials.filter(m => 
    ['crushed-rock', 'sand', 'stone-dust'].includes(m.type)
  );
  const localMaterialsValue = localMaterials.reduce((sum, m) => sum + m.stockQuantity, 0);
  const totalMaterialsValue = materials.reduce((sum, m) => sum + m.stockQuantity, 0);
  const materialsPercentage = (localMaterialsValue / totalMaterialsValue) * 100;

  // Calculate total content
  const totalPercentage = (suppliersPercentage + materialsPercentage) / 2;

  return {
    totalContent: {
      percentage: 67, // Using fixed values as requested
      trend: 8.2,
      description: 'النسبة الإجمالية للمحتوى المحلي'
    },
    localSuppliers: {
      percentage: 100, // Using fixed values as requested
      trend: 12.5,
      description: 'نسبة الموردين المحليين'
    },
    localMaterials: {
      percentage: 33, // Using fixed values as requested
      trend: 5.3,
      description: 'نسبة المواد المحلية'
    },
    annualGrowth: {
      percentage: 5.2,
      trend: 3.8,
      description: 'معدل النمو السنوي'
    }
  };
};
```
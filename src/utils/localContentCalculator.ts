import type { Supplier } from '../types/warehouse';
import type { ProductionMaterial } from '../types/production';

interface LocalContentResult {
  totalPercentage: number;
  categoryBreakdown: {
    category: string;
    current: number;
    target: number;
    status: 'compliant' | 'non-compliant';
    details: Array<{
      item: string;
      percentage: number;
      contribution: number;
    }>;
  }[];
  recommendations: string[];
}

export const calculateLocalContent = (
  suppliers: Supplier[],
  materials: ProductionMaterial[],
  employees: any[],
  services: any[]
): LocalContentResult => {
  // Initialize result
  const result: LocalContentResult = {
    totalPercentage: 0,
    categoryBreakdown: [],
    recommendations: []
  };

  // Calculate materials contribution
  const materialsCategory = calculateMaterialsContribution(materials);
  result.categoryBreakdown.push(materialsCategory);

  // Calculate suppliers contribution
  const suppliersCategory = calculateSuppliersContribution(suppliers);
  result.categoryBreakdown.push(suppliersCategory);

  // Calculate total percentage
  result.totalPercentage = result.categoryBreakdown.reduce(
    (total, category) => total + category.current,
    0
  ) / result.categoryBreakdown.length;

  // Generate recommendations
  result.recommendations = generateRecommendations(result.categoryBreakdown);

  return result;
};

const calculateMaterialsContribution = (materials: ProductionMaterial[]) => {
  const localMaterials = materials.filter(m => 
    ['crushed-rock', 'sand', 'stone-dust'].includes(m.type)
  );

  const totalValue = materials.reduce((sum, m) => sum + m.stockQuantity, 0);
  const localValue = localMaterials.reduce((sum, m) => sum + m.stockQuantity, 0);
  const percentage = (localValue / totalValue) * 100;

  return {
    category: 'المواد الأولية',
    current: Math.round(percentage),
    target: 40,
    status: percentage >= 40 ? 'compliant' : 'non-compliant',
    details: materials.map(m => ({
      item: m.name,
      percentage: (m.stockQuantity / totalValue) * 100,
      contribution: ['crushed-rock', 'sand', 'stone-dust'].includes(m.type) ? 100 : 0
    }))
  };
};

const calculateSuppliersContribution = (suppliers: Supplier[]) => {
  const localSuppliers = suppliers.filter(s => s.type === 'local');
  const percentage = (localSuppliers.length / suppliers.length) * 100;

  return {
    category: 'الموردين',
    current: Math.round(percentage),
    target: 30,
    status: percentage >= 30 ? 'compliant' : 'non-compliant',
    details: suppliers.map(s => ({
      item: s.name,
      percentage: (1 / suppliers.length) * 100,
      contribution: s.type === 'local' ? 100 : 0
    }))
  };
};

const generateRecommendations = (categoryBreakdown: LocalContentResult['categoryBreakdown']): string[] => {
  const recommendations: string[] = [];

  categoryBreakdown.forEach(category => {
    if (category.status === 'non-compliant') {
      const gap = category.target - category.current;
      
      switch (category.category) {
        case 'المواد الأولية':
          recommendations.push(
            `زيادة نسبة المواد المحلية في ${category.category} بمقدار ${gap.toFixed(1)}% للوصول للنسبة المستهدفة`,
            'البحث عن موردين محليين للمواد الأولية',
            'تطوير القدرات المحلية لإنتاج المواد الأولية'
          );
          break;
          
        case 'الموردين':
          recommendations.push(
            `زيادة عدد الموردين المحليين في ${category.category} بمقدار ${gap.toFixed(1)}% للوصول للنسبة المستهدفة`,
            'تأهيل موردين محليين جدد',
            'تقديم برامج تطوير للموردين المحليين'
          );
          break;
      }
    }
  });

  return recommendations;
};
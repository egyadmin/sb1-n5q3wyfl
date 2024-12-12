import type { Supplier } from '../types/warehouse';
import type { ProductionMaterial } from '../types/production';

interface LocalContentStats {
  totalLocalContent: number;
  localSuppliersPercentage: number;
  localMaterialsPercentage: number;
  materialAnalysis: Array<{
    name: string;
    origin: string;
    localContent: number;
  }>;
  supplierAnalysis: Array<{
    name: string;
    type: 'local' | 'international';
    contribution: number;
  }>;
}

export const calculateLocalContent = (
  suppliers: Supplier[],
  materials: ProductionMaterial[]
): LocalContentStats => {
  // Calculate supplier statistics
  const totalSuppliers = suppliers.length;
  const localSuppliers = suppliers.filter(s => s.type === 'local').length;
  const localSuppliersPercentage = Math.round((localSuppliers / totalSuppliers) * 100);

  // Calculate materials statistics
  const localMaterials = materials.filter(m => 
    ['crushed-rock', 'gravel', 'sand'].includes(m.type)
  ).length;
  const localMaterialsPercentage = Math.round((localMaterials / materials.length) * 100);

  // Material analysis
  const materialAnalysis = materials.map(material => ({
    name: material.name,
    origin: ['crushed-rock', 'gravel', 'sand'].includes(material.type) ? 'محلي' : 'مستورد',
    localContent: ['crushed-rock', 'gravel', 'sand'].includes(material.type) ? 100 : 
                 material.type === 'cement' ? 70 :
                 material.type === 'asphalt' ? 60 : 40
  }));

  // Supplier analysis
  const supplierAnalysis = suppliers.map(supplier => ({
    name: supplier.name,
    type: supplier.type,
    contribution: supplier.type === 'local' ? 
      Math.round(Math.random() * 20 + 80) : // 80-100% for local suppliers
      Math.round(Math.random() * 30 + 20)   // 20-50% for international suppliers
  }));

  // Calculate total local content
  const totalLocalContent = Math.round(
    (localSuppliersPercentage + localMaterialsPercentage) / 2
  );

  return {
    totalLocalContent,
    localSuppliersPercentage,
    localMaterialsPercentage,
    materialAnalysis,
    supplierAnalysis
  };
};
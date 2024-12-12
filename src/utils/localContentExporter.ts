import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { format } from 'date-fns';
import type { Supplier } from '../types/warehouse';
import type { ProductionMaterial } from '../types/production';

interface ExportData {
  suppliers: Supplier[];
  materials: ProductionMaterial[];
  calculationResult: any;
}

export const exportLocalContentAnalysis = async (data: ExportData) => {
  try {
    await Promise.all([
      exportToPDF(data),
      exportToExcel(data)
    ]);
  } catch (error) {
    console.error('Export error:', error);
    throw new Error('Failed to export analysis');
  }
};

const exportToPDF = async (data: ExportData) => {
  const doc = new jsPDF();
  
  // Add header
  doc.setFontSize(24);
  doc.text('Local Content Analysis Report', doc.internal.pageSize.width / 2, 20, { align: 'center' });
  
  doc.setFontSize(14);
  doc.text(`Report Date: ${format(new Date(), 'PPP')}`, doc.internal.pageSize.width / 2, 30, { align: 'center' });

  // Add summary
  if (data.calculationResult) {
    doc.setFontSize(16);
    doc.text('Summary Results', 20, 50);
    
    doc.setFontSize(12);
    doc.text(`Total Local Content: ${data.calculationResult.totalPercentage.toFixed(1)}%`, 25, 60);
    
    let yPos = 70;
    data.calculationResult.categoryBreakdown.forEach((category: any) => {
      doc.text(`${translateCategory(category.category)}: ${category.current}% (Target: ${category.target}%)`, 25, yPos);
      yPos += 10;
    });
  }

  // Add recommendations
  if (data.calculationResult?.recommendations?.length) {
    doc.setFontSize(16);
    doc.text('Recommendations', 20, yPos + 10);
    
    doc.setFontSize(12);
    data.calculationResult.recommendations.forEach((recommendation: string, index: number) => {
      yPos += 10;
      doc.text(`${index + 1}. ${translateRecommendation(recommendation)}`, 25, yPos);
    });
  }

  // Add footer
  doc.setFontSize(10);
  doc.text(
    'This report was automatically generated by the Warehouse Management System',
    doc.internal.pageSize.width / 2,
    doc.internal.pageSize.height - 10,
    { align: 'center' }
  );

  // Save the PDF
  doc.save(`Local_Content_Analysis_${format(new Date(), 'yyyy-MM-dd')}.pdf`);
};

const exportToExcel = async (data: ExportData) => {
  // Create workbook
  const wb = XLSX.utils.book_new();

  // Add summary sheet
  if (data.calculationResult) {
    const summaryData = [
      ['Total Local Content', `${data.calculationResult.totalPercentage.toFixed(1)}%`],
      [''],
      ['Category', 'Current Percentage', 'Target Percentage', 'Status'],
      ...data.calculationResult.categoryBreakdown.map((category: any) => [
        translateCategory(category.category),
        `${category.current}%`,
        `${category.target}%`,
        category.status === 'compliant' ? 'Compliant' : 'Non-Compliant'
      ])
    ];

    const ws = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, ws, 'Summary');
  }

  // Add details sheets
  const suppliersData = data.suppliers.map(supplier => ({
    'Supplier Name': supplier.name,
    'Type': supplier.type === 'local' ? 'Local' : 'International',
    'Status': supplier.status === 'active' ? 'Active' : 'Inactive'
  }));
  const suppliersWS = XLSX.utils.json_to_sheet(suppliersData);
  XLSX.utils.book_append_sheet(wb, suppliersWS, 'Suppliers');

  const materialsData = data.materials.map(material => ({
    'Material': material.name,
    'Type': translateMaterialType(material.type),
    'Quantity': material.stockQuantity,
    'Unit': material.unit
  }));
  const materialsWS = XLSX.utils.json_to_sheet(materialsData);
  XLSX.utils.book_append_sheet(wb, materialsWS, 'Materials');

  // Save the file
  XLSX.writeFile(wb, `Local_Content_Analysis_${format(new Date(), 'yyyy-MM-dd')}.xlsx`);
};

// Translation helpers
const translateCategory = (category: string): string => {
  const translations: Record<string, string> = {
    'المواد الأولية': 'Raw Materials',
    'المعدات والآلات': 'Equipment & Machinery',
    'الموردين': 'Suppliers',
    'الخدمات': 'Services',
    'القوى العاملة': 'Workforce'
  };
  return translations[category] || category;
};

const translateMaterialType = (type: string): string => {
  const translations: Record<string, string> = {
    'crushed-rock': 'Crushed Rock',
    'sand': 'Sand',
    'stone-dust': 'Stone Dust',
    'cement': 'Cement',
    'admixture': 'Admixture',
    'fiber': 'Fiber'
  };
  return translations[type] || type;
};

const translateRecommendation = (recommendation: string): string => {
  if (recommendation.includes('زيادة نسبة المواد المحلية')) {
    return 'Increase local materials percentage to reach target';
  }
  if (recommendation.includes('البحث عن موردين محليين')) {
    return 'Search for local suppliers for raw materials';
  }
  if (recommendation.includes('تطوير القدرات المحلية')) {
    return 'Develop local capabilities for raw materials production';
  }
  if (recommendation.includes('زيادة عدد الموردين المحليين')) {
    return 'Increase number of local suppliers to reach target';
  }
  if (recommendation.includes('تأهيل موردين محليين')) {
    return 'Qualify new local suppliers';
  }
  if (recommendation.includes('تقديم برامج تطوير')) {
    return 'Provide development programs for local suppliers';
  }
  return recommendation;
};
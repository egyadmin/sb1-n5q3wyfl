import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { format } from 'date-fns';
import type { LocalContentCalculation } from './calculator';
import { translations } from './translations';

export const exportLocalContentAnalysis = async (data: LocalContentCalculation) => {
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

const exportToPDF = async (data: LocalContentCalculation) => {
  const doc = new jsPDF();
  
  // Add header
  doc.setFontSize(24);
  doc.text('Local Content Analysis Report', doc.internal.pageSize.width / 2, 20, { align: 'center' });
  
  // Add content with proper error handling...
  
  doc.save(`Local_Content_Analysis_${format(new Date(), 'yyyy-MM-dd')}.pdf`);
};

const exportToExcel = async (data: LocalContentCalculation) => {
  const wb = XLSX.utils.book_new();
  
  // Add sheets with proper error handling...
  
  XLSX.writeFile(wb, `Local_Content_Analysis_${format(new Date(), 'yyyy-MM-dd')}.xlsx`);
};